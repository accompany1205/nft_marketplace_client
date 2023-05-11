import { OrderType } from '../../hooks';
import { useGetBidsQuery } from '../../redux/service/appService';
import Histories from './Histories';
import { Bid } from '../../types';

interface Props {
  data: Bid[];
}

const Bids: React.FC<Props> = ({ data }) => {
  //const { data } = useGetBidsQuery(poolId);

  return (
    <div className="tab-1 onStep fadeIn">
      {!data?.length ? (
        <div>No bids are placed yet.</div>
      ) : (
        <Histories bidType={OrderType.BID} bids={data} />
      )}
    </div>
  );
};

export default Bids;
