const express = require('express');
const app = express();

// Test route - proves your server is alive
app.get('/', (req, res) => {
  res.send('HELLO WORLD! If you see this, your backend WORKS.');
});

// Listen on Railway's port (or 3000 locally)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
