import User from "../models/User.js"
import jwt from "jsonwebtoken"

export const isAuthenticated = async (req, res, next) => {
    const token = req.header('token')
    if (!token || token === "null" || token === "undefined")
        return res.status(401).json({ success: false, message: "invalid authorization please login!" })
    try {
        console.log(token)
        const data = jwt.verify(req.header('token'), process.env.JWT_SECRET)
        req.user = data.id
        next()
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
export const isAuthorized = async (req, res, next) => {
    try {

        const user = await User.findById(req.user)
        if (!user)
            return res.status(404).json({ success: false, message: "user not found" })
        if (user.role !== "admin")
            return res.status(400).json({ success: false, message: "role is not authorized" })
        next()
    } catch (error) {
        console.log('2nd')

        return res.json({ success: false, message: error.message })
    }
}