// ProductItem.jsx (or similar file)

import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom"; // <-- Ensure Link is imported

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  // Optional: Add scroll-to-top behavior for better UX
  const handleNavigation = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Link
      className="text-gray-700 cursor-pointer"
      to={`/product/${id}`} // 👈 Use the 'id' to create the destination URL
      onClick={handleNavigation}
    >
      <div className="overflow-hidden">
        <img
          className="transition ease-in-out hover:scale-110"
          src={image[0]}
          alt="Product"
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency}&nbsp;
        {price.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </p>
    </Link>
  );
};

export default ProductItem;
