import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FleekSdk, PersonalAccessTokenService } from '@fleekxyz/sdk';

@Injectable()
export class IpfsService {
  private fleekSdk: FleekSdk;

  constructor(private configService: ConfigService) {
    const personalAccessToken = this.configService.get<string>('personalAccessToken');
    const projectId = this.configService.get<string>('ipfsProjectID');

    const newAccessTokenService = new PersonalAccessTokenService({
      personalAccessToken,
      projectId,
    });

    this.fleekSdk = new FleekSdk({ accessTokenService: newAccessTokenService });
  }

  async uploadToIPFS(filename: string, content: Buffer) {
    const result = await this.fleekSdk.ipfs().add({
      path: filename,
      content: content,
    });

    return result;
  }

  async getFilesFromIPFS() {
    const result = await this.fleekSdk.storage().list();

    return result;
  }
}