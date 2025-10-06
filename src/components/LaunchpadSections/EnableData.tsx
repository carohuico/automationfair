import React from 'react';
import './SectionStyles.css';
import Footer from '../Footer/Footer';

interface EnableDataProps {
  handleSectionChange?: (section: string) => void;
  currentSection?: string;
  navigationHistory?: string[];
  onBackClick?: () => void;
}

const EnableData: React.FC<EnableDataProps> = ({ 
  handleSectionChange = () => {},
  currentSection = 'enable-data',
  navigationHistory = [],
  onBackClick
}) => {
  const [hoveredPoint, setHoveredPoint] = React.useState<number | null>(null);
  const [hoverTimeout, setHoverTimeout] = React.useState<NodeJS.Timeout | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedPoint, setSelectedPoint] = React.useState<number | null>(null);

  // Datos de cada punto
  const pointData = {
    1: {
      title: "Sensor",
      description: "Enable data Collection from line systems",
      image: "/sensor.webp",
      alt: "Sensor"
    },
    2: {
      title: "PLC Controller", 
      description: "Line System",
      image: "/plc.webp",
      alt: "PLC"
    },
    3: {
      title: "Cameras",
      description: "Vision AI for quality inspection", 
      image: "/camera.jpg",
      alt: "Camera"
    }
  };

  const handleMouseEnter = (pointNumber: number) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setHoveredPoint(pointNumber);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredPoint(null);
    }, 300); 
    setHoverTimeout(timeout);
  };

  const handlePopoverMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  const handlePopoverMouseLeave = () => {
    setHoveredPoint(null);
  };

  const openModal = (pointNumber: number) => {
    setSelectedPoint(pointNumber);
    setHoveredPoint(null); 
    if (hoverTimeout) {
      clearTimeout(hoverTimeout); 
      setHoverTimeout(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPoint(null);
  };

  const handleModalBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="section-container">
      {/* Modal */}
      {isModalOpen && selectedPoint && (
        <div 
          className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={handleModalBackdropClick}
        >
          <div className="relative w-full max-w-2xl max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow-lg">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                <h3 className="text-2xl font-semibold text-gray-900">
                  {pointData[selectedPoint as keyof typeof pointData].title}
                </h3>
                <button 
                  type="button" 
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" 
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
                <div className="flex items-start gap-6">
                  <div className="w-32 h-32 bg-white rounded-lg flex-shrink-0 overflow-hidden border border-gray-200">
                    <img 
                      src={pointData[selectedPoint as keyof typeof pointData].image} 
                      alt={pointData[selectedPoint as keyof typeof pointData].alt} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-lg leading-relaxed text-gray-700 mb-4">
                      {pointData[selectedPoint as keyof typeof pointData].description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      
      <div className="img-container">
          <img src="/line.jpg" alt="Enable Data slide" />

          
          {/* Punto 1 */}
          <div
            className="pulse-point-1"
            onMouseEnter={() => handleMouseEnter(1)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="static-point" onClick={() => openModal(1)}></div>
            {hoveredPoint === 1 && (
                <div 
                  data-popover 
                  id="popover-sensor" 
                  role="tooltip" 
                  className="absolute inline-block w-[28rem] h-[8rem] text-sm bg-black/80 backdrop-blur-sm border border-gray-600 rounded-lg shadow-2xl opacity-100 overflow-hidden -top-36 -left-56 cursor-pointer"
                  style={{zIndex: 999}}
                  onMouseEnter={handlePopoverMouseEnter}
                  onMouseLeave={handlePopoverMouseLeave}
                  onClick={() => openModal(1)}
                >
                <div className="p-3 flex items-start gap-4">
                  <div className="w-24 h-24 bg-white rounded-md flex-shrink-0 overflow-hidden">
                    <img src="/sensor.webp" alt="Sensor" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-start">
                    <h3 className="text-white font-semibold text-xl text-left">Sensor</h3>
                    <p className="text-gray-300 leading-tight text-left" style={{fontSize: '1.3rem'}}>Enable data Collection from line systems</p>
                  </div>
                  <div className="flex-shrink-0 flex items-start pt-8">
                    <svg className="w-5 h-5 text-gray-400 mt-3 cursor-pointer hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                <div data-popper-arrow></div>
              </div>
            )}
          </div>

          {/* Punto 2 */}
          <div
            className="pulse-point-2"
            onMouseEnter={() => handleMouseEnter(2)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="static-point" onClick={() => openModal(2)}></div>
            {hoveredPoint === 2 && (
                <div
                data-popover
                id="popover-plc"
                role="tooltip"
                className="absolute inline-block w-[28rem] h-[8rem] text-sm bg-black/80 backdrop-blur-sm border border-gray-600 rounded-lg shadow-2xl opacity-100 overflow-hidden left-1/2 -translate-x-1/2 top-12 cursor-pointer"
                style={{ zIndex: 999 }}
                onMouseEnter={handlePopoverMouseEnter}
                onMouseLeave={handlePopoverMouseLeave}
                onClick={() => openModal(2)}
                >
                <div className="p-3 flex items-start gap-4">
                  <div className="w-24 h-24 bg-white rounded-md flex-shrink-0 flex items-center justify-center">
                  <img src="/plc.webp" alt="PLC" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-start">
                  <h3 className="text-white font-semibold text-xl text-left">PLC Controller</h3>
                  <p className="text-gray-300 leading-tight text-left" style={{ fontSize: '1.5rem' }}>Line System</p>
                  </div>
                  <div className="flex-shrink-0 flex items-start pt-8">
                  <svg className="w-5 h-5 text-gray-400 mt-3 cursor-pointer hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  </div>
                </div>
                <div data-popper-arrow className="absolute left-1/2 -translate-x-1/2 -top-2 w-4 h-4 bg-black/80 rotate-45 border-l border-t border-gray-600"></div>
                </div>
            )}
          </div>

          {/* Punto 3 */}
          <div
            className="pulse-point-3"
            onMouseEnter={() => handleMouseEnter(3)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="static-point" onClick={() => openModal(3)}></div>
            {hoveredPoint === 3 && (
              <div 
                data-popover 
                id="popover-hmi" 
                role="tooltip" 
                className="absolute inline-block w-[28rem] h-[8rem] text-sm bg-black/80 backdrop-blur-sm border border-gray-600 rounded-lg shadow-2xl opacity-100 overflow-hidden -top-36 -left-56 cursor-pointer"
                style={{zIndex: 999}}
                onMouseEnter={handlePopoverMouseEnter}
                onMouseLeave={handlePopoverMouseLeave}
                onClick={() => openModal(3)}
              >
                <div className="p-3 flex items-start gap-4">
                  <div className="w-24 h-24 rounded-md flex-shrink-0 flex items-center justify-center">
                    <img src="/camera.jpg" alt="Sensor" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-start">
                    <h3 className="text-white font-semibold text-xl text-left">Cameras</h3>
                    <p className="text-gray-300 leading-tight text-left" style={{fontSize: '1.5rem'}}>Vision AI for quality inspection</p>
                  </div>
                  <div className="flex-shrink-0 flex items-start pt-8">
                    <svg className="w-5 h-5 text-gray-400 mt-3 cursor-pointer hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                <div data-popper-arrow></div>
              </div>
            )}
          </div>
        </div>
        <Footer 
          showBackButton={true} 
          handleSectionChange={handleSectionChange} 
          currentSection={currentSection} 
          navigationHistory={navigationHistory}
          onBackClick={onBackClick}
        />
      </div>
  );
};

export default EnableData;