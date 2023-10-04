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
    const { name, description, value, authorEmail, category, value_string, value_boolean, value_number } = req.body
    try {
        const response = await prisma.device.create({
            data: {
                name, 
                description,
                category,
                value_boolean,
                value_string,
                value_number,
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
    const { name, description, value_string,value_boolean, value_number } = req.body
    
    try {
        const response = await prisma.device.update({
            where: { id: id },
            data: { 
                name,
                description,
                value_boolean,
                value_string,
                value_number,
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

