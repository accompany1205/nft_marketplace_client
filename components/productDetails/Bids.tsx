import { OrderType } from '../../hooks';
import { useGetBidsQuery } from '../../redux/service/appService';
import Histories from './Histories';

interface Props {
  listingId: number;
}

const Bids: React.FC<Props> = ({ listingId }) => {
  const { data } = useGetBidsQuery(listingId);

  return (
    <div className="tab-1 onStep fadeIn">
      {!data?.data?.length ? (
        <div>No bids are placed yet.</div>
      ) : (
        <Histories bidType={OrderType.BID} bids={data.data} />
      )}
    </div>
  );
};

export default Bids;
