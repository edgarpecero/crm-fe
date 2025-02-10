import { v4 } from 'uuid';
import { theme } from '../../theme/Theme';

const circleStyles = {
  animationDuration: '2s',
  animationIterationCount: 'infinite',
  animationName: 'radar',
  transformOrigin: '50% 50%',
  animationDelay: '0',
  animationTimingFunction: 'linear',
};

const svgStyles = {
  width: '100%',
  height: '100%',
};

const RadarIcon = ({ waveBg = theme.palette.success.dark, wrapperSize = 15, margin = '' }) => {
  const uuidv4 = v4();
  return (
    <div style={{ width: wrapperSize, height: wrapperSize, margin }}>
      <svg style={svgStyles} viewBox='0 0 130 130' xmlns='http://www.w3.org/2000/svg'>
        <defs>
          <linearGradient id={uuidv4} x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor={waveBg} />
            <stop offset='15%' stopColor={waveBg} stopOpacity='0.8' />
            <stop offset='50%' stopColor={waveBg} stopOpacity='0' />
          </linearGradient>
        </defs>
        <circle
          style={circleStyles}
          r='45'
          cx='65'
          cy='65'
          fill='none'
          stroke={`url(#${uuidv4})`}
          strokeWidth='40'
          strokeDasharray='230'
        />
      </svg>
    </div>
  );
};

export default RadarIcon;
