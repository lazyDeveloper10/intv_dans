import { Router } from 'express';

import { userController } from '../controller';

import { authentication, pagination } from '../../../middleware';

export const userRouter: Router = Router();

userRouter
    .route('/')
    .get(authentication, pagination, userController.findAll)
    .post(authentication, userController.createOne)

userRouter
    .route('/dropdown')
    .get(authentication, userController.findDropdown)

userRouter
    .route('/delete/:id')
    .delete(authentication, userController.deleteOne)

userRouter
    .route('/:id')
    .get(authentication, userController.findById)
    .put(authentication, userController.updateOne)
    .delete(authentication, userController.inactiveOne)
