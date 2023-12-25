import User from "../models/User.js"

export const updateRole = async (req, res) => {
    try {
        console.log(req.body.id)
        const user = await User.findById(req.body.id);
        if (!user)
            return res.status(404).json({ success: false, message: "resource not found" })
        user.role = req.body.role;
        console.log(user.role,req.body.role)
        await user.save()
        const users = await User.find()
        return res.status(201).json({ success: true, message: "role updated successfully", users })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }

}
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        if (!users)
            return res.status(404).json({ success: false, message: "resource not found" })
        return res.status(200).json({ success: true, message: "users found successfully", users })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }

}