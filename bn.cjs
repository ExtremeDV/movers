// только для работы на хостинге beget

async function loadApp() {
  const { app } = await import("./.output/server/index.mjs");
  }
  loadApp()