module.exports = {
  async beforeUpdate(event) {
    const { data, where } = event.params;

    // Get current user from context
    let userId;
    let firstname;
    try {
      const ctx = strapi.requestContext.get();
      userId = ctx?.state?.user?.id;
      firstname = ctx?.state?.user?.firstname;
    } catch (error) {
      console.log("Error getting user context:", error);
      return;
    }

    if (!userId) return;

    // Fetch the existing patient data to compare changes
    const existingPatient = await strapi.entityService.findOne(
      "api::patient.patient",
      where.id,
      {
        populate: {
          AntecedantFamilliaux: true,
          AntecedantMedicaux: true,
          Vaccinations: true,
          Traitement: true,
          NoteConsultation: true,
        },
      }
    );

    console.log({
      firstname,
      data,
      ctx: strapi.requestContext.get(),
    });

    if (!existingPatient) return;

    const currentTime = new Date().toISOString();
    const componentFields = [
      "AntecedantFamilliaux",
      "AntecedantMedicaux",
      "Vaccinations",
      "Traitement",
      "NoteConsultation",
    ];

    console.log("About to process each component");

    // Process each component field
    componentFields.forEach((field) => {
      if (data[field]) {
        const existingData = existingPatient[field];
        const newData = data[field];

        // Handle repeatable components (arrays)
        if (Array.isArray(newData)) {
          data[field] = newData.map((component, index) => {
            const existingComponent = Array.isArray(existingData)
              ? existingData[index]
              : null;

            // Check if this specific component has changed
            const hasChanged =
              !existingComponent ||
              hasComponentChanged(existingComponent, component);

            if (hasChanged) {
              console.log(
                `Component repeatable ${field}[${index}] has changed`
              );
              console.log("SETTING DOCTOR", {
                ...component,
                editedBy: "Yacine",
                editedAt: currentTime,
                version: (existingComponent?.version || 0) + 1,
              });

              return {
                ...component,
                editedBy: "Yacine",
                editedAt: currentTime,
                version: (existingComponent?.version || 0) + 1,
              };
            } else {
              // Keep existing tracking data if no changes
              return {
                ...component,
                editedBy: "Yacine",
                // editedBy: existingComponent?.editedBy || firstname,
                editedAt: existingComponent?.editedAt || currentTime,
                version: existingComponent?.version || 1,
              };
            }
          });
        }
        // Handle single components (objects)
        else if (typeof newData === "object" && newData !== null) {
          const hasChanged =
            !existingData || hasComponentChanged(existingData, newData);

          if (hasChanged) {
            console.log(`Component single ${field} has changed`, {
              ...newData,
              // editedBy: userId,
              editedBy: "Yacine",
              editedAt: currentTime,
              version: (existingData?.version || 0) + 1,
            });

            data[field] = {
              ...newData,
              // editedBy: userId,
              editedBy: "Yacine",
              editedAt: currentTime,
              version: (existingData?.version || 0) + 1,
            };
          } else {
            // Keep existing tracking data
            data[field] = {
              ...newData,
              // editedBy: existingData?.editedBy || userId,
              editedBy: "Yacine",
              editedAt: existingData?.editedAt || currentTime,
              version: existingData?.version || 1,
            };
          }
        }
      }
    });
  },
};

// Helper function to compare components and detect changes
function hasComponentChanged(oldComponent, newComponent) {
  // Remove tracking fields from comparison
  const excludeFields = [
    "editedBy",
    "editedAt",
    "version",
    "id",
    "createdAt",
    "updatedAt",
  ];

  const oldFiltered = Object.fromEntries(
    Object.entries(oldComponent || {}).filter(
      ([key]) => !excludeFields.includes(key)
    )
  );

  const newFiltered = Object.fromEntries(
    Object.entries(newComponent || {}).filter(
      ([key]) => !excludeFields.includes(key)
    )
  );

  return JSON.stringify(oldFiltered) !== JSON.stringify(newFiltered);
}
