import Joi from "joi";

import { regexConstants } from "../constants";
import { EGenders } from "../enums/user.enum";

export class UserValidator {
  static firstName = Joi.string().min(3).max(30).trim();
  static age = Joi.number().min(1).max(199);
  static gender = Joi.valid(...Object.values(EGenders));
  static email = Joi.string()
    .regex(regexConstants.EMAIL)
    .lowercase()
    .trim()
    .messages({
      "string.empty": "Це поле обов'язкове",
      "string.email": "Адреса електронної пошти має хибний формат",
    });
  static password = Joi.string().regex(regexConstants.PASSWORD).trim();

  static create = Joi.object({
    name: this.firstName.required(),
    age: this.age.required(),
    gender: this.gender.required(),
    email: this.email.required(),
    password: this.password.required(),
  });

  static update = Joi.object({
    name: this.firstName,
    age: this.age,
    gender: this.gender,
  });

  static login = Joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });

  static changePassword = Joi.object({
    oldPassword: this.password.required(),
    newPassword: this.password.required(),
  });

  static forgotPassword = Joi.object({
    email: this.email.required(),
  });

  static setForgotPassword = Joi.object({
    password: this.password.required(),
  });
}
