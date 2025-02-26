const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fullName: String,
  mobile: String,
  pincode: String,
  house: String,
  street: String,
  landmark: String,
  city: String,
  state: String,
  country: { type: String, default: "India" },
  isDefault: { type: Boolean, default: false },
});

module.exports = mongoose.model("Address", AddressSchema);
