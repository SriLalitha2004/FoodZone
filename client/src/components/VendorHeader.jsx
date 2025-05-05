import { Link } from "react-router-dom";
// import Login from "./Login";
// import Register from "./Register";

export default function vendorHeader() {
  return (
    <nav className="flex justify-between items-center p-4 shadow-md bg-white">
      <div>
        <h1 className="text-2xl font-bold">Vendor Dashboard</h1>
      </div>
      <div className="flex gap-4">
        <Link to="/" className="text-lg">FoodZone</Link>
        <Link to="/login" className="px-4 py-2 bg-blue-500 text-white rounded">Login</Link>
        <Link to="/register" className="px-4 py-2 bg-green-500 text-white rounded">Register</Link>
      </div>
    </nav>
  );
}