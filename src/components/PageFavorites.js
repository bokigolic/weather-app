import { useDispatch, useSelector } from "react-redux";
import { actionRemoveFromFavorites } from "../redux/actions";
import City from "./City";

const PageFavorites = (props) => {
  const dispatch = useDispatch();

  // const favorites = props.favorites;
  const favorites = useSelector(state => state.favorites);

  const _handleRemove = (id) => {
    dispatch(actionRemoveFromFavorites(id));
  };

  let jsxFavorites = favorites.map((id) => { // svaki item u favorites nizu je u stvari id pa ga odmah nazivamo id
    return (
      <>
      <button type="button" onClick={(e)=>{_handleRemove(id)}}>REMOVE</button>
      <City key={id} id={id} />
      </>
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