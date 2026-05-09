import {
  WiCloud,
  WiCloudy,
  WiDayRain,
  WiDaySunny,
  WiFog,
  WiNightAltCloudy,
  WiNightAltRain,
  WiNightClear,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from 'react-icons/wi';

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

export const getWeatherIconComponent = (conditionText, isDay = true) => {
  const type = getConditionType(conditionText);

  if (type === 'storm') return WiThunderstorm;
  if (type === 'snow') return WiSnow;
  if (type === 'rain') return isDay ? WiDayRain : WiNightAltRain;
  if (type === 'cloudy') return isDay ? WiCloudy : WiNightAltCloudy;
  if ((conditionText || '').toLowerCase().includes('fog') || (conditionText || '').toLowerCase().includes('mist')) return WiFog;
  return isDay ? WiDaySunny : WiNightClear;
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
