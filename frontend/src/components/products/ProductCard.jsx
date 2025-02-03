import { Button } from "antd";
import React from "react";
import { Link } from "react-router";
import { formatCurrency } from "../../utils/helper";

const ProductCard = ({
  product_image,
  product_id,
  product_price,
  product_name,
}) => {
  return (
    <div className="border w-36 md:w-48 rounded-md hover:shadow-2xl transition-all duration-500">
      <img
        className="h-28 sm:h-40 w-full object-cover"
        src={product_image}
        alt={product_name}
      />
      <div className="p-4">
        <h1 className="font-semibold text-sm lg:font-bold md:text-lg mb-1">
          {product_name}
        </h1>
        <p className="mb-2 text-xs sm:text-sm md:text-lg">
          {formatCurrency(product_price)}
        </p>

        <Link
          to={`/products/${product_id}`}
          className="text-sx sm:text-sm md:text-lg"
        >
          <Button block color="cyan" variant="solid">
            View Item
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
