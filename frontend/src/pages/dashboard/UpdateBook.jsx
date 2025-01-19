import React, { useEffect, useState } from "react";
import InputField from "./addbook/InputField";
import SelectField from "./addbook/SelectField";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import Swal from "sweetalert2";
import axios from "axios";
import { getImgUrl } from "../../utils/getImgUrl";
import {
  useFetchSingleBookQuery,
  useUpdateABookMutation,
} from "../../redux/features/books/bookapi";

const UpdateBook = () => {
  const { id } = useParams();
  const {
    data: bookData,
    isLoading,
    isError,
    refetch,
  } = useFetchSingleBookQuery(id);

  const [updateBook] = useUpdateABookMutation();

  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    category: "",
    trending: false,
    oldPrice: "",
    newPrice: "",
    coverImage: "",
  });

  useEffect(() => {
    if (bookData) {
      setFormValues({
        title: bookData.title || "",
        description: bookData.description || "",
        category: bookData.category || "",
        trending: bookData.trending || false,
        oldPrice: bookData.oldPrice || "",
        newPrice: bookData.newPrice || "",
        coverImage: bookData.coverImage || "",
      });
    }
  }, [bookData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateBookData = {
      ...formValues,
      oldPrice: Number(formValues.oldPrice),
      newPrice: Number(formValues.newPrice),
      coverImage: formValues.coverImage || bookData.coverImage,
    };

    try {
      console.log(updateBookData);

      await updateBook({ updateBookData, id }).unwrap();

      Swal.fire({
        title: "Book Updated",
        text: "Your book is updated successfully!",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Okay!",
      });

      await refetch();
    } catch (error) {
      console.error("Failed to update book:", error);
      alert("Failed to update book.");
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Error fetching book data</div>;

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Book</h2>

      <form onSubmit={handleSubmit}>
        <InputField
          label="Title"
          name="title"
          placeholder="Enter book title"
          value={formValues.title}
          onChange={handleInputChange}
        />

        <InputField
          label="Description"
          name="description"
          placeholder="Enter book description"
          type="textarea"
          value={formValues.description}
          onChange={handleInputChange}
        />

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
          value={formValues.category}
          onChange={handleInputChange}
        />

        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="trending"
              checked={formValues.trending}
              onChange={handleInputChange}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">
              Trending
            </span>
          </label>
        </div>

        <InputField
          label="Old Price"
          name="oldPrice"
          type="number"
          placeholder="Old Price"
          value={formValues.oldPrice}
          onChange={handleInputChange}
        />

        <InputField
          label="New Price"
          name="newPrice"
          type="number"
          placeholder="New Price"
          value={formValues.newPrice}
          onChange={handleInputChange}
        />

        <InputField
          label="Cover Image URL"
          name="coverImage"
          type="text"
          placeholder="Cover Image URL"
          value={formValues.coverImage}
          onChange={handleInputChange}
        />

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-bold rounded-md"
        >
          Update Book
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;
