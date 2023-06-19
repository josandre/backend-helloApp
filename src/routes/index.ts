import express from "express";
import SampleController from "../controllers/sample";
import {connectionTest} from "../db/connectionManager";

const router = express.Router();

router.get("/hola-mundo", async (_req, res) => {
    const controller = new SampleController();
    const response = await controller.holaMundo();
    return res.send(response);
});



export default router;