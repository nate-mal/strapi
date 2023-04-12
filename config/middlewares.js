module.exports = [
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": ["'self'", "data:", "blob:", "res.cloudinary.com"],
          "media-src": ["'self'", "data:", "blob:", "res.cloudinary.com"],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
  {
    name: "strapi::body",
    config: {
      formLimit: "1000mb", // modify form body
      jsonLimit: "1000mb", // modify JSON body
      textLimit: "1000mb", // modify text body
      formidable: {
        maxFileSize: 1024 * 1024 * 1024 * 1024, // multipart data, modify here limit of uploaded file size
      },
    },
  },
];
