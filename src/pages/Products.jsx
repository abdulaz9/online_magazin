import React, { useEffect, useState } from 'react';
import { FaShoppingBasket } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default function Products({ onAddToBasket }) {
    const [products, setProducts] = useState([]);
    const [clickedProducts, setClickedProducts] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    const handleBasketClick = (product) => {
        if (clickedProducts[product.id]) {
            alert('Siz allaqachon bu mahsulotni olib bo\'ldingiz.');
        } else {
            setClickedProducts((prevClicked) => ({
                ...prevClicked,
                [product.id]: true,
            }));
            
            const savedBasket = localStorage.getItem('basket');
            const basketItems = savedBasket ? JSON.parse(savedBasket) : [];
            const updatedBasket = [...basketItems, product];
            localStorage.setItem('basket', JSON.stringify(updatedBasket));
            
            if (onAddToBasket) {
                onAddToBasket(product);
            }
        }
    };

    const handleProductClick = (product) => {
        navigate(`/product/${product.id}`);
    };

    return (
        <div className="container mx-auto p-6 bg-gray-50 shadow-lg rounded-lg mt-[100px]">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex justify-between">Products <span>All: {products.length}</span></h2>
            <div className="space-y-4">
                {products.map((product) => (
                    <div key={product.id} className="border cursor-pointer border-gray-300 rounded-lg p-4 shadow-sm bg-white flex items-center">
                        <div onClick={() => handleProductClick(product)} className='w-[95%] border-r-2'>
                            <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                            <p className="text-gray-600">Narxi: ${product.price}</p>
                            <p className="text-gray-600">{product.description}</p>
                        </div>
                        <FaShoppingBasket
                            className='w-[90px] text-[30px] cursor-pointer' 
                            onClick={() => handleBasketClick(product)} 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
