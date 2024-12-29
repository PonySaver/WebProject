import React, { useEffect, useState } from 'react';
import { CiSearch, CiShoppingCart } from 'react-icons/ci';
import { createPurchase, getalltheproducts, getProductsByType } from '../service/service';
import { jwtDecode } from 'jwt-decode';

const Main = () => {
    const types = ["all", "electronics", "furniture", "clothing", "other"];

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await getalltheproducts();
            if (response && Array.isArray(response.products)) {
                setProducts(response.products);
                setFilteredProducts(response.products);
            } else {
                console.error('Unexpected response format:', response);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const searchHandler = (e) => {
        const filteredArray = products.filter((product) =>
            product.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredProducts(filteredArray);
    };
    const handleEdit = async (id) => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('No token found. Please log in.');
                return;
            }

            const decodedToken = jwtDecode(token);
            const userid = decodedToken.id;

            const formData = {
                userId: userid,
                productId: id
            };

            console.log('Sending purchase data:', formData); // Log data being sent

            await createPurchase(formData);
            console.log('Purchase created successfully');


        } catch (error) {
            console.error('Error creating purchase:', error.response || error.message);
        }
    };


    const handleCategoryClick = async (type) => {
        if (type === "all") {
            setFilteredProducts(products);
        } else {
            try {
                const response = await getProductsByType(type);
                if (response && Array.isArray(response.products) && response.products.length > 0) {
                    setFilteredProducts(response.products);
                } else {
                    setFilteredProducts([]);
                }
            } catch (error) {
                console.error('Error fetching products by type:', error);
                setFilteredProducts([]);
            }
        }
    };

    return (
        <div className='w-full relative'>
            <div className='sticky top-0 z-10 rounded-xl'>
                <div className='header flex justify-between items-center p-4 bg-white'>
                    <h1 className='text-3xl font-bold text-purple-500' > Maghaza.tn</h1>
                    <div className="search flex justify-between items-center px-5 py-2 bg-gray-100 rounded">
                        <input
                            type="text"
                            placeholder='Search product'
                            className='bg-transparent outline-0'
                            onChange={searchHandler}
                        />
                        <CiSearch />
                    </div>
                </div>

                <div className="categories bg-white w-full flex space-x-4 px-2 py-10 ">
                    {types.map((type) => (
                        <div key={type} className={`bg-white text-black px-5 py-2 rounded-full drop-shadow-xl `}>
                            <button onClick={() => handleCategoryClick(type)}>
                                <p>{type}</p>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className='products grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-3 gap-9 p-4 z-20 rounded-xl'>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div key={product._id} className="product h-[400px] bg-slate-50 drop-shadow-2xl p-2 border rounded-xl">
                            <img
                                src={product.imagePath ? `../../src/assets/${product.imagePath}` : '/default-image.jpg'}
                                alt={product.name || 'No name'}
                                className='w-full h-[60%] object-cover p-2 rounded-xl'
                            />
                            <div className='m-2 bg-gray-200 p-2'>
                                <h1 className='text-xl font-semibold'>{product.name || 'Unnamed Product'}</h1>
                                <p className='text-sm'>{product.description || 'No description available.'}</p>
                                <div className='flex justify-between items-center'>
                                    <p className='text-xl font-bold'>
                                        ${product.price ? product.price.toFixed(2) : '0.00'}
                                    </p>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <p className='text-xl font-bold'>Quantity: {product.quantity || 0}</p>
                                    <button onClick={() => handleEdit(product._id)}>
                                        <CiShoppingCart size={'1.5rem'} />
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))
                ) : (
                    <p className='text-center w-full col-span-full text-xl font-bold'>No products found for the selected category.</p>
                )}
            </div>
        </div>
    );
};

export default Main;
