import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionAddToFavorites, actionRouteSet, FAVORTE_INITIAL_LOAD } from '../redux/actions';
import { readStoredFavorites, storeFaveorites } from '../utils/favorites-storage-utils';
import BtnIcon from './BtnIcon';
import PageRouter from './PageRouter';


const App = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites);
  const initialized = useSelector(state => state.initialized);

  useEffect(() => {
    // INIT
    // inicijalno citamo prethodno zapizane favorites na hard disku
    const storedFavorites = readStoredFavorites();
    console.log('storedFavorites', storedFavorites);
    dispatch({
      type: FAVORTE_INITIAL_LOAD,
      payload: storedFavorites
    })
  }, []);

  useEffect(() => {
    if (initialized) {
      // ovo radimo samo ako je aplikacija vec inicijalizovan u protivnom bi se desilo da obrisemo favorites pre nego sto ih procitamo
      storeFaveorites(favorites); // cuva na jard disku favorites nakon svake promene
    }
  }, [favorites, initialized]);




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
    dispatch(actionAddToFavorites(id));
  };


  const handleClikckHome = (e) => {
    dispatch(actionRouteSet('HOME'));
  };

  const handleClikckFavorites = (e) => {
    dispatch(actionRouteSet('FAVORITES'));
  };

  const handleClikckSearch = (e) => {
    dispatch(actionRouteSet('SEARCH'));
  };

  return (
    <div>

      <header>
        <BtnIcon fa="fa fa-home" title="Home" handleClick={handleClikckHome} />
        <BtnIcon fa="fa fa-star-o" title="Favorites" handleClick={handleClikckFavorites} />
        <div className="search-field">
          <input
            type="text"
            placeholder="Search"
            name="search"
            value={formState.search}
            onChange={handleChange}
          />
        </div>
        <BtnIcon fa="fa fa-search" title="Search" handleClick={handleClikckSearch} />
      </header>

      <PageRouter q={q} />

    </div>
  );
};

export default App;