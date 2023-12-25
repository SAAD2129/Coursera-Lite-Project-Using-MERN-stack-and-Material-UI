import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isSubscribed: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        default: "user",
    },
    courses: [
        {
            course_img: {
                type: String,
                required: true
            },
            course_id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            course_title: {
                type: String,
                required: true,
            },
            course_category: {
                type: String,
                required: true,
            },
        },
    ],
});
const User = mongoose.model('User', UserSchema);
export default User;
