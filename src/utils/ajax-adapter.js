import axios from "axios";

export const ajax = {};

/*
ajax.getWeatherSearch1 = async (q = '') => {
  // q text koji prtrazujemo
  // GET METHOD (znaci nemam nikakvih json podataka)
  const url = 'https://community-open-weather-map.p.rapidapi.com/weather?units=metric&q=' + q;
  try {
    const response = await axios.get(url, {
      headers: {
        // 'Content-Type': 'application/json',
        'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
        'X-RapidAPI-Key': '8bc9ab9e30mshcb25afcd6c37bf3p1231a7jsn2e229c3d0c0d'
      }
    });
    console.log('response za getWeatherSearch', response);
    if (response.data && response.data.id) {
      console.log(response.data.id);
      return response.data; // response data nam je celi podaci od prognoze za trazeni grad
    } else {
      console.log('neuspeo response 1');
      return false;
    }
  } catch (err) {
    console.log('neuspeo response 2');
    return false;
  }
};
*/


ajax.getWeatherSearch = async (q = '') => {
  // q text koji prtrazujemo
  // GET METHOD (znaci nemam nikakvih json podataka)
  // https://community-open-weather-map.p.rapidapi.com/forecast/daily?q=washington&units=metric&cnt=3
  const url = 'https://community-open-weather-map.p.rapidapi.com/forecast/daily?units=metric&cnt=6&q=' + q;
  try {
    const response = await axios.get(url, {
      headers: {
        // 'Content-Type': 'application/json',
        'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
        'X-RapidAPI-Key': '8bc9ab9e30mshcb25afcd6c37bf3p1231a7jsn2e229c3d0c0d'
      }
    });
    console.log('response za getWeatherSearch', response);
    if (response.data && response.data.city && response.data.city.id) {
      console.log(response.data.city.id);
      return response.data; // response data nam je celi podaci od prognoze za trazeni grad
    } else {
      console.log('neuspeo response 1');
      return false;
    }
  } catch (err) {
    console.log('neuspeo response 2');
    return false;
  }
};


ajax.getWeatherbyCityId = async (id = '') => {
  // q text koji prtrazujemo
  // GET METHOD (znaci nemam nikakvih json podataka)
  const url = 'https://community-open-weather-map.p.rapidapi.com/forecast/daily?units=metric&cnt=6&id=' + id;
  try {
    const response = await axios.get(url, {
      headers: {
        // 'Content-Type': 'application/json',
        'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
        'X-RapidAPI-Key': '8bc9ab9e30mshcb25afcd6c37bf3p1231a7jsn2e229c3d0c0d'
      }
    });
    console.log('response za getWeatherSearch', response);
    if (response.data && response.data.city && response.data.city.id) {
      console.log(response.data.city.id);
      return response.data; // response data nam je celi podaci od prognoze za trazeni grad ID
    } else {
      console.log('neuspeo response 1');
      return false;
    }
  } catch (err) {
    console.log('neuspeo response 2');
    return false;
  }
};
