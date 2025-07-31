export default {
  config: {
    locales: ["fr"],
    // Disable video tutorials
    tutorials: false,
    // Disable notifications about new Strapi releases
    notifications: { releases: false },
  },
  bootstrap(app) {
    console.log(app);
  },
};
