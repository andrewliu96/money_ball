const path = require('path');
const express = require('express');
const expressBrowserify = require('express-browserify');

// Express app
const app = express();

// What directory do the js Views exist
app.set('views', path.join(__dirname, '..', 'src'));
app.set('view engine', 'js');
app.engine('js', require('express-react-views').createEngine());

// Middlewares - use semantic-ui react components
app.use('/css', express.static(path.resolve(__dirname, '..', 'public/css')));
app.use('/images', express.static(path.resolve(__dirname, '..', 'public/images')));
app.use(express.static(path.join(__dirname, '..', 'node_modules/semantic-ui/dist')));

const isDev = (app.get('env') === 'development');
console.log('isDev: ' + isDev);
const browserifier = expressBrowserify(path.resolve(__dirname, '..', 'public/js/bundle.js'), {
  watch: isDev,
  debug: isDev,
  extension: ['js'],
  transform: ['babelify'],
});

if (!isDev) {
  browserifier.browserify.transform('uglifyify', { global: true });
}

// Client Side Bundle route
app.get('/js/bundle.js', browserifier);

module.exports = app;
