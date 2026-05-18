export const stationOptions = ['Station 1200'];
 
export const feederOptions = ['MKE-100C-Z01-S1200-FEED'];
 
export const dateRange = {

  start: 'Oct 10, 2025',

  end: 'Oct 11, 2025',

};
 
export const chartTitle = 'Station 1200 - Locking Slide Feeder System';
 
export const escapementChartData = {

  title: 'Escapement moving average',

  yAxisLabel: 'Escapement Time (ms)',

  xAxisLabel: 'Time',

  baseline: 600,

  threshold: 900,

  yMin: 500,

  yMax: 1100,

  series: [

    { x: 0,  y: 700 },

    { x: 5,  y: 1050 },

    { x: 10, y: 750 },

    { x: 15, y: 950 },

    { x: 20, y: 800 },

    { x: 25, y: 870 },

    { x: 30, y: 950 },

    { x: 35, y: 830 },

    { x: 40, y: 780 },

    { x: 45, y: 900 },

    { x: 50, y: 870 },

    { x: 55, y: 820 },

    { x: 60, y: 680 },

  ],

  legend: {

    line: 'Escapement Time',

    baseline: 'Baseline',

    threshold: 'Threshold',

  },

};
 
export const barChartData = {

  title: 'Daily peaks counts exceeding threshold',

  xAxisLabel: 'Past Week (days)',

  yAxisLabel: 'exceeding threshold',

  bars: [

    { date: '2025-09-03', count: 0.5 },

    { date: '2025-09-04', count: 1.0 },

    { date: '2025-09-05', count: 0.1 },

  ],

};
 
export const alertsTableData = {

  title: 'Past Alerts Triggered',

  columns: ['Status', 'Value', 'Date'],

  rows: [

    { status: 'Created', value: 900, date: 'Sep 3, 2025' },

    { status: 'Created', value: 900, date: 'Sep 4, 2025' },

    { status: 'Created', value: 880, date: 'Sep 5, 2025' },

  ],

};
 