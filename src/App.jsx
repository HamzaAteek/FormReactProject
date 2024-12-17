import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

//معالجة الأخطاء
const schema = z.object({
  productName: z
    .string()
    .min(3, { message: "must enter more than 3 charecter" })
    .max(30, { message: "must enter less than 30 charecter" }),
  productPrice: z
    .number({ invalid_type_error: "Please enter the price" })
    .min(1, { message: "must enter more than 0" }),
});

//بداية الكوبونانت
function App() {
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", price: 1000 },
    { id: 2, name: "Phone", price: 500 },
    { id: 3, name: "Headphones", price: 150 },
  ]);

  //formState
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  //دالة إضافة منتج بناء على القيم المدخلة
  const addProduct = (data) => {
    const newProduct = {
      id: products.length + 1,
      name: data.productName,
      price: data.productPrice,
    };
    setProducts([...products, newProduct]);
    reset();
  };

  //دالة زيادة السعر 50
  const increasePrice = (id) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, price: product.price + 50 } : product
      )
    );
  };

  //دالة حذف العنصر
  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  //ناتج الدالة
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        {/*بداية الفورم*/}
        <form onSubmit={handleSubmit(addProduct)} className="mb-6 px-36">
          <div>
            <div className="mb-3">
              <label htmlFor="productName">product Name</label>
              <input
                id="productName"
                type="text"
                placeholder="Enter product name"
                {...register("productName")}
                className="w-full border border-gray-300 rounded-md mt-1 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.productName && (
                <span className="text-red-500 text-sm">
                  {errors.productName.message}
                </span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="productPrice">productPrice</label>
              <input
                id="productPrice"
                type="number"
                placeholder="Enter product price"
                {...register("productPrice", { valueAsNumber: true })}
                className="w-full border border-gray-300 rounded-md mt-1 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.productPrice && (
                <span className="text-red-500 text-sm">
                  {errors.productPrice.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded w-40 hover:bg-green-600 transition duration-300"
            >
              Add Product
            </button>
          </div>
        </form>
        {/*نهاية الفورم*/}

        {/*الجزء الخاص بعرض المنتجات*/}
        {products.map((product) => (
          <div
            key={product.id}
            className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-md p-2 mb-2 shadow-sm"
          >
            <span className="text-lg font-medium text-gray-700">
              {product.name} -{" "}
              <span className="text-blue-600">{product.price}</span>
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => increasePrice(product.id)}
                className="bg-blue-500 text-sm text-white py-1 px-3 rounded hover:bg-blue-600 transition duration-300"
              >
                Increase Price
              </button>
              <button
                onClick={() => deleteProduct(product.id)}
                className="bg-red-500 text-sm text-white py-1 px-3 rounded hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
