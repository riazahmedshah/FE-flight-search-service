import express, { urlencoded } from "express"
import { router } from "./routes/index";

const app = express();

app.use(express.json())
app.use(urlencoded({extended:true}))

app.use("/api", router)


export { app }