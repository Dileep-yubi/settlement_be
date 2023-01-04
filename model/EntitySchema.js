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
      loanType: { type: String, required: true },
      disclaimer: { type: String, required: true },
    },
  ],
  feedback: [
    {
      link: { type: String, required: true },
      title: { type: String, required: true },
      icon: { type: String, required: true },
      description: { type: String, required: true },
    },
  ],
  failureUrl: {
    type: String,
    required: true,
  },
  version: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Entity", entitySchema);
