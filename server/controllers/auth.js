import User from "../models/User.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import Course from "../models/Course.js"
const options = {
    expires: new Date(Date.now() + 15 + 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: false,
    sameSite: "none",
}
export const loginUser = async (req, res) => {
    const { loginId, password } = req.body
    try {
        const user = await User.findOne({ $or: [{ email: loginId }, { username: loginId }] })
        console.log(user)
        if (!user)
            return res.status(400).json({ success: false, message: "invalid credentials" })

        const match = await bcryptjs.compare(password, user.password)
        if (!match)
            return res.status(400).json({ success: false, message: "invalid credentials" })
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15d' })
        res.cookie('token', token, options).json({ success: true, message: "login successful", user, token })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}
export const registerUser = async (req, res) => {

    try {
        let user = await User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] })
        if (user)
            return res.status(400).json({ success: false, message: "try different credentials" })
        req.body.password = await bcryptjs.hash(req.body.password, 10)
        user = await User.create(req.body)

        if (!user)
            return res.status(400).json({ success: false, message: "some error occurred" })
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' })
        return res.cookie('token', token, options).json({ success: true, message: "user registered successfully", user, token })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const addToPlaylist = async (req, res) => {
    const courseId = req.header('course-id')
    try {
        const course = await Course.findById(courseId)
        const user = await User.findById(req.user)
        if (!user)
            return res.status(404).json({ success: false, message: "user not found" })
        let check = false
        user.courses.forEach((course) => {
            if (course.course_id.toString() === courseId)
                check = true
        })
        if (check)
            return res.status(201).json({ success: true, message: "already added to playlist" })
        user.courses.push({
            course_category: course.category,
            course_img: course.category,
            course_id: course._id,
            course_title: course.title,
        })
        await user.save()
        return res.status(201).json({ success: true, message: "added to playlist" })
    } catch (error) {
        console.log('error')
        res.status(500).json({ success: false, message: error.message })

    }
}
export const removeFromPlaylist = async (req, res) => {
    try {
        const courseId = req.header('course-id')
        if (!courseId)
            return res.status(401).json({ success: false, message: "invalid resource" })
        const user = await User.findById(req.user)
        if (!user)
            return res.status(404).json({ success: false, message: "user not found" })
        let newCourses = []
        user.courses.forEach((course) => {
            if (course.course_id.toString() !== courseId)
                newCourses.push(course)
        })
        user.courses = newCourses
        await user.save()
        return res.status(201).json({ success: true, message: "removed from playlist" })
    } catch (error) {
        console.log('error')
        res.status(500).json({ success: false, message: error.message })

    }
}
export const me = async (req, res) => {
    try {
        const data = jwt.verify(req.header('token'), process.env.JWT_SECRET)
        const user = await User.findById(data.id).select('-password')
        if (!user)
            return res.status(400).json({ success: false, message: "user not found" })
        return res.json({ success: true, message: "user found successfully", user })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}
export const logout = async (req, res) => {
    try {
        return res.cookie('token', null).json({ success: true, message: "user logout successfully" })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const changePassword = async (req, res) => {
    try {

        const user = await User.findById(req.user)
        if (!user)
            return res.status(400).json({ success: false, message: "user not found" })

        const match = await bcryptjs.compare(req.body.oldPassword, user.password)
        if (!match) {
            return res.status(400).json({ success: false, message: "old password is wrong", user })
        }
        user.password = await bcryptjs.hash(req.body.newPassword, 10)
        await user.save()
        return res.json({ success: true, message: "password updated successfully", user })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

// * SUBSCRIBE => USER ID and COURSE_ID REQUIRED
export const subscribe = async (req, res) => {

    try {
        const user = await User.findById(req.user);
        if (!user)
            return res.json({ success: false, message: "user not found", })
        if (user.isSubscribed) {
            user.isSubscribed = false
            await user.save()
            return res.json({ success: true, message: "unsubscribed successfully", user })
        }
        else {
            user.isSubscribed = true
            await user.save()
            return res.json({ success: true, message: "subscribed successfully", user })
        }

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}