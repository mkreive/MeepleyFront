export const oktaConfig = {
    clientId: '0oaamft5nlCumua2m5d7',
    issuer: 'https://dev-32766330.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
};
