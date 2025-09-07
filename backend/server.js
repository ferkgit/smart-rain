const express = require('express');
const { optimizeRoutes } = require('./delivery/routeService');

const app = express();
app.use(express.json());

app.post('/api/routes', (req, res) => {
  const { depots = [], vehicles = [], stops = [] } = req.body;
  try {
    const summaries = optimizeRoutes({ depots, vehicles, stops });
    res.json({ routes: summaries });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = app;

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server listening on ${port}`));
}
