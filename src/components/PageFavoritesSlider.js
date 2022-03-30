import { useState, useEffect } from 'react';
import City from "./City";

// varijanta strane favorites sa sliderom (podrazumeva sav mehanizam za slider)

const PageFavoritesSlider = (props) => {

  const favorites = props.favorites;

  const [visibleSlide, setVisibleSlide] = useState(0);

  const _nextSlide = () => {
    const max = favorites.length - 1;
    if (visibleSlide === max) {
      setVisibleSlide(0); // ponovo pocinje od prvog
    } else {
      setVisibleSlide(visibleSlide + 1)
    }
  };



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