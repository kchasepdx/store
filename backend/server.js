import express from "express";
import data from "./data";
import config from "./config";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/userRoute";

dotenv.config();

const mongodbUrl = "mongodb://localhost:27017/store";

mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .catch((error) => console.log(error.reason));

const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use("/api/users", router);

app.get("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  const product = data.products.find((x) => x._id === productId);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ msg: "Product Not Found." });
  }
});

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.listen(5000, () => console.log("server started at http://localhost:5000"));
