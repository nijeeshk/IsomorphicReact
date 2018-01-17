'use strict';

const express = require('express');
const path = require('path');

const app = express();
var PORT = process.env.PORT || 7000;

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', '..', 'dist')));

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', '..', 'dist', 'index.html'));
});

app.listen(PORT, function(err) {
	if (err) {
		console.error(err)
	} else {
		console.info(`==> 🌎  Listening on port ${PORT}.`);
	}
});

module.exports = app;
