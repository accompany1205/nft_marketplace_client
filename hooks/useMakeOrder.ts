import { get } from 'lodash';
import { useRouter } from 'next/router';

import {
  useMakeAskMutation,
  useMakeBidMutation,
} from '../redux/service/appService';
import { store } from '../redux/store';
import { BidPayload } from '../types';

export enum OrderType {
  'BID',
  'ASK',
}

type UseMakeOrder = (
  listing_id: number,
  orderType: OrderType,
  onCompleted?: ((d?: any) => void) | undefined,
) => {
  handleSubmit: (amount: number) => Promise<boolean | void>;
  isLoading: boolean;
};

const useMakeOrder: UseMakeOrder = (listingId, orderType, onCompleted) => {
  const router = useRouter();

  const [makeBid, { isLoading }] = useMakeBidMutation();

  const [makeAsk, { isLoading: isMakeAskLoading }] = useMakeAskMutation();

  const { user } = store.getState().auth;

  const handleMakeBid = (bid: BidPayload) => {
    if (orderType === OrderType.BID) {
      return makeBid(bid);
    }
    return makeAsk(bid);
  };

  const handleSubmit = async (amount: number) => {
    if (!user?.id) return router.push('/login');

    const formattedBid: BidPayload = {
      listing_id: listingId,
      amount,
      user_id: user.id,
    };

    try {
      const data = await handleMakeBid(formattedBid);

      if (!get(data, 'data.success')) {
        return alert(get(data, 'data.message'));
      }

      if (onCompleted) return onCompleted();
    } catch (err) {
      return alert(err);
    }
  };

  return {
    handleSubmit,
    isLoading: isLoading || isMakeAskLoading,
  };
};

export default useMakeOrder;
