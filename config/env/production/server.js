module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: env("STRAPI_URL", "https://strapi-production-5778.up.railway.app"),
  app: {
    keys: env.array("APP_KEYS"),
    proxy: true,
  },
});
// see production env
