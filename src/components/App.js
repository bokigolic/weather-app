import { useState } from 'react';

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