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
      <div className="p_list" key={`bid-${bidType}-${bid.id}`}>
        <div className="p_list_pp">
          <span>
            <img
              className="lazy"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              alt=""
            />
            <i className="fa fa-check" />
          </span>
        </div>
        <div className="p_list_info">
          {bidType === OrderType.ASK ? 'Ask' : 'Bid'}
          &nbsp;
          <b>{bid.amount}</b>
          <span>
            by
            {' '}
            <b>{bid.first_name}</b>
            {' '}
            at&nbsp;
            {new Date(bid.datetime_created).toLocaleString()}
          </span>
        </div>
      </div>
    ))}
  </div>
);

export default Histories;
