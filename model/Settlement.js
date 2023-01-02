const mongoose = require("mongoose");

const settlementSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  workflow: {
    type: String,
    required: true,
  },
  shortenedUrl: {
    type: String,
    required: true,
  },
  longUrl: {
    type: String,
    required: true,
  },
  options: [
    {
      
      emi: { type: Number, required: true },
      tenure: { type: Number, required: true },
      roi: { type: Number, required: true },
    },
  ],
  amount: {
    type: Number,
    required: false,
  },
  waiver: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model("Settlement", settlementSchema);
