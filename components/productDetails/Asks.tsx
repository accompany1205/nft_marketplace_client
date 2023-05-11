import { OrderType } from '../../hooks';
import { useGetAsksQuery } from '../../redux/service/appService';
import Histories from './Histories';
import { Bid } from '../../types';

interface Props {
  data: Bid[];
}

const Bids: React.FC<Props> = ({ data }) => {
  // const { data } = useGetAsksQuery(poolId);

  return (
    <div className="tab-1 onStep fadeIn">
      {!data?.length ? (
        <div>No asks are placed yet.</div>
      ) : (
        <Histories bidType={OrderType.ASK} bids={data} />
      )}
    </div>
  );
};

export default Bids;
