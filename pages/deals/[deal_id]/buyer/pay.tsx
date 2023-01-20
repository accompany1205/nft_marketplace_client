import { get } from 'lodash';
import { useContext } from 'react';
import { useCreateBuyerPaymentMutation } from '../../../../redux/service/appService';
import WalletContext, { WalletServiceProviders } from '../../../../services/WalletService/WalletContext';

const BuyNft = () => {
  const {
    accountId,
    connectWallet,
  } = useContext(WalletContext);

  const [createBuyerPayment] = useCreateBuyerPaymentMutation();

  const handleSubmit = async () => {
    const treasureAccountId = process.env.NEXT_PUBLIC_TREASURE_ACCOUNT_ID;

    if (!treasureAccountId || !accountId) return connectWallet(WalletServiceProviders.HASHPACK);

    const data = await createBuyerPayment({ accountId: accountId as string, dealId: 10 });

    const transactionBuffer = get(data, 'data.transaction');

    if (!transactionBuffer) {
      return console.log('Transaction', transactionBuffer);
    }

    // const transaction = Transaction.fromBytes(Buffer.from(transactionBuffer, 'hex'));

    // const sentTransaction = await sendTransaction(transaction.toBytes(), accountId as string);
  };

  const nft = {
    productName: 'Nike limited edition',
    brand: 'Nike',
    category: 'Sports Shoes',
    views: 190,
    likes: 200,
    price: 100,
    size: 10,
    description: 'Best Shoe for sports',
    owner: {
      username: 'Rameez Raja',
    },
  };

  return (
    <div className="greyscheme">
      <div
        className="d-flex  justify-content-center align-items-center"
        style={{ height: '100vh' }}
      >
        <section className="container">
          <div className="row mt-md-5 pt-md-4">
            <div className="col-md-6 text-center">
              <img
                src="https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                className="img-fluid img-rounded mb-sm-30"
                alt=""
              />
            </div>
            <div className="col-md-6">
              <div className="item_info">
                <h2>{nft?.productName}</h2>
                <p>{nft?.description}</p>
                <div className="spacer-40" />
                <div className="de_tab">
                  <ul className="de_nav">
                    <li id="Mainbtn">
                      <span>Current Bid</span>
                    </li>
                  </ul>
                  <div className="de_tab_content">
                    <div className="detailcheckout mt-4">

                      <div className="listcheckout">
                        <h5>Price</h5>
                        <div className="subtotal">{nft?.price}</div>
                      </div>
                    </div>
                    <div className="d-flex flex-row mt-5">
                      <button className="btn-main lead mb-5 me-3" type="button" onClick={handleSubmit}>
                        Pay Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BuyNft;
