import { useState } from 'react';

import { OrderType } from '../../hooks';
import { Product } from '../../pages/product';
import { ProcessType } from '../../hooks';
import { Modal, ModalHeader, ModalBody, ModalTitle, ModalFooter } from 'react-bootstrap';

export interface Props {
  product: Product;
  onSubmit: (amount: number, bidType: ProcessType) => void;
  orderType: OrderType;
}

const MakeOrder: React.FC<Props> = ({ product, onSubmit, orderType }) => {
  const [amount, setAmount] = useState(
    (orderType === OrderType.ASK
      ? product.lowestAsk?.amount
      : product.highestBid?.amount) || 0,
  );

  const [modalIsShow, setModalShow] = useState<boolean>(false);
  const [depositAmount, setDepositAmount] = useState<number>(0);

  const checkBalance = (amount: number) => {
    if (orderType === OrderType.BID) {
      const balance = 100;
      if (balance < amount) {
        setModalShow(true);
        setDepositAmount(amount-balance);
        return;
      }
    }
    onSubmit(amount, ProcessType.PROCESSING)
  }

  const hideModal = () => {
    setModalShow(false);
  }

  const handleChangeAmount = (amount: string) => {
    setDepositAmount(Number(amount));
  }
  const handleTransaction = () => {
    console.log("deposit Amount: ", depositAmount);
  }
  return (
    <div>
      <div className="heading">
        <h3>{orderType === OrderType.ASK ? 'Ask' : 'Bid'}</h3>
      </div>
      <div className="detailcheckout">
        <div className="listcheckout">
          <h6>Enter amount.</h6>
          <input
            type="number"
            name="amount"
            id="amount"
            value={amount}
            min={0}
            step={1}
            onChange={(e) => setAmount(parseInt(e.target.value))}
            className="form-control"
          />
          {!amount && (
            <p className="error-message">Amount must be more than 0.</p>
          )}
        </div>
      </div>
      <div className="heading">
        <p>
          You will
          {orderType === OrderType.ASK ? ' get' : ' pay'}
        </p>
        <div className="subtotal">{amount ? amount : 0}$</div>
      </div>
      <button
        type="button"
        className="btn-main lead mb-5"
        disabled={!amount}
        onClick={() => checkBalance(amount)}
      >
        Checkout
      </button>
      <Modal show={modalIsShow} onHide={hideModal}>
        <ModalHeader>
          <ModalTitle>Your Wallet Balance </ModalTitle>
        </ModalHeader>
        <ModalBody>
          <div className="field-set">
            <input
              placeholder="amount"
              className="form-control"
              type="number"
              name="amount"
              value={depositAmount}
              min={depositAmount}
              step={1}
              onChange={(e) => handleChangeAmount(e.target.value)}
            />
          </div>

        </ModalBody>
        <ModalFooter>
          <div className="field-set">
            <input
              type="submit"
              id="send_transaction"
              value="Submit"
              className="btn btn-main btn-fullwidth color-2"
              onClick={handleTransaction}
            />
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default MakeOrder;
