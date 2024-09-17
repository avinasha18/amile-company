import { io } from "socket.io-client";
import { serverApi as api} from "../../hooks/apis";

const socket = io(api);


export default socket;