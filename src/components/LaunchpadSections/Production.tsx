import React from 'react';
import './SectionStyles.css';
 
interface OEEMetrics {
  availability: number;
  quality: number;
  performance: number;
  oee: number;
}
 
interface StationData {
  id: string;
  name: string;
  lastUpdate: string;
  metrics: OEEMetrics;
  hasAlert?: boolean;
}
 
interface LineData {
  lineName: string;
  lastUpdate: string;
  metrics: OEEMetrics;
}
 
interface ZoneData {
  zoneId: string;
  zoneName: string;
  lastUpdate: string;
  metrics: OEEMetrics;
}
 
const lineData: LineData = {
  lineName: '100C',
  lastUpdate: 'DATE',
  metrics: { availability: 99.2, quality: 100, performance: 70.0, oee: 61.5 },
};
 
const zoneData: ZoneData = {
  zoneId: '1',
  zoneName: 'Base Assm',
  lastUpdate: 'DATE',
  metrics: { availability: 99.2, quality: 100, performance: 70.0, oee: 61.5 },
};
 
const stationsData: StationData[] = [
  {
    id: '1100',
    name: '1100',
    lastUpdate: 'Nov 17, 2025 06:00:20',
    metrics: { availability: 99.2, quality: 100, performance: 70.0, oee: 61.5 },
  },
  {
    id: '1100AC',
    name: '1100 AC',
    lastUpdate: 'Nov 17, 2025 06:00:20',
    metrics: { availability: 99.2, quality: 100, performance: 70.0, oee: 61.5 },
  },
  {
    id: '1100DC',
    name: '1100 DC',
    lastUpdate: 'Nov 17, 2025 06:00:20',
    metrics: { availability: 99.2, quality: 100, performance: 70.0, oee: 61.5 },
  },
  {
    id: '1200',
    name: '1200',
    lastUpdate: 'Nov 17, 2025 06:00:20',
    metrics: { availability: 99.2, quality: 100, performance: 70.0, oee: 61.5 },
    hasAlert: true,
  },
  {
    id: '1300',
    name: '1300',
    lastUpdate: 'Nov 17, 2025 06:00:20',
    metrics: { availability: 99.2, quality: 100, performance: 70.0, oee: 61.5 },
  },
  {
    id: '1400',
    name: '1400',
    lastUpdate: 'Nov 17, 2025 06:00:20',
    metrics: { availability: 99.2, quality: 100, performance: 70.0, oee: 61.5 },
  },
  {
    id: '1500',
    name: '1500',
    lastUpdate: 'Nov 17, 2025 06:00:20',
    metrics: { availability: 99.2, quality: 100, performance: 70.0, oee: 61.5 },
  },
  {
    id: '1600',
    name: '1600',
    lastUpdate: 'Nov 17, 2025 06:00:20',
    metrics: { availability: 99.2, quality: 100, performance: 70.0, oee: 61.5 },
  },
  {
    id: '1700',
    name: '1700',
    lastUpdate: 'Nov 17, 2025 06:00:20',
    metrics: { availability: 99.2, quality: 100, performance: 70.0, oee: 61.5 },
  },
];

const PERFORMANCE_THRESHOLD = 75;
 
interface GaugeProps {
  value: number;
  size?: 'sm' | 'md';
}
 
