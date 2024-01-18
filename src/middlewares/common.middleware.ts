import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

//import { ApiError } from "../errors";
import { UserValidator } from "../validators";

class CommonMiddleware {
  public isIdValid(req: Request, res: Response, next: NextFunction) {
    try {
      req.params;
      const {} = UserValidator.create.validate(req.body);
      //if (error){
      // throw new ApiError (error.message, 400)
      //}
    } catch (e) {
      next(e);
    }
  }

  public isBodyValid(validator: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const { error, value } = validator.validate(req.body);
        if (error) {
          //throw new ApiError(error.message, 400);
        }

        req.body = value;
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const commonMiddleware: CommonMiddleware = new CommonMiddleware();
