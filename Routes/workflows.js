const router = require("express").Router();
const Settlement = require("../model/WorkflowsSchema");
const { v4: uuid4 } = require("uuid");
const urlShortener = require("../Utils/urlShortener");
const axios = require("axios");

router.post("/create", async (request, response) => {
  const requestData = request.body;
  try {
    await requestData.map(async (workflowData) => {
      const userId = uuid4();
      const longUrl = `${process.env.APP_URL}/workflow/${userId}`;
      const shortUrl = await urlShortener(longUrl);
      const data = new Settlement({
        userId,
        displayName: workflowData.displayName,
        customerEmail: workflowData.customerEmail,
        customerMobileNo: workflowData.customerMobileNo,
        loanAccountNo: workflowData.loanAccountNo,
        workflow: workflowData.workflow,
        totalOutStanding: workflowData.totalOutStanding,
        shortenedUrl: shortUrl,
        longUrl: longUrl,
        restructuring: workflowData.restructuring,
        installmentOptions: workflowData.installmentOptions,
        version: workflowData.version || 1,
      });
      const savedData = await data.save();
    });
    response.status(201).send("Data Inserted");
  } catch (err) {
    response.status(400).send(err);
  }
});

router.get("/shortenedUrls", async (request, response) => {
  const data = await Settlement.find();
  try {
    response.send(
      data.map((data) => ({ url: data.shortenedUrl, workflow: data.workflow }))
    );
  } catch (err) {
    response.status(400).send(err);
  }
});

router.get("/get-link", async (req, res) => {
  try {
    const response = await axios.post(
      "https://pg.go-yubi.in/internal/v1/links",
      {
        merchant_id: 835,
        customer_details: {
          customer_phone: "9891127886",
          name: "Sushant",
          email: "sushant.jain@gmail.com",
          address: "Testing",
          city: "Hyderabad",
          state: "TG",
          pincode: "500050",
          country: "India",
        },
        track_id: uuid4(),
        amount: 100.12,
        currency: "INR",
        purpose: "testing payment",
        payment_gateway_id: 4,
        expiry_time: "2023-09-02T11:40:05+05:30",
        payment_methods: "ccav_uae",
      },
      {
        headers: {
          "x-api-key": process.env.PAYMENT_API_KEY,
        },
      }
    );
    res.send(response.data);
  } catch (err) {
    res.sendStatus(400).send(err);
  }
});

router.get("/:id", async (request, response) => {
  const url = request.url;
  var id = url.substring(url.lastIndexOf("/") + 1);
  try {
    const data = await Settlement.findOne({ userId: id });
    response.send(data);
  } catch (err) {
    response.status(400).send(err);
  }
});

module.exports = router;
