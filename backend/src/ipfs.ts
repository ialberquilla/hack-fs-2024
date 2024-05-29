import { FleekSdk, PersonalAccessTokenService } from '@fleekxyz/sdk';

const personalAccessToken = process.env.PAT_IPFS || '';
const projectId = process.env.PROJECT_ID_IPFS

const newAccessTokenService = new PersonalAccessTokenService({
  personalAccessToken,
  projectId,
});

const fleekSdk = new FleekSdk({ accessTokenService: newAccessTokenService });

export const uploadToIPFS = async (filename: string, content: Buffer) => {
    const result = await fleekSdk.ipfs().add({
      path: filename,
      content: content,
    });

    return result;
  }