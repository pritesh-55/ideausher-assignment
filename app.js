const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const postRoutes = require("./routes/postRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger");

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use("/api/posts", postRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
