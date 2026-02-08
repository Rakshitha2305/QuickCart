import connectDB from "@/config/db";
import Contact from "@/models/Contact";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const { fullname, email, message } = await req.json();

    if (!fullname || !email || !message) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    await Contact.create({ fullname, email, message });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
