const app = require('./app');
const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Products API: http://localhost:${PORT}/products`);
});