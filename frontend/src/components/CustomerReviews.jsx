import React from 'react'

const reviewsData = [
  {
    id: 1,
    name: "Aanya Sharma",
    role: "Verified Buyer",
    plantType: "Fiddle Leaf Fig",
    rating: 5,
    comment: "Absolutely thrilled with my purchase! The plant arrived incredibly well-packaged, vibrant, and healthy. It has already sprouted two new leaves within a week.",
    date: "2 days ago",
  },
  {
    id: 2,
    name: "Vikram Malhotra",
    role: "Landscape Architect",
    plantType: "Monstera Deliciosa",
    rating: 5,
    comment: "As an architect, I am highly selective about structural nursery foliage. Chauhan Traders delivered pristine specimens that completely transformed our client's minimal atrium space.",
    date: "1 week ago",
  },
  {
    id: 3,
    name: "Priya Patel",
    role: "Urban Gardener",
    plantType: "Rare Succulents Kit",
    rating: 5,
    comment: "Finding authentic rare indoor plants in healthy condition is tough. This nursery is an absolute hidden gem for collectors!",
    date: "2 weeks ago",
  },
  {
    id: 4,
    name: "Rohan Das",
    role: "Home Enthusiast",
    plantType: "Snake Plant Zeylanica",
    rating: 4,
    comment: "Superb customer care team. They guided me carefully on watering frequencies for low-light rooms. The pricing is incredibly honest for this size.",
    date: "3 weeks ago",
  },
  {
    id: 5,
    name: "Meera Nair",
    role: "Balcony Gardener",
    plantType: "Peace Lily Premium",
    rating: 5,
    comment: "The blooms are absolutely magnificent. It completely cleanses the room feeling. Will be placing another bundle order for my parents next weekend.",
    date: "1 month ago",
  },
  {
    id: 6,
    name: "Arjun Mehta",
    role: "Interior Stylist",
    plantType: "Golden Pothos Pole",
    rating: 5,
    comment: "Stunning trailing length right out of the delivery box! Excellent thick foliage structure. Highly recommend their climbing setup variations.",
    date: "1 month ago",
  },
  {
    id: 7,
    name: "Kriti Verma",
    role: "Verified Buyer",
    plantType: "Calathea Orbifolia",
    rating: 4,
    comment: "Tricky plant to keep happy, but the starter health from Chauhan Traders gave it an amazing baseline. Doing beautifully in my conservatory environment.",
    date: "2 months ago",
  },
  {
    id: 8,
    name: "Kabir Singh",
    role: "Office Manager",
    plantType: "Areca Palm Bundle",
    rating: 5,
    comment: "Ordered ten large palms for our corporate lounge remodeling area. Every individual unit arrived fresh and upright. Exceptional wholesale quality control.",
    date: "2 months ago",
  }
]

const CustomerReviews = () => {
  // Double the dataset arrays to loop cleanly without blank gaps
  const infiniteReviews = [...reviewsData, ...reviewsData];

  return (
    <section className='py-20 max-w-[100vw] overflow-x-hidden text-stone-800'>
      
      {/* Structural Header Block */}
      <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 px-4 sm:px-12 max-w-7xl mx-auto'>
        <div className='max-w-xl'>
          <div className='inline-flex items-center gap-1.5 bg-emerald-100/80 text-emerald-900 text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-2 border border-emerald-200/50'>
            Community Voices
          </div>
          <h2 className='prata-regular text-3xl sm:text-4xl text-stone-900'>
            Loved by Plant <br />
            <span className='italic font-serif text-emerald-800 font-normal'>Growers Everywhere</span>
          </h2>
        </div>
        
        <div className='flex items-center gap-4 bg-stone-200/60 border border-stone-300/40 p-4 rounded-2xl backdrop-blur-sm shadow-sm self-start md:self-auto'>
          <div className='text-left'>
            <div className='flex gap-0.5 text-amber-600 text-sm font-bold'>★★★★★</div>
            <p className='text-xs text-stone-600 font-medium mt-1'>Based on 1,400+ genuine reviews</p>
          </div>
          <div className='h-8 w-[1px] bg-stone-300' />
          <div className='text-2xl font-light text-stone-900 tracking-tight'>4.9 / 5</div>
        </div>
      </div>

      {/* Infinite Horizontal Marquee Container Track */}
      <div className='relative w-full flex items-center overflow-x-hidden py-4 group'>
        
        {/* Soft edge blur shadows for high-end look */}
        <div className='absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-stone-50 to-transparent z-10 pointer-events-none' />
        <div className='absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-stone-50 to-transparent z-10 pointer-events-none' />

        {/* Moving Lane wrapper block - Pauses animation on desktop hover */}
        <div className='flex gap-6 whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]'>
          {infiniteReviews.map((review, idx) => (
            <div 
              key={`${review.id}-${idx}`}
              className='inline-block w-[300px] sm:w-[360px] h-[220px] bg-stone-200/50 border border-stone-300/40 p-6 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md hover:border-emerald-700/20 transition-all duration-300 whitespace-normal'
            >
              <div>
                {/* Star Evaluation Frame */}
                <div className='flex justify-between items-center mb-4'>
                  <div className='flex gap-0.5 text-emerald-950 text-xs tracking-tight'>
                    {"★".repeat(review.rating).padEnd(5, "☆")}
                  </div>
                  <span className='text-[11px] font-medium text-stone-500 bg-stone-300/40 px-2 py-0.5 rounded-md'>
                    {review.date}
                  </span>
                </div>

                {/* Core Review Message */}
                <p className='text-stone-700 text-xs sm:text-sm font-light leading-relaxed mb-4 italic line-clamp-3'>
                  "{review.comment}"
                </p>
              </div>

              {/* Bottom Profile Info */}
              <div>
                <hr className='border-stone-300/60 mb-3' />
                <div className='flex items-center justify-between gap-2'>
                  <div>
                    <h4 className='font-semibold text-stone-900 text-xs sm:text-sm leading-tight'>{review.name}</h4>
                    <p className='text-[10px] text-stone-500 font-medium tracking-wide'>{review.role}</p>
                  </div>
                  
                  <span className='text-[9px] font-bold text-emerald-900 bg-emerald-100/70 border border-emerald-200/60 px-2.5 py-1 rounded-full uppercase tracking-wider whitespace-nowrap'>
                    🌱 {review.plantType}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  )
}

export default CustomerReviews