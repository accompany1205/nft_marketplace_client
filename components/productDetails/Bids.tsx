import { useGetBidsQuery } from "../../redux/service/appService";
import { OrderType } from "../checkouts";
import Histories from "./Histories";

interface Props {
  listingId: number;
}

const Bids: React.FC<Props> = ({ listingId }) => {
  const { data } = useGetBidsQuery(listingId);

  if (!data?.data?.length) return <></>;

  return (
    <div className="tab-1 onStep fadeIn">
      <Histories bidType={OrderType.BID} bids={data.data} />
    </div>
  );
};

export default Bids;
