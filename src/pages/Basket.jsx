import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Basket() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const savedBasket = localStorage.getItem('basket');
        const basketItems = savedBasket ? JSON.parse(savedBasket) : [];
        setItems(basketItems);
    }, []);

    const handleRemoveFromBasket = (productId) => {
        const updatedItems = items.filter(item => item.id !== productId);
        setItems(updatedItems);

        // Update localStorage
        localStorage.setItem('basket', JSON.stringify(updatedItems));
    };

    return (
        <div className='container mx-auto text-center relative'>
            {items.length > 0 ? (
                <div>
                    <h2 className='pt-36 pb-10 text-2xl font-bold flex justify-between'>Savatdagi mahsulotlar <span>Hammasi: {items.length}ta</span></h2>
                    <div className='space-y-4'>
                        {items.map((item) => (
                            <div key={item.id} className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white flex justify-between items-center" >
                                <div className='flex-1 border-r-2 text-left pr-4 w-[95%]'>
                                    <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                                    <p className="text-gray-600">Narxi: ${item.price}</p>
                                    <p className="text-gray-600">{item.description}</p>
                                </div>
                                <FaTrash className='text-2xl text-red-600 cursor-pointer w-[90px]' onClick={() => handleRemoveFromBasket(item.id)} aria-label={`Remove ${item.name} from basket`} />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <h2 className='pt-36 pb-2 text-2xl font-bold'>Savatda mahsulotlar yo'q</h2>
                    <p className='pb-8'>Mahsulotlarni ko'rish uchun pastdagi tugmani bosing</p>
                    <Link to='/products' className='px-4 py-2 bg-gray-800 text-white rounded-lg'>
                        Mahsulotlar
                    </Link>
                </div>
            )}
        </div>
    );
}
