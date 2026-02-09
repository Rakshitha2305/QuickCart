import connectDB from "@/config/db";
import Product from "@/models/Product";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" });
    }

    const { productId } = await request.json();

    await connectDB();

    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json({
        success: false,
        message: "Product not found",
      });
    }

    // 🔒 OWNER CHECK (VERY IMPORTANT)
    if (product.userId !== userId) {
      return NextResponse.json({
        success: false,
        message: "You are not allowed to delete this product",
      });
    }

    // 🧹 Remove from all users' favourites
    await User.updateMany(
      { favourites: productId },
      { $pull: { favourites: productId } }
    );

    await Product.findByIdAndDelete(productId);

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
