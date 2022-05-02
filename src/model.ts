import mongoose from 'mongoose'

interface IUser {
    username: string
    password: string
    msgs: string[]
}

const schema = new mongoose.Schema({
    username: String,
    password: String,
    msgs: [String]
})

const model = mongoose.model<IUser>('User', schema)
export default model