import { useState, useEffect } from 'react';
import { resultingClientExists } from 'workbox-core/_private';
import { ajax } from '../utils/ajax-adapter';
import ForecastCard from './ForecastCard';
import ForecastToday from './ForecastToday';

const App = () => {
  const [result, setResult] = useState({}); // u ovom stqteu cuvamo porgnosu sa interneta za sada

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


  let jsxZeroResult = null;
  let jsxToday = null;
  let jsxKartice = null;
  if (result.list && result.city) { // if data ready

    jsxToday = (
      <ForecastToday city={result.city} item={result.list[0]} />
    );

    jsxKartice = result.list.map((item, index) => {
      if (index === 0) {
        return null; // preskacemo prvi item jer je on za today weather sekciju
      }
      return (
        <ForecastCard key={index} city={result.city} item={item} />
      );
    });

  } else {
    jsxZeroResult = (
      <div>No results yet</div>
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

      {jsxZeroResult}

      <h3>Today</h3>
      {jsxToday}

      <h3>5-Day forecast</h3>
      <div className="list">
        {jsxKartice}
      </div>

    </div>
  );
};

export default App;