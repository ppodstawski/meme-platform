import { Server } from 'socket.io';

class SocketIO {
  public static io;

  public static init(httpServer) {
    this.io = new Server(httpServer, {
      /* options */
    });
    this.io.on('connection', (socket) => {});
  }

  public static get() {
    return this.io;
  }
}

export default SocketIO;
