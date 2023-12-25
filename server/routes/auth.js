import { Router } from "express"
import { addToPlaylist, changePassword, loginUser, logout, me, registerUser, removeFromPlaylist, subscribe } from "../controllers/auth.js"
import { isAuthenticated } from "../helpers/authentication.js"
const router = Router()

router.post('/login', loginUser)
router.post('/register', registerUser)
router.get('/logout', logout)
router.get('/me', me)
router.put('/password', isAuthenticated, changePassword)
router.put('/addtoplaylist', isAuthenticated, addToPlaylist)
router.delete('/rmfromplaylist', isAuthenticated, removeFromPlaylist)

// -- /api/v2/auth/subscribe
router.get('/subscribe', isAuthenticated, subscribe)

export default router