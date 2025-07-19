// server.js
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// --- Middleware ---

// 1. Enable CORS for all routes
// This allows the AMP Cache (and other origins) to request resources from your server.
app.use(cors());

// 2. Serve static files from the 'public' directory
// This makes files in '/public/assets/' available under '/assets/'
app.use(express.static(path.join(__dirname, 'public')));

// --- Routes ---

// 3. Create a specific route to serve your stories
// This serves files from the '/public/stories' directory when a user visits '/stories/*'
app.use('/stories', express.static(path.join(__dirname, 'public', 'stories')));

// Optional: A simple health-check route
app.get('/health', (req, res) => {
  res.status(200).send('Server is up and running!');
});

// --- Start the Server ---
app.listen(port, () => {
  console.log(`✅ AMP story server is running at http://localhost:${port}`);
  console.log(`-> Your story is available at http://localhost:${port}/stories/lifestyle.html`);
});
