import { useGetBidsQuery, useGetAsksQuery } from '../../redux/service/appService';
import OrderBook from './OrderBook';

interface Props {
  listingId: number;
}

const Orders: React.FC<Props> = ({ listingId }) => {
  const { data: askData } = useGetAsksQuery(listingId);
  const { data: bidData } = useGetBidsQuery(listingId);

  return (
    <div className="tab-1 onStep fadeIn">
      {!askData?.data?.length && !bidData?.data?.length ? (
        <div>No orders placed yet.</div>
      ) : (
        <OrderBook askOrders={askData?.data} bidOrders={bidData?.data} />
      )}
    </div>
  );
};

export default Orders;
