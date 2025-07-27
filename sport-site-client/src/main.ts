import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

// bootstrapApplication(App, appConfig)
//   .catch((err) => console.error(err));

// bootstrapApplication(App, {
//   providers: [provideHttpClient()]
// });


// bootstrapApplication(App, appConfig)
//   .catch((err) => console.error(err));


bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
   ]
}).catch((err) => console.error(err));