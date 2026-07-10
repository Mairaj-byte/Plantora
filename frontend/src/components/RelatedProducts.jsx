import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({ category, subCategory, currentProductId }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      // 1. Exclude the current product being viewed
      let filteredProducts = products.filter((item) => item._id !== currentProductId);

      // 2. Try strict matching (Same Category AND Same SubCategory)
      let strictMatch = filteredProducts.filter(
        (item) => item.category === category && item.subCategory === subCategory
      );

      // 3. Fallback: If strict match yields nothing, broaden search to just the main category
      if (strictMatch.length === 0) {
        strictMatch = filteredProducts.filter((item) => item.category === category);
      }

      // 4. Slice the top 4 relevant items
      setRelated(strictMatch.slice(0, 4));
    }
  }, [products, category, subCategory, currentProductId]);

  // Don't render anything if no related products are found
  if (related.length === 0) return null;

  return (
    <div className='relative overflow-hidden'>

      {/* Editorial Header Section */}
      <div className='px-6 md:px-12 lg:px-16 mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4'>
        <div>
          <span className='text-xs uppercase tracking-[0.25em] text-emerald-700 font-semibold block mb-2'>
            Curated Pairings
          </span>
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-zinc-900 font-serif'>
            Related <span className='text-emerald-800 font-normal italic'>Botanicals</span>
          </h2>
        </div>
        <p className='text-sm text-zinc-500 max-w-sm font-light leading-relaxed border-l-2 border-emerald-600 pl-4 py-1'>
          Enhance your interior landscape with these hand-selected, premium varieties.
        </p>
      </div>

      {/* Grid Layout - Spanning Full Screen Edge to Edge */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4'>
        {related.map((item) => (
          <div
            key={item._id}
            className='group relative md:p-4'
          >
            {/* Subtle internal emerald glow line on item hover */}
            <div className='absolute top-0 left-0 w-full h-[3px] bg-emerald-700 scale-x-0' />

            <ProductItem
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
              badge={item.category}
              category={item.subcategory}
            />
          </div>
        ))}
      </div>



    </div>
  );
};

export default RelatedProducts;