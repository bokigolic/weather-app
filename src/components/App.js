import { useState, useEffect } from 'react';
import PageFavorites from './PageFavorites';
import PageFavoritesSlider from './PageFavoritesSlider';
import PageSearchResult from './PageSearchResult';


const App = () => {
  const [favorites, setFavorites] = useState([]); // u ovom stateu cuvamo favorites gradove. Koristimo array u kojem samo cuvavmo ID-ove gradova.

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


  const _addToFavorites = (id) => {
    if (favorites.includes(id)) { // .includes proverava da li ta vrednost vec ima u nizu
      // vec je u favorites. necemo duplikat
    } else {
      // setFavorites([...favorites, id]); // zadrzavamo sve prethodno favoritovane u nizu i dodajemo novi id na kraj niza
      setFavorites([id, ...favorites]); // zadrzavamo sve prethodno favoritovane u nizu i dodajemo novi id na kraj niza
    }
  };


  return (
    <div>

      <header>
        <button type="button" onClick={(e) => { _addToFavorites(2643743) }}>London</button>
        <button type="button" onClick={(e) => { _addToFavorites(2988507) }}>Paris</button>
        <button type="button" onClick={(e) => { _addToFavorites(4887398) }}>Chicago</button>

        <input
          type="text"
          placeholder="Search"
          name="search"
          value={formState.search}
          onChange={handleChange}
        />
      </header>


      <PageSearchResult q={q} _addToFavorites={_addToFavorites} />

      <PageFavoritesSlider favorites={favorites} />

      <PageFavorites favorites={favorites} />

    </div>
  );
};

export default App;