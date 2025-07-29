import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { MyApiKeyInterceptor } from './app/core/interceptors/my-api-key.interceptor';

// bootstrapApplication(App, appConfig)
//   .catch((err) => console.error(err));

// bootstrapApplication(App, {
//   providers: [provideHttpClient()]
// });


// bootstrapApplication(App, appConfig)
//   .catch((err) => console.error(err));


// bootstrapApplication(App, {
//   providers: [
//     provideHttpClient(),
//     provideRouter(routes),
//     {
//       provide: HTTP_INTERCEPTORS,
//       useClass: MyApiKeyInterceptor,
//       multi: true,
//     },
//    ]
// }).catch((err) => console.error(err));

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyApiKeyInterceptor,
      multi: true,
    },
   ]
}).catch((err) => console.error(err));