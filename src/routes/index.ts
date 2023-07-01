import express from "express";
import SampleController from "../controllers/sample";
import UserController from "../controllers/userController";


const router = express.Router();

router.get("/hola-mundo", async (_req, res) => {
    const controller = new SampleController();
    const response = await controller.holaMundo();
    return res.send(response);
});


router.get("/login", async (_req, res) => {
    const userController = new UserController();
    const response = await userController.login(_req.query.email, _req.query.password);

    if(response) {
        return res.send(response);
    }


    return res.status(400).json({error: "Información invalida"})

})


export default router;