import React from 'react';

const toDataUri = (svg) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

const baseSky = (top, bottom) => `
  <defs>
    <linearGradient id='bg' x1='0' y1='0' x2='0' y2='1'>
      <stop offset='0%' stop-color='${top}' />
      <stop offset='100%' stop-color='${bottom}' />
    </linearGradient>
  </defs>
  <rect width='1200' height='680' fill='url(%23bg)' />
`;

const scenes = {
  clearDay: `
    ${baseSky('#4ec8ff', '#1e67d8')}
    <circle cx='980' cy='140' r='74' fill='#ffd670' opacity='0.98'/>
    <circle cx='980' cy='140' r='98' fill='#ffd670' opacity='0.28'/>
    <path d='M120 520 C260 420 470 430 620 505 L620 680 L120 680Z' fill='#7cc9ef' opacity='0.6'/>
  `,
  clearNight: `
    ${baseSky('#0b1a46', '#122d74')}
    <circle cx='980' cy='140' r='62' fill='#f2f1dc' />
    <circle cx='1010' cy='122' r='62' fill='#122d74' />
    <circle cx='280' cy='120' r='4' fill='#ffffff' opacity='0.8'/>
    <circle cx='360' cy='180' r='3' fill='#ffffff' opacity='0.65'/>
    <circle cx='460' cy='110' r='2.5' fill='#ffffff' opacity='0.8'/>
  `,
  cloudy: `
    ${baseSky('#78b7f0', '#4f77c6')}
    <ellipse cx='340' cy='250' rx='140' ry='70' fill='#f4f9ff' opacity='0.75'/>
    <ellipse cx='460' cy='230' rx='170' ry='82' fill='#edf4ff' opacity='0.84'/>
    <ellipse cx='620' cy='260' rx='150' ry='75' fill='#dfeaf9' opacity='0.85'/>
    <ellipse cx='790' cy='250' rx='130' ry='64' fill='#eef5ff' opacity='0.7'/>
  `,
  rain: `
    ${baseSky('#5578bd', '#2c4684')}
    <ellipse cx='470' cy='220' rx='220' ry='88' fill='#d8e4f8' opacity='0.9'/>
    <ellipse cx='700' cy='228' rx='180' ry='78' fill='#c9d9f2' opacity='0.92'/>
    <g stroke='#9fe4ff' stroke-width='8' stroke-linecap='round' opacity='0.74'>
      <line x1='360' y1='340' x2='330' y2='400'/>
      <line x1='430' y1='350' x2='400' y2='415'/>
      <line x1='510' y1='344' x2='485' y2='398'/>
      <line x1='610' y1='352' x2='575' y2='424'/>
      <line x1='700' y1='342' x2='666' y2='412'/>
      <line x1='780' y1='350' x2='750' y2='412'/>
    </g>
  `,
  snow: `
    ${baseSky('#8ab8ec', '#5f81c3')}
    <ellipse cx='520' cy='220' rx='250' ry='90' fill='#dcecff' opacity='0.88'/>
    <g fill='#f8fdff' opacity='0.96'>
      <circle cx='330' cy='360' r='8'/><circle cx='410' cy='392' r='8'/><circle cx='510' cy='360' r='8'/><circle cx='620' cy='398' r='8'/><circle cx='710' cy='368' r='8'/>
    </g>
  `,
  storm: `
    ${baseSky('#3f5a95', '#223665')}
    <ellipse cx='520' cy='220' rx='260' ry='95' fill='#b7c8e8' opacity='0.85'/>
    <polygon points='560,298 505,404 570,404 520,500 680,340 610,340 665,298' fill='#ffd25f' opacity='0.95'/>
  `,
};

const getConditionType = (conditionText = '') => {
  const condition = conditionText.toLowerCase();
  if (condition.includes('thunder')) return 'storm';
  if (condition.includes('snow') || condition.includes('sleet') || condition.includes('ice')) return 'snow';
  if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('shower')) return 'rain';
  if (condition.includes('mist') || condition.includes('fog') || condition.includes('overcast') || condition.includes('cloud')) return 'cloudy';
  return 'clear';
};

// SVG Icon components for hourly forecast (small, optimized icons)
export const SunnyIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="7" fill="#FFD670" />
    <circle cx="16" cy="2" r="1.5" fill="#FFD670" />
    <circle cx="16" cy="30" r="1.5" fill="#FFD670" />
    <circle cx="2" cy="16" r="1.5" fill="#FFD670" />
    <circle cx="30" cy="16" r="1.5" fill="#FFD670" />
    <circle cx="5.2" cy="5.2" r="1.5" fill="#FFD670" />
    <circle cx="26.8" cy="26.8" r="1.5" fill="#FFD670" />
    <circle cx="26.8" cy="5.2" r="1.5" fill="#FFD670" />
    <circle cx="5.2" cy="26.8" r="1.5" fill="#FFD670" />
  </svg>
);

