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

export const useMakeOrder = (
  listing_id: number,
  orderType: OrderType,
  onCompleted?: (d?: any) => void,
) => {
  const router = useRouter();

  const [makeBid, { isLoading }] = useMakeBidMutation();

  const [makeAsk, { isLoading: isMakeAskLoading }] = useMakeAskMutation();

  const user = store.getState().auth.user;

  const handleMakeBid = (bid: BidPayload) => {
    switch (orderType) {
      case OrderType.BID:
        return makeBid(bid);
      case OrderType.ASK:
        return makeAsk(bid);
    }
  };

  const handleSubmit = async (amount: number) => {
    if (!user?.id) return router.push('/login');

    const formattedBid: BidPayload = {
      listing_id: listing_id,
      amount: amount,
      user_id: user.id,
    };

    try {
      const data = await handleMakeBid(formattedBid);

      if (!get(data, 'data.success'))
        return alert(get(data, 'data.message.message'));

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
