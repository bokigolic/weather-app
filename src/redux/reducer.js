import { ROUTE_SET } from "./actions";

const initialState = {
  route: 'HOME'
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {

    case ROUTE_SET:
      return {
        ...state,
        route: action.payload
      };

    case 'NEKI_ACTION ':

      break;

    default:
      return state;
  }

};


export default rootReducer;