// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'http://localhost:8080/hrms/v1',
  baseUrl8082: 'http://localhost:8082/hrms/v1',
  baseUrl8083: 'http://localhost:8083/hrms/v1',

  // baseUrl8082: 'http://deliziahruat.paysquare.com:8082/hrms/v1/',
  // baseUrl8083: 'http://deliziahruat.paysquare.com:8083/hrms/v1/',
   baseUrl8080: 'http://deliziahruat.paysquare.com:8080/hrms/v1/',
  apiBaseUrl: 'http://localhost:8085/hrms/v1/',
  apiBaseUrlEmployee: 'http://localhost:8082/hrms/v1/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
