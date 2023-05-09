module.exports = [
  "strapi::errors",
  "strapi::security",
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
