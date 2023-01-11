export interface ShippingAddress {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
  postCode: string;
  addressLine2?: string;
}

export interface ShippingFormProps {
  shippingAddress?: ShippingAddress;
  onClose: () => void;
  onSubmit: (payload: ShippingAddress) => void;
}
