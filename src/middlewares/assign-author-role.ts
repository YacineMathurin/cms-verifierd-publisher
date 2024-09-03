"use strict";

module.exports = () => {
  return async (ctx, next) => {
    // The `next()` call will register your user with the default role
    await next();

    if (
      ctx.request.url === "/api/auth/local/register" &&
      ctx.response.status === 200
    ) {
      const { firstname, lastname, email, password } = ctx.request.body;
      if (!firstname || !lastname || !email || !password) {
        // ctx.badRequest(message, details)
        return ctx.badRequest(
          `firstname, lastname, email and password are required fields`
        );
      }
      
      const user = await strapi.db
        .query("admin::user")
        .findOne({ where: { email: email } });
      if (user) {
        strapi.log.error(`Couldn't create author: ${email} already exists`);
        return ctx.badRequest(`${email} already exists`);
      }

      const hashedPassword = await strapi
        .service("admin::auth")
        .hashPassword(password);
      const authorRole = await strapi.db
        .query("admin::role")
        .findOne({ where: { code: "strapi-author" } });
      const adminUserData = {
        firstname,
        lastname,
        email,
        password: hashedPassword,
        roles: [authorRole],
        blocked: false,
        isActive: true,
      };

      const response = await strapi.db
        .query("admin::user")
        .create({ data: { ...adminUserData } });

      strapi.log.info(`Created author: ${firstname} ${lastname} (${email})`);
      return ctx.send(
        { message: "Author created successfully!", details: response },
        200
      );
    }
  };
};
