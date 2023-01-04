const mongoose = require("mongoose");

const amount = {
  currency: { type: String, required: true },
  value: {
    type: Number,
    required: true,
  },
};

const tenure = {
  type: Number,
  required: true,
};

const rateOfInterest = {
  type: Number,
  required: true,
};

const settlementSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
  },
  customerMobileNo: {
    type: String,
  },
  loanAccountNo: {
    type: String,
    required: true,
  },
  workflow: {
    type: String,
    required: true,
  },
  totalOutStanding: {
    currency: { type: String, required: true },
    value: {
      type: Number,
      required: true,
    },
  },
  shortenedUrl: {
    type: String,
    required: true,
  },
  longUrl: {
    type: String,
    required: true,
  },
  restructuring: {
    existingLoans: [
      {
        loanType: {
          type: String,
          required: true,
        },
        loanAccountNo: {
          type: String,
          required: true,
        },
        amount: {
          currency: { type: String, required: true },
          value: {
            type: Number,
            required: true,
          },
        },
        tenure: tenure,
        rateOfInterest: rateOfInterest,
      },
    ],
    options: [
      {
        installmentAmount: {
          currency: { type: String, required: true },
          value: {
            type: Number,
            required: true,
          },
        },
        tenure: rateOfInterest,
        rateOfInterest: rateOfInterest,
      },
    ],
  },
  installmentOptions: [
    {
      installmentAmount: {
        currency: { type: String, required: true },
        value: {
          type: Number,
          required: true,
        },
      },
      tenure: tenure,
      rateOfInterest: rateOfInterest,
    },
  ],
  version: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Settlement", settlementSchema);
