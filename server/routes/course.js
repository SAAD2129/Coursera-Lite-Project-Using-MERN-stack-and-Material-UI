import { Router } from "express"
import { addCourse, deleteCourse, deleteCourses, getCourses, readCourse, updateCourse } from "../controllers/course.js"
import { isAuthenticated, isAuthorized } from "../helpers/authentication.js"
const router = Router()

// -- /api/v2/course
// * Creating ==> require fields
router.get('/course', readCourse)
// ADMIN ACCESS
// * Updating ==> requires id
router.post('/course', isAuthenticated, isAuthorized, addCourse)
// * Reading ==> requires id
router.put('/course', isAuthenticated, isAuthorized, updateCourse)
// * Deleting ==> requires id
router.delete('/course', isAuthenticated, isAuthorized, deleteCourse)

// ADMIN ACCESS
// -- /api/v2/courses
router.get('/courses', getCourses)
router.delete('/courses',isAuthenticated, isAuthorized, deleteCourses)
// todo -- /api/v2/course/:id/lecture 


export default router