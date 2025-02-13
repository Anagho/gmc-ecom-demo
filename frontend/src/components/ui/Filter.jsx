import { SearchOutlined } from "@ant-design/icons";
// import { productData } from "../../constants/products";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../features/product/productSlice";
import { serverUrl } from "../../utils/helper";
import axios from "axios";

const Filter = ({ productOptions, searchValue, selectedFilter }) => {
  const dispatch = useDispatch();

  // Get the products from the state
  const { products } = useSelector((state) => state.products);
  // console.log(products);

  async function getProducts(category) {
    try {
      const response = await axios.get(
        `${serverUrl}/product/all-products?category=${category}`
      );
      // console.log(response);
      dispatch(setProducts(response.data.products));
    } catch (error) {
      console.log(error);
    }


  }

  // product filter function
  async function handleProductFilter(category) {
    await getProducts(category);

    // if (category === "all") {
    //   dispatch(setProducts(products));
    //   return;
    // }

    // const filteredProducts = products.filter(
    //   (item) => item.product_category === category
    // );

    
  }

  function handleProductSearch(productName) {

    if (typeof productName !== "string") return;

    const searchedProducts = products.filter((item) => {
       if (!item.product_name || typeof item.product_name !== "string")
         return false;
        
      return item.product_name
        .toLowerCase()
        .includes(productName.toLowerCase());
    });
    dispatch(setProducts(searchedProducts));
  }

  return (
    <div className="flex flex-1 items-center max-w-lg border rounded-lg bg-gray-100 shadow-sm overflow-hidden">
      {/* Filter Container */}
      <div className="relative">
        <select
          name=""
          id=""
          value={selectedFilter}
          onChange={(e) => handleProductFilter(e.target.value)}
          className="bg-gray-100 border-none outline-none cursor-pointer px-3"
        >
          {productOptions.map((option) => (
            <option
              className="absolute"
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Input */}
      <input
        type="text"
        value={searchValue}
        onChange={(e) => handleProductSearch(e.target.value)}
        placeholder="What are you shopping for?"
        className="px-2 py-3 font-light text-lg border-none outline-none bg-gray-100 placeholder-gray-500 w-full flex-1"
      />

      {/* Search Icon Container */}
      <div className="border-l-2 border-gray-300 flex items-center justify-center">
        <button
          onClick={handleProductSearch}
          className="p-3 hover:bg-gray-200 active:bg-gray-300 transition-all"
        >
          <SearchOutlined className="text-xl text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default Filter;
