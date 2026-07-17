import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem';

const LatestArrival = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        if (products && products.length > 0) {
            // Take up to 10 products for the display grid
            setLatestProducts(products.slice(0, 4));
        }
    }, [products]);

    return (
        <section className='relative my-24 sm:my-32 w-full overflow-hidden px-4 sm:px-12 max-w-7xl mx-auto'>
            
            {/* Soft Ambient Background Elements */}
            <div className='absolute -top-12 -left-12 w-64 h-64 bg-stone-100/50 rounded-full blur-3xl pointer-events-none' />
            <div className='absolute -bottom-16 -right-16 w-80 h-80 bg-amber-50/30 rounded-full blur-3xl pointer-events-none' />

            {/* Structural Header Block */}
            <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 relative z-10'>
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

            {/* Clean Static Product Layout */}
            {/* Switched from marquee to a clean grid on desktop and touch-friendly horizontal swipe on mobile */}
            <div className='relative w-full z-10'>
                <div className='flex md:grid md:grid-cols-4 lg:grid-cols-4 gap-6 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 scrollbar-none snap-x snap-mandatory'>
                    
                    {latestProducts.map((item, index) => (
                        <div key={item._id || index} className="w-full h-full overflow-hidden rounded-xl bg-stone-50/50">
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