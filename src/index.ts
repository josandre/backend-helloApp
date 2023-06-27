import express, {Request, Response, NextFunction, Application, ErrorRequestHandler} from "express";
import createHttpError from "http-errors";
import {config} from "dotenv";
import swaggerUi from "swagger-ui-express";
import Router from "./routes";
import {connectionTest} from "./db/connectionManager";
import cors from 'cors'

config();

const app: Application = express();

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

app.use(cors({
    origin: '*'
}))

const PORT: Number = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
    console.log(`Está en el puerto: ${PORT}`)
    connectionTest();
});