const OEEGauge: React.FC<GaugeProps> = ({ value, size = 'md' }) => {
  const isSmall = size === 'sm';

  const cx = 50;
  const cy = 52;
  const r = 40;
  const trackWidth = isSmall ? 7 : 8;

  const toRad = (deg: number) => (deg * Math.PI) / 180;
 
  const point = (deg: number) => ({
    x: cx + r * Math.cos(toRad(deg)),
    y: cy + r * Math.sin(toRad(deg)),
  });

  const trackStart = point(180);
  const trackEnd = point(0);

  const fillAngle = 180 - (value / 100) * 180;
  const fillEnd = point(fillAngle);

  const fillLargeArc = value > 50 ? 1 : 0;

  const ticks = [0, 20, 40, 60, 80, 100];
 
  const svgWidth = isSmall ? 90 : 100;
  const svgHeight = isSmall ? 55 : 62;
  const fontSize = isSmall ? 14 : 16;
 
  return (
<svg
      viewBox={`0 0 100 62`}
      width={svgWidth}
      height={svgHeight}
      aria-label={`OEE gauge: ${value}`}
      className="shrink-0"
>
<path
        d={`M ${trackStart.x} ${trackStart.y} A ${r} ${r} 0 0 1 ${trackEnd.x} ${trackEnd.y}`}
        fill="none"
        stroke="#d1d5db"
        strokeWidth={trackWidth}
        strokeLinecap="round"
      />

      {value > 0 && (
<path
          d={`M ${trackStart.x} ${trackStart.y} A ${r} ${r} 0 ${fillLargeArc} 1 ${fillEnd.x} ${fillEnd.y}`}
          fill="none"
          stroke="#15803d"
          strokeWidth={trackWidth}
          strokeLinecap="round"
        />
      )}

      {ticks.map((tick) => {
        const angle = 180 - (tick / 100) * 180;
        const labelR = r + 10;
        const lx = cx + labelR * Math.cos(toRad(angle));
        const ly = cy + labelR * Math.sin(toRad(angle));
        return (
<text
            key={tick}
            x={lx}
            y={ly}
            fontSize="5"
            fill="#9ca3af"
            textAnchor="middle"
            dominantBaseline="middle"
>
            {tick}
</text>
        );
      })}

<text
        x={cx}
        y={cy + 4}
        fontSize={fontSize}
        fontWeight="600"
        fill="#1e293b"
        textAnchor="middle"
        dominantBaseline="middle"
>
        {value}
</text>
</svg>
  );
};
 
interface MetricsTableProps {
  metrics: OEEMetrics;
}
 
const MetricsTable: React.FC<MetricsTableProps> = ({ metrics }) => {
  const rows = [
    { label: 'Availability', value: `${metrics.availability}%`, highlight: false },
    { label: 'Quality', value: `${metrics.quality}%`, highlight: false },
    {
      label: 'Performance',
      value: `${metrics.performance.toFixed(1)}%`,
      highlight: metrics.performance < PERFORMANCE_THRESHOLD,
    },
  ];
 
  return (
<table className="w-full border-collapse text-[10px] sm:text-xs">
<tbody>
        {rows.map(({ label, value, highlight }) => (
<tr key={label} className="border border-gray-200">
<td className="border border-gray-200 px-1 py-0.5 text-gray-600 sm:px-1.5">{label}</td>
<td
              className={`border border-gray-200 px-1 py-0.5 text-right font-medium sm:px-1.5 ${
                highlight ? 'bg-yellow-300 text-gray-900' : 'text-gray-800'
              }`}
>
              {value}
</td>
</tr>
        ))}
</tbody>
</table>
  );
};
 
interface StationCardProps {
  station: StationData;
}
 
const StationCard: React.FC<StationCardProps> = ({ station }) => (
<article
    className={`flex h-full min-h-0 flex-col rounded-lg border bg-white p-2.5 sm:p-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
      station.hasAlert ? 'border-red-500 ring-1 ring-red-400' : 'border-slate-100 ring-1 ring-slate-200/70'
    }`}
>
<div className="mb-2 flex items-start justify-between gap-2">
<div>
<span className="text-xs font-semibold text-slate-800 sm:text-sm">Station: {station.name}</span>
        {station.hasAlert && (
<div className="mt-0.5 text-red-500" title="Alert" aria-label="Alert">
<svg viewBox="0 0 16 16" className="h-4 w-4 fill-current" aria-hidden="true">
<path d="M8 1L1 14h14L8 1zm0 2.5L13.2 13H2.8L8 3.5zM7.25 7v3.25h1.5V7h-1.5zm0 4.25v1.5h1.5v-1.5h-1.5z" />
</svg>
</div>
        )}
</div>
<div className="text-right text-[9px] leading-tight text-gray-400 sm:text-[10px]">
<span className="block">Last Update:</span>
<span className="block">{station.lastUpdate}</span>
</div>
</div>

<div className="flex min-h-0 flex-1 items-center gap-2">
<div className="flex-1">
<MetricsTable metrics={station.metrics} />
</div>
<div className="flex shrink-0 items-center justify-center">
<OEEGauge value={station.metrics.oee} size="sm" />
</div>
</div>
</article>
);
 
