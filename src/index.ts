import express from "express"
import bodyParser from "body-parser";
import { router } from "./routes/index";

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use("/api", router)


export { app }