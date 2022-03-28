import { useState, useEffect } from 'react';
import { resultingClientExists } from 'workbox-core/_private';
import { ajax } from '../utils/ajax-adapter';

const App = () => {
  const [result, setResult] = useState({});

  let resultReady = false;
  if (result && result.id) {
    resultReady = true;
  }

  const preset = {
    search: ''
  };

  const [formState, setFormState] = useState(preset);

  const handleChange = (e) => {
    // univerzalni handler za sva input polja
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const q = formState.search.trim(); // optimizujemo ono sto je ukucan ou polje search

  useEffect(() => {
    // poziva se svaki put kad se search forma promeni
    // HOT SEARCH
    if (q !== '') {
      console.log('aktiviramo hot serch za reči: ', q);
      ajax.getWeatherSearch(q)
        .then(obradjeni_response => {
          if (obradjeni_response) {
            // sigurno uspeo response jer neusepli stize kao false
            console.log('usepo response :)', obradjeni_response);
            setResult(obradjeni_response);
          }
        })
    }

  }, [q]);

  let jsxResult = (
    <div>No results yet</div>
  );
  if (resultReady) {
    // ako su rezultati spremni ispisujemo ih
    jsxResult = (
      <div>
        <div>ID: {result.id}</div>
        <div>Name: {result.name}</div>
        <div>icon: {result.weather[0].main}</div>
        <div>description: {result.weather[0].description}</div>
        <div>Temperature: {result.main.temp} degree</div>
        <div>Wind speed: {result.wind.speed}</div>
      </div>
    );
  }


  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        name="search"
        value={formState.search}
        onChange={handleChange}
      />

      <h3>Forecast results</h3>
      {jsxResult}

    </div>
  );
};

export default App;