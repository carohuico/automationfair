import React, { useState } from 'react';
import Footer from '../Footer/Footer';
import './SectionStyles.css';

const Overview: React.FC = () => {
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
    <div className="section-container relative" style={{paddingLeft: '5%', paddingTop: '5%', paddingRight: '5%', paddingBottom: '5%'}}>
        <div className="flex items-stretch w-full mb-8 gap-8 h-[35vh]">
          <div className="w-3/5 bg-white p-3 rounded-lg flex flex-col justify-center h-full" style={{ boxShadow: '0 0 20px 8px rgba(0, 0, 0, 0.15)' }}>
            <div className="flex flex-col h-full justify-center">
              <h3 className="text-xl md:text-3xl lg:text-4xl font-bold mb-2 flex-shrink-0">Station Based Digital Solutions</h3>
              <p className="text-[10px] md:text-xs lg:text-sm leading-tight break-words flex-1">
                After achieving flexible automated manufacturing for the multiple contactor deviations, leadership was ready to invest in a program that accelerated digital transformation with <strong>what's next.</strong>
                <br />
                IT and OT convergence, Digital Twins and Industrial AI optimize production, drive sustainable growth and enable data-driven decision making, starting from the edge and across the value chain.
              </p>
            </div>
          </div>
          <div className="w-2/5 flex items-center justify-end h-full">
            <div className="bg-white p-4 rounded-lg flex items-center w-full h-full" style={{ boxShadow: '0 0 20px 8px rgba(0, 0, 0, 0.15)' }}>
              <img
                src="/bom.png"
                alt="Arrow Down"
                className="object-contain w-full h-full max-h-full"
                style={{ aspectRatio: '2/1' }}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 lg:gap-20 mt-2">
            {[
                { label: <>Industrial<br />IoT</> },
                { label: <>Digital<br />Twin</> },
                { label: <>Data<br />Science</> },
                { label: <>Industrial<br />AI</> },
                { label: <>What's next for this line</> }
            ].map((item, idx) => (
                <div key={idx} className="relative flex flex-col items-center mb-8">
                    <div
                        onClick={() => {
                            setSelectedPoint(idx);
                            setIsModalOpen(true);
                          }}
                          className="
                            circle flex items-center justify-center rounded-full shadow-xl
                            w-[80px] h-[80px]
                            sm:w-[100px] sm:h-[100px]
                            md:w-[140px] md:h-[140px]
                            lg:w-[150px] lg:h-[150px]
                            xl:w-[200px] xl:h-[200px]
                            hover:cursor-pointer
                            hover:scale-105
                            transition-transform duration-300
                          "
                          style={{
                            background: "linear-gradient(90deg, #21a1d3 0%, #84e291 100%)",
                            position: "relative",
                            maxWidth: '100vw'
                          }}
                        >
                        <span className="
                            text-white text-center font-bold px-1
                            text-base
                            sm:text-lg
                            md:text-xl
                            lg:text-2xl
                            xl:text-3xl
                        ">
                            {item.label}
                        </span>
                        <div
                          className="
                            absolute
                            -bottom-2 -right-2
                            w-5 h-5
                            sm:w-6 sm:h-6
                            md:w-12 md:h-12
                            lg:w-16 lg:h-16
                            flex items-center justify-center
                            rounded-full
                            border border-white
                            bg-[#ffffff]
                            shadow-lg
                            z-10
                          "
                          style={{
                            boxShadow: '0 4px 16px 0 rgba(33, 161, 211, 0.4), 0 2px 8px 0 rgba(0,0,0,0.15)'
                          }}
                        >
                          <span
                            style={{
                              color: "#6b7280",
                              fontWeight: "bold"
                            }}
                            className="
                              text-base
                              sm:text-lg
                              md:text-xl
                              lg:text-2xl
                            "
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                              strokeWidth="3" stroke="currentColor"
                              className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-8 lg:h-8"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                          </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div className="mt-2 p-4 rounded-lg" style={{ background: 'linear-gradient(to right, #219BD3, #014383)' }}>
            <h3 className="text-white font-bold mb-2 text-xl sm:text-xl md:text-2xl lg:text-3xl">Results:</h3>
            <div className="flex flex-col md:flex-row items-start gap-2 md:gap-4">
            <div className="flex items-start flex-1">
                <span className="flex items-center justify-center rounded-full bg-white" style={{ width: 40, height: 40, minWidth: 40, minHeight: 40 }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#014383" className="w-7 h-7 md:w-8 md:h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                </span>
                <span className="text-white text-lg sm:text-xl md:text-xl lg:text-2xl ml-3">
                Residual risk profile across control categories, showing improvement through investment over time.
                </span>
            </div>
            <div className="flex items-start flex-1">
                <span className="flex items-center justify-center rounded-full bg-white" style={{ width: 40, height: 40, minWidth: 40, minHeight: 40 }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#207cb1ff" className="w-7 h-7 md:w-8 md:h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                </span>
                <span className="text-white text-lg sm:text-xl md:text-xl lg:text-2xl ml-3">
                Current &amp; emerging threats developed into standardized risk statements aligned to client&apos;s strategic imperatives.
                </span>
            </div>
            <div className="flex items-start flex-1">
                <span className="flex items-center justify-center rounded-full bg-white" style={{ width: 40, height: 40, minWidth: 40, minHeight: 40 }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#219BD3" className="w-7 h-7 md:w-8 md:h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                </span>
                <span className="text-white text-lg sm:text-xl md:text-xl lg:text-2xl ml-3">
                <span className="underline">4 to 6 week</span> project turnaround (including pre-work, workshop &amp; executive report.)
                </span>
            </div>
            </div>
        </div>

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

        <Footer showBackButton={true} />
    </div>
  );
};
export default Overview;