import { useState, useContext } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '../../redux/slices/layoutSlice';

import { OrderType } from '../../hooks';
import { Product } from '../../pages/product';
import { ProcessType } from '../../hooks';
import axios from 'axios';
import { Modal, ModalHeader, ModalBody, ModalTitle, ModalFooter } from 'react-bootstrap';
import WalletContext from '../../services/WalletService/WalletContext';
import useAuth from '../../hooks/useAuth';
import WalletConnector from '../WalletConnector';

export interface Props {
  product: Product;
  onSubmit: (amount: number, balance: number, bidType: ProcessType) => void;
  orderType: OrderType;
  rate: number;
}

const MakeOrder: React.FC<Props> = ({ product, onSubmit, orderType, rate }) => {
  const [amount, setAmount] = useState(
    (orderType === OrderType.ASK
      ? product.lowestAsk?.amount
      : product.highestBid?.amount) || 0,
  );

  const { accountId, provider, deposit } = useContext(WalletContext);

  const dispatch = useDispatch();

  const [modalIsShow, setModalShow] = useState<boolean>(false);
  const [depositAmount, setDepositAmount] = useState<number>(0);
  const [accountBalance, setBalance] = useState<number>(0);
  const [showWalletConnectionModal, setShowWalletConnectionModal] = useState<boolean>(false);

  const checkBalance = async (amount: number) => {
    if (!accountId) {
      dispatch(showToast({
        message: 'Please connect wallet.',
        type: 'danger',
      }),)
      setShowWalletConnectionModal(true);
      return;
    }
    if (orderType === OrderType.BID) {
      const response =
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_PATH}/marketplace/api/v1/getDepositBalance`,
          {
            userAccountId: accountId
          }
        );
      console.log("response getbalance: ", response.data);
      if (!response.data || !response.data.success) {
        console.log('server error');
        return;
      }
      const balance = response.data.data/Math.pow(10, Number(process.env.NEXT_PUBLIC_HBAR_DECIMAL) || 8);
      setBalance(balance);
      console.log({balance, amount});
      if (balance < amount) {
        setModalShow(true);
        setDepositAmount(amount - balance);
        return;
      }
      onSubmit(amount, balance, ProcessType.PROCESSING)
    } else {

      const response =
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_PATH}/marketplace/api/v1/nft/getSerialId`,
          {
            userAccountId: accountId,
            NFTTokenId: product.nftTokenId,
            serialIds: product.variants
          }
        );
      console.log("place ask: getserialId: ", response.data);
      if(response?.data?.data?.serialId < 0){
        dispatch(showToast({
          message: 'You have no NFT here!',
          type: 'danger',
        }),)
        return;
      }
      onSubmit(amount, 0, ProcessType.PROCESSING)
    }
  }

  const hideModal = () => {
    setModalShow(false);
  }

  const handleChangeAmount = (amount: string) => {
    setDepositAmount(Number(amount));
  }
  const handleTransaction = async () => {
    console.log("deposit Amount: ", depositAmount);
    const contractId: string = process.env.NEXT_PUBLIC_ESCROW_CONTRACT_ID || "";
    console.log("contract id", contractId)
    console.log("contract id", process.env.NEXT_PUBLIC_ESCROW_CONTRACT_ID)
    if(contractId.length === 0){
      dispatch(showToast({
        message: 'no contract!',
        type: 'danger',
      }),)
      return;
    }
    const res = await deposit(contractId, depositAmount);
    console.log("======================", res)
  }
  return (
    <div>
      <div className="heading">
        <h3>{orderType === OrderType.ASK ? 'Ask' : 'Bid'}</h3>
      </div>
      <div className="detailcheckout">
        <div className="listcheckout">
          <h6>Enter amount. (HBAR)</h6>
          <input
            type="number"
            name="amount"
            id="amount"
            //value={amount}
            defaultValue={0.000}
            min={0}
            step="0.0001"
            onChange={(e) => setAmount(Number(e.target.value))}
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
        <div className="subtotal">{amount ? amount : 0}HBAR ({amount ? Math.floor(amount * rate *10000)/10000 : 0}$)</div>
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
          <ModalTitle>Your Wallet Balance {` ${accountBalance}HBAR (${accountBalance * rate}$)`} </ModalTitle>
        </ModalHeader>
        <ModalBody>
          <div className="field-set">
            <input
              placeholder="HBAR"
              className="form-control"
              type="number"
              name="amount"
              defaultValue={depositAmount}
              min={depositAmount}
              step={0.0001}
              onChange={(e) => handleChangeAmount(e.target.value)}
            />
            <p>{depositAmount}HBAR ({Math.floor(depositAmount*rate*10000)/10000}$)</p>
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
      <WalletConnector
          showModal={showWalletConnectionModal}
          setShowModal={setShowWalletConnectionModal}
        />
    </div>
  );
};

export default MakeOrder;
