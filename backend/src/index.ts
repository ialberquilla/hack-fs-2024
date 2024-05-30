import { WebSocket } from "ws";
import dotenv from "dotenv";
import { FleekSdk, PersonalAccessTokenService } from "@fleekxyz/sdk";
const express = require("express");

dotenv.config();

const personalAccessToken = process.env.PAT_IPFS || "";
const projectId = process.env.PROJECT_ID_IPFS;

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
};

const listFiles = async () => {
  const result = await fleekSdk.storage().list();
  return result;
};


const app = express();
const port = 3002;

app.get("/", async (req: any, res: any) => {
  const files = await listFiles();

  res.json(files);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const ws = new WebSocket.Server({ port: 3100 }, () =>
  console.log("Server started")
);

ws.on("connection", (socket: any) => {
  console.log("Client connected");
  socket.on("message", (msg: Buffer) => {
    const msgStr = msg.toString();
    console.log("Received message:", msgStr);
    socket.send("Echo: " + msgStr);

    const user = msgStr.split(":")[0];
    const score = msgStr.split(":")[1];
    const timestamp = new Date().getTime();

    uploadToIPFS(`${user}-${score}-${timestamp}.json`, Buffer.from(msgStr))
      .then((result) => {
        console.log("Uploaded to IPFS:", result);
      })
      .catch((err) => {
        console.error("Error uploading to IPFS:", err);
      });
  });

});
