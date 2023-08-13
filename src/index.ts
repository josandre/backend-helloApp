import express, {Request, Response, NextFunction, Application, ErrorRequestHandler} from "express";
import createHttpError from "http-errors";
import {config} from "dotenv";
import swaggerUi from "swagger-ui-express";
import Router from "./routes";
import cors from 'cors'
import {ConversationSocket} from "./webSocket/ConversationSocket";
import {Message} from "./models/Message";

const PORT: number = Number(process.env.PORT) || 5005;

config();

const app: Application = express();
app.use(cors())
app.use(express.json());
app.use(express.static("public"));
app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json",
        },
    })
);

app.use(Router)

app.use((req: Request, res: Response, next: NextFunction)=>{
    next(new createHttpError.NotFound())
})

const errorHandler : ErrorRequestHandler = (error, req, res, next) => {
    res.status(error.status || 500);
    res.send({
        status: error.status || 500,
        message: error.message
    });
}

app.use(errorHandler)

ConversationSocket.getInstance().initialize(app, PORT, () => {
    console.log(`Está en el puerto: ${PORT}`)
});