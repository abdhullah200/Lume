import * as z from "zod";

export const SignupValidation = z.object({
    name: z.string().min(2, {message: "Name must be at least 2 characters long."}).max(50, {message: "Too short."}),
    username: z.string().min(2,{message: 'Too short.'}),
    email: z.string().email(),
    password: z.string().min(6, {message: "Password must be at least 6 characters long."}).max(100, {message: "Too long."}),
});

