import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { uploadToIPFS } from 'src/lib/ipfs';
const fs = require('fs');


@WebSocketGateway()
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('EventsGateway');

  @SubscribeMessage('score')
  async handleMessage(client: Socket, payload: string): Promise<void> {
    this.logger.log(`Client ${client.id} score: ${payload}`);
    const buffer = Buffer.from(payload, 'base64');

    const result = await uploadToIPFS('score.txt', buffer)

    this.logger.log('File uploaded to IPFS');

    this.logger.log(result);

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