import React, { useState } from 'react';
import Footer from '../Footer/Footer';
import './SectionStyles.css';

interface OverviewProps {
  handleSectionChange?: (section: string) => void;
  currentSection?: string;
  navigationHistory?: string[];
  onBackClick?: () => void;
}

const Overview: React.FC<OverviewProps> = ({ 
  handleSectionChange = () => {},
  currentSection = 'overview',
  navigationHistory = [],
  onBackClick
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);

  const circleData = {
    0: {
      title: "Industrial IoT",
      description: "Connect, monitor, and manage industrial equipment and processes through intelligent sensors and connectivity solutions. Enable real-time visibility into operational performance and equipment health.",
      image: "/logo-create.webp",
      alt: "Industrial IoT Solution"
    },
    1: {
      title: "Digital Twin",
      description: "Create virtual representations of physical assets and processes to simulate, predict, and optimize performance. Bridge the gap between the physical and digital worlds for enhanced decision-making.",
      image: "/logo-lifecycle.png", 
      alt: "Digital Twin Technology"
    },
    2: {
      title: "Data Science",
      description: "Transform raw industrial data into actionable insights using advanced analytics and machine learning techniques. Drive operational excellence through data-driven decision making.",
      image: "/logo-create.webp",
      alt: "Data Science Solutions"
    },
    3: {
      title: "Industrial AI",
      description: "Deploy artificial intelligence solutions designed specifically for industrial environments. Automate complex processes, predict failures, and optimize production efficiency.",
      image: "/logo-lifecycle.png",
      alt: "Industrial AI Technology"
    },
    4: {
      title: "What's Next for This Line",
      description: "Explore future possibilities and emerging technologies that will shape the next generation of industrial automation and digital transformation initiatives.",
      image: "/logo-create.webp",
      alt: "Future Technologies"
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPoint(null);
  };

  const handleModalBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  return (
      <div className="section-container">
      <div className="img-container">
        <div className="standard-content-container">
          <div className="flex flex-col md:flex-row items-stretch w-full gap-2 sm:gap-3 md:gap-4 lg:gap-5">
            <div className="w-full md:w-3/5 bg-white rounded-lg flex flex-col justify-center h-full p-2 sm:p-3">
              <div className="flex flex-col h-full justify-center">
                <h3 className="font-bold mb-1 sm:mb-2 md:mb-3 flex-shrink-0 text-left 
                  text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl leading-tight 2xl:text-5xl">
                  Scalable Digital Solutions
                </h3>
                <p className="
                  break-words flex-1 mb-1 sm:mb-2 md:mb-3
                  text-xs sm:text-sm md:text-base lg:text-sm xl:text-base 2xl:text-3xl text-[#666]
                  leading-relaxed text-left
                ">
                  After achieving flexible automated manufacturing for the multiple contactor deviations, leadership was ready to invest in a program that accelerated digital transformation with <strong>what&apos;s next.</strong>
                  <br /><br />
                  IT and OT convergence, Digital Twins and Industrial AI optimize production, drive sustainable growth and enable data-driven decision making, starting from the edge and across the value chain.
                </p>
              </div>
            </div>
            <div className="w-full md:w-2/5 flex items-center justify-center h-16 sm:h-16 xl:h-56 2xl:h-96">
              <div className="bg-white rounded-lg flex items-center w-full h-full p-1 sm:p-2 md:p-3">
                <img
                  src="/bom.gif"
                  alt="Arrow Down"
                  className="object-contain w-full h-full max-h-full"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-16">
            {[
              { label: <>Industrial<br />IoT</> },
              { label: <>Digital Twin</> },
              { label: <>Applications<br />of AI</> },
              { label: <>Analytics<br />and Machine<br />Learning</> },
              { label: <>What's next<br />for this Line</> }
            ].map((item, idx) => (
              <div key={idx} className="relative flex flex-col items-center justify-center flex-shrink-0">
                <div
                  onClick={() => {
                    setSelectedPoint(idx);
                    setIsModalOpen(true);
                    }}
                    className="
                    circle flex items-center justify-center rounded-full shadow-lg
                    hover:cursor-pointer hover:scale-105 transition-all duration-300
                    w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 2xl:w-48 2xl:h-48
                    bg-gradient-to-r from-[#62ccef] to-[#84e291] relative
                    "
                  >
                  <span className="text-white text-center font-semibold px-0.5 sm:px-1 text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-xs leading-tight 2xl:text-xl">
                    {item.label}
                  </span>
                  <div className="
                    absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1
                    flex items-center justify-center rounded-full border-2 border-white bg-white shadow-md z-10
                    w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-14 2xl:h-14
                  ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                      stroke="#6b7280"
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 xl:w-3.5 xl:h-3.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-1 sm:mt-2 md:mt-3 xl:mt-4 2xl:mt-6 xl:p-2 2xl:p-12 rounded-lg bg-gradient-to-r from-[#219BD3] to-[#014383] flex-shrink-0">
            <h3 className="text-white font-bold mb-1 sm:mb-2 md:mb-3 text-left text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-4xl">Results:</h3>
            <div className="flex flex-col sm:flex-row items-start gap-1 sm:gap-2 md:gap-3">
              <div className="flex items-start flex-1 w-full min-w-0">
                <span className="flex items-center justify-center rounded-full bg-white flex-shrink-0
                w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-10 2xl:h-10">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#014383"
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 xl:w-3.5 xl:h-3.5 2xl:w-5 2xl:h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-white ml-1 sm:ml-2 flex-1 text-left text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm 2xl:text-xl leading-tight">
                  Residual risk profile across control categories, showing improvement through investment over time.
                </span>
              </div>
              <div className="flex items-start flex-1 w-full min-w-0">
                <span className="flex items-center justify-center rounded-full bg-white flex-shrink-0
                w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-10 2xl:h-10">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#207cb1ff"
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 xl:w-3.5 xl:h-3.5 2xl:w-5 2xl:h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-white ml-1 sm:ml-2 flex-1 text-left text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm 2xl:text-xl leading-tight">
                  Current &amp; emerging threats developed into standardized risk statements aligned to client&apos;s strategic imperatives.
                </span>
              </div>
              <div className="flex items-start flex-1 w-full min-w-0">
                <span className="flex items-center justify-center rounded-full bg-white flex-shrink-0
                w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-10 2xl:h-10">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#219BD3"
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 xl:w-3.5 xl:h-3.5 2xl:w-5 2xl:h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-white ml-1 sm:ml-2 flex-1 text-left text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm 2xl:text-xl leading-tight">
                  <span className="underline">4 to 6 week</span> project turnaround (including pre-work, workshop &amp; executive report.)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer 
        showBackButton={true} 
        handleSectionChange={handleSectionChange} 
        currentSection={currentSection} 
        navigationHistory={navigationHistory}
        onBackClick={onBackClick}
      />
        {isModalOpen && selectedPoint !== null && (
            <div 
            className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center p-4 bg-black/50"
            onClick={handleModalBackdropClick}
            style={{
              margin: 0,
              width: '100%',
              height: '100%',
              zIndex: 9999999
            }}
            >
            <style>
              {`
              body {
                overflow: hidden !important;
              }
              @keyframes modal-in {
                0% { opacity: 0; transform: scale(0.95);}
                100% { opacity: 1; transform: scale(1);}
              }
              .animate-modal-in {
                animation: modal-in 0.3s cubic-bezier(0.4,0,0.2,1);
              }
              `}
            </style>
            <div className="
              relative w-full max-w-4xl max-h-[90%] mx-auto mb-28
              transition-all duration-300
              scale-100 opacity-100
              animate-modal-in
            ">
              {/* Modal content */}
              <div className="relative rounded-lg shadow-lg" style={{
              background: "linear-gradient(90deg, #62CCEF 50px, #84E291 50%)"
              }}>
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                <h3 className="text-2xl font-semibold text-white">
                {circleData[selectedPoint as keyof typeof circleData].title}
                </h3>
                <button 
                type="button" 
                className="text-gray-400 bg-transparent hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" 
                onClick={closeModal}
                >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-6"></div>
              </div>
              </div>
            </div>
            </div>
        )}


    </div>
  );
};
export default Overview;