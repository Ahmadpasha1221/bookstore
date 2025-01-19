import React from "react";
import banner from "../../assets/banner.png";
const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12">
      <div className="w-full md:w-1/2 md:justify-end items-center">
        <img src={banner} />
      </div>
      <div className="w-full md:w-1/2 md:justify-end items-center">
        <h1 className="md:text-5xl text-2xl font-medium mb-7">
          New Releases This Week
        </h1>
        <p className="mb-10">
          It's time to update your reading list with some of the latest and
          greatest releases in the literary world. From heart-pumping thrillers
          to captivating memoirs, this week's new releases offer something for
          everyone
        </p>

        <button className="bg-primary p-1 rounded-md font-medium">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default Banner;
