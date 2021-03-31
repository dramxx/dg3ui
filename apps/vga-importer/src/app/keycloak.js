import Keycloak from 'keycloak-js';

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
export const keycloak = new Keycloak({
  url: process.env.VGA_SERVER_URL,
  realm: process.env.VGA_KEYCLOAK_REALM,
  clientId: process.env.VGA_KEYCLOAK_CLIENT_ID,
});
