import React, { useState } from 'react';
import Footer from '../Footer/Footer';

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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPoint, setSelectedPoint] = useState<number | null>(null);

    const circleData = {
        0: { title: 'Discover and Assess', description: 'The first step in this journey is to analyze the business impact and opportunities, including where the organization is today and the results needed to achieve tomorrow.' },
        1: { 
            title: 'Edge to Cloud Enablement', 
            description: <>
                At Kalypso we combined vision and technology to deliver Industrial IoT technical expertise and delivery capability.
                <br /><br />
                We started with a proof-of-value at Milwaukee’s 100C contactor line where we collected, analyzed and pushed data to the Cloud using OptixEdge Advanced Edge Gateway and FactoryTalk Optix.​
            </> 
        },
        2: { 
            title: 'Enterprise IT/OT Convergence', 
            description: <>
                While edge devices provide insights for critical decision-making, OT data is often unstructured, fragmented, proprietary, and not easily integrated with IT enterprise architectures.​
                <br /><br />
                Using FactoryTalk DataMosaix we brought IT, OT and engineering technology data together which enables the convergence of OT data from the factory floor with IT data in the cloud. This leads to data-driven decision-making that can impact the entire value chain.​
            </> 
        },
        3: { title: 'AI Readiness Strategy', description: <>
            Manufacturers are finding that success in AI starts with
            the right foundation-products with native AI and a
            professional services team that has capabilities in
            strategy, use case prioritization, data architecture,
            implementation, and scalability. <br></br><br></br>

            We enabled AI use cases by driving company-wide 
            strategic alignment. <br></br><br></br>
        </>
         },
        4: { title: 'Industrial DataOps + AI Implementation', description: 
            <>
            By using industrial internet of things (IIoT), machine learning, predictive
            analytics and generative AI to collect and analyze data from production
            systems, manufacturers can automate repetitive tasks, optimize resource and
            energy usage, empower workers and improve productivity. <br></br>

            We enabled moving toward autonomy with Industrial AI and data science by 
            making data available, meaningful, useful and valuable. <br></br>
            </>
        },
        5: { title: 'Global Scale-Up', description: 
            <>
            Recent research shows that just 25% of Industry 4.0 use cases are fully rolled
            out or used extensively at manufacturers today. <br></br>

            A true digital strategy and plan require a comprehensive, integrated yet
            practical approach, combining new technology, skills and capabilities
            supported by effective organizational change management. <br></br>

            We leveraged our proven value-first approach, human-centric organizational
            change management and our rapid results methodology to deliver successful
            global scale-up of digital transformation initiatives like the 100C contactor line. <br></br>
            </>
         },
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
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8 gap-8 justify-items-center mb-2">
                {points.map((item, idx) => (
                    <div key={idx} className="relative flex flex-col items-center justify-center flex-shrink-0">
                        <div
                            onClick={() => {
                                setIsModalOpen(true);
                                setSelectedPoint(idx);
                            }}
                            className="
                            circle flex items-center justify-center rounded-full
                            hover:cursor-pointer transition-all duration-300
                            
                            w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-20 lg:h-20 xl:w-24 xl:h-24 2xl:w-56 2xl:h-56
                            
                            bg-gradient-to-r from-[#62ccef] to-[#84e291] relative">
                            <span className="text-white text-center font-semibold px-0.5 sm:px-1 text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-xs leading-tight 2xl:text-xl">
                                {item.label}
                            </span>
                            <div className="
                                absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1
                                flex items-center justify-center rounded-full border-2 border-white bg-white shadow-lg z-10
                                
                                w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-14 2xl:h-14">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="3"
                                    stroke="#6b7280"
                                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 xl:w-3.5 xl:h-3.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && selectedPoint !== null && (
                <div 
                    className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center p-4 bg-black/50"
                    onClick={handleModalBackdropClick}
                    style={{
                        margin: 0,
                        width: '100%',
                        height: '100vh',
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
                        relative w-full max-w-7xl max-h-[100%] mx-auto ml-4 mr-4
                        transition-all duration-300
                        scale-100 opacity-100
                        animate-modal-in
                    ">
                        <div className="relative rounded-lg shadow-lg" style={{
                            background: "white",
                        }}>
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-300">
                                <h3 className="text-2xl font-semibold text-black">
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
                            <div className="p-6">
                                {selectedPoint === 0 && (
                                    <div>
                                        <div className="flex items-start gap-6 lg:text-lg xl:text-xl 2xl:text-2xl text-left">
                                            {circleData[selectedPoint as keyof typeof circleData].description}
                                        </div>
                                        <img src={`${process.env.PUBLIC_URL}/discover.png`} alt="Discover Illustration" className="max-w-full h-auto" />
                                    </div>
                                )}
                                {selectedPoint === 1 && (
                                    <div className="flex flex-row items-center">
                                        <div className="w-3/4">
                                            <div className="flex items-start lg:text-lg xl:text-xl 2xl:text-2xl text-left">
                                                {circleData[selectedPoint as keyof typeof circleData].description}
                                            </div>
                                        </div>
                                        <div className="w-1/4 flex justify-center">
                                            <img src={`${process.env.PUBLIC_URL}/pop1.png`} alt="Enable Data Illustration" className="max-w-full h-auto" />
                                        </div>
                                    </div>
                                )}
                                {selectedPoint === 2 && (
                                    <div className="flex flex-row items-center">
                                        <div className="w-3/4">
                                            <div className="flex items-start lg:text-lg xl:text-xl 2xl:text-2xl text-left">
                                                {circleData[selectedPoint as keyof typeof circleData].description}
                                            </div>
                                        </div>
                                        <div className="w-1/4 flex justify-center">
                                            <img src={`${process.env.PUBLIC_URL}/enterprise.png`} alt="Enterprise Illustration" className="max-w-full h-auto" />
                                        </div>
                                    </div>
                                )}
                                {selectedPoint === 3 && (
                                    <div className="flex flex-row items-center">
                                        <div className="w-3/4">
                                            <div className="flex items-start lg:text-lg xl:text-xl 2xl:text-2xl text-left">
                                                {circleData[selectedPoint as keyof typeof circleData].description}
                                            </div>
                                        </div>
                                        <div className="w-1/4 flex justify-center">
                                            <img src={`${process.env.PUBLIC_URL}/ai.png`} alt="AI Illustration" className="max-w-full h-auto" />
                                        </div>
                                    </div>
                                )}
                                {selectedPoint === 4 && (
                                    <div>
                                        <div className="flex items-start gap-6 lg:text-lg xl:text-xl 2xl:text-2xl text-left">
                                            {circleData[selectedPoint as keyof typeof circleData].description}
                                        </div>
                                        <img src={`${process.env.PUBLIC_URL}/industrial.png`} alt="Industrial DataOps + AI Illustration" className="max-w-full h-auto" />
                                    </div>
                                )}
                                {selectedPoint === 5 && (
                                    <>
                                        <div className="flex flex-row items-center">
                                            <div className="w-3/4">
                                                <div className="flex items-start lg:text-lg xl:text-xl 2xl:text-2xl text-left">
                                                    {circleData[selectedPoint as keyof typeof circleData].description}
                                                </div>
                                            </div>
                                            <div className="w-1/4 flex justify-center">
                                                <img src={`${process.env.PUBLIC_URL}/human.png`} alt="Human centered approach Illustration" className="max-w-full h-auto" />
                                            </div>
                                        </div>
                                        <div className="flex justify-center w-2/4 mx-auto">
                                            <img src={`${process.env.PUBLIC_URL}/global.png`} alt="Global Scale-Up Illustration" className="max-w-full h-auto mt-4" />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};


const sections: SectionData[] = [
    {
        id: 'view-1',
        title: 'Welcome to our Digital Core Solutions experience.',
        content: (
          <>
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl xl:mb-2 2xl:text-5xl font-extrabold text-black 2xl:mb-6 leading-loose 2xl:mt-8 xl:mt-2">Welcome to our<br></br> Digital Scalable Solutions experience.</h3>  
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-3xl max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-5xl font-light text-center aligning-center leading-loose">
                In just a few minutes, you will discover how we accelerated future innovation by investing in leveraging data and AI to empower engineers, reduce downtime, and optimize production for Rockwell Automation's 100C production line. 
            </p>
            <div className="mt-6 w-full h-64 sm:h-80 md:h-56 xl:h-[200px] 2xl:h-[680px] 2xl:mt-6  justify-center items-center">
                <img src={`${process.env.PUBLIC_URL}/line.jpg`} alt="Overview Illustration" className="w-full h-full object-cover" />
            </div>
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
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-5xl font-extrabold text-black text-left leading-loose mt-6" style={{ background: 'linear-gradient(180deg, #84e291, #21a1d3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Enable Data</h3>
                <div className="flex flex-row items-center">
                  <div className='xl:w-3/4 2xl:w-3/4'>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-4xl max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-5xl font-light text-left aligning-left leading-loose">
                        Every transformation journey starts with<br></br> collecting the right information. <br></br><br></br> But data acquisition and monitoring are<br></br> only the first steps.<br></br><br></br><br></br><br></br><br></br><br></br>
                    </p>
                  </div>
                        <br></br><br></br>
                        <div className='xl:w-1/2 2xl:w-1/2 flex justify-center mt-16'>
                            <video autoPlay muted loop className="max-w-full h-auto">
                                <source src={`${process.env.PUBLIC_URL}/enable.mp4`} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
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
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-5xl font-extrabold text-black text-right leading-loose xl:mb-6 2xl:mb-0" style={{ background: 'linear-gradient(180deg, #84e291, #21a1d3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Contextualize</h3>
                <div className="flex flex-row items-center">
                    <div className='xl:w-1/2 2xl:w-1/2 flex justify-center mt-2'>
                        <video autoPlay muted loop className="max-w-full h-auto">
                        <source src={`${process.env.PUBLIC_URL}/image1.mp4`} type="video/mp4" />
                        Your browser does not support the video tag.
                        </video>
                    </div>
                    <div className='xl:w-3/4 2xl:w-3/4'>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-4xl max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-5xl font-light text-right aligning-right leading-loose">
                            Bringing data from IT systems, visual media, manuals, engineering diagrams, and OT together to make data-driven decisions and react immediately. <br></br>But we wanted to go beyond being reactive. <br></br><br></br><br></br><br></br><br></br><br></br>
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
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-5xl font-extrabold text-black text-left leading-loose mt-24 xl:mb-2 2xl:mb-8" style={{ background: 'linear-gradient(180deg, #84e291, #21a1d3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Accelerate Innovation with AI</h3>
                <div className="flex flex-row items-center">
                  <div className='xl:w-3/4 2xl:w-3/4'>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-4xl max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-5xl font-light text-left aligning-left leading-loose">
                        The real value behind using data is in strategically applying AI and Machine Learning algorithms that leverage all that consolidated information to predict behavior and accelerate root cause analysis. <br></br>The engineering team can now proactively overcome challenges before they become a problem. <br></br><br></br><br></br><br></br><br></br><br></br>
                    </p>
                  </div>
                                    <div className='xl:w-1/2 2xl:w-1/2 flex justify-center'>
                                        <video autoPlay muted loop className="max-w-full h-auto">
                                            <source src={`${process.env.PUBLIC_URL}/image6.mp4`} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
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
                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-4xl max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-5xl font-light leading-relaxed text-center">
                    With Kalypso, we've proven value and scaled up this initiative to deliver results across the Connected Enterprise.
                </p>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-5xl max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-5xl font-bold leading-loose xl:mb-6 xl:mt-4 2xl:mb-16 2xl:mt-14 text-center">
                    This is how we did it:
                </p>
                <ScalableDigitalSolutions
                title="Scalable Digital Solutions"
                imageSrc={`${process.env.PUBLIC_URL}/bom.gif`}
                points={[
                    { label: <>Discover and Assess</> },
                    { label: <>Edge to Cloud<br />Enablement</> },
                    { label: <>Enterprise IT/OT<br />Convergence</> },
                    { label: <>AI Readiness<br />Strategy</> },
                    { label: <>Industrial DataOps +<br />AI Implementation</> },
                    { label: <>Global<br />Scale-Up</> },
                ]}
                />
            </>
        ),
        color: 'white',
        textColor: 'text-gray-800'
    },
{
        id: 'view-6',
        title: 'Results',
        content: (
            <>
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-5xl max-w-full font-bold leading-loose xl:mb-4 2xl:mb-8  text-center">What we have achieved</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:gap-24 2xl:gap-32 w-full max-w-6xl xl:p-12 2xl:p-24 rounded-lg" style={{ background: 'linear-gradient(90deg, #026299ff 0%,  #187dc0ff 60%, #21a1d3 100%)' }}>
                    <div className="flex flex-col items-center text-white">
                        <div className="flex flex-row items-center justify-center 2xl:h-[150px] xl:h-[70px]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="xl:size-12 2xl:size-28">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
                            </svg>
                            <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-3xl font-light text-left ml-4 leading-loose">
                                10% Reduced unplanned downtime 
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center 2xl:h-[150px] xl:h-[70px]">
                        <div className="flex flex-row items-center text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="xl:size-12 2xl:size-20">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-3xl font-light text-left ml-4 leading-loose">
                                25% Lower M&R costs
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center 2xl:h-[150px] xl:h-[70px]">
                        <div className="flex flex-row items-center text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="xl:size-12 2xl:size-28">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-3xl font-light text-left ml-4 leading-loose">
                                20% Reduced spares & inventory
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center 2xl:h-[150px] xl:h-[70px]">
                        <div className="flex flex-row items-center text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="xl:size-12 2xl:size-28">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                            </svg>
                            <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-3xl font-light text-left ml-4 leading-loose">
                                55% FTE Time Efficiency
                            </p>
                        </div>
                    </div>
                </div>
            </>
        ),
        color: 'white',
        textColor: 'text-gray-900',
        alignment: 'center'
    }
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
                    background-color: #eaebebff; 
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background-color: #f9fafb;
                }
            `}</style>

            {sections.map((section, index) => (
                <section
                    key={section.id}
                    id={section.id}
                    className={`h-full w-full flex flex-col items-center justify-center p-4 md:p-8 snap-start transition-all duration-300 bg-${section.color} ${section.textColor}`}
                    onClick={() => handleScrollToSection(section.id)}
                >
                    <div className={`text-${section.alignment || 'center'} max-w-8xl px-2 max-h-full flex flex-col justify-center align-center overflow-hidden`}>
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
