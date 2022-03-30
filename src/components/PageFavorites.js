import PinnedPlace from "./PinnedPlace";

const PageFavorites = (props) => {

  const favorites = props.favorites;

  let jsxFavorites = favorites.map((id) => { // svaki item u favorites nizu je u stvari id pa ga odmah nazivamo id
    return (
      <PinnedPlace key={id} id={id} />
    );
  });

  return (
    <div className="page-favorites">

      <h2>Favorite places</h2>
      {jsxFavorites}

    </div>
  );
};

export default PageFavorites;