import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { preloadAssets, extractOriginsFromUrls } from './utils/preload';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
try {
  const IMAGES = [
    '/accelerate-logo.png',
    '/bom.gif',
    '/bom.png',
    '/camera.jpg',
    '/Contextualize.jpg',
    '/cycle.png',
    '/disc.png',
    '/icono.png',
    '/line.jpg',
    '/logo-create.png',
    '/logo-create.webp',
    '/logo-lifecycle.png',
    '/logo-white.png',
    '/map.png',
    '/monitor.png',
    '/optimize.png',
    '/overview.png',
    '/plc.png',
    '/plc.webp',
    '/retool.png',
    '/sensor.png',
    '/sensor.webp',
    '/slide1.PNG',
    '/slide2.png',
    '/slide3.PNG',
    '/splash1.png',
    '/temp.png',
    '/timeline.png',
  ];

  const VIDEOS = ['/videoContextualize.MP4', '/videoEnable.mp4', '/enable.mp4', '/image1.mp4', '/image6.mp4'];

  const EMBED_URLS = [
    'https://rockwellautomation.storylane.io/share/omnrkwajjuud',
    'https://rockwellautomation.retool.com/embedded/public/49e04285-0560-4b68-b06c-94ce72c06a55/OEE?embed=true',
    'https://favorite-diversity-579304.framer.app/?y=0',
  ];

  const origins = extractOriginsFromUrls(EMBED_URLS);

  // run preloads but don't block rendering
  const preloader = preloadAssets({ images: IMAGES, videos: VIDEOS, origins, timeoutMs: 8000 });
  // optional: you could react to preloader.done.then(() => console.log('preload done'))
} catch (e) {
  // ignore preload errors
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
