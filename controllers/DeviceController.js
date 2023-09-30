import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getDevice = async ( req, res ) => {
    try {
        const response = await prisma.device.findMany()
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({msg: error.message});
    }
}

export const getDeviceById = async ( req, res ) => {
    const { id } = req.params
    try {
        const response = await prisma.device.findUnique({
            where: { id: id }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({msg: error.message});
    }
}

export const createDevice = async ( req, res ) => {
    const { title, description, value, authorEmail } = req.body
    try {
        const response = await prisma.device.create({
            data: {
                title, 
                description,
                value,
                author: {
                    connect: {
                        email: authorEmail
                    }
                }
            }
        })
        res.status(201).json({ msg: "Device Created"})
    } catch (error) {
        res.status(401).json({msg: error.message});
    }
}

export const updateDevice = async ( req, res ) => {
    const { id } = req.params
    const { title, description, value, authorEmail } = req.body
    
    try {
        const response = await prisma.device.update({
            where: { id: id },
            data: { 
                title: title, 
                description: description, 
                value: value
            }
        })
        res.status(201).json(response)
    } catch (error) {
        res.status(401).json({msg: error.message});
    }
}

export const deleteDevice = async ( req, res ) => {
    const { id } = req.params
    try {
        const response = await prisma.device.delete({
            where: { id: id }
        })
        res.status(201).json({ msg: "Device Deleted"})
    } catch (error) {
        res.status(401).json({msg: error.message});
    }
}

