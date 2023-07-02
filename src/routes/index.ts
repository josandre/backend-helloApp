import express from "express";
import SampleController from "../controllers/sample";
import UserController from "../controllers/userController";
import registerController from "../controllers/registerController";
import RegisterController from "../controllers/registerController";


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

router.post("/register", async (_req, res) =>{
    const registerController = new RegisterController();
    const response = await registerController.register(_req.body);

    if (response){
        return res.send(response);
    }

    return res.status(400).json({error: "No se pudo registrar"})
})


export default router;