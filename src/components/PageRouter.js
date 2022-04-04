import { useSelector } from "react-redux";
import PageFavoritesSlider from "./PageFavoritesSlider";
import PageSearchResult from "./PageSearchResult";

const PageRouter = (props) => {
  const route = useSelector(state => state.route);

  let jsxRoute = null;
  if (route === 'HOME') {
    jsxRoute = (
      <PageFavoritesSlider favorites={props.favorites} />
    );
  } else if (route === 'SEARCH') {
    jsxRoute = (
      <PageSearchResult q={props.q} />
    );
  } else {
    jsxRoute = (
      <div>Page not found!</div>
    );
  }

  return (
    <>
      {jsxRoute}
    </>
  );
};

export default PageRouter;