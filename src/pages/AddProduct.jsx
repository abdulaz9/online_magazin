import React, { useState, useEffect } from 'react';

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    userId: ''
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/categories');
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, [])

  useEffect(() => {
    const userId = localStorage.getItem('userId'); 
    setProduct(prevProduct => ({ ...prevProduct, userId }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      });
      if (!response.ok) throw new Error('Failed to add product');
      const data = await response.json();
      console.log('Product added:', data);
      setProduct({
        name: '',
        price: '',
        description: '',
        category: '',
        userId: ''
      });
    } catch (error) {
      console.error('There was an error adding the product!', error);
    }
  };

  return (
    <div className="pt-[10%]">
      <div className="max-w-lg mx-auto p-6 bg-gray-50 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Add Product</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Other form fields */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              required
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm"
              placeholder="Enter product name"
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price:</label>
            <input
              type="text"
              id="price"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm"
              placeholder="Enter product price"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category:</label>
            <select
              id="category"
              name="category"
              value={product.category}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm"
              placeholder="Enter product description"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 border border-transparent rounded-lg text-white font-semibold hover:bg-indigo-700"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
