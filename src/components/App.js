import { useState, useEffect } from 'react';
import { ajax } from '../utils/ajax-adapter';

const App = () => {

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
    // poziva se svaki put kad se search forma promeni
    // HOT SEARCH
    if (q !== '') {
      console.log('aktiviramo hot serch za reči: ', q);
      ajax.getWeatherSearch(q)
      .then(obradjeni_response => {
        if (obradjeni_response) {
          // sigurno uspeo response jer neusepli stize kao false
          console.log('usepo response :)', obradjeni_response);
        }
      })
    }
    
  }, [q]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        name="search"
        value={formState.search}
        onChange={handleChange}
      />

    </div>
  );
};

export default App;