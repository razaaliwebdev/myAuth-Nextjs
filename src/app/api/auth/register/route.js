import connectDB from "@/database/config";
import User from "@/models/userModel";
import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";


// Database Connection
connectDB();

export const POST = async (request) => {
    try {
        const { name, email, password } = await request.json();

        if (!name || !email || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return NextResponse.json({ message: "User created successfully" }, { status: 201 });

    } catch (error) {
        console.log("error while creating account", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
