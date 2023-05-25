import axios from "axios";

const TOKEN = "cfpae29r01qq927hdof0cfpae29r01qq927hdofg";

export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: TOKEN,
  },
});
