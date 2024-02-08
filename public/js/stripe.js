/* eslint-disable */
import axios from "axios";
import { showAlert } from "./alerts";
const stripe = Stripe(
  "pk_test_51OeP7EGO3fpUMnE6Y0lSYXLKo7gUmNJWn9ymV7GgO8VrlKw4MVBND7I4TZuNiCXVCeGetPmR59KRA0vyXXuPDOPS00NvgjGbxK"
);

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
    // window.location.replace(session.data.session.url);
  } catch (err) {
    console.log(err);
    showAlert("error", err);
  }
};
