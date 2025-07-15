import { NextResponse } from "next/server";
import connectDB from "@/database/config";


export const GET = async () => {
    try {

        // Database Connection
        await connectDB();

        const response = NextResponse.json(
            {
                message: "Lgout Successfully",
            },
            { status: 200 }
        );

        response.cookies.set("token", "", { httpOnly: true, expires: new Date(0), path: "/" });

        return response;

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Something went wrong" },
            { stutus: 500 }
        )
    }
};

