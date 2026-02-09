"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import ProductCard from "@/components/ProductCard";

const FavouritesPage = () => {
  const { products, favourites } = useAppContext();

  const favouriteProducts = products.filter((product) =>
    favourites?.includes(product._id)
  );

  return (
    <>
      <Navbar />

      <div className="px-6 md:px-16 lg:px-32 py-10 min-h-screen">
        <h2 className="text-lg font-medium mb-6">My Favourites ❤️</h2>

        {favouriteProducts.length === 0 ? (
          <p className="text-gray-500">No favourite products yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {favouriteProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default FavouritesPage;
