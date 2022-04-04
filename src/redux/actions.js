

// ACTION TYPES constants

export const ROUTE_SET = 'ROUTE_SET';


// ACTION CREATORS

export const actionRouteSet = (name) => {
  return {
    type: ROUTE_SET,
    payload: name,
  };
};