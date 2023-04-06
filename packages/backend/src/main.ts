import express = require("express");
import proxy from "./proxy/proxy";
const app = express();

app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res
      .header("Access-Control-Allow-Origin", "*")
      .header("Access-Control-Allow-Credentials", "true")
      .header("Access-Control-Allow-Headers", "*")
      .header("Access-Control-Allow-Methods", "*")
      .status(200)
      .send();
  }
  res
    .header("X-Powered-By", "Nai Feature")
    .header("Access-Control-Allow-Origin", req.headers.origin)
    .header("Access-Control-Allow-Credentials", "true")
    .header("Access-Control-Allow-Headers", "Set-Cookie, Cookie, refer, origin")
    .header(
      "Access-Control-Allow-Methods",
      "POST, HEAD, PATCH, GET, OPTIONS, PUT, DELETE"
    )
    .header("Accept", "*/*");
  next();
});

app.use(express.urlencoded());
app.get("/", (req, res) => {
  res.send("Baota Backend Started");
});

app.use(proxy);

app.listen(3400, () => {
  console.log("Baota Backend Started on http://localhost:3400");
});
