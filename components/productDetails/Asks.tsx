import { OrderType } from "../../hooks";
import { useGetAsksQuery } from "../../redux/service/appService";
import Histories from "./Histories";

interface Props {
  listingId: number;
}

const Bids: React.FC<Props> = ({ listingId }) => {
  const { data } = useGetAsksQuery(listingId);

  if (!data?.data?.length) return <></>;

  return (
    <div className="tab-1 onStep fadeIn">
      <Histories bidType={OrderType.ASK} bids={data.data} />
    </div>
  );
};

export default Bids;
