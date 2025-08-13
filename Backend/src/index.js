require("dotenv").config({path: "src/.env"})
const app = require('./app');
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});