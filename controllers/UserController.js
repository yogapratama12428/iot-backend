import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getUser = async (req, res) => {
    try {
        const response = await prisma.user.findMany({
            include: {
                device: true
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({msg: error.message});
    }
}

export const getUserById = async (req, res) => {   
    const { id } = req.params
    try {
        const response = await prisma.user.findUnique({
            where: { id: id},
            include: {
                device: true
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({msg: error.message});
    }
}

export const getUserByEmail = async (req, res) => {
    const { email }  = req.params.email
    
    try {
        const response = await prisma.user.findUnique({
            where: {
                email: email
            },
            include: {
                device: true
            }
        })

        console.log('User:', response); // Tambahkan ini untuk mencetak hasil pencarian ke konsol

        res.status(200).json(email)
    } catch (error) {
        res.status(404).json({msg: error.message});
    }
}

export const createUser = async (req, res) => {   
    const { name, email } = req.body
    try {

        const user = await prisma.user.findUnique({
            where: { email: email},
            include: {
                device: true
            }
        })

        if (user) return res.status(200).json(user)
                    
        const response = await prisma.user.create({
            data: {
                name, 
                email
            }
        })

        const data = await prisma.user.findUnique({
            where: {
                email: email
            },
            include: {
                device: true
            }
        })
        
        return res.status(200).json(data)
        
      
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}

export const updateUser = async (req, res) => {   
    const { id } = req.params
    const { name, email } = req.body

    try {
        const response = await prisma.user.update({
            where: { id: id },
            data: { name, email }
        })
        res.status(201).json({ msg: "User Updated"})
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}

export const deleteUser = async (req, res) => {   
    const { id } = req.params
    try {

        await prisma.device.deleteMany({
            where: {
                authorId: id,
            }
        })
        
        await prisma.user.delete({
            where: { id: id },
            include: {
                device: true
            }
        })
        res.status(201).json({ msg: "User Deleted"})
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}