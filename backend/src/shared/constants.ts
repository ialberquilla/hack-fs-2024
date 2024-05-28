export default () => ({
    personalAccessToken: process.env.PAT_IPFS || '',
    ipfsProjectID: process.env.PROJECT_ID_IPFS || '',
});