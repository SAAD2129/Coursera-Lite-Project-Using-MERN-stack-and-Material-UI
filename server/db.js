import mongoose from "mongoose";

const connectToDb = () => {

    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log(process.env.MONGO_URI + ' connected')
    }).catch((err) => {
        console.log(err.message)
    })
}

export default connectToDb