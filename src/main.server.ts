import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

// Set up global environment for server-side rendering
// This ensures we can handle things like window or localStorage references safely
(global as any).window = global;
(global as any).localStorage = {
  getItem: (key: string) => null,
  setItem: (key: string, value: string) => {},
  removeItem: (key: string) => {}
};

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
