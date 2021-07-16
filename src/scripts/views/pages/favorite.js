import FavoriteRestaurantIdb from '../../data/favoriterestaurant-idb';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Favorite = {
  async render() {
    return `
    <main id="mainContent">
      <section class="content">
        <div class="content-head">
            <h2 class="content-head__label">Restoran Favorit Anda</h2>
        </div>
        <div class="restaurants" id="restaurants">
          <!-- Data Restaurants -->
        </div>
      </section>
    </main>
    `;
  },

  async afterRender() {
    let html = '';
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    const restaurantsContainer = document.querySelector('#restaurants');
    if (restaurants.length > 0) {
      restaurants.forEach((restaurant) => {
        html += createRestaurantItemTemplate(restaurant);
      });
    } else {
      document.querySelector('.content-head__label').style.display = 'none';
      restaurantsContainer.style.gridTemplateColumns = '1fr';
      html = '<section class="content"><div class="restaurant-item__not__found"><p class="text-center">Anda belum memiliki restoran favorit nih...</p></div></section>';
    }
    restaurantsContainer.innerHTML += html;
  },
};

export default Favorite;
