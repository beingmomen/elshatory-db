require("dotenv").config();

module.exports = {
  apps: [
    {
      name: "beingmomen-db",
      port: process.env.PORT,
      exec_mode: "cluster",
      instances: 1,
      script: "./.output/server/index.mjs",
    },
  ],
};
