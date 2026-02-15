const ArcjetPackage = require("@arcjet/node");

const Arcjet = ArcjetPackage.default || ArcjetPackage;
const { shield, detectBot } = ArcjetPackage;

module.exports = (config, { strapi }) => {
  const aj = new Arcjet({
    key: process.env.ARCJET_KEY,
    rules: [
      shield({ mode: "LIVE" }),
      detectBot({
        mode: "LIVE",
        allow: [
          "CATEGORY:SEARCH_ENGINE",
          "CATEGORY:PREVIEW",
        ],
      }),
    ],
  });

  return async (ctx, next) => {
    try {
      const decision = await aj.protect({
        method: ctx.request.method,
        headers: ctx.request.headers,
        ip: ctx.request.ip,
        path: ctx.request.url,
      });

      if (decision.isDenied()) {
        ctx.status = 403;
        ctx.body = { error: "Forbidden by Arcjet" };
        return;
      }

      await next();
    } catch (err) {
      strapi.log.error("Arcjet Error:", err);
      await next();
    }
  };
};
