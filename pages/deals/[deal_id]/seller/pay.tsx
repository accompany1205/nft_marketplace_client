import { useState } from 'react';
import WalletConnector from '../../../../components/WalletConnector';

const TransferNft = () => {
  const [showModal, setShowModal] = useState(false);

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
          <WalletConnector showModal={showModal} setShowModal={setShowModal} />
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
                      <button
                        type="button"
                        className=" btn-main lead mb-5 me-3"
                        onClick={() => setShowModal(true)}
                      >
                        Connect To Wallet
                      </button>
                      <button className="btn-main lead mb-5 me-3" type="button">
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

export default TransferNft;
