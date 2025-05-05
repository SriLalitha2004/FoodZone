import React from 'react'

const Header = () => {
  return (
    <nav className="flex items-center justify-between bg-white-600 p-4 color-black shadow-lg">
      <div className="flex flex-col items-center space-x-4">
          <img src="/logo.png" alt="Logo" className="h-10 w-10" />
          <p className="text-sm font-bold text-gray-800">FoodZone</p>
      </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search restaurants"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="color-white p-2 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-black"
          />
          <Link to="/cart" className="text-black font-semibold hover:underline">
            Cart
          </Link>
          <button onClick={handleLogout} className="bg-white text-blue-600 px-4 py-2 rounded-xl hover:bg-gray-100 transition">
            Logout
          </button>

        </div>
      </nav>
  )
}

export default Header