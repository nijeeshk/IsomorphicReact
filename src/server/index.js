const express = require('express');
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 7000;

// Middlewares
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', '..', 'dist')));

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.resolve(__dirname, 'uploads'));
  },
  filename(req, file, cb) {
    console.log('file:::', file);
    cb(null, `${file.fieldname}-${Date.now()}.jpg`);
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('image'), (req, res) => {
  console.log('req:::', req.body);
  res.send('success');
});

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', '..', 'dist', 'index.html'));
});

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info(`==> 🌎  Listening on port ${PORT}.`);
  }
});

module.exports = app;
