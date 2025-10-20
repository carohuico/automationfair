import React, { useState, useEffect } from 'react';
import Footer from '../Footer/Footer';
import { ChevronLeft, ChevronRight, Zap, Database, Globe, Cpu, Award } from 'lucide-react';
import { animateScroll as scroll } from 'react-scroll';


interface OverviewProps {
  handleSectionChange?: (section: string) => void;
  currentSection?: string;
  navigationHistory?: string[];
  onBackClick?: () => void;  
}


interface SectionData {
    id: string;
    title: string;
    content: React.ReactNode;
    color: string;
    textColor: string; 
    alignment?: 'left' | 'center' | 'right';
}

const ScalableDigitalSolutions: React.FC<{ title: string; imageSrc: string; points: { label: React.ReactNode }[] }> = ({ title, imageSrc, points }) => {
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8 gap-8 justify-items-center">
                {points.map((item, idx) => (
                    <div key={idx} className="relative flex flex-col items-center justify-center flex-shrink-0">
                        <div
                            onClick={() => {
                                // Implement modal logic here
                            }}
                            className="
                            circle flex items-center justify-center rounded-full shadow-lg
                            hover:cursor-pointer hover:scale-105 transition-all duration-300
                            
                            w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-20 lg:h-20 xl:w-24 xl:h-24 2xl:w-56 2xl:h-56
                            
                            bg-gradient-to-r from-[#62ccef] to-[#84e291] relative">
                            <span className="text-white text-center font-semibold px-0.5 sm:px-1 text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-xs leading-tight 2xl:text-xl">
                                {item.label}
                            </span>
                            <div className="
                                absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1
                                flex items-center justify-center rounded-full border-2 border-white bg-white shadow-md z-10
                                
                                w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-14 2xl:h-14">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2.5"
                                    stroke="#6b7280"
                                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 xl:w-3.5 xl:h-3.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

const sections: SectionData[] = [
    {
        id: 'view-1',
        title: 'Welcome to our Digital Core Solutions experience.',
        content: (
          <>
            <h3 className="text-lg sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold text-black mb-16">Welcome to our<br></br> Digital Scalable Solutions experience.</h3>  
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-5xl max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-5xl font-light text-center mx-auto">
                In just a few minutes, you will discover how we accelerated future innovation by investing in leveraging data and AI to empower engineers, reduce downtime, and optimize production for Rockwell Automation's 100C production line. 
            </p>
          </>
        ),
        color: 'white',
        textColor: 'text-gray-900',
        alignment: 'center'
    },
    {
        id: 'view-2',
        title: 'Enable Data',
        content: (
            <>
                <h3 className="text-lg sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-7xl font-extrabold text-black mb-12 text-left" style={{ background: 'linear-gradient(180deg, #84e291, #21a1d3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Enable Data</h3>
                <div className="flex flex-row items-center">
                  <div className='w-3/4'>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-5xl max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-5xl font-light text-left aligning-left leading-relaxed">
                        Every transformation journey starts with collecting the right information. <br></br><br></br> But data acquisition and monitoring are only the first steps.
                    </p>
                  </div>
                  <div className='w-1/4 flex justify-center'>
                    <img src="/image1.gif" alt="BOM Illustration" className="max-w-full h-auto" />
                  </div>
                </div>
            </>
        ),
        color: 'white',
        textColor: 'text-gray-900',
        alignment: 'left'
    },
    {
        id: 'view-3',
        title: 'Contextualize',
        content: (
            <>
                <h3 className="text-lg sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-7xl font-extrabold text-black mb-12 text-right" style={{ background: 'linear-gradient(180deg, #84e291, #21a1d3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Contextualize</h3>
                <div className="flex flex-row items-center">
                  <div className='w-1/4 flex justify-center'>
                      <img src="/image4.png" alt="Contextualize Illustration" className="max-w-full h-auto" />
                  </div>
                  <div className='w-3/4'>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-5xl max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-5xl font-light text-right aligning-left leading-relaxed">
                        Bringing data from IT systems, visual media, manuals, engineering diagrams, and OT together to make data-driven decisions and react immediately. <br></br>But we wanted to go beyond being reactive.
                    </p>
                  </div>
                </div>
            </>
        ),
        color: 'white',
        textColor: 'text-gray-900',
        alignment: 'left'
    },
    {
        id: 'view-4',
        title: 'Accelerate Innovation with AI',
        content: (
            <>
                <h3 className="text-lg sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-7xl font-extrabold text-black mb-12 text-left" style={{ background: 'linear-gradient(180deg, #84e291, #21a1d3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Accelerate Innovation with AI</h3>
                <div className="flex flex-row items-center">
                  <div className='w-3/4'>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-5xl max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-5xl font-light text-left aligning-left leading-relaxed">
                        The real value behind using data is in strategically applying AI and Machine Learning algorithms that leverage all that consolidated information to predict behavior and accelerate root cause analysis. <br></br>The engineering team can now proactively overcome challenges before they become a problem.
                    </p>
                  </div>
                  <div className='w-1/4 flex justify-center'>
                    <img src="/image6.gif" alt="AI Innovation Illustration" className="max-w-full h-auto" />
                  </div>
                </div>
            </>
        ),
        color: 'white',
        textColor: 'text-gray-900',
        alignment: 'left'
    },
    {
        id: 'view-5',
        title: 'This is how we did it:',
        content: (
            <>
            <div className="flex flex-col items-center justify-center h-full">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl 2xl:text-5xl max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-5xl font-light leading-relaxed mb-4 text-center">
                    With Kalypso, we've proven value and scaled up this initiative to deliver results across the Connected Enterprise.
                </p>
                <p className="sm:text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-5xl max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-5xl font-bold leading-relaxed mb-4 text-center">
                    This is how we did it:
                </p>
                <ScalableDigitalSolutions
                title="Scalable Digital Solutions"
                imageSrc="/bom.gif"
                points={[
                    { label: <>Discovery & Value<br />Assessment</> },
                    { label: <>Edge to Cloud<br />Enablement</> },
                    { label: <>Enterprise IT/OT<br />Convergence</> },
                    { label: <>AI Readiness<br />Strategy</> },
                    { label: <>Industrial DataOps +<br />AI Implementation</> },
                    { label: <>Global<br />Scale-Up</> },
                ]}
            />
            </div>
            </>
        ),
        color: 'white',
        textColor: 'text-gray-800'
    },
];

const ScrollableView: React.FC = () => {
    
    const handleScrollToSection = (sectionId: string) => {
        const scrollContainer = document.getElementById('scrollable-views');
        const targetElement = document.getElementById(sectionId);

        if (scrollContainer && targetElement) {
            const targetPosition = targetElement.offsetTop;

            scrollContainer.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div 
            id="scrollable-views"
            className="w-full h-[80vh] overflow-y-scroll snap-y snap-mandatory bg-white custom-scrollbar rounded-lg shadow-inner"
        >
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #eaebebff; /* gray-300 */
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background-color: #f9fafb; /* gray-50 */
                }
            `}</style>

            {sections.map((section, index) => (
                <section
                    key={section.id}
                    id={section.id}
                    className={`h-full w-full flex flex-col items-center justify-center p-4 md:p-8 snap-start transition-all duration-300 bg-${section.color} ${section.textColor}`}
                    onClick={() => handleScrollToSection(section.id)}
                >
                    <div className={`text-${section.alignment || 'center'} max-w-8xl px-2 max-h-full flex flex-col justify-center overflow-hidden`}>
                        {section.content}
                    </div>
                </section>
            ))}
        </div>
    );
}



const Overview2: React.FC<OverviewProps> = ({ 
    handleSectionChange = () => {},
    currentSection = 'overview',
    navigationHistory = [],
    onBackClick
}) => {
    return (
        <div className="section-container">
            <div className="img-container">
                <div className="standard-content-container">
                    <ScrollableView />
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
}

export default Overview2;
