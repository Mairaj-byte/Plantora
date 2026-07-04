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

      // 4. Slice the top 5 relevant items
      setRelated(strictMatch.slice(0, 5));
    }
  }, [products, category, subCategory, currentProductId]); // Added missing dependencies

  // Don't render anything if no related products are found
  if (related.length === 0) return null;

  return (
    <div className='my-24 px-4 sm:px-0'>
      <div className='text-center text-3xl py-4'>
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
      </div>

      {/* Grid Layout */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {related.map((item) => (
          <ProductItem 
            key={item._id} // Best practice: Use unique item IDs instead of array indexes for keys
            id={item._id} 
            name={item.name} 
            price={item.price} 
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;