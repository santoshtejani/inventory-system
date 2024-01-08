import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const SingleProduct = ({ match }) => {
    const navigate = useNavigate()
    const [product, setProduct] = useState(null);
    const [count, setCount] = useState(0);
    let { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/product/${id}`);
                console.log(response.data)
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
                // Handle error: set error state or display an error message
            }
        };

        fetchProduct();
    }, [id]);


    const handlePurchase = async () => {
        if (count > 0) {
            try {
                const response = await axios.post('http://localhost:8080/api/product/purchase', {
                    productId: product._id,
                    quantity: count,
                });


                navigate("/")
            } catch (error) {
                console.error('Error purchasing product:', error);
            }
        } else {
            alert("Select Product Quantity");

        }
    };


    const handleIncrement = () => {
        if (count <= product.quantity) {
            setCount(count + 1);
        }
    };

    const handleDecrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    return (
        <div >
            <div className='max-w-5xl mx-auto py-20'>
                <h2>Product Details</h2>
                {product ? (
                    <div>
                        <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow min-w-[250px]">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{product.name}</h5>
                            <p class="mb-3 font-normal text-gray-700 ">{product.description}</p>
                            <p>Price: ${product.price}</p>
                            <p>Quantity: {product?.quantity}</p>
                            <div className='w-[80px] flex mt-3'>
                                <button onClick={handleDecrement} className='bg-blue-500 min-w-8 text-white h-8'>-</button>
                                <input type='number' value={count} readOnly className='w-8 text-center ' />
                                <button onClick={handleIncrement} className='bg-blue-500 min-w-8 text-white h-8'>+</button>
                            </div>
                            <button
                            onClick={handlePurchase}
                                class="mt-4 flex items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
                            >
                               Purchase
                            </button>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default SingleProduct;
