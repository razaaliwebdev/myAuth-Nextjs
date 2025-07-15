import User from "@/models/userModel";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import connectDB from "@/database/config";

export const POST = async (request) => {
    try {

        // Database Connection 
        connectDB();
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        const response = NextResponse.json({
            message: "Login Successfully",
        }, { status: 200 });

        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;

    } catch (error) {
        console.log("error while login account", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    };
};