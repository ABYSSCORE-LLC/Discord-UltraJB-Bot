import { Application } from './core/Application.js';
import { ConfigLoader } from './config/ConfigLoader.js';
import { Shutdown } from './core/Shutdown.js';
import { APP_NAME, APP_VERSION } from './constants.js';

/**
 * Initializes and boots the UltraJB application.
 */
export async function bootstrap(): Promise<void> {
  console.log(`[${APP_NAME} v${APP_VERSION}] Booting...`);

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