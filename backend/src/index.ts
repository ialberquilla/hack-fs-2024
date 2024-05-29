import { WebSocket } from "ws";

const ws = new WebSocket.Server({ port: 3100 }, 
    ()=> console.log('Server started')
);

ws.on('connection', (socket: any) => {
    console.log('Client connected');
    socket.on('message', (msg: Buffer) => {
        const msgStr = msg.toString();
        const msgJson = JSON.parse(msgStr);
        
        console.log('Received message:', msgJson);

        socket.send('Echo: ' + msgStr);
    });
});