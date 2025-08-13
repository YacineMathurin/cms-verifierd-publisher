import "./extensions/styles.css";
export default {
  config: {
    locales: ["fr"],
    tutorials: false,
    notifications: { releases: false },
  },

  bootstrap(app) {
    console.log(app);

    document.addEventListener("DOMContentLoaded", function () {
      const replaceText = () => {
        const element = document.querySelector(".sc-dkPtRN.lfKhOZ");
        if (element) {
          element.textContent = "Welcome on Medicare!";
        }
      };

      // Try immediately and with a delay
      setTimeout(replaceText, 1000);
    });
  },
};
