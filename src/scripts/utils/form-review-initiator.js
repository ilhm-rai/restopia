import DicodingRestaurantSource from '../data/dicodingrestaurant-source';
import { createCustomerReviewsTemplate, createFormReviewTemplate } from '../views/templates/template-creator';

const FormReviewInitator = {
  async init({ formReviewContainer, restaurant }) {
    this._formReviewContainer = formReviewContainer;
    this._restaurantId = restaurant.id;
    await this._renderForm();
  },
  async _renderForm() {
    this._formReviewContainer.innerHTML = createFormReviewTemplate();

    const formReview = document.querySelector('#formReview');
    formReview.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formElm = document.forms.formReview;
      const formData = new FormData(formElm);
      const nameElm = document.getElementById('name');
      const reviewElm = document.getElementById('review');
      const addReview = await DicodingRestaurantSource.addReview({ id: this._restaurantId, name: formData.get('name'), review: formData.get('review') });

      document.querySelectorAll('.form-control').forEach((elm) => {
        elm.classList.remove('error');
        document.querySelector('p.error-message').innerHTML = '';
      });

      if (nameElm.value === '') {
        nameElm.classList.add('error');
        document.querySelector('p[data-id="name"]').innerHTML = addReview.message;
        return;
      }

      if (reviewElm.value === '') {
        reviewElm.classList.add('error');
        document.querySelector('p[data-id="review"]').innerHTML = addReview.message;
        return;
      }

      document.querySelector('#containerCustomerReviews').innerHTML = createCustomerReviewsTemplate(addReview.customerReviews);
      nameElm.value = '';
      reviewElm.value = '';
      console.log(addReview);
    });
  },
};

export default FormReviewInitator;
