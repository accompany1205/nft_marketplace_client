/* eslint-disable @next/next/no-img-element */
import { Bid } from '../../types';

interface Props {
  bidOrders: Bid[] | undefined;
  askOrders: Bid[] | undefined;
  // bidType: OrderType;
}

const OrderBook: React.FC<Props> = ({ bidOrders, askOrders }) => (
  <div className="row">
    <table className="table d-none d-md-table w-auto">
      <thead>
        <tr>
          <td> Number of Asks </td>
          <td> Ask Price </td>
        </tr>
      </thead>
      <tbody>
        {askOrders?.map((askOrder: Bid) => (
          <tr>
            <td>1</td>
            <td>
              £
              {askOrder.amount}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <table className="table d-none d-md-table w-auto">
      <thead>
        <tr>
          <td> Bid Price </td>
          <td> Number of Bids </td>
        </tr>
      </thead>
      <tbody>
        {bidOrders?.map((bidOrder: Bid) => (
          <tr>
            <td>
              £
              {bidOrder.amount}
            </td>
            <td>1</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default OrderBook;
