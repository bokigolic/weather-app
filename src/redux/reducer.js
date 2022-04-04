import { FAVORITE_ADD, ROUTE_SET } from "./actions";

const initialState = {
  route: 'HOME',
  favorites: []
};

const rootReducer = (state = initialState, action) => {
  let city;
  switch (action.type) {

    case ROUTE_SET:
      return {
        ...state,
        route: action.payload
      };

    case FAVORITE_ADD:
      city = action.payload;
      if (state.favorites.includes(city)) {
        return state; // vec je taj grad u favorites. ne menjamo state
      } else {
        return {
          ...state,
          favorites: [...state.favorites, city]
        };
      }

    case 'NEKI_ACTION ':

      break;

    default:
      return state;
  }

};


export default rootReducer;