import { useState, useEffect } from 'react';
import { ajax } from '../utils/ajax-adapter';
import ForecastCard from './ForecastCard';
import ForecastToday from './ForecastToday';
import PageFavorites from './PageFavorites';
import PageSearchResult from './PageSearchResult';
import PageSearch from './PageSearchResult';

const App = () => {
  const [pinned, setPinned] = useState([]); // u ovom stateu cuvamo pinovane gradove. Koristimo array u kojem samo cuvavmo ID-ove gradova.

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


  const _pinCity = (id) => {
    if (pinned.includes(id)) { // .includes proverava da li ta vrednost vec ima u nizu
      // vec je pinovan. necemo duplikat
    } else {
      // setPinned([...pinned, id]); // zadrzavamo sve prethodno pinovane u nizu i dodajemo novi id na kraj niza
      setPinned([id, ...pinned]); // zadrzavamo sve prethodno pinovane u nizu i dodajemo novi id na kraj niza
    }
  };


  return (
    <div>

      <header>
        <button type="button" onClick={(e) => { _pinCity(2643743) }}>London</button>
        <button type="button" onClick={(e) => { _pinCity(2988507) }}>Paris</button>
        <button type="button" onClick={(e) => { _pinCity(4887398) }}>Chicago</button>

        <input
          type="text"
          placeholder="Search"
          name="search"
          value={formState.search}
          onChange={handleChange}
        />
      </header>

      <PageSearchResult q={q} _pinCity={_pinCity} />

      <PageFavorites favorites={pinned} />

    </div>
  );
};

export default App;