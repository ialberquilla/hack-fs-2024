import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { IpfsService } from 'src/ipfs/ipfs.service';

@WebSocketGateway()
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('EventsGateway');

  constructor(private ipfsService: IpfsService) {}

  @SubscribeMessage('score')
  async handleMessage(client: Socket, payload: string): Promise<void> {
    this.logger.log(`Client ${client.id} score: ${payload}`);
    const content = JSON.parse(payload);

    await this.ipfsService.uploadToIPFS(
      `score-${content.user}-${content.score}.json`,
      Buffer.from(JSON.stringify(content)),
    );

    this.logger.log('Uploaded to IPFS');
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
