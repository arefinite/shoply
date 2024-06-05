import { Router } from "express"
import { signIn, signOut, signUp } from "../controller/auth.controller"
import { signInValidator, signUpValidator } from "../validator/auth.validator"


export const authRouter = Router()

authRouter.post('/sign-up',signUpValidator ,signUp)
authRouter.post('/sign-in',signInValidator ,signIn)
authRouter.post('/sign-out',signOut)