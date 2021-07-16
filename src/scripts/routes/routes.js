import Detail from '../views/pages/detail';
import Favorite from '../views/pages/favorite';
import RestaurantList from '../views/pages/restaurant-list';

const routes = {
  '/': RestaurantList,
  '/favorite': Favorite,
  '/detail/:id': Detail,
};

export default routes;
