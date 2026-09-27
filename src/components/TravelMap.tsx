import type { CSSProperties } from 'react';
import './TravelMap.css';

interface TravelMapProps {
  isArabic: boolean;
}

const locations = [
  { name: 'Pakistan', arabic: 'باكستان', x: 695, y: 174, status: 'home' },
  { name: 'Germany', arabic: 'ألمانيا', x: 528, y: 118 },
  { name: 'Thailand', arabic: 'تايلاند', x: 778, y: 218 },
  { name: 'Amsterdam', arabic: 'أمستردام', x: 514, y: 110 },
  { name: 'United Kingdom', arabic: 'المملكة المتحدة', x: 494, y: 105 },
  { name: 'Saudi Arabia', arabic: 'السعودية', x: 625, y: 194, status: 'current' },
  { name: 'Bahrain', arabic: 'البحرين', x: 640, y: 185 },
  { name: 'Dubai', arabic: 'دبي', x: 654, y: 190 },
];

function curvedRoute(from: (typeof locations)[number], to: (typeof locations)[number]) {
  const midpointX = (from.x + to.x) / 2;
  const lift = Math.max(28, Math.abs(to.x - from.x) * 0.16);
  const midpointY = Math.min(from.y, to.y) - lift;
  return `M ${from.x} ${from.y} Q ${midpointX} ${midpointY} ${to.x} ${to.y}`;
}

export function TravelMap({ isArabic }: TravelMapProps) {
  return (
    <div className="travel-map" role="img" aria-label={isArabic ? 'خريطة رحلة السفر الدولية من باكستان' : 'World map showing an international travel journey from Pakistan'}>
      <div className="travel-map__header">
        <span>{isArabic ? 'مسار الرحلة العالمي' : 'GLOBAL JOURNEY MATRIX'}</span>
        <span>{isArabic ? '8 وجهات · 3 مناطق' : '8 DESTINATIONS · 3 REGIONS'}</span>
      </div>

      <svg viewBox="0 45 1000 390" className="travel-map__svg" aria-hidden="true">
        <defs>
          <radialGradient id="mapGlow" cx="66%" cy="40%" r="42%">
            <stop offset="0" stopColor="#D4AF37" stopOpacity="0.14" />
            <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
          </radialGradient>
          <filter id="routeGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <pattern id="mapGrid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#8C6D4F" strokeOpacity="0.11" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width="1000" height="500" className="travel-map__ocean" />
        <rect width="1000" height="500" fill="url(#mapGrid)" />
        <rect width="1000" height="500" fill="url(#mapGlow)" />

        <image
          href="/world-map-equirectangular.svg"
          x="0"
          y="0"
          width="1000"
          height="500"
          preserveAspectRatio="none"
          className="travel-map__real-land"
        />

        <g className="travel-map__routes" filter="url(#routeGlow)">
          {locations.slice(1).map((location, index) => (
            <path
              key={`${locations[index].name}-${location.name}`}
              d={curvedRoute(locations[index], location)}
              pathLength="1"
              style={{ '--route-delay': `${index * 0.42}s` } as CSSProperties}
            />
          ))}
        </g>

        <g className="travel-map__nodes">
          {locations.map((location, index) => (
            <g key={location.name} transform={`translate(${location.x} ${location.y})`} className={`travel-map__node travel-map__node--${location.status ?? 'visited'}`}>
              <title>{isArabic ? location.arabic : location.name}</title>
              <circle className="travel-map__pulse" r="13" />
              <circle className="travel-map__dot" r="7" />
              <text y="3.2" textAnchor="middle">{index + 1}</text>
            </g>
          ))}
        </g>

        <g className="travel-map__coordinates"><text x="24" y="68">N 60°</text><text x="900" y="420">E 120°</text></g>
      </svg>

      <ol className="travel-map__legend">
        {locations.map((location, index) => (
          <li key={location.name}>
            <span className="travel-map__number">{String(index + 1).padStart(2, '0')}</span>
            <span>{isArabic ? location.arabic : location.name}</span>
            {location.status && (
              <small>
                {isArabic
                  ? location.status === 'home' ? 'الوطن' : 'الموقع الحالي'
                  : location.status === 'home' ? 'HOME' : 'CURRENT'}
              </small>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default TravelMap;
