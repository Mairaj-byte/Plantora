import React from 'react'

const PrivacyPolicy = () => {
  const sections = [
    {
      title: '1. Information We Collect',
      content: 'We collect information you provide directly to us when registering an account, placing an order, subscribing to our newsletter, or contacting our team. This may include your name, email address, phone number, shipping address, and billing information necessary to safely fulfill your nursery order.'
    },
    {
      title: '2. How We Use Your Information',
      content: 'Your information allows us to process transactions swiftly, nurture your customer support inquiries, send periodic updates regarding order statuses, and personalize your experience. We also use data trends to continuously improve our website interface and green curation offerings.'
    },
    {
      title: '3. Data Security & Longevity',
      content: 'We implement robust technical and organizational security protocols to maintain the safety of your personal details. Your payment transactions are processed through encrypted gateway providers and are never stored directly on our servers.'
    },
    {
      title: '4. Cookie Policy',
      content: 'Our platform utilizes minor standard browser cookies to help us remember and process the items in your shopping cart, understand your preferences for future visits, and compile aggregate data about site traffic so we can deliver a seamless green experience you can trust.'
    },
    {
      title: '5. Third-Party Disclosures',
      content: 'We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This excludes trusted third-party partners who assist us in operating our website, conducting our delivery operations, or servicing your accounts, so long as those parties agree to keep this information strictly confidential.'
    },
    {
      title: '6. Your Rights & Choices',
      content: 'You retain full control over your data. You may update your account details, request a copy of the information we currently hold, or ask for the complete deletion of your records within our system at any time by connecting directly with our support desk.'
    }
  ];

  return (
    <div className='min-h-screen bg-[#faf9f6] text-[#0b2216] font-sans antialiased'>
      {/* Hero Header Section */}
      <div className='bg-[#0b2216] text-stone-300 border-b border-emerald-950 pt-28 pb-20 px-6 text-center transition-colors duration-300'>
        <div className='max-w-3xl mx-auto'>
          <span className='text-xs font-bold tracking-widest uppercase text-emerald-400 block mb-3'>
            Legal & Trust
          </span>
          <h1 className='text-3xl sm:text-5xl font-extrabold tracking-wide text-white font-serif uppercase mb-4'>
            Privacy Policy
          </h1>
          <p className='text-stone-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed'>
            At Eco Garden Nursery, your privacy is just like our plants—thoughtfully nurtured and carefully protected. Learn how we handle your digital footprints securely.
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className='max-w-4xl mx-auto px-6 py-16 sm:py-24'>
        {/* Dynamic Section Mapping */}
        <div className='flex flex-col gap-12 sm:gap-16'>
          {sections.map((section, idx) => (
            <section key={idx} className='border-b border-stone-200 pb-8 last:border-0 last:pb-0'>
              <h2 className='text-xl sm:text-2xl font-bold font-serif text-[#0b2216] tracking-wide mb-4'>
                {section.title}
              </h2>
              <p className='text-stone-600 text-sm sm:text-base leading-relaxed max-w-3xl'>
                {section.content}
              </p>
            </section>
          ))}
        </div>

        {/* Support Callout Footer Notice */}
        <div className='mt-16 sm:mt-24 p-8 bg-[#0b2216]/5 border border-emerald-950/10 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6'>
          <div>
            <h3 className='text-lg font-bold font-serif text-[#0b2216] mb-1'>
              Have lingering questions?
            </h3>
            <p className='text-stone-600 text-sm'>
              Our team is here to assist with any legal or data concerns.
            </p>
          </div>
          <a 
            href="/contact" 
            className='inline-block bg-[#0b2216] hover:bg-emerald-900 text-stone-100 text-sm font-semibold tracking-wide uppercase px-6 py-3 rounded-lg shadow-sm transition-colors duration-200 ease-in-out'
          >
            Contact Support
          </a>
        </div>

        {/* Last Updated Metainfo */}
        <p className='text-center text-xs tracking-wider uppercase font-medium text-stone-400 mt-12'>
          Last updated: July 8, 2026
        </p>
      </div>
    </div>
  )
}

export default PrivacyPolicy