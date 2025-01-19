import React, { useEffect, useState } from "react";
import BookCard from "../../components/BookCard";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { useFetchAllBooksQuery } from "../../redux/features/books/bookapi";

const TopSellers = () => {
  const { data: books = [] } = useFetchAllBooksQuery();

  const [changeCategory, setChangeCategory] = useState("Choose a genre");
  const filteredCategoryDetails =
    changeCategory === "Choose a genre"
      ? books
      : books.filter((item) => {
          return item.category === changeCategory.toLowerCase();
        });
  console.log(filteredCategoryDetails);

  const category = [
    "Choose a genre",
    "Business",
    "Fiction",
    "Horror",
    "Adventure",
  ];

  return (
    <div className="py-10">
      <h2 className="text-3xl font-semibold mb-6">Top Sellers</h2>
      <div className="mb-8 flex items-center">
        <select
          onChange={(e) => setChangeCategory(e.target.value)}
          id="category"
          name="category"
          className="border bg-[#EAEAEA] rounded-md border-gray-300 focus:outline-none px-4 py-2"
        >
          {category.map((categoryitem, index) => (
            <option key={index} value={categoryitem}>
              {categoryitem}
            </option>
          ))}
        </select>
      </div>
      <Swiper
        navigation={true}
        slidesPerView={1}
        spaceBetween={30}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1118: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {filteredCategoryDetails.length > 0 &&
          filteredCategoryDetails.map((book, index) => (
            <SwiperSlide key={index}>
              <BookCard book={book} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default TopSellers;
