const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const errorhandler = require('error-handler');
const path = require('path');

// Instantiate express
const app = express();

// Express middlewares
app.use(morgan('tiny'));
app.use(errorhandler);
app.use(bodyParser.json());

// Serve statics
app.use(express.static('dist'));
app.use(express.static('public'));

// Webpack Middlewares
const webpack = require('webpack');
const config = require('../../webpack.config.dev.js');

const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  stats: 'errors-only',
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('*', (req, res, next) => {
  const filename = path.join(compiler.outputPath, 'index.html');
  compiler.outputFileSystem.readFile(filename, (err, result) => {
    if (err) {
      return next(err);
    }
    res.set('content-type', 'text/html');
    res.send(result);
    res.end();
  });
});

// Start App
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listenin on ${PORT}`);
});
