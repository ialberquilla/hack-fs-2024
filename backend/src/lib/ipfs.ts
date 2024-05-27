import { FleekSdk, PersonalAccessTokenService } from '@fleekxyz/sdk';
const fs = require('fs');

const newAccessTokenService = new PersonalAccessTokenService({
  personalAccessToken: process.env.PAT_IPFS,
  projectId: process.env.PROJECT_ID_IPFS,
});

const fleekSdk = new FleekSdk({ accessTokenService: newAccessTokenService });

export const uploadToIPFS = async (filename: string, content: Buffer) => {

  const result = await fleekSdk.ipfs().add({
    path: filename,
    content: content,
  });

  return result;
};

export const getFilesFromIPFS = async () => {
  const result = await fleekSdk.storage().list();

  return result;
};
