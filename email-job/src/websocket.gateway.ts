/* eslint-disable prettier/prettier */
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(+process.env.WEBSOCKET_PORT, {
  cors: '*',
})
export class WebsocketGW {
  @WebSocketServer()
  socket: Server;
}
