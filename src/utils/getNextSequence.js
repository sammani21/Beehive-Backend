// utils/getNextBeekeeperNo.js
const CounterModel = require("../model/counter.model");

async function getNextBeekeeperNo() {
  const counter = await CounterModel.findOneAndUpdate(
    { _id: "beekeeperId" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  // Format like B018
  return `B${counter.seq.toString().padStart(3, "0")}`;
}

module.exports = getNextBeekeeperNo;
