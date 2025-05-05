import {
    FaFacebook,
    FaGithub,
    FaInstagram,
    FaTwitter,
    FaYoutube,
  } from "react-icons/fa";
  
  const Footer = () => {
    return (
      <footer className="bg-gray-100 text-gray-700 py-10 px-5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div>
            <h4 className="font-semibold uppercase mb-2">About FoodZone</h4>
            <ul className="space-y-1">
              <li>Who We Are</li>
              <li>Blog</li>
              <li>Report Fraud</li>
              <li>Press Kit</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold uppercase mb-2">Learn More</h4>
            <ul className="space-y-1">
              <li>Claims</li>
              <li>Privacy</li>
              <li>Terms</li>
              <li>Policies</li>
              <li>Conditions</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold uppercase mb-2">Available</h4>
            <ul className="space-y-1">
              <li>Khammam</li>
              <li>SuryaPet</li>
              <li>Hyderabad</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold uppercase mb-2">For Restaurants</h4>
            <ul className="space-y-1">
              <li>Partner With Us</li>
              <li>Apps For You</li>
            </ul>
          </div>
        </div>
  
        <hr className="my-6 border-gray-300" />
  
        <div className="text-center text-sm">
          <p className="mb-4">
            All rights reserved by Sri Lalitha Veeraboina 2025.
          </p>
          <div className="flex justify-center space-x-4 text-lg text-gray-600">
            <FaFacebook className="hover:text-blue-600 cursor-pointer" />
            <FaGithub className="hover:text-black cursor-pointer" />
            <FaInstagram className="hover:text-pink-500 cursor-pointer" />
            <FaTwitter className="hover:text-blue-400 cursor-pointer" />
            <FaYoutube className="hover:text-red-600 cursor-pointer" />
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  