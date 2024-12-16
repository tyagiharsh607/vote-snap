import express from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import Routes from "./routes/index.js";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import { setupSocket } from "./socket.js";
import { appLimiter } from "./config/rateLimit.js";
import fileUpload from "express-fileupload";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const server = createServer(app);
export const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_APP_URL,
    },
});
setupSocket(io);
const port = process.env.PORT || 7000;
// Default Middlewares
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(appLimiter);
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));
app.use(express.static("public"));
// Set View Engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));
// Routes
app.use(Routes);
app.get("/", async (req, res) => {
    res.json({ msg: "hey there " });
});
import "./jobs/index.js";
import helmet from "helmet";
server.listen(port, () => console.log(`Server is running on port : ${port}`));
