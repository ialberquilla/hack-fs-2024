import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, WebSocket } from 'ws';
import { IpfsService } from 'src/ipfs/ipfs.service';

@WebSocketGateway()
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('EventsGateway');

  constructor(private ipfsService: IpfsService) {}

  @SubscribeMessage('score')
  async handleMessage(@MessageBody() payload: string, @ConnectedSocket() client: WebSocket): Promise<void> {
    this.logger.log(`Client ${client.url} score: ${payload}`);
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

  handleConnection(client: WebSocket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.url}`);
  }

  handleDisconnect(client: WebSocket) {
    this.logger.log(`Client disconnected: ${client.url}`);
  }
}