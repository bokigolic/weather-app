import { useState, useEffect } from 'react';
import { ajax } from '../utils/ajax-adapter';
import ForecastCard from './ForecastCard';
import ForecastToday from './ForecastToday';
import PinnedPlace from './PinnedPlace';

const App = () => {
  const [pinned, setPinned] = useState([]); // u ovom stateu cuvamo pinovane gradove. Koristimo array u kojem samo cuvavmo ID-ove gradova.


  const [result, setResult] = useState({}); // u ovom stateu cuvamo prignozu sa interneta za sada

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

  const _pinCity = (id) => {
    if (pinned.includes(id)) { // .includes proverava da li ta vrednost vec ima u nizu
      // vec je pinovan. necemo duplikat
    } else {
      setPinned([...pinned, id]); // zadrzavamo sve prethodno pinovane u nizu i dodajemo novi id na kraj niza
    }
  };


  let jsxZeroResult = null;
  let jsxToday = null;
  let jsxKartice = null;
  if (result.list && result.city) { // if data ready

    jsxToday = (
      <>
        <button type="button" onClick={(e) => { _pinCity(result.city.id) }}>PIN THIS CITY</button>
        <ForecastToday city={result.city} item={result.list[0]} />
      </>
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


  let jsxPinned = pinned.map((id) => { // svaki item u pinned nizu je u stvari id pa ga odmah nazivamo id
    return (
      <PinnedPlace key={id} id={id} />
    );
  });


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

      <h2>Pinned places</h2>
      {jsxPinned}

    </div>
  );
};

export default App;