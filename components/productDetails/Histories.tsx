/* eslint-disable @next/next/no-img-element */
import { OrderType } from '../../hooks';
import { Bid } from '../../types';

// TODO: replace static image with user's avatar

interface Props {
  bids: Bid[];
  bidType: OrderType;
}

const Histories: React.FC<Props> = ({ bids, bidType }) => (
  <div className="bid_history">
    {bids.map((bid: Bid) => (
      <div className="p_list" key={`bid-${bidType}-${bid.num}`}>
        <div className="p_list_pp">
          <span>
            {bid.num}
          </span>
        </div>
        <div className="p_list_info">
          {bidType === OrderType.ASK ? 'Ask' : 'Bid'}
          &nbsp;
          <b>{bid.amount}</b>
          {/* {(bid.colour || bid.size) && <>&nbsp;for&nbsp;</>}
          {bid.colour && (
            <>
              <b>{bid.colour}</b>
              &nbsp;color&nbsp;
            </>
          )}
          {bid.size && (
            <>
              <b>{bid.size}</b>
              &nbsp;size
            </>
          )}
          <span>
            by&nbsp;
            <b>{bid.first_name}</b>
            &nbsp;at&nbsp;
            {new Date(bid.datetime_created).toLocaleString()}
          </span> */}
        </div>
      </div>
    ))}
  </div>
);

export default Histories;
