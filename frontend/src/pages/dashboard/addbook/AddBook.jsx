import React, { useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import Swal from "sweetalert2";
import { useAddBookMutation } from "../../../redux/features/books/bookapi";

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    trending: false,
    oldPrice: "",
    newPrice: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imageFileName, setImageFileName] = useState("");
  const [addBook, { isLoading }] = useAddBookMutation();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileName(file.name);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const newBookData = {
      ...formData,
      coverImage: imageFileName,
    };

    try {
      await addBook(newBookData).unwrap();
      Swal.fire({
        title: "Book added",
        text: "Your book is uploaded successfully!",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        trending: false,
        oldPrice: "",
        newPrice: "",
      });
      setImageFileName("");
      setImageFile(null);
    } catch (error) {
      console.error(error);
      alert("Failed to add book. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Book</h2>

      <form onSubmit={onSubmit}>
        {/* Title */}
        <InputField
          label="Title"
          name="title"
          placeholder="Enter book title"
          value={formData.title}
          onChange={handleInputChange}
        />

        {/* Description */}
        <InputField
          label="Description"
          name="description"
          type="textarea"
          placeholder="Enter book description"
          value={formData.description}
          onChange={handleInputChange}
        />

        {/* Category */}
        <SelectField
          label="Category"
          name="category"
          options={[
            { value: "", label: "Choose A Category" },
            { value: "business", label: "Business" },
            { value: "technology", label: "Technology" },
            { value: "fiction", label: "Fiction" },
            { value: "horror", label: "Horror" },
            { value: "adventure", label: "Adventure" },
          ]}
          value={formData.category}
          onChange={handleInputChange}
        />

        {/* Trending */}
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="trending"
              checked={formData.trending}
              onChange={handleInputChange}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">
              Trending
            </span>
          </label>
        </div>

        {/* Old Price */}
        <InputField
          label="Old Price"
          name="oldPrice"
          type="number"
          placeholder="Enter old price"
          value={formData.oldPrice}
          onChange={handleInputChange}
        />

        {/* New Price */}
        <InputField
          label="New Price"
          name="newPrice"
          type="number"
          placeholder="Enter new price"
          value={formData.newPrice}
          onChange={handleInputChange}
        />

        {/* Cover Image */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Cover Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-2 w-full"
          />
          {imageFileName && (
            <p className="text-sm text-gray-500">Selected: {imageFileName}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white font-bold rounded-md"
        >
          {isLoading ? <span>Adding...</span> : <span>Add Book</span>}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
