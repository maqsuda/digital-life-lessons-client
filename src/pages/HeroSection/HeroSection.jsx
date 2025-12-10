import React from "react";
import img1 from "../../assets/image1.jpg";
import img2 from "../../assets/image2.jpg";
import img3 from "../../assets/image3.jpg";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HeroSection = () => {
  return (
    <Carousel autoPlay={true} interval={3000} infiniteLoop={true}>
      <div>
        <img src={img1} className=" rounded-2xl p-2 " />
      </div>
      <div>
        <img src={img2} className=" rounded-2xl p-2" />
      </div>
      <div>
        <img src={img3} className=" rounded-2xl p-2" />
      </div>
    </Carousel>
  );
};

export default HeroSection;
