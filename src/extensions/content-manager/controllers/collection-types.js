const { createCoreController } = require("@strapi/strapi").factories;
console.log("🔍 Content Manager Controller Override Loading...");

module.exports = createCoreController(
  "admin::content-manager",
  ({ strapi }) => ({
    async update(ctx) {
      console.log("🔥 Content Manager Update Override Triggered");
      console.log("URL:", ctx.request.url);
      console.log("Method:", ctx.request.method);

      // Check if this is a patient update
      if (ctx.request.url.includes("api::patient.patient")) {
        console.log("📝 Patient update detected");

        const { data } = ctx.request.body;
        const userId = ctx.state.user?.id;

        console.log("User ID:", userId);
        console.log("Data:", data);

        if (userId && data) {
          const currentTime = new Date().toISOString();
          const componentFields = [
            "AntecedantFamilliaux",
            "AntecedantMedicaux",
            "Vaccinations",
            "Traitement",
            "NoteConsultation",
          ];

          componentFields.forEach((field) => {
            if (data[field]) {
              console.log(`🔄 Processing ${field}`);

              if (Array.isArray(data[field])) {
                data[field] = data[field].map((component) => ({
                  ...component,
                  editedBy: userId,
                  editedAt: currentTime,
                  version: (component.version || 0) + 1,
                }));
              } else if (
                typeof data[field] === "object" &&
                data[field] !== null
              ) {
                data[field] = {
                  ...data[field],
                  editedBy: userId,
                  editedAt: currentTime,
                  version: (data[field].version || 0) + 1,
                };
              }
            }
          });

          console.log("✅ Data processed, calling parent update");
        }
      }

      // Call the original update method
      return await super.update(ctx);
    },
  })
);
