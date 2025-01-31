module.exports = {
  apps: [
    {
      name: "beingmomen-db",
      port: 8888,
      exec_mode: "cluster",
      instances: 1,
      script: "./.output/server/index.mjs",
    },
  ],
};
