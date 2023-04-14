module.exports = ({ env }) => ({
  "users-permissions": {
    config: {
      jwtSecret: env("JWT_SECRET"),
    },
  },
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
  meilisearch: {
    config: {
      product: {
        transformEntry({ entry }) {
          // can also be async
          return {
            id: entry.id,
            art_id: entry.art_id,
            name: entry.name,
            description: entry.description,
            availability: entry.availability,
            delivery_time: entry.delivery_time,
            price: entry.price,
            discount: entry.discount,
            images_nr: entry.images_nr,
            slug: entry.slug,
            sub_category: entry.sub_category
              ? entry.sub_category.ro_name
              : null,
            sub_category_id: entry.sub_category ? entry.sub_category.id : null,
            compatible_models: entry.compatible_models.map(
              (model) => model.name
            ),
            compatible_models_ids:
              entry.compatible_models.length > 0
                ? entry.compatible_models.map((model) => model.id)
                : ["universal"],
          };
        },
      },
      "main-category": {
        transformEntry({ entry }) {
          const { id, ro_name, sub_categories, principal_category } = entry;
          return {
            id,
            name: ro_name,
            principal_category: principal_category.ro_name,
            principal_category_id: principal_category.id,
            sub_categories: sub_categories.map((cat) => cat.ro_name),
            sub_categories_ids: sub_categories.map((cat) => cat.id),
          };
        },
      },
      "sub-category": {
        transformEntry({ entry }) {
          const { id, ro_name, main_category } = entry;
          return {
            id,
            name: ro_name,
            main_category: main_category.ro_name,
            main_category_id: main_category.id,
          };
        },
      },
    },
  },
  email: {
    config: {
      provider: process.env.EMAIL_PROVIDER,
      providerOptions: {
        host: process.env.EMAIL_SMTP_HOST,
        port: process.env.EMAIL_SMTP_PORT,

        auth: {
          user: process.env.EMAIL_SMTP_USER,
          pass: process.env.EMAIL_SMTP_PASS,
        },
        from: process.env.EMAIL_ADDRESS_FROM,
      },
      secure: false,

      settings: {
        defaultFrom: process.env.EMAIL_ADDRESS_FROM,
        defaultReplyTo: process.env.EMAIL_ADDRESS_REPLY,
      },
    },
  },
  "import-export-entries": {
    enabled: true,
  },
});
