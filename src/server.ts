import express from "express"
import "reflect-metadata"
import { config } from "dotenv"
import { routeCollection } from "./infrastructure/routeCollection"
import "./models/repositories/employeeRepository"
import "./controllers/employeeController"
import "./controllers/teamController"
import bodyParser from "body-parser"
import morgan from "morgan"
import cors from "cors"


config()

const app = express()
const port = process.env.PORT || 3000
const router = express.Router()

routeCollection.setupRouter(router)
app.use(bodyParser.json())
app.use(morgan("dev"))
app.use(cors())
app.use(router)

app.listen(port, () => console.log(`Listening on port http://localhost:${port}`))


