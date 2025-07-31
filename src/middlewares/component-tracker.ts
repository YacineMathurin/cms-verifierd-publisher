"use strict";

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    await next();

    console.log({
      url: ctx.request.url,
      ctx: ctx.request.url.includes("api::patient.patient"),
      method: ctx.request.method,
    });

    // Only process for patient updates
    if (
      ctx.request.url.includes("api::patient.patient") &&
      ctx.request.method === "PUT"
    ) {
      const userId = ctx.state.user?.id;

      console.log("GETTING IN");
      console.log({ userId });
      console.log({ ctx });
      console.log({ user: ctx.state.user });
      console.log({ data: ctx.request.body.data });

      const currentTime = new Date();

      if (userId && ctx.request.body.data) {
        const data = ctx.request.body.data;

        // Track changes in repeatable components
        const componentFields = [
          "AntecedantFamilliaux",
          "AntecedantMedicaux",
          "Vaccinations",
          "Traitement",
          "NoteConsultation",
        ];

        componentFields.forEach((field) => {
          if (data[field] && Array.isArray(data[field])) {
            data[field] = data[field].map((component) => ({
              ...component,
              editedBy: "Dr. Yacine",
              // editedBy: ctx.state.user?.firstname,
              editedAt: currentTime,
              version: (component.version || 0) + 1,
            }));
          }
        });
      }
    } else {
      console.log("Not getting in !!");
    }
  };
};
