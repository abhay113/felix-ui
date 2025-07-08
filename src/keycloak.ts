import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'https://iam-uat.cateina.com',
  realm: 'FELIX-ASP',
  clientId: 'react-ui'
});

let initialized = false;

export const initKeycloak = () => {
  return new Promise<void>((resolve, reject) => {
    if (initialized) {
      resolve();
      return;
    }

    keycloak
      .init({
        onLoad: 'check-sso',
        // silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
        pkceMethod: 'S256',
        redirectUri: window.location.origin
      })
      .then((authenticated) => {
        console.log("Keycloak initialized:", authenticated);
        initialized = true;
        resolve();
      })
      .catch((error) => {
        console.error("Keycloak init failed", error);
        reject(error);
      });
  });
};

export { keycloak };