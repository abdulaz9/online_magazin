import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { Navigate } from 'react-router-dom';

export default function Admin() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [users, setUsers] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        description: '',
        category: ''
    });
    const [newCategory, setNewCategory] = useState('');
    const [editCategoryId, setEditCategoryId] = useState(null);
    const [editedCategoryName, setEditedCategoryName] = useState('');
    const [editProduct, setEditProduct] = useState(null);
    const [editProductDetails, setEditProductDetails] = useState({
        name: '',
        price: '',
        description: '',
        category: ''
    });
    const [editUser, setEditUser] = useState(null);
    const [editUserDetails, setEditUserDetails] = useState({
        name: '',
        phone: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productResponse = await fetch('http://localhost:5000/products');
                if (!productResponse.ok) throw new Error('Failed to fetch products');
                const productsData = await productResponse.json();
                setProducts(productsData);

                const categoryResponse = await fetch('http://localhost:5000/categories');
                if (!categoryResponse.ok) throw new Error('Failed to fetch categories');
                const categoriesData = await categoryResponse.json();
                setCategories(categoriesData);

                const userResponse = await fetch('http://localhost:5000/registerUser');
                if (!userResponse.ok) throw new Error('Failed to fetch users');
                const usersData = await userResponse.json();
                setUsers(usersData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const checkPassword = () => {
            const password = prompt("Parolni kiriting");
            if (password !== '1010') {
                setRedirect(true);
            } else {
                alert('Xush kelibsiz!');
            }
        };

        checkPassword();
    }, []);

    if (redirect) {
        return <Navigate to="/" />;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({
            ...newProduct,
            [name]: value
        });
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            });
            if (!response.ok) throw new Error('Failed to add product');
            const product = await response.json();
            setProducts((prevProducts) => [...prevProducts, product]);
            setNewProduct({
                name: '',
                price: '',
                description: '',
                category: ''
            });
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await fetch(`http://localhost:5000/products/${productId}`, {
                method: 'DELETE'
            });
            setProducts((prevProducts) => prevProducts.filter(product => product.id !== productId));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: newCategory })
            });
            if (!response.ok) throw new Error('Failed to add category');
            const category = await response.json();
            setCategories((prevCategories) => [...prevCategories, category]);
            setNewCategory('');
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    const handleEditCategory = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/categories/${editCategoryId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: editedCategoryName })
            });
            if (!response.ok) throw new Error('Failed to update category');
            const updatedCategory = await response.json();
            setCategories((prevCategories) =>
                prevCategories.map(category =>
                    category.id === updatedCategory.id ? updatedCategory : category
                )
            );
            setEditCategoryId(null);
            setEditedCategoryName('');
        } catch (error) {
            console.error('Error editing category:', error);
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        try {
            await fetch(`http://localhost:5000/categories/${categoryId}`, {
                method: 'DELETE'
            });
            setCategories((prevCategories) => prevCategories.filter(category => category.id !== categoryId));
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const handleEditProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/products/${editProduct}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editProductDetails)
            });
            if (!response.ok) throw new Error('Failed to update product');
            const updatedProduct = await response.json();
            setProducts((prevProducts) =>
                prevProducts.map(product =>
                    product.id === updatedProduct.id ? updatedProduct : product
                )
            );
            setEditProduct(null);
            setEditProductDetails({
                name: '',
                price: '',
                description: '',
                category: ''
            });
        } catch (error) {
            console.error('Error editing product:', error);
        }
    };

    const handleEditUser = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5000/registerUser/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editUserDetails),
            });
            if (!response.ok) throw new Error('Failed to update user');
            const updatedUser = await response.json();
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === updatedUser.id ? updatedUser : user
                )
            );
            setEditUser(null);
            setEditUserDetails({ name: '', phone: '' });
        } catch (error) {
            console.error('Error editing user:', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await fetch(`http://localhost:5000/registerUser/${userId}`, {
                method: 'DELETE',
            });
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="pt-[5%]">
            <div className="fixed welcome z-[-20] pt-[300px] right-[50%] translate-x-[50%] text-center">
                <h1 className="text-[50px]">Welcome to admin page</h1>
                <p>For just admins</p>
            </div>
    
            <div className="bg-white">
            <div className="container mx-auto p-6 bg-gray-50 shadow-lg rounded-lg mt-[1000px]">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Add Product</h2>
                <form onSubmit={handleAddProduct} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name:</label>
                        <input type="text" id="name" name="name" value={newProduct.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm" placeholder="Enter product name" />
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price:</label>
                        <input type="text" id="price" name="price" value={newProduct.price} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm" placeholder="Enter product price" />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category:</label>
                        <select id="category" name="category" value={newProduct.category} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm" >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.name}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
                        <textarea id="description" name="description" value={newProduct.description} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm" placeholder="Enter product description" />
                    </div>
                    <button type="submit" className="inline-flex items-center px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-sm hover:bg-blue-600">Add Product</button>
                </form>
            </div>
    
            <div className="container mx-auto p-6 bg-gray-50 shadow-lg rounded-lg mt-6">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Add Category</h2>
                <form onSubmit={handleAddCategory} className="space-y-4">
                    <div>
                        <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">Category Name:</label>
                        <input type="text" id="categoryName" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-lg p-2 shadow-sm" placeholder="Enter new category name" />
                    </div>
                    <button type="submit" className="inline-flex items-center px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-sm hover:bg-green-600">Add Category</button>
                </form>
            </div>
    
            <div className="container mx-auto p-6 mt-6 bg-gray-50 shadow-lg rounded-lg">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Products</h2>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="py-2 px-4">Name</th>
                            <th className="py-2 px-4">Price</th>
                            <th className="py-2 px-4">Category</th>
                            <th className="py-2 px-4">Description</th>
                            <th className="py-2 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td className="py-2 px-4">{product.name}</td>
                                <td className="py-2 px-4">{product.price}</td>
                                <td className="py-2 px-4">{product.category}</td>
                                <td className="py-2 px-4">{product.description}</td>
                                <td className="py-2 px-4 flex space-x-2">
                                    <button onClick={() => setEditProduct(product.id)} className="text-blue-500 hover:text-blue-700"> <MdEdit size={20} /> </button>
                                    <button onClick={() => handleDeleteProduct(product.id)} className="text-red-500 hover:text-red-700"> <FaTrash size={20} /> </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    
            <div className="container mx-auto p-6 mt-6 bg-gray-50 shadow-lg rounded-lg">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Categories</h2>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="py-2 px-4">Category Name</th>
                            <th className="py-2 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {categories.map((category) => (
                            <tr key={category.id}>
                                <td className="py-2 px-4">{category.name}</td>
                                <td className="py-2 px-4 flex space-x-2">
                                    <button onClick={() => { setEditCategoryId(category.id); setEditedCategoryName(category.name); }} className="text-blue-500 hover:text-blue-700"> <MdEdit size={20} /> </button>
                                    <button onClick={() => handleDeleteCategory(category.id)} className="text-red-500 hover:text-red-700"> <FaTrash size={20} /> </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    
            <div className="container mx-auto p-6 mt-6 bg-gray-50 shadow-lg rounded-lg">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Users</h2>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="py-2 px-4">Name</th>
                            <th className="py-2 px-4">Phone</th>
                            <th className="py-2 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="py-2 px-4">{user.name}</td>
                                <td className="py-2 px-4">{user.phone}</td>
                                <td className="py-2 px-4 flex space-x-2">
                                    <button onClick={() => { setEditUser(user.id); setEditUserDetails({ name: user.name, phone: user.phone }); }} className="text-blue-500 hover:text-blue-700"> <MdEdit size={20} /> </button>
                                    <button onClick={() => handleDeleteUser(user.id)} className="text-red-500 hover:text-red-700"> <FaTrash size={20} /> </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    );
}    