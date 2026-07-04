import React from 'react'

const NewsletterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }

    return (
        <section className='my-12 px-4 sm:px-12 max-w-7xl mx-auto'>
            {/* Elegant Background Card inspired by the clean layout in Screenshot (177).png */}
            <div className=' p-8 sm:p-16 text-center backdrop-blur-sm relative overflow-hidden'>
                
                {/* Decorative Subtle Accent Light */}
                <div className='absolute -top-24 -left-24 w-48 h-48 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none' />
                
                <div className='max-w-xl mx-auto relative z-10'>
                    {/* Tiny Modern Tagline */}
                    <span className='text-[10px] font-bold tracking-widest text-emerald-900 bg-emerald-100/60 px-3 py-1 rounded-full uppercase'>
                        Nursery Updates & Care Tips
                    </span>

                    {/* Elegant Serif Header Block */}
                    <h2 className='font-serif text-2xl sm:text-3xl text-stone-900 font-medium mt-4 tracking-wide'>
                        Join Our <span className='italic text-emerald-800 font-normal'>Growing Community</span>
                    </h2>
                    
                    {/* Thematic Botanical Copywriting */}
                    <p className='text-stone-600 font-light text-xs sm:text-sm mt-3 leading-relaxed'>
                        Subscribe to receive exclusive seasonal plant care guides, first-access to rare nursery restocks, and <strong className='font-medium text-stone-900'>10% off your first seasonal order</strong>.
                    </p>

                    {/* Sleek Minimalist Integrated Form Layout */}
                    <form 
                        onSubmit={onSubmitHandler} 
                        className='w-full sm:max-w-md flex items-center bg-white border border-stone-200 rounded-full p-1.5 mt-8 mx-auto shadow-sm focus-within:border-emerald-800/40 focus-within:ring-2 focus-within:ring-emerald-800/5 transition-all duration-300'
                    >
                        <input 
                            className='w-full bg-transparent pl-4 pr-2 py-2 outline-none text-xs sm:text-sm text-stone-800 placeholder-stone-400 font-sans' 
                            type="email" 
                            placeholder='Enter your email address' 
                            required
                        />
                        <button 
                            type='submit' 
                            className='bg-[#0b2216] hover:bg-emerald-900 text-white font-medium text-xs sm:text-sm px-6 sm:px-8 py-2.5 rounded-full transition-all duration-300 shadow-sm whitespace-nowrap tracking-wide'
                        >
                            Subscribe
                        </button>
                    </form>
                </div>

            </div>
        </section>
    )
}

export default NewsletterBox