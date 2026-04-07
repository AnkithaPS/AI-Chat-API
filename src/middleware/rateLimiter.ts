import rateLimit from "express-rate-limit";

const limit = rateLimit({
  windowMs: 15 * 60 * 1000, //15min
  max: 100, //max 100 request
  message: "Too many requests, please try again later",
});

export default limit;
