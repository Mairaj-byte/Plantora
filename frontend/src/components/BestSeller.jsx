import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem';

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        if (products && products.length > 0) {
            const bestProduct = products.filter((item) => item.bestseller);
            setBestSeller(bestProduct.slice(0, 5))
        }
    }, [products])

    return (
        <section className='relative my-24 sm:my-32 max-w-7xl mx-auto overflow-hidden'>
            
            {/* Soft Ambient Background Elements */}
            <div className='absolute -top-12 -left-12 w-64 h-64 bg-emerald-50/40 rounded-full blur-3xl pointer-events-none' />
            <div className='absolute -bottom-16 -right-16 w-80 h-80 bg-stone-100/60 rounded-full blur-3xl pointer-events-none' />

            {/* Structural Header Block Adapted dynamically for Best Sellers */}
            <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 px-4 sm:px-12 max-w-7xl mx-auto relative z-10'>
                <div className='max-w-xl'>
                    <div className='inline-flex items-center gap-1.5 bg-emerald-100/80 text-emerald-900 text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-2 border border-emerald-200/50'>
                        Customer Favorites ★
                    </div>
                    <h2 className='prata-regular text-3xl sm:text-4xl text-stone-900 leading-tight'>
                        Our Most Popular <br />
                        <span className='italic font-serif text-emerald-800 font-normal'>Botanical Best Sellers</span>
                    </h2>
                </div>
                <div className='max-w-md md:text-right'>
                    <p className='text-xs sm:text-sm text-stone-600 font-light leading-relaxed tracking-wide'>
                        Bring home the specimens our community loves most. These robust, hand-selected favorites are proven to thrive beautifully and instantly elevate any indoor space.
                    </p>
                </div>
            </div>

            {/* Premium Flex/Grid Presentation Layer */}
            <div className='relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 gap-y-10 z-10 px-4 sm:px-12'>
                {
                    bestSeller.map((item, index) => (
                        <div 
                            key={index} 
                            className='group relative bg-white border border-stone-100 rounded-2xl p-2.5 sm:p-4 hover:border-emerald-800/10 hover:shadow-[0_12px_30px_rgba(11,34,22,0.06)] hover:-translate-y-1.5 transition-all duration-300 ease-out flex flex-col justify-between'
                        >
                            {/* Floating Corner Accent Badge */}
                            <div className='absolute top-3 right-3 z-20 bg-[#0b2216] text-white text-[9px] font-bold px-2 py-0.5 rounded-md tracking-wider shadow-xs transform group-hover:scale-105 transition-all duration-300'>
                                POPULAR
                            </div>

                            {/* Product Entry Wrapper Injection */}
                            <div className='w-full h-full overflow-hidden rounded-xl bg-stone-50/50'>
                                <ProductItem 
                                    id={item._id} 
                                    name={item.name} 
                                    image={item.image} 
                                    price={item.price} 
                                />
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default BestSeller