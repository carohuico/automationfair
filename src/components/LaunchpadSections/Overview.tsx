import React, { useState } from 'react';
import Footer from '../Footer/Footer';
import './SectionStyles.css';

interface OverviewProps {
  handleSectionChange?: (section: string) => void;
  currentSection?: string;
}

const Overview: React.FC<OverviewProps> = ({ 
  handleSectionChange = () => {},
  currentSection = 'overview'
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
    <div className="section-container p-2 sm:p-4 lg:p-6 xl:p-8">
        <div className="bg-white rounded-lg shadow-2xl p-4 sm:p-5 lg:p-4 xl:p-8">
            <div className="flex flex-col lg:flex-row items-stretch w-full gap-4 lg:gap-8 h-auto lg:h-40 xl:h-60 2xl:h-80 mb-4 lg:mb-8">
            <div className="w-full lg:w-3/5 bg-white rounded-lg flex flex-col justify-center h-full p-2 sm:p-2 md:p-2 lg:p-3">
          <div className="flex flex-col h-full justify-center">
          <h3 className="font-bold mb-2 sm:mb-1 md:mb-1 lg:mb-2 xl:mb-4 flex-shrink-0 mt-8
            text-xl sm:text-sm md:text-base lg:text-base xl:text-xl 2xl:text-2xl leading-tight">
            Station Based Digital Solutions
          </h3>
            <p
              className="
                leading-relaxed break-words flex-1 mb-4
                text-base text-[#666] 
                md:text-sm md:mb-5 
                lg:text-sm lg:mb-2 
                xl:text-lg xl:mb-8 
                2xl:text-3xl 2xl:mb-10
              "
            >
              After achieving flexible automated manufacturing for the multiple contactor deviations, leadership was ready to invest in a program that accelerated digital transformation with <strong>what&apos;s next.</strong>
              <br />
              IT and OT convergence, Digital Twins and Industrial AI optimize production, drive sustainable growth and enable data-driven decision making, starting from the edge and across the value chain.
            </p>
          </div>
            </div>
            <div className="w-full lg:w-2/5 flex items-center justify-center lg:justify-end h-full">
              <div className="bg-white rounded-lg flex items-center w-full h-full p-2 sm:p-4 lg:p-6">
                <img
                  src="/bom.png"
                  alt="Arrow Down"
                  className="object-contain w-full h-full max-h-full aspect-[2/1]"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-2 md:gap-4 lg:gap-6 xl:gap-8 2xl:gap-12 mt-2 lg:mt-4 min-h-[200px] sm:min-h-[250px] lg:min-h-[100px] 2xl:mt-2">
              {[
                  { label: <>Industrial<br />IoT</> },
                  { label: <>Digital<br />Twin</> },
                  { label: <>Data<br />Science</> },
                  { label: <>Industrial<br />AI</> },
                  { label: <>What's next for this line</> }
              ].map((item, idx) => (
                  <div key={idx} className="relative flex flex-col items-center justify-center flex-shrink-0">
                      <div
                          onClick={() => {
                              setSelectedPoint(idx);
                                setIsModalOpen(true);
                              }}
                              className="
                                circle flex items-center justify-center rounded-full shadow-2xl
                                hover:cursor-pointer hover:scale-105 transition-all duration-300
                                w-14 h-14 sm:w-16 sm:h-16 md:w-16 md:h-16 lg:w-24 lg:h-24 xl:w-32 xl:h-32 2xl:w-48 2xl:h-48
                                bg-gradient-to-r from-[#21a1d3] to-[#84e291] relative
                              "
                              >
                            <span className="text-white text-center font-bold px-1 sm:px-2 text-[10px] sm:text-[10px] md:text-xs lg:text-sm xl:xl 2xl:text-3xl leading-tight">
                              {item.label}
                          </span>
                            <div
                              className="
                                absolute -bottom-1.5 -right-1.5 sm:-bottom-2 sm:-right-2
                                flex items-center justify-center rounded-full border border-white bg-white shadow-lg z-10
                                w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10 2xl:w-12 2xl:h-12
                              "
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2.2"
                                stroke="#6b7280"
                                className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                              </svg>
                            </div>
                      </div>
                  </div>
              ))}
          </div>
          <div className="mt-4 lg:mt-8 p-4 md:p-4 lg:p-4 rounded-lg bg-gradient-to-r from-[#219BD3] to-[#014383]">
              <h3 className="text-white font-bold mb-4 lg:mb-6 text-base sm:text-lg md:text-xl lg:text-base xl:text-lg 2xl:text-3xl">Results:</h3>
                <div className="flex flex-col lg:flex-row items-start gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-8">
                <div className="flex items-start flex-1 w-full">
                  <span className="flex items-center justify-center rounded-full bg-white flex-shrink-0
                  w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 2xl:w-12 2xl:h-12">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#014383"
                    className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 2xl:w-6 2xl:h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  </span>
                  <span className="text-white ml-2 sm:ml-2 md:ml-2.5 lg:ml-3 xl:ml-3 2xl:ml-3 flex-1 text-[10px] sm:text-xs md:text-sm lg:text-xs xl:text-sm 2xl:text-2xl leading-relaxed">
                  Residual risk profile across control categories, showing improvement through investment over time.
                  </span>
                </div>
                <div className="flex items-start flex-1 w-full">
                  <span className="flex items-center justify-center rounded-full bg-white flex-shrink-0
                  w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-10 2xl:h-10">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#207cb1ff"
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 xl:w-3.5 xl:h-3.5 2xl:w-5 2xl:h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  </span>
                  <span className="text-white ml-2 sm:ml-2 md:ml-2.5 lg:ml-3 xl:ml-3 2xl:ml-3 flex-1 text-[10px] sm:text-xs md:text-sm lg:text-xs xl:text-sm 2xl:text-2xl leading-relaxed">
                  Current &amp; emerging threats developed into standardized risk statements aligned to client&apos;s strategic imperatives.
                  </span>
                </div>
                <div className="flex items-start flex-1 w-full">
                  <span className="flex items-center justify-center rounded-full bg-white flex-shrink-0
                  w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 2xl:w-12 2xl:h-12">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#219BD3"
                    className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 2xl:w-6 2xl:h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  </span>
                  <span className="text-white ml-2 sm:ml-2 md:ml-2.5 lg:ml-3 xl:ml-3 2xl:ml-3 flex-1 text-[10px] sm:text-xs md:text-sm lg:text-xs xl:text-base 2xl:text-xl leading-relaxed">
                  <span className="underline">4 to 6 week</span> project turnaround (including pre-work, workshop &amp; executive report.)
                  </span>
                </div>
                </div>
          </div>

        </div>
                  
          <Footer showBackButton={true} handleSectionChange={handleSectionChange} currentSection={currentSection} />

        {isModalOpen && selectedPoint !== null && (
            <div 
            className="absolute top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={handleModalBackdropClick}
            style={{
              margin: 0,
              width: '100%',
              height: '100%'
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