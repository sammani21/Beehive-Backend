
const { model , Schema  } = require("mongoose");

const UserSchema = new Schema({
  
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  adminId: {
    type: String,
    required: true,
  },
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;