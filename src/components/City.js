import { useState, useEffect } from 'react';
import { ajax } from '../utils/ajax-adapter';
import ForecastCard from './ForecastCard';
import ForecastToday from './ForecastToday';

const City = (props) => {
  const id = props.id;
  const [result, setResult] = useState({}); // u ovom stqteu cuvamo prignozu sa interneta za sada

  useEffect(() => {
    // poziva se svaki put kad se search forma promeni
    // HOT SEARCH
    console.log('aktiviramo api poziv za id: ', id);
    ajax.getWeatherbyCityId(id)
      .then(obradjeni_response => {
        if (obradjeni_response) {
          // sigurno uspeo response jer neusepli stize kao false
          console.log('usepo response :)', obradjeni_response);
          setResult(obradjeni_response);
        }
      })

  }, [id]);


  let jsxZeroResult = null;
  let jsxToday = null;
  let jsxKartice = null;
  if (result.list && result.city) { // if data ready

    jsxToday = (
      <>
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
    <div className="favorite-place">FAVORITE PLACE ID: {id}

      <h3>Today</h3>
      {jsxToday}

      <h3>5-Day forecast</h3>
      <div className="list">
        {jsxKartice}
      </div>

    </div>
  );
};

export default City;