import { get } from "lodash";
import { useRouter } from "next/router";

import { OrderType } from "../components/checkouts";
import { bidDetailsSchema } from "../components/schema";
import {
  useMakeAskMutation,
  useMakeBidMutation,
} from "../redux/service/appService";
import { store } from "../redux/store";

export const useMakeBid = (
  bid: { price: number; listing_id: number },
  orderType: OrderType,
  onCompleted?: (d?: any) => void
) => {
  const router = useRouter();

  const [makeBid, { isLoading }] = useMakeBidMutation();

  const [makeAsk, { isLoading: isMakeAskLoading }] = useMakeAskMutation();

  const user = store.getState().auth.user;

  const handleMakeBid = (bid: any) => {
    switch (orderType) {
      case OrderType.BID:
        return makeBid(bid);
      case OrderType.ASK:
        return makeAsk(bid);
    }
  };

  const handleSubmit = async (input: any) => {
    const sanitizedInput = bidDetailsSchema.cast(input, {
      assert: false,
      stripUnknown: true,
    });

    if (!user?.id) return router.push("/login");

    const formattedBid = {
      listing_id: bid.listing_id,
      amount: sanitizedInput.price * sanitizedInput.quantity,
      user_id: user.id,
    };

    try {
      const data = await handleMakeBid(formattedBid);

      if (!get(data, "data.success"))
        return alert(get(data, "data.message.message"));

      if (onCompleted) return onCompleted();
    } catch (err) {
      return alert(err);
    }
  };

  const initialValues = bidDetailsSchema.cast(
    {
      price: bid.price,
      quantity: 1,
    },
    {
      assert: false,
      stripUnknown: true,
    }
  );

  return {
    initialValues,
    validationSchema: bidDetailsSchema,
    handleSubmit,
    isLoading: isLoading || isMakeAskLoading,
  };
};
