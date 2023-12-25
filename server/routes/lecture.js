import { Router } from "express"
import { addLecture, deleteAllLectures, deleteLecture, getAllLectures, getLecture, postComment, updateLecture } from "../controllers/lecture.js"
const router = Router()

// LECTURE CRUD USER ID REQUIRED
router.post('/lecture', addLecture)
router.get('/lecture', getLecture)
router.put('/lecture', updateLecture)
router.delete('/lecture', deleteLecture)

// LECTURES CRUD USER ID REQUIRED
router.get('/lectures', getAllLectures)
router.delete('/lectures', deleteAllLectures)
// todo DELETE ALL LECTURES

// Comments
router.post('/comment', postComment)

export default router