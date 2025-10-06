import React from 'react';
import './SectionStyles.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Slides: React.FC = () => {
  return (
    <div className="section-container">
      <div className="img-container">
        <div className="standard-content-container">
          <div className="carousel-container">
            <style>
            {`
              .carousel .control-dots .dot {
              width: 16px !important;
              height: 16px !important;
              }
            `}
            </style>
            <Carousel showThumbs={false} infiniteLoop>
            <div>
              <img src="/slide1.PNG" alt="Slide 1" className="section-image" />
            </div>
            {/* <div>
              <img src="/slide2.png" alt="Slide 2" className="section-image" />
            </div> */}
            <div>
              <img src="/slide3.PNG" alt="Slide 3" className="section-image" />
            </div>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slides;