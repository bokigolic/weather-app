

// ACTION TYPES constants

export const ROUTE_SET = 'ROUTE_SET';
export const FAVORITE_ADD = 'FAVORITE_ADD';
export const FAVORITE_REMOVE = 'FAVORITE_REMOVE';


// ACTION CREATORS

export const actionRouteSet = (name) => {
  return {
    type: ROUTE_SET,
    payload: name,
  };
};

export const actionAddToFavorites = (city) => {
  return {
    type: FAVORITE_ADD,
    payload: city,
  };
};

export const actionRemoveFromFavorites = (city) => {
  return {
    type: FAVORITE_REMOVE,
    payload: city,
  };
};