const OEELineCard: React.FC<{ data: LineData }> = ({ data }) => (
<article className="flex h-full min-h-0 flex-col rounded-lg border border-blue-400 bg-white p-2.5 sm:p-3 shadow-sm ring-1 ring-blue-300/60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
<div className="mb-2 -mt-2.5 -ml-2.5 w-fit rounded-br-md rounded-tl-md border-b border-r border-blue-400 bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-600 sm:-mt-3 sm:-ml-3 sm:text-xs">
      OEE for Line
</div>
 
  <div className="mb-1 flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-[10px] text-gray-500 sm:text-xs">
<span className="font-semibold text-gray-700">Line: {data.lineName}</span>
<span>Last Update: {data.lastUpdate}</span>
</div>
 
    <div className="flex min-h-0 flex-1 items-center gap-2">
<OEEGauge value={data.metrics.oee} size="sm" />
<div className="flex-1">
<MetricsTable metrics={data.metrics} />
</div>
</div>
</article>
);
 
const OEEZoneCard: React.FC<{ data: ZoneData }> = ({ data }) => (
<article className="flex h-full min-h-0 flex-col rounded-lg border border-purple-400 bg-white p-2.5 sm:p-3 shadow-sm ring-1 ring-purple-300/60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
<div className="mb-1 flex items-start justify-between gap-2">
<div className="-mt-2.5 -ml-2.5 w-fit rounded-br-md rounded-tl-md border-b border-r border-purple-400 bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-purple-600 sm:-mt-3 sm:-ml-3 sm:text-xs">
      OEE for Zone
</div>
<div className="flex flex-wrap items-center justify-end gap-1 text-right">
<div className="flex items-center gap-1 rounded border border-gray-300 px-2 py-0.5 text-[10px] text-gray-700 sm:text-xs">
<span>Zone: {data.zoneId}</span>
<svg viewBox="0 0 10 6" className="h-2.5 w-2.5 fill-current text-gray-500">
<path d="M0 0l5 6 5-6z" />
</svg>
</div>
<span className="font-semibold text-xs text-gray-700 sm:text-sm">{data.zoneName}</span>
</div>
</div>

  <div className="mb-1 text-[10px] text-gray-500 sm:text-xs">Last Update: {data.lastUpdate}</div>

<div className="flex min-h-0 flex-1 items-center gap-2">
<div className="flex-1">
<MetricsTable metrics={data.metrics} />
</div>
<OEEGauge value={data.metrics.oee} size="sm" />

<div className="hidden h-14 w-20 shrink-0 rounded bg-gray-800 text-[10px] text-gray-500 md:flex md:h-16 md:w-24 items-center justify-center">
        Zone Map
</div>
</div>
</article>
);
 
const Production: React.FC = () => {
  return (
<section className="h-full min-h-0 w-full">
<div className="mx-auto h-full min-h-0 max-w-7xl rounded-3xl p-4 sm:p-6">
<div className="grid h-full min-h-0 auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
<OEELineCard data={lineData} />
<div className="h-full sm:col-span-2 lg:col-span-2">
<OEEZoneCard data={zoneData} />
</div>

          {stationsData.map((station) => (
<StationCard key={station.id} station={station} />
          ))}
        </div>
</div>
</section>
  );
};
 
export default Production;