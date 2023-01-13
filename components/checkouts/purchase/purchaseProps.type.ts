export enum PurchaseForms {
  SHIPPING_INFORMATION = "shippingInformation",
  SUMMARY = "summary",
}

export interface PurchaseProps {
  onClose: () => void;
  purchaseDetails: PurchaseDetails;
  setPurchaseDetails: (PurchaseDetails: PurchaseDetails) => void;
  onPurchase: (details: PurchaseDetails) => void;
}

export type OnNextStep = (
  purchaseDetails: PurchaseDetails,
  nextStep?: PurchaseForms
) => void;

export interface CheckoutDetails {
  bid: number;
  quantity: number;
}

export interface PurchaseDetails {
  variantId?: number;
  checkout?: CheckoutDetails;
  shipping?: {
    name: string;
    addressLine1: string;
    city: string;
    country: string;
    postCode: string;
    addressLine2?: string;
  };
  tax?: number;
}