export const CloudyIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 18C8 14.134 11.134 11 15 11C15.659 7.577 18.723 5 22.5 5C27.194 5 31 8.806 31 13.5C31 14.096 30.959 14.683 30.884 15.257C30.955 15.5 31 15.754 31 16C31 19.314 28.314 22 25 22H10C8.895 22 8 21.105 8 20V18Z" fill="#E8F0FF" />
  </svg>
);

export const RainIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 18C8 14.134 11.134 11 15 11C15.659 7.577 18.723 5 22.5 5C27.194 5 31 8.806 31 13.5C31 14.096 30.959 14.683 30.884 15.257C30.955 15.5 31 15.754 31 16C31 19.314 28.314 22 25 22H10C8.895 22 8 21.105 8 20V18Z" fill="#C9D9F2" />
    <line x1="12" y1="24" x2="10" y2="28" stroke="#9FE4FF" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="18" y1="24" x2="16" y2="28" stroke="#9FE4FF" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="24" y1="24" x2="22" y2="28" stroke="#9FE4FF" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const SnowIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 18C8 14.134 11.134 11 15 11C15.659 7.577 18.723 5 22.5 5C27.194 5 31 8.806 31 13.5C31 14.096 30.959 14.683 30.884 15.257C30.955 15.5 31 15.754 31 16C31 19.314 28.314 22 25 22H10C8.895 22 8 21.105 8 20V18Z" fill="#DCECFF" />
    <circle cx="12" cy="26" r="1.5" fill="#F8FDFF" />
    <circle cx="18" cy="26" r="1.5" fill="#F8FDFF" />
    <circle cx="24" cy="26" r="1.5" fill="#F8FDFF" />
  </svg>
);

export const StormIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 18C8 14.134 11.134 11 15 11C15.659 7.577 18.723 5 22.5 5C27.194 5 31 8.806 31 13.5C31 14.096 30.959 14.683 30.884 15.257C30.955 15.5 31 15.754 31 16C31 19.314 28.314 22 25 22H10C8.895 22 8 21.105 8 20V18Z" fill="#B7C8E8" />
    <polygon points="18,24 14,30 16,30 12,36 20,28 18,28 22,22" fill="#FFD25F" />
  </svg>
);

export const MoonIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="10" r="8" fill="#F2F1DC" />
    <circle cx="22" cy="8" r="8" fill="#0B1A46" />
  </svg>
);

export const MoonCloudIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 16C2 12.134 5.134 9 9 9C9.659 5.577 12.723 3 16.5 3C21.194 3 25 6.806 25 11.5C25 12.096 24.959 12.683 24.884 13.257C24.955 13.5 25 13.754 25 14C25 17.314 22.314 20 19 20H6C4.895 20 4 19.105 4 18V16Z" fill="#C9D9F2" />
    <circle cx="26" cy="8" r="1" fill="#F2F1DC" />
    <circle cx="28" cy="10" r="0.8" fill="#F2F1DC" />
    <circle cx="24" cy="12" r="0.7" fill="#F2F1DC" />
  </svg>
);

export const getWeatherIconComponent = (conditionText, isDay = true) => {
  const type = getConditionType(conditionText);
  if (type === 'storm') return StormIcon;
  if (type === 'snow') return SnowIcon;
  if (type === 'rain') return RainIcon;
  if (type === 'cloudy') {
    if ((conditionText || '').toLowerCase().includes('fog') || (conditionText || '').toLowerCase().includes('mist')) {
      return isDay ? CloudyIcon : MoonCloudIcon;
    }
    return isDay ? CloudyIcon : MoonCloudIcon;
  }
  return isDay ? SunnyIcon : MoonIcon;
};

export const getWeatherPicture = (conditionText, isDay = true) => {
  const type = getConditionType(conditionText);
  if (type === 'storm') return toDataUri(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 680'>${scenes.storm}</svg>`);
  if (type === 'snow') return toDataUri(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 680'>${scenes.snow}</svg>`);
  if (type === 'rain') return toDataUri(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 680'>${scenes.rain}</svg>`);
  if (type === 'cloudy') return toDataUri(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 680'>${scenes.cloudy}</svg>`);
  return toDataUri(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 680'>${isDay ? scenes.clearDay : scenes.clearNight}</svg>`
  );
};
