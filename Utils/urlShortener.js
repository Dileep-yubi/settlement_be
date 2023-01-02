const axios = require("axios");

const urlShortener = async (url) => {
  if (url == null) throw new Error("Url is invalid");
  const baseUrl = process.env.SHORTENED_URL;
  const response = await axios.get(`${baseUrl}${url}`);
  return response.data;
};

module.exports = urlShortener;
