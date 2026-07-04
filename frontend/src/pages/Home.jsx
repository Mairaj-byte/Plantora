import React from 'react'
import Hero from '../components/Hero'
import WhyChooseUs from '../components/WhyChooseUs'
import CustomerReviews from '../components/CustomerReviews'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import LatestArrival from '../components/LatestArrival'

const Home = () => {
  return (
    <div>
      <Hero />
      <WhyChooseUs/>
      <LatestArrival />
      <CustomerReviews />
      <BestSeller/>
      <OurPolicy/>
      <NewsletterBox/>
    </div>
  )
}

export default Home
