
const LOCAL_STORAGE_FAVORITES_KEY = 'weather_app_favorites';

export const storeFaveorites = (favorites)=>{
  let json = '';
  try {
    json = JSON.stringify(favorites);
  } catch (err) {

  }

  window.localStorage.setItem(LOCAL_STORAGE_FAVORITES_KEY,  json);
};

export const readStoredFavorites = ()=> {
  let favorites = [];
  try {
    const json = window.localStorage.getItem(LOCAL_STORAGE_FAVORITES_KEY);
    const _favorites = JSON.parse(json);
    if (Array.isArray(_favorites)) {
      favorites = _favorites;
    }
  } catch (err) {

  }

  return favorites;
};