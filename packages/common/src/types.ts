import { z } from 'zod';

export const createUserSchema = z.object({
    fullName: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(3)
});

export const loginUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3)
});

export const createRoomSchema = z.object({
    roomName: z.string().min(3).max(20),
})