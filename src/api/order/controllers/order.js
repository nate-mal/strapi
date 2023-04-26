("use strict");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const shipping_tax = process.env.SHIPPING_TAX || 2999;
const min_free_shipping = process.env.MIN_FREE_SHIPPING || 40000;
console.log(min_free_shipping);
const { Str } = require("@supercharge/strings");
/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const {
      products,
      payment_method,
      name,
      email,
      address,
      phone,
      payment_details,
    } = ctx.request.body;

    try {
      const checkout_session =
        new Date().toLocaleDateString("ro-RO") + "_" + Str.random(100);

      const discounts = await strapi
        .controller("api::order.order")
        .getDiscounts();
      const getDiscountPercentage = (
        subCategoryId,
        subCategoryRoName,
        discounts
      ) => {
        let filteredDiscounts = [];
        for (let i = 0; i < discounts.length; i++) {
          let discount = discounts[i];
          for (let j = 0; j < discount.sub_categories.length; j++) {
            let subCategory = discount.sub_categories[j];
            if (
              subCategory.id === subCategoryId ||
              subCategory.ro_name === subCategoryRoName
            ) {
              filteredDiscounts.push(discount);
              break;
            }
          }
        }

        if (filteredDiscounts.length === 0) {
          return null;
        }

        // filteredDiscounts.sort(function (a, b) {
        //   return new Date(b.createdAt) - new Date(a.createdAt);
        // });

        return filteredDiscounts[0].percentage;
      };

      const productsInfo = await Promise.all(
        products.map(async (product) => {
          const item = await strapi.query("api::product.product").findOne({
            // uid syntax: 'api::api-name.content-type-name'
            where: {
              id: product.item.id,
            },
            // select: ["id", "vendor_product_location"],
            populate: { sub_category: true },
          });

          const discount =
            item.discount ||
            getDiscountPercentage(
              item.sub_category.id,
              item.sub_category.ro_name,
              discounts
            );

          return {
            price_data: {
              currency: "ron",
              product_data: {
                id: item.id,
                art_id: item.art_id,
                slug: item.slug,
                name: item.name,
                description: item.description,
                location: item.vendor_product_location,
                delivery: item.delivery_time,
                vendor_delivery: item.vendor_product_delivery_info,
              },
              unit_amount: Math.round(
                item.price - Math.ceil(item.price * (discount / 100))
              ),
              applied_discount: Math.ceil(item.price * (discount / 100)),
            },
            quantity: product.amount,
          };
        })
      );
      const sub_total = productsInfo.reduce(
        (total, item) => total + item.price_data.unit_amount * item.quantity,
        0
      );
      if (payment_method === "online") {
        const lineItems = productsInfo.map((item) => {
          return {
            price_data: {
              currency: "ron",
              product_data: {
                name: item.price_data.product_data.name,
                description:
                  item.price_data.product_data.description.slice(0, 50) + "...",
                images: [
                  `${process.env.CLIENT_URL}/images/${item.price_data.product_data.art_id}/image-0.jpg`,
                  "https://p.turbosquid.com/ts-thumb/fp/idahYg/RLTOwBty/1/png/1467663269/600x600/fit_q87/e6ec54a5be1feb6b5fa2030d36b8f6277093d75c/1.jpg",
                ],
              },
              unit_amount: Math.round(item.price_data.unit_amount),
            },
            quantity: item.quantity,
          };
        });
        const session = await stripe.checkout.sessions.create({
          // shipping_address_collection: { allowed_countries: ["RO"] },
          invoice_creation: { enabled: true },
          allow_promotion_codes: true,
          payment_method_types: ["card"],
          mode: "payment",
          success_url:
            process.env.CLIENT_URL +
            `/checkout/success?checkout_session=${checkout_session}&stripeId={CHECKOUT_SESSION_ID}`,
          cancel_url:
            process.env.CLIENT_URL +
            `/checkout/canceled?checkout_session=${checkout_session}&stripeId={CHECKOUT_SESSION_ID}`,
          line_items: lineItems,
          shipping_options: [
            {
              shipping_rate_data: {
                type: "fixed_amount",
                fixed_amount: {
                  amount: sub_total < min_free_shipping ? shipping_tax : 0,
                  currency: "ron",
                },
                display_name: address,
                delivery_estimate: {
                  minimum: { unit: "business_day", value: 5 },
                  maximum: { unit: "business_day", value: 7 },
                },
              },
            },
          ],
        });

        await strapi.service("api::order.order").create({
          data: {
            checkout_session,
            products: productsInfo,
            stripeId: session.id,
            payment_method: "online",
            name,
            email,
            address,
            phone,
            payment_name: payment_details.name,
            payment_address: payment_details.address,
          },
        });

        return { stripeSession: session, checkout_session };
      } else {
        const lineItems = productsInfo.map((item) => {
          return {
            price_data: {
              currency: "ron",
              product_data: {
                name: item.price_data.product_data.name,
                id: item.price_data.product_data.id,
                art_id: item.price_data.product_data.art_id,
              },
              unit_amount: Math.round(item.price_data.unit_amount),
            },
            quantity: item.quantity,
          };
        });
        await strapi.service("api::order.order").create({
          data: {
            checkout_session,
            products: productsInfo,
            payment_method: "cashondelivery",
            name,
            email,
            phone,
            address,
            payment_name: payment_details.name,
            payment_address: payment_details.address,
          },
        });

        return {
          checkout_session,
          products: lineItems,
          success_url:
            process.env.CLIENT_URL +
            `/checkout/success?session=${checkout_session}`,
          shipping_tax: sub_total < min_free_shipping ? shipping_tax : 0,
          payment_method: "cashondelivery",
          name,
          email,
          address,
          payment_name: payment_details.name,
          payment_address: payment_details.address,
        };
      }
    } catch (error) {
      ctx.response.status = 500;
      console.log(error);
      return { error };
    }
  },
  async confirm(ctx) {
    const { checkout_session, stripeId } = ctx.request.body;
    if (stripeId && stripeId !== "") {
      const session = await stripe.checkout.sessions.retrieve(stripeId);

      if (session.payment_status === "paid") {
        //Update order
        await strapi.query("api::order.order").update({
          // uid syntax: 'api::api-name.content-type-name'
          where: {
            checkout_session,
            stripeId,
            $or: [{ status: "processing" }, { status: "canceled" }],
          },
          data: {
            status: "confirmed",
            payment_status: "paid",
            discount: session.total_details.amount_discount
              ? session.total_details.amount_discount
              : null,
          },
        });
        await strapi.query("api::order.order").update({
          // uid syntax: 'api::api-name.content-type-name'
          where: {
            checkout_session,
            stripeId,
          },
          data: {
            payment_status: "paid",
            discount: session.total_details.amount_discount
              ? session.total_details.amount_discount
              : null,
          },
        });
        const newOrder = await strapi.query("api::order.order").findOne({
          // uid syntax: 'api::api-name.content-type-name'
          where: {
            checkout_session,
          },
          select: ["id", "status", "payment_status"],
        });

        return newOrder;
      } else {
        await strapi.query("api::order.order").update({
          // uid syntax: 'api::api-name.content-type-name'
          where: {
            checkout_session,
            status: "processing",
          },
          data: {
            status: "canceled",
          },
        });
        ctx.throw(
          400,
          "It seems like the order wasn't verified, please contact support"
        );
      }
    } else {
      //Update order
      await strapi.query("api::order.order").update({
        // uid syntax: 'api::api-name.content-type-name'
        where: {
          checkout_session,
          status: "processing",
        },
        data: {
          status: "confirmed",
        },
      });
      const newOrder = await strapi.query("api::order.order").findOne({
        // uid syntax: 'api::api-name.content-type-name'
        where: {
          checkout_session,
        },
        select: ["id", "status", "payment_status"],
      });

      return newOrder;
    }
  },
  async cancel(ctx) {
    const { checkout_session } = ctx.request.body;
    try {
      await strapi.query("api::order.order").update({
        // uid syntax: 'api::api-name.content-type-name'
        where: {
          checkout_session,
          status: "processing",
          payment_status: "unpaid",
        },
        data: {
          status: "canceled",
        },
      });
      const newOrder = await strapi.query("api::order.order").findOne({
        // uid syntax: 'api::api-name.content-type-name'
        where: {
          checkout_session,
        },
        select: ["id", "status"],
      });

      return newOrder;
    } catch (err) {
      ctx.throw(
        400,
        "It seems like the order wasn't verified, please contact support"
      );
    }
  },
  async location(ctx) {
    const { location_key, productId } = ctx.request.query;

    try {
      if (location_key !== process.env.LOCATION_KEY) {
        throw "nice try";
      }
      const location = await strapi.query("api::product.product").findOne({
        // uid syntax: 'api::api-name.content-type-name'
        where: {
          id: productId,
        },
        select: ["id", "vendor_product_location"],
      });
      return location;
    } catch (err) {
      ctx.throw(400, "It seems like the product wasn't verified");
    }
  },
  async getDiscounts() {
    try {
      const entries = await strapi.entityService.findMany(
        "api::discount.discount",
        {
          sort: { createdAt: "DESC" },
          populate: { sub_categories: true },
        }
      );
      return entries;
    } catch (err) {
      ctx.throw(400, "It seems like the discount weren't verified");
    }
  },
}));
// https://checkout.stripe.com/c/pay/cs_test_b1XUaoQBGBGryeWTHenNwXp7kb6dF1iZ9TRg0mjKaGRsX9ZxV1bm9B24Bn#fidkdWxOYHwnPyd1blpxYHZxWjA0SGpQbmNHVWlmN20wcnZ1f11wRmhJf0pcYVdcSnFOVXUyUjY9bn9EN1ZkdHdkTWQybDVsN1JjckN8dVc2N3NDU0FSYT19ZzdDUEtXb0xmY0REXElgclx0NTUzaEZtUjZRMCcpJ2hsYXYnP34nYnBsYSc%2FJ2ZhZzYzMTYzKDdhY2AoMWQxYyg9Y2QzKDQyY2NgZDI2NzE0YTRnN2M9NicpJ2hwbGEnPydnNDw9N2Q8Zig1Mzc9KDE0N2MoZGRhZCg3ZDZmZzYwPTQ9NjRkZGNjZGYnKSd2bGEnPydjNDVgMjdjMihjPWM1KDEwMTIoZzRnYyhkNzJhYTw2Zj00ZGFmY2E1NDIneCknZ2BxZHYnP15YKSdpZHxqcHFRfHVgJz8naHBpcWxabHFgaCcpJ3dgY2B3d2B3SndsYmxrJz8nbXFxdXY%2FKipycnIrZHdxZmRjYCt2cWp3YCd4JSUl
