const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  customerName: String,
  isDue:Boolean,
  amount:String,
  date:String,
  reminder:String,
});

const userCustomerSchema = mongoose.Schema({
  email: {
    type: String,
  },
  
  customerList: {
    type: [customerSchema],
  },
});

module.exports = mongoose.model("UserCustomerList", userCustomerSchema);