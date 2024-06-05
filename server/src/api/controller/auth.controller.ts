import { NextFunction, Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { validationResult } from 'express-validator'
import createHttpError from 'http-errors'
import { User } from '../model/user.model'
import bcrypt from 'bcryptjs'
import { generateToken } from '../service/generateToken'

// sign up user
export const signUp = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    //check for validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return next(createHttpError(400, { message: errors.array() }))
    const { fullName, email, password } = req.body
    //check for existing user
    const foundUser = await User.findOne({ email })
    if (foundUser && password)
      return next(createHttpError(400, 'User already exists'))
    if (!password && foundUser) {
      const token = generateToken(res, foundUser._id)
      res.status(201).json({ message: 'Sign in Successful', token })
    }
    //hashing the password
    let hashedPassword
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10)
    }
    //create new user
    let newUser
    if (!password) {
      newUser = await User.create({
        fullName,
        email,
      })
    }
    if (password) {
      newUser = await User.create({
        fullName,
        email,
        password: hashedPassword,
      })
    }
    
    if (!newUser) return next(createHttpError(400, 'User can not be created'))
    //generate token
    const token = generateToken(res, newUser._id.toString())

    res.status(201).json({ message: 'Sign up Successful', token, fullName:newUser.fullName, email: newUser.email })
  }
)

// sign in user
export const signIn = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    //check for validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return next(createHttpError(400, { message: errors.array() }))

    const { email, password } = req.body

    //check for existing user
    const user = await User.findOne({ email })
    if (!user) return next(createHttpError(400, 'User not found'))
    //match the password
    const isMatchPassword = await bcrypt.compare(password, user.password!)
    if (!isMatchPassword)
      return next(createHttpError(400, 'Invalid credentials'))
    //generate token
    const token = generateToken(res, user._id.toString())
    res.status(200).json({ message: 'Sign In Successful', token })
  }
)

// sign out user
export const signOut = asyncHandler(async () => {})
