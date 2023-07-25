/* eslint-disable prettier/prettier */
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(8001, {
  cors: '*',
})
export class WebsocketGW {
  @WebSocketServer()
  socket: Server;
}
