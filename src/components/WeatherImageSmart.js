const WeatherImageSmart = (props) => {

  const x = props.x;

  let img = 'cloudy.png';
  if (x === 'Clouds') {
    img = 'cloudy.png';
  } else if (x === 'Rain') {
    img = 'rainy.png';
  } else if (x === 'Snow') {
    img = 'snow.png';
  } else if (x === 'Clear') {
    img = 'sun.png';
  } else if (x === 'Storm') {
    img = 'storm.png';
  } else if (x === 'Cloudy') {
    img = 'cloud.png';
  }

  const src = '/static/img/' + img;

  return (
    <img src={src} />
  );
};

export default WeatherImageSmart;