// import VendorHeader from "./VendorHeader";
// import vendor_bg from "../assets/vendor_bg.jpg";

// export default function VendorPage() {
//   return (
//     <div>
//       <VendorHeader  />
//       <img src={vendor_bg} alt="Vendor background" className='absolute w-full h-full object-cover' />
//             <div className='absolute top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm scale-105' />
//             <div className='relative z-10 flex flex-col items-center justify-center w-full h-full'>
//               <h1 className='text-white text-4xl m-2 font-bold'>Add Restaurants to FoodZone</h1>
//             </div>
//     </div>
//   );
// }

import React from 'react'
import vendor_bg from '../assets/vendor_bg.jpg'
import VendorHeader from "./VendorHeader";

const VendorPage = () => {
  return (
    <div className='relative w-full h-screen overflow-hidden'>
      <img src={vendor_bg} alt="Vendor background" className='absolute w-full h-full object-cover' />
      <div className='absolute top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm scale-105' />
      
      {/* VendorHeader is inside z-20 container */}
      <div className='relative z-20'>
        <VendorHeader />
      </div>

      {/* Center content */}
      <div className='relative z-10 flex flex-col items-center justify-center w-full h-full'>
        <h1 className='text-white text-4xl m-2 font-bold'>Add Restaurants to FoodZone</h1>
      </div>
    </div>
  )
}

export default VendorPage
