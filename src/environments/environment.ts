// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  BASE_URL: 'http://127.0.0.1:8000/api',
  BASE_URL_STORAGE: 'http://127.0.0.1:8000/storage'
  // BASE_URL: 'http://178.16.140.227:8081/api',
  // BASE_URL_STORAGE: 'http://178.16.140.227:8081/storage'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
