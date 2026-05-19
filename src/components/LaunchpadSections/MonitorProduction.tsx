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
      <div style={{ display: 'flex', gap: '4px' }}>
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
                borderRadius: '8px 8px 0 0',
                border: 'none',
                cursor: 'pointer',
                fontSize: 'clamp(11px, 1vw, 13px)',
                fontWeight: isActive ? 700 : 500,
                background: isActive ? '#3b6df6' : '#e8edf8',
                color: isActive ? '#fff' : '#555',
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
        onClick={() => setAgentOpen(true)}
        title="Open AI Agent"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: 'clamp(5px, 0.6vh, 8px) clamp(10px, 1.2vw, 16px)',
          borderRadius: '8px',
          border: '1.5px solid #1a3ecf',
          cursor: 'pointer',
          fontSize: 'clamp(11px, 1vw, 13px)',
          fontWeight: 600,
          background: '#fff',
          color: '#3b6df6',
          transition: 'background 0.18s, color 0.18s',
          outline: 'none',
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = '#3b6df6';
          (e.currentTarget as HTMLButtonElement).style.color = '#fff';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = '#fff';
          (e.currentTarget as HTMLButtonElement).style.color = '#3b6df6';
        }}
      >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
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
          title='station'
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
          title='feeder'
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
        }}
      >
        <div
          className="standard-content-container"
          style={{
            background: 'white',
            padding: 'clamp(10px, 1.5vw, 20px)',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            maxWidth: '100%',
            boxSizing: 'border-box',
            overflow: 'hidden',
          }}
        >
          {/* TABS + AGENT BUTTON — always visible */}
          {TopBar}
          {/* ── ESCAPEMENT TAB CONTENT ── */}
          {activeTab === 'escapement' && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                minHeight: 0,
                width: '100%',
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
                  gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)',
                  gridTemplateRows: '1fr',
                  gap: 'clamp(8px, 1.2vw, 16px)',
                  flex: 1,
                  minHeight: 0,
                  width: '100%',
                }}
              >
                {/* LEFT — LINE CHART */}
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
                    <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
</svg>
</span>
                    <span>{dateRange.start} - {dateRange.end}</span>
                  </div>
                  <div
                    style={{
                      textAlign: 'center',
                      fontWeight: 700,
                      fontSize: 'clamp(12px, 1.1vw, 15px)',
                      color: '#222',
                      flexShrink: 0,
                      margin: '4px 0 6px',
                    }}
                  >
                    {escapementChartData.title}
                  </div>
                  <div style={{ position: 'relative', flex: 1, minHeight: 0, width: '100%' }}>
                    <canvas
                      ref={lineChartRef}
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                      role="img"
                      aria-label="Line chart showing escapement moving average over time"
                    />
                  </div>
                </div>
                {/* RIGHT SIDE */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'clamp(6px, 1vh, 14px)',
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
                      flex: '0 0 38%',
                      minHeight: 0,
                      boxSizing: 'border-box',
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 700,
                        textAlign: 'center',
                        fontSize: 'clamp(10px, 0.9vw, 13px)',
                        color: '#222',
                        flexShrink: 0,
                        marginBottom: '6px',
                      }}
                    >
                      {barChartData.title}
                    </div>
                    <div style={{ position: 'relative', flex: 1, minHeight: 0, width: '100%' }}>
                      <canvas
                        ref={barChartRef}
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                        role="img"
                        aria-label="Bar chart showing daily peak counts exceeding threshold"
                      />
                    </div>
                  </div>
                  {/* ALERTS TABLE */}
                  <div
                    style={{
                      background: '#fafafa',
                      borderRadius: '10px',
                      padding: 'clamp(8px, 1vw, 14px)',
                      flex: '1 1 0',
                      minHeight: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      boxSizing: 'border-box',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 700,
                        textAlign: 'center',
                        fontSize: 'clamp(10px, 0.9vw, 13px)',
                        color: '#222',
                        marginBottom: '8px',
                        flexShrink: 0,
                      }}
                    >
                      {alertsTableData.title}
                    </div>
                    <div style={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
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
                                  padding: 'clamp(5px, 0.6vh, 9px) clamp(6px, 0.8vw, 10px)',
                                  textAlign: 'center',
                                  fontWeight: 600,
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {alertsTableData.rows.map((row, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                              <td style={{ padding: 'clamp(5px, 0.6vh, 9px) clamp(6px, 0.8vw, 10px)' }}>{row.status}</td>
                              <td style={{ padding: 'clamp(5px, 0.6vh, 9px) clamp(6px, 0.8vw, 10px)' }}>{row.value}</td>
                              <td style={{ padding: 'clamp(5px, 0.6vh, 9px) clamp(6px, 0.8vw, 10px)', whiteSpace: 'nowrap' }}>{row.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div
                      style={{
                        marginTop: '6px',
                        textAlign: 'center',
                        color: '#999',
                        fontSize: 'clamp(10px, 0.8vw, 12px)',
                        flexShrink: 0,
                      }}
                    >
                      {alertsTableData.rows.length} results
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* ── PRODUCTION TAB CONTENT ── */}
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
        </div>
      </div>
      {/* ── AI AGENT MODAL ── */}
      {agentOpen && (
        <div
          onClick={() => setAgentOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.35)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff',
              borderRadius: '14px',
              padding: '32px',
              width: 'clamp(300px, 40vw, 520px)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
            }}
          >
            <p style={{ margin: 0, fontSize: 'clamp(13px, 1.1vw, 15px)', color: '#888' }}>
              This is the AI Agent content
            </p>
          </div>
        </div>
      )}
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