const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const config = require("./config");

//const Users = require("./routes/users");

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyparser.json());

app.listen(config.port, () => {
  setTimeout(() => {
    console.log("\n");
    console.log("Server", "Running...");
    console.log("Listening " + config.port);
  }, 500);
});
app.get("/", function (req, res) {
  return res.status(200).json({
    success: true,
    message: "ROUTE OK",
  });
});

app.use("/", require("./routes/users"));
//app.use("/", Users);
