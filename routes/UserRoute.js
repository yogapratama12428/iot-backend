import express from "express"
import { getUser, getUserById, createUser, deleteUser, updateUser, getUserByEmail } from "../controllers/UserController.js"

const router = express.Router()

router.get('/user', getUser)
router.get('/user/:id', getUserById)
router.get(`/user/email`, getUserByEmail)
router.post('/user', createUser)
router.put('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

export default router