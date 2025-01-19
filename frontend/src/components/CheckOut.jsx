import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/provider";
import { usePostOrderMutation } from "../redux/features/orders/ordersApi";
import Loading from "./Loading";
import Swal from "sweetalert2";

const CheckOut = () => {
  const navigate = useNavigate();
  const [postOrder, { isLoading }] = usePostOrderMutation();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.newPrice, 0)
    .toFixed(2);
  const productIds = cartItems.map((item) => item._id);
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: currentUser ? currentUser?.email : "",
    phone: "",
    address: "",
    city: "",
    country: "",
    state: "",
    zipcode: "",
    billing_same: false,
    productIds: productIds, // Added productIds
    totalPrice: totalPrice, // Added totalPrice
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    state: "",
    zipcode: "",
    billing_same: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let formIsValid = true;

    if (!formData.name) {
      newErrors.name = "Full Name is required";
      formIsValid = false;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Valid email is required";
      formIsValid = false;
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
      formIsValid = false;
    }

    if (!formData.address) {
      newErrors.address = "Address is required";
      formIsValid = false;
    }

    if (!formData.city) {
      newErrors.city = "City is required";
      formIsValid = false;
    }

    if (!formData.country) {
      newErrors.country = "Country is required";
      formIsValid = false;
    }

    if (!formData.state) {
      newErrors.state = "State is required";
      formIsValid = false;
    }

    if (!formData.zipcode) {
      newErrors.zipcode = "Zipcode is required";
      formIsValid = false;
    }

    if (!formData.billing_same) {
      newErrors.billing_same = "You must agree to the terms and conditions";
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Data Submitted: ", formData);
    }
    try {
      await postOrder(formData).unwrap();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your order placed successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      console.log("error occured:", error);
    }
  };
  if (isLoading) return <Loading />;
  return (
    <section>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-xl text-gray-600 mb-2">
              Cash On Delivery
            </h2>
            <p className="text-gray-500 mb-2">Total Price: ${totalPrice}</p>{" "}
            <p className="text-gray-500 mb-6">
              Items: {cartItems.length > 0 ? cartItems.length : 0}
            </p>
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <form
                onSubmit={handleSubmit}
                className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8"
              >
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Personal Details</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    {/* Full Name */}
                    <div className="md:col-span-5">
                      <label htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                      {errors.name && (
                        <span className="text-red-500 text-sm">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    {/* Email */}
                    <div className="md:col-span-5">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="text"
                        name="email"
                        value={
                          currentUser ? currentUser?.email : formData.email
                        }
                        onChange={handleChange}
                        disabled
                        placeholder="email@domain.com"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                      {errors.email && (
                        <span className="text-red-500 text-sm">
                          {errors.email}
                        </span>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="md:col-span-5">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                      {errors.phone && (
                        <span className="text-red-500 text-sm">
                          {errors.phone}
                        </span>
                      )}
                    </div>

                    {/* Address */}
                    <div className="md:col-span-3">
                      <label htmlFor="address">Address / Street</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                      {errors.address && (
                        <span className="text-red-500 text-sm">
                          {errors.address}
                        </span>
                      )}
                    </div>

                    {/* City */}
                    <div className="md:col-span-2">
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                      {errors.city && (
                        <span className="text-red-500 text-sm">
                          {errors.city}
                        </span>
                      )}
                    </div>

                    {/* Country */}
                    <div className="md:col-span-2">
                      <label htmlFor="country">Country / Region</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                      {errors.country && (
                        <span className="text-red-500 text-sm">
                          {errors.country}
                        </span>
                      )}
                    </div>

                    {/* State */}
                    <div className="md:col-span-2">
                      <label htmlFor="state">State / Province</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                      {errors.state && (
                        <span className="text-red-500 text-sm">
                          {errors.state}
                        </span>
                      )}
                    </div>

                    {/* Zipcode */}
                    <div className="md:col-span-1">
                      <label htmlFor="zipcode">Zipcode</label>
                      <input
                        type="text"
                        name="zipcode"
                        value={formData.zipcode}
                        onChange={handleChange}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                      {errors.zipcode && (
                        <span className="text-red-500 text-sm">
                          {errors.zipcode}
                        </span>
                      )}
                    </div>

                    {/* Terms & Conditions */}
                    <div className="md:col-span-5 mt-3">
                      <div className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="billing_same"
                          checked={formData.billing_same}
                          onChange={handleChange}
                          className="form-checkbox"
                        />
                        <label htmlFor="billing_same" className="ml-2">
                          I agree to the{" "}
                          <Link className="underline text-blue-600">
                            Terms & Conditions
                          </Link>{" "}
                          and{" "}
                          <Link className="underline text-blue-600">
                            Shopping Policy.
                          </Link>
                        </label>
                      </div>
                      {errors.billing_same && (
                        <span className="text-red-500 text-sm">
                          {errors.billing_same}
                        </span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-5 text-right">
                      <button
                        type="submit"
                        disabled={!formData.billing_same}
                        className={`text-white font-bold py-2 px-4 rounded ${
                          formData.billing_same
                            ? "bg-blue-500 hover:bg-blue-700"
                            : "bg-gray-300 cursor-not-allowed"
                        }`}
                      >
                        Place an Order
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckOut;
