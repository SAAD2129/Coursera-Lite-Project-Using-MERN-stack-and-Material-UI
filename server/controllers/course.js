import Course from "../models/Course.js"

export const addCourse = async (req, res) => {

    try {
        req.body.author = req.user
        console.log(req.body)
        const course = await Course.create(req.body);
        if (!course)
            return res.json({ success: false, message: "some error occurred while adding course", })
        return res.json({ success: true, message: "Course added successfully", course })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }

}
export const readCourse = async (req, res) => {

    try {
        let id = req.header('id')
        console.log(id)
        const course = await Course.findById(id);

        if (!course)
            return res.json({ success: false, message: "Course not found" })
        return res.json({ success: true, message: "Course found successfully", course })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }

}
export const updateCourse = async (req, res) => {

    try {
        let id = req.header('id')
        const course = await Course.findById(id);
        if (!course)
            return res.json({ success: false, message: "Course not found", })
        if (req.body.title) {
            course.title = req.body.title
        }
        if (req.body.description) {
            course.description = req.body.description
        }
        if (req.body.category) {
            course.description = req.body.category
        }
        await course.save()
        return res.json({ success: true, message: "Course updated successfully", course })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }

}
export const deleteCourse = async (req, res) => {

    try {
        let id = req.header('course-id')
        const course = await Course.findByIdAndDelete(id);
        if (!course)
            return res.status(404).json({ success: false, message: "course not found invalid id", })
        return res.json({ success: true, message: "Course deleted successfully", course })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}
// GET ALL COURSES
export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        if (!courses)
            return res.json({ success: false, message: "some error occurred while finding course", })
        return res.json({ success: true, message: "Courses found successfully", courses })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }

}
// GET ALL COURSES
export const deleteCourses = async (req, res) => {

    try {

        const courses = await Course.deleteMany();
        if (!courses)
            return res.json({ success: false, message: "some error occurred while finding course", })
        return res.json({ success: true, message: "All courses deleted successfully", courses })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }

}