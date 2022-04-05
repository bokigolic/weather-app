import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actionAddToFavorites, actionRouteSet } from '../redux/actions';
import { ajax } from '../utils/ajax-adapter';
import ForecastCard from './ForecastCard';
import ForecastToday from './ForecastToday';


const PageSearchResult = (props) => {
  const dispatch = useDispatch();

  const q = props.q;
  // const dispatch = useDispatch();
  const [result, setResult] = useState({}); // u ovom stateu cuvamo prignozu sa interneta za sada

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

  // const _addToFavorites = props._addToFavorites;
  const _addToFavorites = (id) => {
    dispatch(actionAddToFavorites(id));
  };


  let jsxZeroResult = null;
  let jsxToday = null;
  let jsxKartice = null;
  if (result.list && result.city) { // if data ready

    jsxToday = (
      <>
        <button type="button" onClick={(e) => { _addToFavorites(result.city.id) }}>FAV THIS CITY</button>
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



  return (
    <div className="page page-search">

      <button type="button" onClick={(e) => { _addToFavorites(2643743) }}>London</button>
      <button type="button" onClick={(e) => { _addToFavorites(2988507) }}>Paris</button>
      <button type="button" onClick={(e) => { _addToFavorites(4887398) }}>Chicago</button>

      <h2>Search results</h2>

      {jsxZeroResult}

      <div className="search-result">
        <h3>Today</h3>
        {jsxToday}

        <h3>5-Day forecast</h3>
        <div className="list">
          {jsxKartice}
        </div>
      </div>

    </div>
  );
};

export default PageSearchResult;