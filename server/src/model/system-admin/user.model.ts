import joi from 'joi';

export const createUserSchema: joi.ObjectSchema<UserInterface> = joi.object({
    fullName: joi.string().required(),
    username: joi.string().email().required(),
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)).required().messages({
        'string.pattern.base': 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
    }),
    activeFlag: joi.boolean().required(),
}).options({ abortEarly: false, stripUnknown: true });

export const updateUserSchema: joi.ObjectSchema<UserInterface> = joi.object({
    fullName: joi.string().required(),
    username: joi.string().email().required(),
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)).messages({
        'string.pattern.base': 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
    }),
    activeFlag: joi.boolean().required(),
}).options({ abortEarly: false, stripUnknown: true });

export interface UserControllerInterface {
    findAll?: any;
    findById?: any;
    findDropdown?: any;
    createOne?: any;
    updateOne?: any;
    inactiveOne?: any;
    deleteOne?: any;
}

export interface UserInterface {
    id: string;
    fullName?: string;
    username?: string;
    email?: string;
    password?: string;
    activeFlag?: boolean;
    createdByUserId?: string;
    updatedByUserId?: string;
}
