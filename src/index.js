const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
const errorHandler = require("./middlewares/ErrorHandler");
const cors = require('cors');
const vehicleRoute = require("./routes/vehicle.route");
const beekeeperRoute = require("./routes/beekeeper.route");
const userRoute  = require("./routes/user.route"); 
const passengerRoute = require("./routes/passenger.route");
const cookieParser = require('cookie-parser');
const vehicleRoutes = require("./routes/vehicleDashboardRoutes");
const beekeeperRoutes = require("./routes/beekeeperDashboardRoutes");
const tripRoutes = require("./routes/tripDashboardRoutes");
const issueRoutes = require("./routes/issueDashboardRoutes");
const countCompletedTripsRoute = require('./routes/countCompletedTripsRoute');
const passengerRouteReport = require("./routes/passengerReportRoutes");
const beekeeperRouteReport = require('./routes/beekeeperReportRoutes');
const vehicleRouteReport = require('./routes/vehicleReportRoutes');
const issueRouteReport = require('./routes/issueReportRoutes');

env.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to db"))
  .catch((er) => console.log(er));

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/vehicle", vehicleRoute);
app.use("/api/v1/beekeeper", beekeeperRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/passenger", passengerRoute);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/beekeepers", beekeeperRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/trips", countCompletedTripsRoute);
app.use('/api/passengers', passengerRouteReport);
app.use('/api/beekeepers', beekeeperRouteReport);
app.use('/api/vehicles', vehicleRouteReport);
app.use('/api/issues', issueRouteReport);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${process.env.PORT}`);
});
