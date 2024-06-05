import { verifyToken } from './../middleware/verifyToken';
import { Router } from 'express';
import { getUserProfile } from '../controller/user.controller';



export const userRouter = Router()



userRouter.get('/',verifyToken,getUserProfile)