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
  lastUpdate: 'Nov 17, 2025 06:00:20',
  metrics: { availability: 99.2, quality: 100, performance: 70.0, oee: 61.5 },
};

const zoneData: ZoneData = {
  zoneId: '1',
  zoneName: 'Base Assm',
  lastUpdate: 'Nov 17, 2025 06:00:20',
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

const OEEGauge: React.FC<GaugeProps> = ({ value }) => {
  const clampedValue = Math.max(0, Math.min(100, value));
  const trackWidth = 8;
  const arcPath = 'M 14 50 A 36 36 0 0 1 86 50';
  const ticks = [0, 100];

  return (
    <svg
      viewBox="0 0 100 56"
      aria-label={`OEE gauge: ${value}`}
      className="block h-auto w-full max-w-full overflow-visible"
    >
      <path
        d={arcPath}
        fill="none"
        stroke="#d1d5db"
        strokeWidth={trackWidth}
        strokeLinecap="round"
        pathLength={100}
      />

      {value > 0 && (
        <path
          d={arcPath}
          fill="none"
          stroke="#15803d"
          strokeWidth={trackWidth}
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray={`${clampedValue} 100`}
          strokeDashoffset={0}
        />
      )}

      {ticks.map((tick) => {
        const angle = 180 - (tick / 100) * 180;
        const cx = 50;
        const cy = 50;
        const r = 36;
        const toRad = (deg: number) => (deg * Math.PI) / 180;
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
        x={50}
        y={54}
        fontSize="16"
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
    {
      label: 'Availability',
      value: `${metrics.availability}%`,
      highlight: false,
    },
    {
      label: 'Quality',
      value: `${metrics.quality}%`,
      highlight: false,
    },
    {
      label: 'Performance',
      value: `${metrics.performance.toFixed(1)}%`,
      highlight: metrics.performance < PERFORMANCE_THRESHOLD,
    },
  ];

  return (
    <table className="w-full table-fixed border-collapse text-[clamp(0.58rem,0.65vw,0.75rem)] leading-tight">
      <colgroup>
        <col className="w-[58%]" />
        <col className="w-[42%]" />
      </colgroup>

      <tbody>
        {rows.map(({ label, value, highlight }) => (
          <tr key={label}>
            <td className="truncate border border-gray-200 px-1 py-[2px] text-gray-600 max-[1320px]:px-0.5">
              {label}
            </td>

            <td
              className={`border border-gray-200 px-1 py-[2px] text-right font-medium max-[1320px]:px-0.5 ${
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
    className={`flex min-h-[80px] flex-col overflow-hidden rounded-lg border bg-white p-2 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md max-[1320px]:min-h-[72px] max-[1320px]:p-1.5 ${
      station.hasAlert
        ? 'border-red-500 ring-1 ring-red-400'
        : 'border-slate-100 ring-1 ring-slate-200/70'
    }`}
  >
    <div className="mb-1 flex min-w-0 items-start justify-between gap-1">
      <div className="flex min-w-0 flex-1 items-start gap-1">
        {station.hasAlert && (
          <div className="mt-0.5 shrink-0 text-red-500" title="Alert" aria-label="Alert">
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
              <path d="M8 1L1 14h14L8 1zm0 2.5L13.2 13H2.8L8 3.5zM7.25 7v3.25h1.5V7h-1.5zm0 4.25v1.5h1.5v-1.5h-1.5z" />
            </svg>
          </div>
        )}

        <span className="block min-w-0 flex-1 truncate text-center text-[clamp(0.62rem,0.7vw,0.82rem)] font-semibold text-slate-800">
          Station: {station.name}
        </span>
      </div>

      <div className="hidden shrink-0 text-right text-[8px] leading-tight text-gray-400 min-[1450px]:block">
        <span className="block">Last Update:</span>
        <span className="block whitespace-nowrap">{station.lastUpdate}</span>
      </div>
    </div>

    <div className="flex min-h-0 min-w-0 flex-1 items-center gap-1 max-[1320px]:gap-1">
      <div className="min-w-0 flex-1">
        <MetricsTable metrics={station.metrics} />
      </div>

      <div className="w-[clamp(48px,6.5vw,88px)] shrink-0">
        <OEEGauge value={station.metrics.oee} size="sm" />
      </div>
    </div>
  </article>
);

const OEELineCard: React.FC<{ data: LineData }> = ({ data }) => (
  <article className="flex h-full min-h-[84px] flex-col overflow-hidden rounded-lg border border-blue-400 bg-white p-2 shadow-sm ring-1 ring-blue-300/60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md max-[1320px]:min-h-[76px] max-[1320px]:p-1.5">
    <div className="mb-1 w-fit rounded-br-md rounded-tl-md border-b border-r border-blue-400 bg-white px-2 py-0.5 text-[clamp(0.58rem,0.65vw,0.72rem)] font-bold uppercase tracking-wide text-blue-600">
      OEE for Line
    </div>

    <div className="mb-1 flex min-w-0 flex-wrap items-center justify-between gap-x-0.5 gap-y-0.5 text-[clamp(0.58rem,0.65vw,0.7rem)] text-gray-500">
      <span className="truncate font-semibold text-gray-700">Line: {data.lineName}</span>
      <span className="shrink-0 whitespace-nowrap">Last Update: {data.lastUpdate}</span>
    </div>

    <div className="flex min-h-0 min-w-0 flex-1 items-center gap-1 max-[1320px]:gap-1">
      <div className="w-[clamp(48px,6.5vw,88px)] shrink-0">
        <OEEGauge value={data.metrics.oee} size="sm" />
      </div>

      <div className="min-w-0 flex-1">
        <MetricsTable metrics={data.metrics} />
      </div>
    </div>
  </article>
);

const OEEZoneCard: React.FC<{ data: ZoneData }> = ({ data }) => (
  <article className="flex h-full min-h-[84px] flex-col overflow-hidden rounded-lg border border-purple-400 bg-white p-2 shadow-sm ring-1 ring-purple-300/60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md max-[1320px]:min-h-[76px] max-[1320px]:p-1.5">
    <div className="mb-1 flex min-w-0 items-center justify-between gap-1">
      <div className="shrink-0 rounded-br-md rounded-tl-md border-b border-r border-purple-400 bg-white px-2 py-0.5 text-[clamp(0.58rem,0.65vw,0.72rem)] font-bold uppercase tracking-wide text-purple-600">
        OEE for Zone
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-between gap-1">
        <div className="flex min-w-0 items-center gap-1">
          <div className="flex shrink-0 items-center gap-1 rounded border border-gray-300 px-1.5 py-0.5 text-[clamp(0.58rem,0.65vw,0.7rem)] text-gray-700">
          <span>Zone: {data.zoneId}</span>
          <svg viewBox="0 0 10 6" className="h-2 w-2 fill-current text-gray-500">
            <path d="M0 0l5 6 5-6z" />
          </svg>
          </div>

          <span className="truncate text-[clamp(0.62rem,0.75vw,0.82rem)] font-semibold text-gray-700">
            {data.zoneName}
          </span>
        </div>

        <div className="shrink-0 whitespace-nowrap text-[clamp(0.5rem,0.58vw,0.65rem)] text-gray-500">
          Last Update: {data.lastUpdate}
        </div>
      </div>
    </div>

    <div className="flex min-h-0 min-w-0 flex-1 items-center gap-1 max-[1320px]:gap-1">
      <div className="min-w-0 flex-1">
        <MetricsTable metrics={data.metrics} />
      </div>

      <div className="w-[clamp(48px,6vw,80px)] shrink-0">
        <OEEGauge value={data.metrics.oee} size="sm" />
      </div>

      <div className="flex h-[clamp(44px,5.5vw,64px)] w-[clamp(56px,7vw,96px)] shrink-0 items-center justify-center rounded">
        <img
          src={`${process.env.PUBLIC_URL}/zone.jpg`}
          alt="Zone Map"
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  </article>
);

const Production: React.FC = () => {
  return (
    <section className="min-h-0 w-full max-h-screen">
      <div className="mx-auto w-full max-w-[1500px] rounded-3xl p-3 sm:p-4 lg:p-6 max-[1320px]:p-2 overflow-y-auto max-h-[calc(100vh-4rem)] pt-3">
        {/* Top row: maintain 50/50 on small, and 1/3 + 2/3 on wide screens */}
        <div className="grid items-stretch grid-cols-2 gap-1 max-[1320px]:gap-2 min-[1180px]:grid-cols-3">
          <div className="h-full">
            <OEELineCard data={lineData} />
          </div>

          <div className="h-full min-[1180px]:col-span-2">
            <OEEZoneCard data={zoneData} />
          </div>
        </div>

        {/* Stations grid: always start on a new row */}
        <div className="mt-1 grid auto-rows-[minmax(80px,auto)] grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-1.5 min-[1180px]:grid-cols-3 max-[1320px]:auto-rows-[minmax(72px,auto)] max-[1320px]:gap-2">
          {stationsData.map((station) => (
            <StationCard key={station.id} station={station} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Production;