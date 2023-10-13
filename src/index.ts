import "./db/db";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import errorMiddleware from "./modules/config/errorHandler";
import importRoutings from "./routing/routingIndex";
import http from "http";
import * as path from 'path'
import { setupSocket } from "./modules/chatSocket/chatSocket";

const app = express();
dotenv.config();

// create the server
const server = http.createServer(app);
setupSocket(server);

// use the body-parser
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/notes', express.static(path.join(__dirname,'src','../public/notes')));


// Enable CORS for all routes and all origins
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
}));

// import routing function
importRoutings(app);

app.use('/',(req,res) => {
  res.status(200).send("Welcome to our app")
})

app.use(errorMiddleware);


server.listen(process.env.PORT, () => {
  console.log(`The server is running on port ${process.env.PORT}`);
});