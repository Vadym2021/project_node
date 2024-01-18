import * as jwt from "jsonwebtoken";

import { configs } from "../configs/config";
import { EActionTokenTypes } from "../enums/action-token-type.enum";

import { ApiError } from "../errors";
import { ITokenPayload } from "../types/token.type";

class TokenService {

    public generateActionToken(
        payload: ITokenPayload,
        tokenType: EActionTokenTypes
    ): string {
        try {
            let secret: string;

            switch (tokenType) {
                case EActionTokenTypes.Forgot:
                    secret = configs.JWT_FORGOT_SECRET;
                    break;

                case EActionTokenTypes.Activate:
                    secret = configs.JWT_ACTIVATE_SECRET;
                    break;
            }

            return jwt.sign(payload, secret, {expiresIn: "7d"});
        } catch (e) {
            throw new ApiError("Token not valid", 401);
        }
    }

}

export const tokenService = new TokenService();
