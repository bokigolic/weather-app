const ForecastCard = (props) => {

  const city = props.city;
  const item = props.item;

  return (
    <div className="forecast-card">
      <div>ID: {city.id}</div>
      <div>Name: {city.name}</div>
      <div>icon: {item.weather[0].main}</div>
      <div>description: {item.weather[0].description}</div>
      <div>Temperature: {item.temp.day}</div>
      <div>Wind speed: {item.speed}</div>
    </div>
  );
};

export default ForecastCard;