module.exports = [
  "strapi::errors",
  // {
  //   name: "strapi::security",
  //   config: {
  //     contentSecurityPolicy: {
  //       useDefaults: true,
  //       directives: {
  //         "connect-src": ["'self'", "https:"],
  //         "img-src": ["'self'", "data:", "blob:", "res.cloudinary.com"],
  //         "media-src": ["'self'", "data:", "blob:", "res.cloudinary.com"],
  //         upgradeInsecureRequests: null,
  //       },
  //     },
  //   },
  // },
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "market-assets.strapi.io",
            "artcafe.s3.eu-central-1.amazonaws.com",
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "market-assets.strapi.io",
            "artcafe.s3.eu-central-1.amazonaws.com",
          ],
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
];

// body config ex (force bigger files)
// {
//   name:"strapi::body" ,
//   config: {
//     jsonLimit: "15mb", // modify JSON body
//   },
// },
