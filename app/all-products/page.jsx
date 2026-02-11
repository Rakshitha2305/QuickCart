'use client'
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";


const AllProducts = () => {

    const { products ,fetchProductData} = useAppContext();
    const searchParams = useSearchParams();


useEffect(() => {
  const searchQuery = searchParams.get("search") || "";
  const categoryQuery = searchParams.get("category") || "all";

  fetchProductData(searchQuery, categoryQuery);
}, [searchParams]);


    return (
        <>
          <Navbar />
            <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
            {/* Heading */}
              <div className="flex flex-col items-end pt-12">
                 <p className="text-2xl font-medium">All products</p>
                 <div className="w-16 h-0.5 bg-orange-600 rounded-full"></div>
              </div>

            {/* 🧩 PRODUCTS GRID */}
              {products.length === 0 ? (
                <p className="text-gray-500 mt-10">No products found</p>
                ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-12 pb-14 w-full">
                  {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                  ))}
                </div>
           )}
          </div>
          <Footer />
        </>
    );
};

export default AllProducts;
