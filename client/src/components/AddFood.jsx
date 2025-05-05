import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AddFood = () => {
  const restaurantId = Cookies.get("restaurantId");
  console.log(restaurantId)
  const navigate = useNavigate();

  const [inputData, setInputData] = useState({
    foodName: "",
    foodImage: null,
    imageUrl: "",
    price: "",
    category: "",
    description: "",
    restaurantId: restaurantId
  });
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleUploadImage = (e) => {
    setInputData({ ...inputData, foodImage: e.target.files[0], imageUrl: "" });
  };

  const handleImageUrl = (e) => {
    setInputData({ ...inputData, imageUrl: e.target.value, foodImage: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const vendorToken = Cookies.get("vendorToken");
    console.log("vendor token:", vendorToken)

    if (!vendorToken) {
      setError("Unauthorized: Please log in again.");
      setLoading(false);
      return;
    }

    if (!inputData.restaurantId) {
      alert("Please add Restaurant First.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("foodName", inputData.foodName);
      formData.append("price", inputData.price);
      formData.append("category", inputData.category);
      formData.append("description", inputData.description);
      formData.append("restaurantId", inputData.restaurantId);
      if (inputData.foodImage) {
        formData.append("foodImage", inputData.foodImage);
      } else if (inputData.imageUrl) {
        formData.append("foodImage", inputData.imageUrl);
      }

      const res = await axios.post("http://localhost:4000/api/add-foodItem", formData, {
        headers: { Authorization: `Bearer ${vendorToken}` },
      });

      if (res.data.success) {
        alert("Food Item Added Successfully!");
      } else {
        setError(res.data.message || "Failed to add food item");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Submission failed");
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add Food
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-4 text-gray-600 text-2xl"
            >
              &times;
            </button>
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-semibold text-center">Add Food Item</h2>

              <input
                name="foodName"
                value={inputData.foodName}
                onChange={handleInput}
                placeholder="Food Name"
                className="w-full px-3 py-2 border rounded"
                required
              />

              <label className="block text-sm">Upload Image File</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleUploadImage}
                className="w-full"
              />

              <label className="block text-sm">Or Enter Image URL</label>
              <input
                name="imageUrl"
                value={inputData.imageUrl}
                onChange={handleImageUrl}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 border rounded"
              />

              <input
                name="price"
                value={inputData.price}
                onChange={handleInput}
                placeholder="Price (e.g. 100)"
                className="w-full px-3 py-2 border rounded"
                required
              />

              <select
                name="category"
                value={inputData.category}
                onChange={handleInput}
                className="w-full px-3 py-2 border rounded"
                required
              >
                <option value="">Select Category</option>
                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non-Veg</option>
              </select>

              <textarea
                name="description"
                value={inputData.description}
                onChange={handleInput}
                placeholder="Description"
                className="w-full px-3 py-2 border rounded"
                required
              />

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddFood;
