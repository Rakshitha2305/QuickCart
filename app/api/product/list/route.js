import connectDB from "@/config/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search");
    const category = searchParams.get("category");

    let query = {};

    // 🔍 Search by product name
    if (search) {
  query.$or = [
    { name: { $regex: search, $options: "i" } },
    { category: { $regex: search, $options: "i" } }
  ];
}


    // 🧩 Filter by category
    if (category && category !== "all") {
      query.category = category;
    }

    const products = await Product.find(query).sort({ date: -1 });

    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
