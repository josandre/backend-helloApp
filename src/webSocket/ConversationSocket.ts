import * as http from "http";
import {Application} from "express";
import {Server} from "socket.io";
import {Message} from "../models/Message";

export class ConversationSocket{
    private  socketServer: http.Server;
    private  io: Server;
    private  port: number;
    private static instance: ConversationSocket;

    private constructor() {}

    static getInstance(): ConversationSocket{
        if(!ConversationSocket.instance) {
            ConversationSocket.instance = new ConversationSocket();
        }

        return ConversationSocket.instance
    }

    initialize( app:Application, port: number, listener: () => void){
        this.socketServer = http.createServer(app);
        this.port = port;
        this.io = new Server(this.socketServer, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        })

        this.io.on("connection", (socket) => {
            console.log("User connected", socket.id);

            socket.on("disconnect", () => {
                console.log("User disconnected")
            })

            socket.join("messageApp")
        });

        this.socketServer.listen(this.port, listener);
    }

    emitMessage(message: Message){
        this.io.to("messageApp").emit(String(message.to), {...message});
    }
}
