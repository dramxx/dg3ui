const session = require('express-session');

export function configureSession(config) {
  return session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: config.store,
    cookie: {
      secure: process.env.WS_PROTOCOL === 'https', //https://www.npmjs.com/package/express-session#cookiesecure
    },
  });
}
