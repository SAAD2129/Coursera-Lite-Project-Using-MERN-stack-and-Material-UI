import express, { json } from "express"
import cors from "cors"
import dotenv from "dotenv"
import r1 from "./routes/auth.js"
import r2 from "./routes/course.js"
import r3 from "./routes/lecture.js"

// admin
import r4 from "./routes/admin.js"
import connectToDb from "./db.js"
dotenv.config()

const app = express()

app.use(cors())
app.use(json())

const PORT = process.env.PORT || 5000


// Connecting to database
connectToDb();

app.use('/api/v1/auth', r1)
app.use('/api/v2/', r2)
app.use('/api/v3/', r3)
app.use('/api/v4/admin', r4)

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})