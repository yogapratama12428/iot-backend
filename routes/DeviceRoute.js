import express from "express"
import { createDevice, getDevice, getDeviceById, updateDevice, deleteDevice } from "../controllers/DeviceController.js"

const router = express.Router()

router.get('/device', getDevice)
router.get('/device/:id', getDeviceById)
router.post('/device', createDevice)
router.put('/device/:id', updateDevice)
router.delete('/device/:id', deleteDevice)

export default router