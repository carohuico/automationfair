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
 
const MonitorProduction: React.FC<MonitorProductionProps> = ({

  handleSectionChange = () => {},

  currentSection = 'monitor-production',

  navigationHistory = [],

  onBackClick,

}) => {

  const [currentView, setCurrentView] = useState(0);

  const lineChartRef = useRef<HTMLCanvasElement>(null);

  const barChartRef = useRef<HTMLCanvasElement>(null);

  const lineChartInstance = useRef<any>(null);

  const barChartInstance = useRef<any>(null);
 
  useEffect(() => {
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

            borderColor: '#1a3ecf',

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

            barThickness: 50,

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

  }, []);
 
  return (
<div className="section-container">
<div className="img-container">
<div

          style={{

            background: '#f4f4f4',

            padding: '24px',

            borderRadius: '12px',

            overflow: 'auto',

          }}
>

          {/* FILTERS */}
<div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
<div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
<label style={{ fontSize: '13px', fontWeight: 600, color: '#555' }}>

                Station
</label>
<select

                style={{

                  padding: '8px 12px',

                  border: '1px solid #dcdcdc',

                  borderRadius: '6px',

                  minWidth: '160px',

                  background: '#fff',

                  fontSize: '13px',

                }}
>

                {stationOptions.map((s) => (
<option key={s}>{s}</option>

                ))}
</select>
</div>
 
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
<label style={{ fontSize: '13px', fontWeight: 600, color: '#555' }}>

                Feeder
</label>
<select

                style={{

                  padding: '8px 12px',

                  border: '1px solid #dcdcdc',

                  borderRadius: '6px',

                  minWidth: '240px',

                  background: '#fff',

                  fontSize: '13px',

                }}
>

                {feederOptions.map((f) => (
<option key={f}>{f}</option>

                ))}
</select>
</div>
</div>
 
          {/* TITLE */}
<div

            style={{

              textAlign: 'center',

              fontWeight: 700,

              marginBottom: '20px',

              color: '#222',

              fontSize: '15px',

            }}
>

            {chartTitle}
</div>
 
          {/* GRID */}
<div

            style={{

              display: 'grid',

              gridTemplateColumns: '2fr 1fr',

              gap: '20px',

            }}
>

            {/* LEFT — LINE CHART */}
<div

              style={{

                background: '#fff',

                border: '1px solid #e5e5e5',

                borderRadius: '10px',

                padding: '18px',

              }}
>

              {/* Date range badge */}
<div

                style={{

                  display: 'inline-flex',

                  alignItems: 'center',

                  gap: '8px',

                  border: '1px solid #ddd',

                  borderRadius: '6px',

                  padding: '8px 12px',

                  marginBottom: '12px',

                  fontSize: '13px',

                  color: '#666',

                }}
>
<span>📅</span>
<span>

                  {dateRange.start} – {dateRange.end}
</span>
</div>
 
              <div

                style={{

                  textAlign: 'center',

                  fontWeight: 700,

                  marginBottom: '16px',

                  fontSize: '16px',

                  color: '#222',

                }}
>

                {escapementChartData.title}
</div>
 
              <div style={{ position: 'relative', height: '320px' }}>
<canvas

                  ref={lineChartRef}

                  role="img"

                  aria-label="Line chart showing escapement moving average over time with baseline and threshold reference lines"

                />
</div>
</div>
 
            {/* RIGHT SIDE */}
<div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

              {/* BAR CHART */}
<div

                style={{

                  background: '#fff',

                  border: '1px solid #e5e5e5',

                  borderRadius: '10px',

                  padding: '18px',

                }}
>
<div

                  style={{

                    fontWeight: 700,

                    marginBottom: '12px',

                    textAlign: 'center',

                    fontSize: '13px',

                    color: '#222',

                  }}
>

                  {barChartData.title}
</div>
 
                <div style={{ position: 'relative', height: '180px' }}>
<canvas

                    ref={barChartRef}

                    role="img"

                    aria-label="Bar chart showing daily peak counts exceeding threshold"

                  />
</div>
</div>
 
              {/* ALERTS TABLE */}
<div

                style={{

                  background: '#fff',

                  border: '1px solid #e5e5e5',

                  borderRadius: '10px',

                  padding: '18px',

                }}
>
<div

                  style={{

                    fontWeight: 700,

                    marginBottom: '14px',

                    textAlign: 'center',

                    fontSize: '13px',

                    color: '#222',

                  }}
>

                  {alertsTableData.title}
</div>
 
                <table

                  style={{

                    width: '100%',

                    borderCollapse: 'collapse',

                    fontSize: '13px',

                  }}
>
<thead>
<tr style={{ background: '#f6d7ea' }}>

                      {alertsTableData.columns.map((col) => (
<th

                          key={col}

                          style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 600 }}
>

                          {col}
</th>

                      ))}
</tr>
</thead>
<tbody>

                    {alertsTableData.rows.map((row, i) => (
<tr key={i} style={{ borderBottom: '1px solid #eee' }}>
<td style={{ padding: '8px 10px' }}>{row.status}</td>
<td style={{ padding: '8px 10px' }}>{row.value}</td>
<td style={{ padding: '8px 10px' }}>{row.date}</td>
</tr>

                    ))}
</tbody>
</table>
 
                <div

                  style={{

                    marginTop: '12px',

                    textAlign: 'center',

                    color: '#999',

                    fontSize: '12px',

                  }}
>

                  {alertsTableData.rows.length} results
</div>
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

        currentView={currentView}

        onViewChange={setCurrentView}

        totalViews={1}

      />
</div>

  );

};
 
export default MonitorProduction;
 