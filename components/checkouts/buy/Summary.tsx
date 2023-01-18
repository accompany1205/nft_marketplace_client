import { CheckoutDetails, CheckoutSteps } from './Buy';

interface Props {
  checkoutDetails: CheckoutDetails;
  handleSubmit: (d: CheckoutDetails, nextStep?: CheckoutSteps) => void;
}

const Summary: React.FC<Props> = ({ checkoutDetails }) => (
  <>
    <div className="heading">
      <h3>Price Computation</h3>
    </div>
    <div className="heading">
      <p>You will pay</p>
      <div className="subtotal">{checkoutDetails.amount}</div>
    </div>
    <button
      type="button"
      className="btn-main lead mb-5"
    >
      Complete Purchase
    </button>
  </>
);

export default Summary;
