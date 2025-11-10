// src/lib/api.js
export async function getWeather(lat, lon) {
  const key = import.meta.env.VITE_OWM_KEY;
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`
  );
  if (!res.ok) throw new Error('Weather fetch failed');
  const data = await res.json();
  return {
    temp: data.main.temp,
    humidity: data.main.humidity,
    wind: data.wind.speed,
    description: data.weather[0].description,
  };
}

export async function getSolar() {
  const res = await fetch(
    'https://services.swpc.noaa.gov/json/planetary_k_index_1m.json'
  );
  if (!res.ok) throw new Error('Solar fetch failed');
  const list = await res.json();
  // take most recent entry
  const latest = list[list.length - 1];
  return { kIndex: latest.kp_index, timestamp: latest.time_tag };
}

export async function getSunTimes(lat, lon) {
  const res = await fetch(
    `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&formatted=0`
  );
  if (!res.ok) throw new Error('Sun times fetch failed');
  const { results } = await res.json();
  return {
    sunrise: new Date(results.sunrise),
    sunset: new Date(results.sunset),
  };
}