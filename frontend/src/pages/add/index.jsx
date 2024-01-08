import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AddProduct = () => {
    const navigate = useNavigate()
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: 0,
        category: '',
        quantity: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/product/add', productData);
            console.log(response.data); 
            navigate("/")
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div>
            <div className="max-w-4xl mx-auto pt-20">
                <h2 className='text-center font-bold'>Add Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name"  class="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Name</label>
                        <input type="text" id="name" name="name" placeholder="Name" value={productData.name} onChange={handleChange}
                        
                        class="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description" class="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Description</label>
                        <input type="text" id="description" name="description" placeholder="Description" value={productData.description} onChange={handleChange}                        class="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0" />

                    </div>
                    <div className="form-group">
                        <label htmlFor="price"  class="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Price</label>
                        <input type="number" id="price" name="price" placeholder="Price" value={productData.price} onChange={handleChange}                         class="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0" />

                    </div>
                    <div className="form-group">
                        <label htmlFor="category"  class="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Category</label>
                        <select id="category" name="category" value={productData.category} onChange={handleChange} class="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0" >
                            {["Electronics", "Clothing", "Books", "Beauty", "Others"].map((v, i) => {
                                return <option value={v} key={i}>{v}</option>
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="quantity"  class="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Quantity</label>
                        <input type="number" id="quantity" name="quantity" placeholder="Quantity" value={productData.quantity} onChange={handleChange} 
                        
                        class="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0" 

                        />
                        
                    </div>
                    <div className="form-group">
                        <button type="submit"
                                class="mt-4 flex items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
                        
                        >Add Product</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
