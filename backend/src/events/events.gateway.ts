import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('EventsGateway');

  @SubscribeMessage('score')
  handleMessage(client: Socket, payload: string): void {
    this.logger.log(`Client ${client.id} score: ${payload}`);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}