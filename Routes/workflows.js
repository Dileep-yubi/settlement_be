const router = require("express").Router();
const Settlement = require("../model/Settlement");
const { v4: uuid4 } = require("uuid");
const urlShortener = require("../Utils/urlShortener");

router.post("/create", async (request, response) => {
  const requestData = request.body;
  const userId = uuid4();
  const longUrl = `${process.env.APP_URL}/workflow/${userId}`;
  const shortUrl = await urlShortener(longUrl);
  const data = new Settlement({
    userId,
    workflow: requestData.workflow,
    shortenedUrl: shortUrl,
    longUrl: longUrl,
    options: requestData.options,
    amount: requestData.amount,
    waiver: requestData.waiver,
  });
  try {
    const savedData = await data.save();
    response.status(201).send("Data Inserted");
  } catch (err) {
    console.log(err);
    response.status(400).send(err);
  }
});

router.get("/shortenedUrls", async (request, response) => {
  const data = await Settlement.find();
  try {
    response.send(data.map((data) => data.shortenedUrl));
  } catch (err) {
    response.status(400).send(err);
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
