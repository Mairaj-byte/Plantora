import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem';

const LatestArrival = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        if (products && products.length > 0) {
            // Take up to 10 products for the marquee track
            setLatestProducts(products.slice(0, 10));
        }
    }, [products]);

    return (
        <section className='relative my-24 sm:my-32 w-full overflow-hidden'>
            
            {/* Injecting CSS Keyframes dynamically for the seamless infinite scroll */}
            <style>{`
                @keyframes marquee {
                    0% {
                        transform: translateX(0%);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                .animate-marquee {
                    display: flex;
                    width: max-content;
                    /* Adjusted time to 20s for smaller cards to keep velocity matching well */
                    animation: marquee 20s linear infinite;
                }
                /* Optional: Pause the scrolling effect when a user hovers over a product */
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}</style>

            {/* Soft Ambient Background Elements */}
            <div className='absolute -top-12 -left-12 w-64 h-64 bg-stone-100/50 rounded-full blur-3xl pointer-events-none' />
            <div className='absolute -bottom-16 -right-16 w-80 h-80 bg-amber-50/30 rounded-full blur-3xl pointer-events-none' />

            {/* Structural Header Block */}
            <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 px-4 sm:px-12 max-w-7xl mx-auto relative z-10'>
                <div className='max-w-xl'>
                    <div className='inline-flex items-center gap-1.5 bg-stone-100 text-stone-900 text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-2 border border-stone-200/60'>
                        Just Unpacked ✦
                    </div>
                    <h2 className='prata-regular text-3xl sm:text-4xl text-stone-900 leading-tight'>
                        Fresh From The Greenhouse <br />
                        <span className='italic font-serif text-emerald-800 font-normal'>New Botanical Arrivals</span>
                    </h2>
                </div>
                <div className='max-w-md md:text-right'>
                    <p className='text-xs sm:text-sm text-stone-600 font-light leading-relaxed tracking-wide '>
                        Be the first to adopt our newest arrivals. Hand-picked and freshly cultivated, these rare specimens and seasonal essentials are ready to bring new life into your home ecosystem.
                    </p>
                </div>
            </div>

            {/* Dynamic Infinite Horizontal Marquee Container */}
            <div className='relative w-full overflow-hidden z-10 mask-gradient'>
                {/* Changed gap-6 to gap-4 for a more compact arrangement */}
                <div className='animate-marquee gap-4 px-4'>
                    
                    {/* First Render Loop */}
                    {latestProducts.map((item, index) => (
                        <div key={`original-${item._id || index}`} className="w-[230px] sm:w-[270px] flex-shrink-0">
                            <ProductItem 
                                id={item._id} 
                                name={item.name} 
                                image={item.image} 
                                price={item.price} 
                                badge={item.badge || "Latest"}
                                subcategory={item.category || "Indoor"}
                                subtext={item.subtext || "Low Light"}
                            />
                        </div>
                    ))}

                    {/* Exact Duplicate Render Loop to allow seamless, infinite snapping back */}
                    {latestProducts.map((item, index) => (
                        <div key={`duplicate-${item._id || index}`} className="w-[230px] sm:w-[270px] flex-shrink-0" aria-hidden="true">
                            <ProductItem 
                                id={item._id} 
                                name={item.name} 
                                image={item.image} 
                                price={item.price} 
                                badge={item.badge || "Latest"}
                                subcategory={item.category || "Indoor"}
                                subtext={item.subtext || "Low Light"}
                            />
                        </div>
                    ))}

                </div>
            </div>
        </section>
    )
}

export default LatestArrival;