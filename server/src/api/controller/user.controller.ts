import asyncHandler from 'express-async-handler';
import { NextFunction, Request, Response } from 'express'
import { User } from '../model/user.model'

// get user profile
export const getUserProfile = asyncHandler(
  (req: Request, res: Response, next: NextFunction) => {
    const id = req.userId
    const user = User.findById(id)
    res.status(200).json(user)
  }
)
