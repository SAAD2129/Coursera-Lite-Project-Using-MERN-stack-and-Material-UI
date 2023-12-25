import { Router } from "express"
import { getAllUsers, updateRole } from "../controllers/admin.js"
import { isAuthenticated, isAuthorized } from "../helpers/authentication.js"
const router = Router()

router.post('/role', updateRole)
router.get('/users', isAuthenticated,isAuthorized,getAllUsers)

export default router