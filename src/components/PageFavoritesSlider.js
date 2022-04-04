import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import City from "./City";

// varijanta strane favorites sa sliderom (podrazumeva sav mehanizam za slider)

const PageFavoritesSlider = (props) => {

  // const favorites = props.favorites;
  const favorites = useSelector(reduxState => reduxState.favorites); // krace je da nsapisem ostate ali radi razumevannja smo stavi reduxState
  
  const [visibleSlide, setVisibleSlide] = useState(0);
  
  const _nextSlide = () => {
    console.log('next');
    const maxIndex = favorites.length - 1;

    console.log(visibleSlide, maxIndex);
    if (visibleSlide >= maxIndex) {
      console.log('test ISTO kao max')
      setVisibleSlide(0); // ponovo pocinje od prvog
    } else {
      console.log('razlicito');
      setVisibleSlide(visibleSlide + 1);
    }
  };
  

  useEffect(() => {
    
    const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
      // ovo je funkcija koju izvrsavamo na svaki interval
      _nextSlide();
    }, 2000);
  
    // You need to clear your interval,
    return () => clearInterval(intervalId); // This is important
   
  }, [favorites, visibleSlide]);


  let jsxSlides = favorites.map((id, index) => { // svaki item u favorites nizu je u stvari id pa ga odmah nazivamo id
    let cl = "slide";
    if (index === visibleSlide) {
      cl = " slide visible";
    } else if (index < visibleSlide) {
      // vec prikazani slideovi
      cl = " slide post-visible";
    }

    return (
      <div key={id} className={cl}>
        <City key={id} id={id} />
      </div>
    );
  });

  return (
    <div className="page-favorites">

      <h2>Favorite places SLIDER</h2>

      <div className="slide-show">
        <div className="visible-frame">
          <div className="slides">
            {jsxSlides}
          </div>
        </div>
        <button type="button" onClick={(e) => { _nextSlide() }}>Next slide</button>
      </div>

    </div>
  );
};

export default PageFavoritesSlider;