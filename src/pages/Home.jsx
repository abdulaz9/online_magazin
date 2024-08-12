import React, { useState, useEffect } from 'react';
import { FaShoppingBasket } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [products, setProducts] = useState([]);
  const [clickedProducts, setClickedProducts] = useState({});

  const navigate = useNavigate();

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
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      const fetchProducts = async () => {
        try {
          const response = await fetch(`http://localhost:5000/products?category=${selectedCategoryId}`);
          if (!response.ok) throw new Error('Failed to fetch products');
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
      fetchProducts();
    }
  }, [selectedCategoryId]);

  const handleBasketClick = (product) => {
    if (clickedProducts[product.id]) {
      alert('Siz allaqachon bu mahsulotni olib bo\'ldingiz.');
    } else {
      setClickedProducts((prevClicked) => ({
        ...prevClicked,
        [product.id]: true,
      }));
      onAddToBasket(product);
    }
  };

  const onAddToBasket = (product) => {
    const savedBasket = localStorage.getItem('basket');
    const basket = savedBasket ? JSON.parse(savedBasket) : [];
    const updatedBasket = [...basket, product];
    localStorage.setItem('basket', JSON.stringify(updatedBasket));
    navigate('/my-basket');
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="pt-[10%]">
      <div className="container mx-auto p-6 bg-gray-50 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Kategoriyani tanlang</h2>
        <ul className="space-y-4">
          {categories.map((category) => (
            <li
              key={category.id}
              className={`p-4 border border-gray-300 rounded-lg cursor-pointer ${selectedCategoryId === category.id ? 'bg-gray-200' : ''}`}
              onClick={() => setSelectedCategoryId(category.id)}
            >
              <h4 className="text-lg font-semibold text-gray-800">{category.name}</h4>
            </li>
          ))}
        </ul>

        {selectedCategoryId && (
          <div className="mt-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex justify-between">
              Tanlangan kategoriya bo'yicha <span>Hammasi: {products.length}ta</span>
            </h2>
            <ul className="space-y-4">
              {products.map((product) => (
                <li key={product.id} className="p-4 border border-gray-300 rounded-lg flex items-center justify-between">
                  <div onClick={() => handleProductClick(product)} className="w-[95%] border-r-2 cursor-pointer">
                    <h4 className="text-lg font-semibold text-gray-800">{product.name}</h4>
                    <p className="text-sm text-gray-600">{product.description}</p>
                    <p className="text-sm text-gray-600">Price: ${product.price}</p>
                  </div>
                  <FaShoppingBasket
                    className="w-[50px] h-[30px] text-blue-600 cursor-pointer"
                    onClick={() => handleBasketClick(product)}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
