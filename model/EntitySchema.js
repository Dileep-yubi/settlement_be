const mongoose = require("mongoose");

const entitySchema = mongoose.Schema({
  displayName: {
    type: String,
    required: true,
  },
  logo: {
    //Url of the logo
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  loanTypes: [
    {
      typeOfLoan: String,
      disclaimer: String,
    },
  ],
  version: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Entity", entitySchema);
