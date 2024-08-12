import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetUsersQuery } from '../redux/RegisterApi';

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [productLoading, setProductLoading] = useState(true);
    const [relatedLoading, setRelatedLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch users using Redux API
    const { data: users, error, isLoading, isSuccess } = useGetUsersQuery();
    
    // Get the user data associated with the product
    const user = isSuccess && users.find(user => user.id === product?.userId);

    useEffect(() => {
        const fetchProductDetails = async () => {
            setProductLoading(true);
            try {
                const response = await fetch(`http://localhost:5000/products/${id}`);
                if (!response.ok) {
                    throw new Error('Product not found');
                }
                const productData = await response.json();
                setProduct(productData);

                // Fetch related products if the category exists
                if (productData.category) {
                    const categoryResponse = await fetch(`http://localhost:5000/products?category=${productData.category}`);
                    if (!categoryResponse.ok) {
                        throw new Error('Category products not found');
                    }
                    const categoryData = await categoryResponse.json();
                    setRelatedProducts(categoryData.filter(p => p.id !== id));
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            } finally {
                setProductLoading(false);
                setRelatedLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`);
    };

    if (productLoading) {
        return <p>Loading product details...</p>;
    }

    return (
        <div className="container mx-auto p-6 bg-gray-50 shadow-lg rounded-lg mt-[100px]">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Product Details</h2>
            {product ? (
                <div className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white">
                    <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-gray-600">Price: ${product.price}</p>
                    <p className="text-gray-600">Descriptions: {product.description}</p>
                    {/* {user ? <p className="text-gray-600">Added by: {user.name}</p> : <p className="text-gray-600">User information not available</p>} */}
                </div>
            ) : (
                <p>Product not found</p>
            )}
            <div className="mt-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Related Products</h3>
                {relatedLoading ? (
                    <p>Loading related products...</p>
                ) : (
                    <div className="relative">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {relatedProducts.map((relatedProduct) => (
                                <div
                                    key={relatedProduct.id}
                                    className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white flex flex-col cursor-pointer"
                                    onClick={() => handleProductClick(relatedProduct.id)}
                                >
                                    <h4 className="text-lg font-semibold text-gray-800">{relatedProduct.name}</h4>
                                    <p className="text-gray-600">Price: ${relatedProduct.price}</p>
                                    <p className="text-gray-600">{relatedProduct.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
