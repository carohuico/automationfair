import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import Footer from '../Footer/Footer';
import {
  stationOptions,
  feederOptions,
  dateRange,
  chartTitle,
  escapementChartData,
  barChartData,
  alertsTableData,
} from './monitorProductionData';
import './SectionStyles.css';

interface MonitorProductionProps {
  handleSectionChange?: (section: string) => void;
  currentSection?: string;
  navigationHistory?: string[];
  onBackClick?: () => void;
}


type TabId = 'escapement' | 'production';

const MonitorProduction: React.FC<MonitorProductionProps> = ({
  handleSectionChange = () => {},
  currentSection = 'monitor-production',
  navigationHistory = [],
  onBackClick,
}) => {
  const [currentView, setCurrentView] = useState(0);
  const [activeTab, setActiveTab] = useState<TabId>('escapement');
  const [agentOpen, setAgentOpen] = useState(false);

  const lineChartRef = useRef<HTMLCanvasElement>(null);
  const barChartRef = useRef<HTMLCanvasElement>(null);
  const lineChartInstance = useRef<any>(null);
  const barChartInstance = useRef<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleAgent = () => {
    const next = !agentOpen;
    setAgentOpen(next);
    if (next) {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    } else {
      videoRef.current?.pause();
    }
  };

  useEffect(() => {
    if (activeTab !== 'escapement') return;
    if (!lineChartRef.current || !barChartRef.current) return;

    if (lineChartInstance.current) lineChartInstance.current.destroy();
    if (barChartInstance.current) barChartInstance.current.destroy();

    const { series, baseline, threshold, yMin, yMax, legend } = escapementChartData;

    lineChartInstance.current = new Chart(lineChartRef.current, {
      type: 'line',
      data: {
        labels: series.map((p) => p.x),
        datasets: [
          {
            label: legend.line,
            data: series.map((p) => p.y),
            borderColor: '#3b6df6',
            borderWidth: 2,
            pointRadius: 0,
            tension: 0.3,
            fill: false,
          },
          {
            label: legend.baseline,
            data: series.map(() => baseline),
            borderColor: '#2e8b57',
            borderWidth: 1.5,
            borderDash: [6, 4],
            pointRadius: 0,
            fill: false,
          },
          {
            label: legend.threshold,
            data: series.map(() => threshold),
            borderColor: '#c0392b',
            borderWidth: 1.5,
            borderDash: [6, 4],
            pointRadius: 0,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top' as const,
            align: 'end' as const,
            labels: {
              usePointStyle: true,
              pointStyle: 'line',
              boxWidth: 20,
              font: { size: 11 },
              color: '#444',
            },
          },
          tooltip: {
            enabled: true,
            mode: 'index',
            intersect: false,
          },
        },
        interaction: {
          mode: 'index',
          intersect: false,
        },
        scales: {
          x: {
            title: {
              display: true,
              text: escapementChartData.xAxisLabel,
              font: { size: 12 },
              color: '#555',
            },
            ticks: { font: { size: 11 }, color: '#666' },
            grid: { color: 'rgba(0,0,0,0.06)' },
          },
          y: {
            min: yMin,
            max: yMax,
            title: {
              display: true,
              text: escapementChartData.yAxisLabel,
              font: { size: 12 },
              color: '#555',
            },
            ticks: { font: { size: 11 }, color: '#666' },
            grid: { color: 'rgba(0,0,0,0.06)' },
          },
        },
      },
    });

    const { bars } = barChartData;
    barChartInstance.current = new Chart(barChartRef.current, {
      type: 'bar',
      data: {
        labels: bars.map((b) => b.date),
        datasets: [
          {
            label: 'Peaks',
            data: bars.map((b) => b.count),
            backgroundColor: '#3b6df6',
            borderRadius: 4,
            barThickness: 'flex' as any,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: barChartData.xAxisLabel,
              font: { size: 11 },
              color: '#555',
            },
            ticks: { font: { size: 11 }, color: '#555' },
            grid: { display: false },
          },
          y: {
            min: 0,
            max: 1.2,
            title: {
              display: true,
              text: barChartData.yAxisLabel,
              font: { size: 11 },
              color: '#555',
            },
            ticks: {
              stepSize: 0.5,
              font: { size: 11 },
              color: '#555',
            },
            grid: { color: 'rgba(0,0,0,0.06)' },
          },
        },
      },
    });

    return () => {
      lineChartInstance.current?.destroy();
      barChartInstance.current?.destroy();
    };
  }, [activeTab]);

  /* ── shared tab+agent bar ── */
  const TopBar = (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        boxSizing: 'border-box',
        marginBottom: 'clamp(6px, 1vh, 14px)',
        flexShrink: 0,
      }}
    >
      {/* LEFT: tabs */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {([
          { id: 'escapement', label: 'Escapement' },
          { id: 'production', label: 'Production' },
        ] as { id: TabId; label: string }[]).map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: 'clamp(5px, 0.6vh, 8px) clamp(12px, 1.4vw, 20px)',
                borderRadius: '8px',
                border: '2px solid #3b6df6',
                cursor: 'pointer',
                fontSize: 'clamp(11px, 1vw, 13px)',
                fontWeight: 600,
                background: isActive ? '#3b6df6' : 'transparent',
                color: isActive ? '#fff' : '#3b6df6',
                transition: 'background 0.18s, color 0.18s',
                outline: 'none',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* RIGHT: AI Agent button */}
      <button
        onClick={toggleAgent}
        title="Open AI Agent"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: 'clamp(5px, 0.6vh, 8px) clamp(10px, 1.2vw, 16px)',
          borderRadius: '8px',
          border: '2px solid #1a3ecf',
          cursor: 'pointer',
          fontSize: 'clamp(11px, 1vw, 13px)',
          fontWeight: 600,
          background: agentOpen ? '#3b6df6' : '#fff',
          color: agentOpen ? '#fff' : '#3b6df6',
          transition: 'background 0.18s, color 0.18s',
          outline: 'none',
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          if (!agentOpen) {
            (e.currentTarget as HTMLButtonElement).style.background = '#3b6df6';
            (e.currentTarget as HTMLButtonElement).style.color = '#fff';
          }
        }}
        onMouseLeave={(e) => {
          if (!agentOpen) {
            (e.currentTarget as HTMLButtonElement).style.background = '#fff';
            (e.currentTarget as HTMLButtonElement).style.color = '#3b6df6';
          }
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ width: 18, height: 18 }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
        </svg>
        Troubleshooting Agent
      </button>
    </div>
  );

  /* ── filters row (escapement only) ── */
  const FiltersRow = (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'clamp(8px, 1.5vw, 16px)',
        marginBottom: 'clamp(6px, 1vh, 14px)',
        flexShrink: 0,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
        <label style={{ fontSize: 'clamp(11px, 1vw, 13px)', fontWeight: 600, color: '#555' }}>Station</label>
        <select
          title="station"
          style={{
            padding: '5px 10px',
            border: '1px solid #ccc',
            borderRadius: '6px',
            minWidth: 'clamp(120px, 10vw, 160px)',
            background: '#fff',
            fontSize: 'clamp(11px, 1vw, 13px)',
          }}
        >
          {stationOptions.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
        <label style={{ fontSize: 'clamp(11px, 1vw, 13px)', fontWeight: 600, color: '#555' }}>Feeder</label>
        <select
          title="feeder"
          style={{
            padding: '5px 10px',
            border: '1px solid #ccc',
            borderRadius: '6px',
            minWidth: 'clamp(160px, 15vw, 240px)',
            background: '#fff',
            fontSize: 'clamp(11px, 1vw, 13px)',
          }}
        >
          {feederOptions.map((f) => (
            <option key={f}>{f}</option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
  <div
    className="section-container"
    style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
      overflow: 'hidden',
    }}
  >
    <div
      className="img-container"
      style={{
        flex: 1,
        minHeight: 0,
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      {/* MAIN CONTENT */}
      <div
        className="standard-content-container"
        style={{
          position: 'relative',
          background: 'white',
          padding: 'clamp(10px, 1.5vw, 20px)',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minWidth: 0,
          height: '100%',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        {/* TOP BAR */}
        {TopBar}

        {/* ESCAPEMENT */}
        {activeTab === 'escapement' && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              minHeight: 0,
              width: '100%',
              paddingRight: agentOpen
                ? 'clamp(280px, 28vw, 380px)'
                : '0px',
              transition:
                'padding-right 0.35s cubic-bezier(.4,0,.2,1)',
            }}
          >
            {FiltersRow}

            <div
              style={{
                textAlign: 'center',
                fontWeight: 700,
                color: '#222',
                fontSize: 'clamp(13px, 1.2vw, 15px)',
                margin: '8px 0 0',
                flexShrink: 0,
              }}
            >
              {chartTitle}
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  'minmax(0, 2fr) minmax(0, 1fr)',
                gridTemplateRows: '1fr',
                gap: 'clamp(8px, 1.2vw, 16px)',
                flex: 1,
                minHeight: 0,
                width: '100%',
              }}
            >
              {/* LEFT CHART */}
              <div
                style={{
                  background: '#fafafa',
                  borderRadius: '10px',
                  padding: 'clamp(8px, 1.2vw, 16px)',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: 0,
                  height: '100%',
                  boxSizing: 'border-box',
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    borderRadius: '6px',
                    padding: '4px 8px',
                    fontSize: 'clamp(10px, 0.9vw, 12px)',
                    color: '#666',
                    flexShrink: 0,
                  }}
                >
                  Escapement Trend
                </div>

                <div
                  style={{
                    flex: 1,
                    minHeight: 0,
                    position: 'relative',
                  }}
                >
                  <canvas ref={lineChartRef} />
                </div>
              </div>

              {/* RIGHT PANEL */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateRows:
                    'minmax(180px, 1fr) minmax(180px, 1fr)',
                  gap: 'clamp(8px, 1vw, 14px)',
                  minHeight: 0,
                  height: '100%',
                }}
              >
                {/* BAR CHART */}
                <div
                  style={{
                    background: '#fafafa',
                    borderRadius: '10px',
                    padding: 'clamp(8px, 1vw, 14px)',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 0,
                  }}
                >
                  <div
                    style={{
                      fontWeight: 700,
                      marginBottom: '8px',
                    }}
                  >
                    Alert Summary
                  </div>

                  <div
                    style={{
                      flex: 1,
                      minHeight: 0,
                      position: 'relative',
                    }}
                  >
                    <canvas ref={barChartRef} />
                  </div>
                </div>

                {/* TABLE */}
                <div
                  style={{
                    background: '#fafafa',
                    borderRadius: '10px',
                    padding: 'clamp(8px, 1vw, 14px)',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 0,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      fontWeight: 700,
                      marginBottom: '8px',
                    }}
                  >
                    Active Alerts
                  </div>

                  <div
                    style={{
                      overflow: 'auto',
                      flex: 1,
                    }}
                  >
                    <table
                      style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        fontSize: 'clamp(10px, 0.85vw, 13px)',
                      }}
                    >
                      <thead>
                        <tr style={{ background: '#e8edf8' }}>
                          {alertsTableData.columns.map((col) => (
                            <th
                              key={col}
                              style={{
                                padding:
                                  'clamp(5px, 0.6vh, 9px)',
                                textAlign: 'center',
                                fontWeight: 600,
                              }}
                            >
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>

                      <tbody>
                        {alertsTableData.rows.map((row, i) => (
                          <tr
                            key={i}
                            style={{
                              borderBottom:
                                '1px solid #eee',
                            }}
                          >
                            <td style={{ padding: '8px' }}>
                              {row.status}
                            </td>

                            <td style={{ padding: '8px' }}>
                              {row.value}
                            </td>

                            <td style={{ padding: '8px' }}>
                              {row.date}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PRODUCTION */}
        {activeTab === 'production' && (
          <div
            style={{
              flex: 1,
              minHeight: 0,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              paddingRight: agentOpen
                ? 'clamp(280px, 28vw, 380px)'
                : '0px',
              transition:
                'padding-right 0.35s cubic-bezier(.4,0,.2,1)',
            }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/production.jpg`}
              alt="Production"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center',
                display: 'block',
              }}
            />
          </div>
        )}

        {/* AGENT PANEL */}
        <div
          style={{
            position: 'absolute',
            marginTop: '50px',
            marginRight: '15px',
            right: 0,
            top: 0,
            height: '100%',
            width: agentOpen
              ? 'clamp(280px, 28vw, 380px)'
              : '0px',
            overflow: 'hidden',
            zIndex: 20,

            display: 'flex',
            flexDirection: 'column',


            transition:
              'width 0.35s cubic-bezier(.4,0,.2,1)',

            boxSizing: 'border-box',
          }}
        >

          {/* VIDEO */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              style={{
                width: '100%',
                borderRadius: '12px',
                objectFit: 'cover',
              }}
            >
              <source
                src={`${process.env.PUBLIC_URL}/agent_demo.mp4`}
              />
            </video>
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
        currentView={currentView}
        onViewChange={setCurrentView}
        totalViews={1}
      />
    </div>
  );
};

export default MonitorProduction;