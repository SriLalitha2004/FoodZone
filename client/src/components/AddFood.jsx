import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import './AddFood.css'; // Import the CSS file

const AddFood = () => {
  const restaurantId = Cookies.get("restaurantId");
  console.log(restaurantId);
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
    console.log("vendor token:", vendorToken);

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
        className="open-button"
      >
        Add Food
      </button>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              onClick={() => setIsOpen(false)}
              className="close-button"
            >
              &times;
            </button>
            <form onSubmit={handleSubmit} className="form">
              <h2 className="form-title">Add Food Item</h2>

              <input
                name="foodName"
                value={inputData.foodName}
                onChange={handleInput}
                placeholder="Food Name"
                className="input"
                required
              />

              <label className="label">Upload Image File</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleUploadImage}
                className="input"
              />

              <label className="label">Or Enter Image URL</label>
              <input
                name="imageUrl"
                value={inputData.imageUrl}
                onChange={handleImageUrl}
                placeholder="https://example.com/image.jpg"
                className="input"
              />

              <input
                name="price"
                value={inputData.price}
                onChange={handleInput}
                placeholder="Price (e.g. 100)"
                className="input"
                required
              />

              <select
                name="category"
                value={inputData.category}
                onChange={handleInput}
                className="input"
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
                className="textarea"
                required
              />

              {error && <p className="error-message">{error}</p>}

              <button
                type="submit"
                className="submit-button"
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
