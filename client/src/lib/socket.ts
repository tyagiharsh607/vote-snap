import { io } from "socket.io-client";
import { BACKEND_URL } from "./apiEndpoints";

const socket = io(BACKEND_URL);

export default socket;
