import { get } from 'lodash';

import { useMakeDealMutation } from '../redux/service/appService';

type UseBuy = (onCompleted?: ((d?: any) => void) | undefined) => {
  handleSubmit: (listingId: number, askId: number) => Promise<boolean | void>;
  isLoading: boolean;
};

const useBuy: UseBuy = (onCompleted) => {
  const [makeDeal, { isLoading }] = useMakeDealMutation();

  const handleSubmit = async (listingId: number, askId: number) => {
    try {
      const data = await makeDeal({
        listing_id: listingId,
        ask_id: askId,
        bid_id: null,
      });

      if (!get(data, 'data.success')) {
        return alert(get(data, 'data.message.message'));
      }

      if (onCompleted) return onCompleted();
    } catch (err) {
      return alert(err);
    }
  };

  return {
    handleSubmit,
    isLoading,
  };
};

export default useBuy;
