import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar/index';
import { useNavigate } from 'react-router-dom';

const AllProducts = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/product'); // Assuming '/api/products' is your endpoint
                setProducts(response.data.products);
            } catch (error) {
                console.error('Error fetching products:', error);
                // Handle error: set error state or display an error message
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='max-w-5xl mx-auto'>
                <h1 className='py-4 text-3xl font-bold text-center'>All Products</h1>
                <div className='flex flex-wrap justify-center gap-4'>
                    {products.map((product) => (
                        <div key={product._id}>

                            <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow min-w-[250px]">
                                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{product.name}</h5>
                                <p class="mb-3 font-normal text-gray-700 ">{product.description}</p>
                                <p>Price: ${product.price}</p>
                                <p>Quantity: {product?.quantity}</p>
                                <button onClick={()=> navigate(`/products/${product._id}`)} className="mt-4 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                                    View
                                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                    </svg>
                                </button>
                            </div>

                        
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllProducts;
