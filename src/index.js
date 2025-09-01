const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
const errorHandler = require("./middlewares/ErrorHandler");
const cors = require("cors");
const hiveRoute = require("./routes/hive.route");
const beekeeperRoute = require("./routes/beekeeper.route");
const userRoute = require("./routes/user.route");
const cookieParser = require("cookie-parser");
const hiveRoutes = require("./routes/hiveDashboardRoutes");
const beekeeperRoutes = require("./routes/beekeeperDashboardRoutes");
const beekeeperRouteReport = require("./routes/beekeeperReportRoutes");
const hiveRouteReport = require("./routes/hiveReportRoutes");
const productRoutes = require("./routes/product.route");
const recommendationRoutes = require("./routes/recommendations.route");

env.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to db"))
  .catch((er) => console.log(er));

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/hive", hiveRoute);
app.use("/api/v1/beekeeper", beekeeperRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/hives", hiveRoutes);
app.use("/api/beekeepers", beekeeperRoutes);
app.use("/api/beekeepers", beekeeperRouteReport);
app.use("/api/hives", hiveRouteReport);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/recommendation", recommendationRoutes);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(
    `[server]: Server is running at http://localhost:${process.env.PORT}`
  );
});
