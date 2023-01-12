import { useState } from "react";

import dynamic from "next/dynamic";

import { OnNextStep, PurchaseForms, PurchaseProps } from "./purchaseProps.type";

const purchaseForms = {
  [PurchaseForms.SHIPPING_INFORMATION]: dynamic(
    () => import("./ShippingDetails")
  ),
  [PurchaseForms.SUMMARY]: dynamic(() => import("./Summary")),
};

const Purchase: React.FC<PurchaseProps> = ({
  onClose,
  purchaseDetails,
  setPurchaseDetails,
  onPurchase,
}) => {
  const [step, setStep] = useState<PurchaseForms>(
    PurchaseForms.SHIPPING_INFORMATION
  );

  const onNextStep: OnNextStep = (purchaseDetails, nextStep) => {
    setPurchaseDetails(purchaseDetails);
    if (!nextStep) return onPurchase(purchaseDetails);
    setStep(nextStep);
  };

  const CurrentStep = purchaseForms[step];

  return (
    <div className="purchase">
      <div className="main-purchase">
        <button className="btn-close" onClick={onClose}>
          x
        </button>
        <CurrentStep
          onNextStep={onNextStep}
          purchaseDetails={purchaseDetails}
        />
      </div>
    </div>
  );
};

export default Purchase;
