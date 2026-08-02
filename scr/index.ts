import { Application } from './core/Application.js';
import { ConfigLoader } from './config/ConfigLoader.js';
import { Shutdown } from './core/Shutdown.js';
import { bootstrap } from './bootstrap.js';

void bootstrap();

async function main(): Promise<void> {
  try {
    const loader = new ConfigLoader();
    const [appConfig, webhooks, sources] = await Promise.all([
      loader.loadAppConfig(),
      loader.loadWebhooks(),
      loader.loadSources(),
    ]);

    const app = new Application(appConfig, webhooks, sources);
    
    Shutdown.register(app);
    await app.start();
  } catch (err) {
    console.error('Fatal initialization error', err);
    process.exit(1);
  }
}

void main();