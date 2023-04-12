module.exports = {
  beforeCreate(event) {
    const { data } = event.params;
    const eu_to_ron = 5;
    if (!data.price) {
      if (data.profit && data.vendor_product_price_cents) {
        const vendor_bani = data.vendor_product_price_cents * eu_to_ron;
        data.price =
          vendor_bani + Math.round(vendor_bani * (data.profit / 100));
      }
    } else {
      if (data.price < data.vendor_product_price_cents * eu_to_ron) {
        const vendor_bani = data.vendor_product_price_cents * eu_to_ron;
        data.price =
          vendor_bani + Math.round(vendor_bani * (data.profit / 100));
      }
      const vendor_bani = data.vendor_product_price_cents * eu_to_ron;
      data.profit = Math.round(
        ((data.price - vendor_bani) / vendor_bani) * 100
      );
    }
  },
  beforeUpdate(event) {
    const { data } = event.params;
    const eu_to_ron = 5;
    if (!data.price) {
      if (data.profit && data.vendor_product_price_cents) {
        const vendor_bani = data.vendor_product_price_cents * eu_to_ron;
        data.price =
          vendor_bani + Math.round(vendor_bani * (data.profit / 100));
      }
    } else {
      if (data.price < data.vendor_product_price_cents * eu_to_ron) {
        const vendor_bani = data.vendor_product_price_cents * eu_to_ron;
        data.price =
          vendor_bani + Math.round(vendor_bani * (data.profit / 100));
      }
      const vendor_bani = data.vendor_product_price_cents * eu_to_ron;
      data.profit = Math.round(
        ((data.price - vendor_bani) / vendor_bani) * 100
      );
    }
  },
};
