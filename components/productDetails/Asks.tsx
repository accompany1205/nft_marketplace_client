import { OrderType } from '../../hooks';
import { useGetAsksQuery } from '../../redux/service/appService';
import Histories from './Histories';

interface Props {
  listingId: number;
}

const Bids: React.FC<Props> = ({ listingId }) => {
  const { data } = useGetAsksQuery(listingId);

  return (
    <div className="tab-1 onStep fadeIn">
      {!data?.data?.length ? (
        <div>No asks are placed yet.</div>
      ) : (
        <Histories bidType={OrderType.ASK} bids={data.data} />
      )}
    </div>
  );
};

export default Bids;
