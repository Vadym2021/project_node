import { Router } from "express";

import { authController } from "../controllers/auth.controller";

import { commonMiddleware } from "../middlewares";


import { UserValidator } from "../validators";

const router = Router();

router.post(
    "/register",
    commonMiddleware.isBodyValid(UserValidator.create),
    authController.register
);


export const authRouter = router;
