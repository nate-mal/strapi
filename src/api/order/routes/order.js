"use strict";

/**
 * order router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;
const defaultRouter = createCoreRouter("api::order.order");

const customRouter = (innerRouter, extraRoutes = []) => {
  let routes;
  return {
    get prefix() {
      return innerRouter.prefix;
    },
    get routes() {
      if (!routes) routes = innerRouter.routes.concat(extraRoutes);
      return routes;
    },
  };
};

const myExtraRoutes = [
  {
    method: "POST",
    path: "/confirm",
    handler: "api::order.order.confirm",
  },
  {
    method: "POST",
    path: "/cancel",
    handler: "api::order.order.cancel",
  },
  {
    method: "GET",
    path: "/location",
    handler: "api::order.order.location",
  },
];

module.exports = customRouter(defaultRouter, myExtraRoutes);
