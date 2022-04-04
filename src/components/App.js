import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actionRouteSet } from '../redux/actions';
import PageFavorites from './PageFavorites';
import PageFavoritesSlider from './PageFavoritesSlider';
import PageRouter from './PageRouter';
import PageSearchResult from './PageSearchResult';


const App = () => {
  const dispatch = useDispatch();

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

  useEffect(() => {
    // nakon kucanja u serch polje redirektujemo na search results stranicu
    if (q !== '') {
      dispatch(actionRouteSet('SEARCH'));
    }
  }, [q]);


  const _addToFavorites = (id) => {
    if (favorites.includes(id)) { // .includes proverava da li ta vrednost vec ima u nizu
      // vec je u favorites. necemo duplikat
    } else {
      // setFavorites([...favorites, id]); // zadrzavamo sve prethodno favoritovane u nizu i dodajemo novi id na kraj niza
      setFavorites([id, ...favorites]); // zadrzavamo sve prethodno favoritovane u nizu i dodajemo novi id na kraj niza
    }
  };

  const handleClikckHome = (e) => {
    dispatch(actionRouteSet('HOME'));
  };

  const handleClikckSearch = (e) => {
    dispatch(actionRouteSet('SEARCH'));
  };

  return (
    <div>

      <header>
        <button type="button" onClick={handleClikckHome}>HOME</button>
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

        <button type="button" onClick={handleClikckSearch}>SEARCH</button>
      </header>

      <PageRouter favorites={favorites} q={q} />

    </div>
  );
};

export default App;