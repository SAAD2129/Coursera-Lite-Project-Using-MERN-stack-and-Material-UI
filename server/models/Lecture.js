import mongoose from "mongoose";

const LectureSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    video_url: {
        type: String,
        required: true,
    },
    thumbnail: {
        public_id: {
            type: String,
            // required: true,
        },
        secure_url: {
            type: String,
            // required: true,
        },
    },
    views: {
        type: Number,
        default: 0,
    },
    likes: {
        type: Number,
        default: 0,
    },
    comments: [
        {
            user: {
                type: String,
                required: true,
            },
            user_image_url: {
                type: String,
            },
            text: {
                type: String,
                required: true,
            },
        },
    ],
});
const Lecture = mongoose.model('Lecture', LectureSchema);
export default Lecture;
