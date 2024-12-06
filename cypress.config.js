const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
    // implement node event listeners here
    },
    env:{
      AdminUser:{
        username: "Admin",
        password: "admin123",
        newPassword: "admin1234",
        licenseExpires: "2025-12-12",
        birthday: "2000-8-8"
      }
    }
  },
});