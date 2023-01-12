import { SummaryProps } from "./summaryProps.type";

const Summary: React.FC<SummaryProps> = ({ purchaseDetails, onNextStep }) => {
  const { checkout, shipping, tax } = purchaseDetails;

  if (!shipping || !checkout) return <></>;

  return (
    <>
      <div className="heading">
        <h3>Price Computation</h3>
      </div>
      <table className="summary" cellSpacing={10}>
        <tbody>
          <tr>
            <th className="bold">Bid Price :</th>
            <td>{checkout?.bid}</td>
          </tr>
          <tr>
            <th className="bold">Shipping :</th>
            <td>
              <address>
                {shipping.name}
                <br />
                {shipping.addressLine1}
                <br />
                {shipping.addressLine2 && (
                  <>
                    {shipping.addressLine2}
                    <br />
                  </>
                )}
                {shipping.city}, {shipping.country}, {shipping.postCode}
              </address>
            </td>
          </tr>
          <tr>
            <th className="bold">Tax :</th>
            <td>{tax ? tax : "--/--"}</td>
          </tr>
          <tr>
            <th className="bold">Total :</th>
            <td>{tax ? checkout.bid + tax : checkout.bid}</td>
          </tr>
        </tbody>
      </table>
      <button
        className="btn-main lead mb-5"
        onClick={() => onNextStep(purchaseDetails)}
      >
        Complete Purchase
      </button>
    </>
  );
};

export default Summary;
