import { NextFunction, Request, Response } from "express";

import { authService } from "../services/auth.service";


class AuthController {
    public async register(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response<void>> {
        try {
            await authService.register(req.body);

            return res.sendStatus(201);
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
