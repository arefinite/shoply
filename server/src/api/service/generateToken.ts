import jwt from 'jsonwebtoken'
import { config } from '../../config/config'
import { Response } from 'express'

export const generateToken = (res: Response, id: string) => {
  //generate token
  const token = jwt.sign({ userId: id }, config.JWT_SECRET_KEY as string, {
    expiresIn: '1d',
  })

  return token
}
