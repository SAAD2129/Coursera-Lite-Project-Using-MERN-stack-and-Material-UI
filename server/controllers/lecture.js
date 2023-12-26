import Lecture from "../models/Lecture.js"
import Course from "../models/Course.js"
import User from "../models/User.js"

// * LECTURE CRUD USER ID REQUIRED
export const addLecture = async (req, res) => {

    try {
        const id = req.header('course-id')
        req.body.courseId = id
        const lecture = await Lecture.create(req.body);
        if (!lecture)
            return res.json({ success: false, message: "some error occurred while adding lecture", })
        if (id) {
            const course = await Course.findById(id);
            course.noOfVideos += 1;
            await course.save()
        }
        return res.json({ success: true, message: "Lecture added successfully", lecture })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }

}
// * GET LECTURE lecture-id REQUIRED
export const getLecture = async (req, res) => {

    try {
        const id = req.header('lecture-id');
        const lecture = await Lecture.findById(id);
        if (!lecture)
            return res.status(404).json({ success: false, message: "resource not found!", })
        return res.json({ success: true, message: "Lecture found successfully", lecture })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }

}
// * UPDATE LECTURE lecture-id REQUIRED

export const updateLecture = async (req, res) => {

    try {
        const id = req.header('lecture-id');
        const lecture = await Lecture.findById(id);
        const { title, description, video_url } = req.body;
        if (!lecture)
            return res.status(404).json({ success: false, message: "resource not found", })
        if (title)
            lecture.title = title;
        if (description)
            lecture.description = description;
        if (video_url)
            lecture.video_url = video_url;
        await lecture.save()
        return res.status(201).json({ success: true, message: "Lecture updated successfully", lecture })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }

}
// * DELETE LECTURE lecture-id REQUIRED
export const deleteLecture = async (req, res) => {

    try {
        const id = req.header('lecture-id');
        const lecture = await Lecture.findByIdAndDelete(id);
        if (!lecture)
            return res.status(404).json({ success: false, message: "resource not found", })
        const course = await Course.findById(lecture.courseId);
        if (!course)
            return res.status(404).json({ success: false, message: "resource not found", })
        course.noOfVideos -= 1;
        await course.save()
        return res.json({ success: true, message: "Lecture deleted successfully", lecture })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }

}

// Get all lectures for a particular course
export const getAllLectures = async (req, res) => {

    try {
        const id = req.header('course-id')
        if (!id)
            return res.status(400).json({ success: false, message: "invalid access", })
        const lectures = await Lecture.find({ courseId: id });
        if (!lectures)
            return res.json({ success: false, message: "lectures not found", })
        return res.json({ success: true, message: "lectures found successfully", lectures })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }

}
// Delete all lectures for a particular course
export const deleteAllLectures = async (req, res) => {

    try {
        const id = req.header('course-id')
        if (!id)
            return res.status(400).json({ success: false, message: "invalid access", })
        const lectures = await Lecture.deleteMany({ courseId: id });

        if (!lectures)
            return res.json({ success: false, message: "lectures not found", })
        const course = await Course.findById(id);
        course.noOfVideos = 0;
        await course.save()
        return res.json({ success: true, message: "lectures deleted successfully", lectures })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }

}

// * COMMENT CRUD USER ID REQUIRED
export const postComment = async (req, res) => {

    try {
        const id = req.header('lecture-id')
        const lecture = await Lecture.findById(id);
        if (!lecture)
            return res.json({ success: false, message: "lecture not found", })
        lecture.comments.push(req.body)
        await lecture.save()
        return res.json({ success: true, message: "comment posted successfully", lecture })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }

}

// todo GET COMMENT
// todo UPDATE COMMENT
// todo DELETE COMMENT

