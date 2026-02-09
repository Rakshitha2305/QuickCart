import connectDB from "@/config/db";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { productId } = await request.json();

    await connectDB();

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
    }

    const isFavourite = user.favourites.includes(productId);

    if (isFavourite) {
      user.favourites.pull(productId);
    } else {
      user.favourites.push(productId);
    }

    await user.save();

    return NextResponse.json({
      success: true,
      message: isFavourite
        ? "Removed from favourites"
        : "Added to favourites",
      isFavourite: !isFavourite,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
