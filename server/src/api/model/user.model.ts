import { model, Schema } from 'mongoose'
import { UserType } from '../type/user.type'

const userSchema = new Schema<UserType>(
  {
    fullName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

export const User = model<UserType>('User', userSchema)
