import { Environment } from './environment.model';

export const environment = new Environment({
  production: true,
  apiUrl: 'https://copeid.azurewebsites.net'
});
