// src/stores.js
import { writable } from 'svelte/store';
import { getWeather, getSolar, getSunTimes } from './lib/api';

export const location = writable({ lat: 44.012, lon: -92.466 }); // Rochester, MN

export const weather = writable({});
export const solar = writable({});
export const sun = writable({});

export async function loadAll() {
  const { lat, lon } = $location;
  weather.set(await getWeather(lat, lon));
  solar.set(await getSolar());
  sun.set(await getSunTimes(lat, lon));
}