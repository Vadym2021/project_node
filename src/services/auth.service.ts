

import {EActionTokenTypes} from "../enums/action-token-type.enum";
import {EEmailActions} from "../enums/email.enum";
import {ApiError} from "../errors";
import {Action} from "../models/Action.model";


import {User} from "../models/User.model";

import {IUser} from "../types/user.type";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
    public async register(data: IUser): Promise<void> {
        try {
            const hashedPassword = await passwordService.hash(data.password);

            const user = await User.create({...data, password: hashedPassword});

            const actionToken = tokenService.generateActionToken(
                {_id: user._id},
                EActionTokenTypes.Activate
            );
            await Promise.all([
                Action.create({
                    actionToken,
                    tokenType: EActionTokenTypes.Activate,
                    _userId: user._id,
                }),
                emailService.sendMail(data.email, EEmailActions.WELCOME, {
                    name: data.name,
                    actionToken,
                }),
            ]);
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }
}


export const authService = new AuthService();
