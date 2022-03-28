import axios from "axios";

export const ajax = {};

ajax.getWeatherSearch = (q = '') => {
  // q text koji prtrazujemo
  // GET METHOD (znaci nemam nikakvih json podataka)
  const url = 'https://community-open-weather-map.p.rapidapi.com/weather?units=metric&q=' + q;
  const response = axios.get(url, {
    headers: {
      // 'Content-Type': 'application/json',
      'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
      'X-RapidAPI-Key': '8bc9ab9e30mshcb25afcd6c37bf3p1231a7jsn2e229c3d0c0d'
    }
  });
  console.log('response za getWeatherSearch', response);
  return response;
};
