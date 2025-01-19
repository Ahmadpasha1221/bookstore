import { Heart, Menu, Search, ShoppingCart, User } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/avatar.png";
import { useSelector } from "react-redux";
import { useAuth } from "../context/provider";
const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [isDropDown, setIsDropDown] = useState(false);
  const Dropdown = [
    { name: "dashboard", href: "/" },
    { name: "Orders", href: "/orders" },
    { name: "Cart Page", href: "/cart" },
    { name: "Checkout", href: "/checkout" },
    { name: "Logout", onclick: () => logout() },
  ];
  const cartItems = useSelector((state) => state.cart.cartItems);
  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-6">
      <nav className=" flex justify-between items-center">
        <div className="flex items-center md:gap-16 gap-4">
          <Link to="/">
            <Menu />
          </Link>
          <div className="relative  sm:w-72 w-40 space-x-2">
            <Search className="absolute inline-block left-3 inset-y-2 size-4" />
            <input
              type="text"
              placeholder="Type Here"
              className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 round-md focus:outline-none"
            />
          </div>
        </div>
        <div className="relative flex items-center md:space-x-3 space-x-2">
          <div>
            {currentUser ? (
              <>
                <button onClick={() => setIsDropDown(!isDropDown)}>
                  <img
                    src={avatar}
                    alt="avatar image"
                    className="`size-7 rounded-full ${currentUser ? 'ring-2 ring-blue-500' : ''}`"
                  />
                </button>
                {isDropDown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                    <ul className="py-2">
                      {Dropdown.map((item) => (
                        <li
                          key={item.name}
                          onClick={() => {
                            setIsDropDown(false);
                            if (item.onclick) item.onclick();
                          }}
                        >
                          {item.href ? (
                            <Link
                              to={item.href}
                              className="block px-4 py-2 text-sm hover:bg-gray-100"
                            >
                              {item.name}
                            </Link>
                          ) : (
                            <button className="block w-full text-start px-4 py-2 text-sm hover:bg-gray-100">
                              {item.name}
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <User className="size-5" />
              </Link>
            )}
          </div>

          <button className="hidden sm:block">
            <Heart className="size-5" />
          </button>
          <Link
            to="/cart"
            className="bg-primary p-1 sm:px-6 px-2 flex items-center rounded-md "
          >
            <ShoppingCart className="size-4" />
            {cartItems.length > 0 && (
              <span className="text-sm font-semibold sm:ml-1">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
