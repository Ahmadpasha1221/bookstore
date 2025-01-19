import React from "react";
import footer from "../assets/footer-logo.png";
import { Facebook, Instagram, Twitter } from "lucide-react";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="w-full md:w-1/2">
          <img src={footer} className="w-36 mb-5" />
          <ul className="flex flex-col md:flex-row gap-4">
            <li>
              <a href="#home" className="hover:text-primary">
                Home
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-primary">
                Services
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-primary">
                About Us
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-primary">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="md:w-1/2 w-full">
          <p className="mb-5"></p>
          <div className="flex">
            <input
              className="text-black w-full px-4 py-2 rounded-l-md"
              placeholder="Enter your email"
            />
            <button className="bg-primary px-6 py-1 rounded-r-md hover:bg-primary-dark">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center mt-10 border-t border-gray-700 pt-6">
        {/* Left Side - Privacy Links */}
        <ul className="flex gap-6 mb-4 md:mb-0">
          <li>
            <a href="#privacy" className="hover:text-primary">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#terms" className="hover:text-primary">
              Terms of Service
            </a>
          </li>
        </ul>

        {/* Right Side - Social Icons */}
        <div className="flex gap-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <Facebook />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <Twitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <Instagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
