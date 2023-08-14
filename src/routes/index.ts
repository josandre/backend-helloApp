import express from "express";
import UpdateUserController from "../controllers/userControllerUpdate";
import UserController from "../controllers/userController";
import RegisterController from "../controllers/registerController";
import uploadFile = require("../middleware/Upload");
import ConversationController from "../controllers/ConversationController";
import MessageController from "../controllers/MessageController";

const router = express.Router();

router.get("/login", async (_req, res) => {
    const userController = new UserController();
    const response = await userController.login(_req.query.email, _req.query.password);

    if(response) {
        return res.send(response);
    }

    return res.status(400);
})

router.post("/register", uploadFile.single('avatar'),async (_req, res) =>{
    const registerController = new RegisterController();
    const response = await registerController.register(_req);
    
    if (response){
        return res.send(response);
    }
    return res.status(400);
})

router.post("/message", async (req, res) => {
    const messageController = new MessageController();
    const response = await messageController.createMessage(req.body);

    return response ? res.send(response) : res.status(400);
})

router.put("/users", uploadFile.single('avatar'), async (req, res) => {

    const updateUserController = new UpdateUserController();
    const response = await updateUserController.updateUser(req);

    if (response){
        return res.send(response);
    }
    return res.status(400);
})

router.get("/conversations", async (req,res) => {
    const conversationsController = new ConversationController();
    const response = await  conversationsController.getConversationsByUserId(Number(req.query.id));

    if(response){
        return res.send(response);
    }

    return res.status(400);
})

export default router;