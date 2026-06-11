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
const HEIGHT_RESPONSIVE_TEXT = 'text-[clamp(0.5rem,0.95vh,0.72rem)]';
const HEIGHT_RESPONSIVE_VALUE = 'text-[clamp(0.52rem,1vh,0.74rem)]';

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
    <table className={`w-full table-fixed border-collapse ${HEIGHT_RESPONSIVE_TEXT} leading-tight`}>
      <colgroup>
        <col className="w-[58%]" />
        <col className="w-[42%]" />
      </colgroup>

      <tbody>
        {rows.map(({ label, value, highlight }) => (
          <tr key={label}>
            <td className={`truncate border border-gray-200 px-1 py-[1px] text-gray-600 max-[1320px]:px-0.5 ${HEIGHT_RESPONSIVE_TEXT}`}>
              {label}
            </td>

            <td
              className={`border border-gray-200 px-1 py-[1px] text-right font-medium max-[1320px]:px-0.5 ${HEIGHT_RESPONSIVE_VALUE} ${
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
    className={`flex min-h-[clamp(52px,9vh,72px)] flex-col overflow-hidden rounded-lg border bg-white p-[clamp(0.25rem,0.7vh,0.5rem)] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
      station.hasAlert
        ? 'border-red-500 ring-1 ring-red-400'
        : 'border-slate-100 ring-1 ring-slate-200/70'
    }`}
  >
    <div className="mb-[clamp(1px,0.35vh,4px)] flex min-w-0 items-start justify-between gap-1">
      <div className="flex min-w-0 flex-1 items-start gap-1">
        {station.hasAlert && (
          <div className="mt-0.5 shrink-0 text-red-500" title="Alert" aria-label="Alert">
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
              <path d="M8 1L1 14h14L8 1zm0 2.5L13.2 13H2.8L8 3.5zM7.25 7v3.25h1.5V7h-1.5zm0 4.25v1.5h1.5v-1.5h-1.5z" />
            </svg>
          </div>
        )}

        <span className="block min-w-0 flex-1 truncate text-center text-[clamp(0.56rem,1.05vh,0.8rem)] font-semibold text-slate-800">
          Station: {station.name}
        </span>
      </div>

      <div className="hidden shrink-0 text-right text-[clamp(0.42rem,0.75vh,0.5rem)] leading-tight text-gray-400 min-[1450px]:block">
        <span className="block">Last Update:</span>
        <span className="block whitespace-nowrap">{station.lastUpdate}</span>
      </div>
    </div>

    <div className="flex min-h-0 min-w-0 flex-1 items-center gap-[clamp(2px,0.45vh,6px)]">
      <div className="min-w-0 flex-1">
        <MetricsTable metrics={station.metrics} />
      </div>

      <div className="w-[clamp(38px,5.5vh,70px)] shrink-0">
        <OEEGauge value={station.metrics.oee} size="sm" />
      </div>
    </div>
  </article>
);

const OEELineCard: React.FC<{ data: LineData }> = ({ data }) => (
  <article className="flex h-full min-h-[clamp(56px,9.5vh,82px)] flex-col overflow-hidden rounded-lg border border-blue-400 bg-white p-[clamp(0.25rem,0.7vh,0.5rem)] shadow-sm ring-1 ring-blue-300/60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
    <div className="mb-[clamp(1px,0.35vh,4px)] w-fit rounded-br-md rounded-tl-md border-b border-r border-blue-400 bg-white px-2 py-0.5 text-[clamp(0.5rem,0.95vh,0.68rem)] font-bold uppercase tracking-wide text-blue-600">
      OEE for Line
    </div>

    <div className="mb-[clamp(1px,0.35vh,4px)] flex min-w-0 flex-wrap items-center justify-between gap-x-0.5 gap-y-0.5 text-[clamp(0.48rem,0.9vh,0.66rem)] text-gray-500">
      <span className="truncate font-semibold text-gray-700">Line: {data.lineName}</span>
      <span className="shrink-0 whitespace-nowrap">Last Update: {data.lastUpdate}</span>
    </div>

    <div className="flex min-h-0 min-w-0 flex-1 items-center gap-[clamp(2px,0.45vh,6px)]">
      <div className="w-[clamp(40px,5.8vh,72px)] shrink-0">
        <OEEGauge value={data.metrics.oee} size="sm" />
      </div>

      <div className="min-w-0 flex-1">
        <MetricsTable metrics={data.metrics} />
      </div>
    </div>
  </article>
);

const OEEZoneCard: React.FC<{ data: ZoneData }> = ({ data }) => (
  <article className="flex h-full min-h-[clamp(56px,9.5vh,82px)] flex-col overflow-hidden rounded-lg border border-purple-400 bg-white p-[clamp(0.25rem,0.7vh,0.5rem)] shadow-sm ring-1 ring-purple-300/60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
    <div className="mb-[clamp(1px,0.35vh,4px)] flex min-w-0 items-center justify-between gap-1">
      <div className="shrink-0 rounded-br-md rounded-tl-md border-b border-r border-purple-400 bg-white px-2 py-0.5 text-[clamp(0.5rem,0.95vh,0.68rem)] font-bold uppercase tracking-wide text-purple-600">
        OEE for Zone
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-between gap-1">
        <div className="flex min-w-0 items-center gap-1">
          <div className="flex shrink-0 items-center gap-1 rounded border border-gray-300 px-1.5 py-0.5 text-[clamp(0.48rem,0.9vh,0.66rem)] text-gray-700">
          <span>Zone: {data.zoneId}</span>
          <svg viewBox="0 0 10 6" className="h-2 w-2 fill-current text-gray-500">
            <path d="M0 0l5 6 5-6z" />
          </svg>
          </div>

          <span className="truncate text-[clamp(0.56rem,1.05vh,0.8rem)] font-semibold text-gray-700">
            {data.zoneName}
          </span>
        </div>

        <div className="shrink-0 whitespace-nowrap text-[clamp(0.42rem,0.78vh,0.56rem)] text-gray-500">
          Last Update: {data.lastUpdate}
        </div>
      </div>
    </div>

    <div className="flex min-h-0 min-w-0 flex-1 items-center gap-[clamp(2px,0.45vh,6px)]">
      <div className="min-w-0 flex-1">
        <MetricsTable metrics={data.metrics} />
      </div>

      <div className="w-[clamp(40px,5.6vh,68px)] shrink-0">
        <OEEGauge value={data.metrics.oee} size="sm" />
      </div>

      <div className="flex h-[clamp(34px,5vh,56px)] w-[clamp(44px,6.4vh,82px)] shrink-0 items-center justify-center rounded">
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
    <section className="flex h-full min-h-0 w-full">
      <div className="mx-auto flex h-full min-h-0 w-full max-w-[1500px] flex-col overflow-y-auto rounded-3xl px-2 py-[clamp(0.35rem,1vh,0.9rem)] sm:px-3 lg:px-4">
        <div className="flex min-h-full flex-col justify-center">
          <div className="grid items-stretch grid-cols-2 gap-[clamp(2px,0.45vh,8px)] min-[1180px]:grid-cols-3">
            <div className="h-full">
              <OEELineCard data={lineData} />
            </div>

            <div className="h-full min-[1180px]:col-span-2">
              <OEEZoneCard data={zoneData} />
            </div>
          </div>

          <div className="mt-[clamp(2px,0.45vh,8px)] grid auto-rows-[minmax(clamp(52px,8.2vh,68px),auto)] grid-cols-1 gap-[clamp(2px,0.45vh,8px)] sm:grid-cols-2 min-[1180px]:grid-cols-3">
            {stationsData.map((station) => (
              <StationCard key={station.id} station={station} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Production;