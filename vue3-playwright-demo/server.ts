const express = require('express');
const app = express();
const PORT = 5001;

app.use(express.json());

// POST endpoint for name validation
app.post("/api/validate-name", (req, res) => {
  const { name } = req.body;

  // Simulate name validation (50% success rate)
  if (Math.random() > 0.5) {
    return res.json({ message: "Name validation successful", name });
  } else {
    return res.status(400).json({ message: "Name validation failed", name });
  }
});

// GET endpoint for user info
app.get("/api/user/info", (req, res) => {
  // Simulate 50% chance of server error
  if (Math.random() < 0.5) {
    return res.status(500).json({ error: "Server Error: Random failure occurred" });
  }

  // Simulate a delayed response
  setTimeout(() => {
    res.json({ name: "Xiang", email: "xiang@example.com" });
  }, 3000);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
