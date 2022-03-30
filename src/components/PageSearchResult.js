import { useState, useEffect } from 'react';
import { ajax } from '../utils/ajax-adapter';
import ForecastCard from './ForecastCard';
import ForecastToday from './ForecastToday';


const PageSearchResult = (props) => {
  const q = props.q;
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

  const _pinCity = props._pinCity;


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



  return (
    <div className="page-search">

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