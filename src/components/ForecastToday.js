import WeatherImageSmart from "./WeatherImageSmart";

const ForecastToday = (props) => {

  const city = props.city;
  const item = props.item;

  return (
    <div className="forecast-today forecast-big">
      <abbr title={'ID ' + city.id}>
        <h2>{city.name}</h2>
      </abbr>
      <div className="icon-group">
        <div className="weather-img">
          <WeatherImageSmart x={item.weather[0].main} />
        </div>
        <div className="xl">{item.temp.day}&deg;</div>
        <div className="c">c</div>
      </div>
      <h3>{item.weather[0].main}</h3>
      <div className="description">description: {item.weather[0].description}</div>
      <div className="small-data">
        <div>Wind {item.speed} km/h</div>
        <div>Wind {item.speed} km/h</div>
        <div>Wind {item.speed} km/h</div>
        <div>Wind {item.speed} km/h</div>
        <div>Wind {item.speed} km/h</div>
      </div>
    </div>
  );
};

export default ForecastToday;