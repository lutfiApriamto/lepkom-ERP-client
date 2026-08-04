import React from 'react';

const GearErrorIllustration: React.FC = () => (
  <svg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
    <defs>
      <linearGradient id='gearGrad' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stopColor='#BFDBFE' />
        <stop offset='100%' stopColor='#93C5FD' />
      </linearGradient>
      <linearGradient id='gearGradSm' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stopColor='#DBEAFE' />
        <stop offset='100%' stopColor='#BFDBFE' />
      </linearGradient>
    </defs>
    <g>
      {Array.from({ length: 10 }).map((_, i) => {
        const angle = (i * 360) / 10;
        const rad = (angle * Math.PI) / 180;
        const cx = 72 + Math.cos(rad) * 44;
        const cy = 80 + Math.sin(rad) * 44;
        return (
          <rect
            key={i}
            x={cx - 6}
            y={cy - 5}
            width='12'
            height='10'
            fill='url(#gearGrad)'
            rx='2'
            transform={`rotate(${angle} ${cx} ${cy})`}
          />
        );
      })}
      <circle cx='72' cy='80' r='36' fill='url(#gearGrad)' />
      <circle cx='72' cy='80' r='36' fill='none' stroke='#93C5FD' strokeWidth='2' />
      <circle cx='72' cy='80' r='14' fill='white' />
      <circle cx='72' cy='80' r='14' fill='none' stroke='#BFDBFE' strokeWidth='1.5' />
      <line x1='65' y1='73' x2='79' y2='87' stroke='#EF4444' strokeWidth='3' strokeLinecap='round' />
      <line x1='79' y1='73' x2='65' y2='87' stroke='#EF4444' strokeWidth='3' strokeLinecap='round' />
      <animateTransform
        attributeName='transform'
        type='rotate'
        from='0 72 80'
        to='360 72 80'
        dur='10s'
        repeatCount='indefinite'
      />
    </g>
    <g>
      {Array.from({ length: 7 }).map((_, i) => {
        const angle = (i * 360) / 7;
        const rad = (angle * Math.PI) / 180;
        const cx = 118 + Math.cos(rad) * 22;
        const cy = 118 + Math.sin(rad) * 22;
        return (
          <rect
            key={i}
            x={cx - 4}
            y={cy - 3.5}
            width='8'
            height='7'
            fill='url(#gearGradSm)'
            rx='1.5'
            transform={`rotate(${angle} ${cx} ${cy})`}
          />
        );
      })}
      <circle cx='118' cy='118' r='18' fill='url(#gearGradSm)' />
      <circle cx='118' cy='118' r='18' fill='none' stroke='#BFDBFE' strokeWidth='1.5' />
      <circle cx='118' cy='118' r='7' fill='white' />
      <animateTransform
        attributeName='transform'
        type='rotate'
        from='0 118 118'
        to='-360 118 118'
        dur='7s'
        repeatCount='indefinite'
      />
    </g>
    <circle cx='112' cy='38' r='10' fill='#FEE2E2' />
    <circle cx='112' cy='38' r='6' fill='#EF4444'>
      <animate attributeName='r' values='6;8;6' dur='1.2s' repeatCount='indefinite' />
      <animate attributeName='opacity' values='1;0.6;1' dur='1.2s' repeatCount='indefinite' />
    </circle>
    <line x1='106' y1='24' x2='106' y2='16' stroke='#FCA5A5' strokeWidth='2' strokeLinecap='round' opacity='0.7' />
    <line x1='112' y1='22' x2='112' y2='12' stroke='#FCA5A5' strokeWidth='2' strokeLinecap='round' opacity='0.5' />
    <line x1='118' y1='24' x2='118' y2='16' stroke='#FCA5A5' strokeWidth='2' strokeLinecap='round' opacity='0.7' />
  </svg>
);

export default GearErrorIllustration;
