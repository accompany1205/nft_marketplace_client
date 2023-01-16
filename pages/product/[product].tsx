import { useState } from "react";

import { useRouter } from "next/router";

import {
  BidCheckout,
  Checkout,
  OrderType,
  Purchase,
  PurchaseDetails,
} from "../../components/checkouts";
import Loader from "../../components/Loader";
import { Asks, Bids } from "../../components/productDetails";
import { useGetProductDetailsQuery } from "../../redux/service/appService";
import { store } from "../../redux/store";
import useImage from "../../utils/hooks/FetchNftImage";

enum Tabs {
  DETAILS = "Details",
  BIDS = "Bids",
  HISTORY = "History",
}

const tabList = [Tabs.DETAILS, Tabs.BIDS, Tabs.HISTORY];

const NftDetail = () => {
  const router = useRouter();

  const { data: details, isLoading } = useGetProductDetailsQuery(
    router.query.product ? router.query.product.toString() : '',
  );

  const nftImageUrl = useImage(details?.data);

  const [purchaseDetails, setPurchaseDetails] = useState<PurchaseDetails>({
    variantId: details?.data?.id,
  });

  const [isBidCheckout, setIsBidCheckout] = useState(false);
  const [isPlaceAsk, setPlaceAsk] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isPurchase, setIsPurchase] = useState(false);
  const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.DETAILS);

  const nft = {
    title: 'Nike',
    category: 'Sports Shoes',
    views: 190,
    likes: 200,
    description: 'Best Shoe for sports',
    owner: {
      username: 'Rameez Raja',
    },
  };

  const onPurchase = () => {
    setIsPurchase(false);
    if (!store.getState().auth.user) return router.push('/login');
    // TODO: check for wallet and funds then process purchase
  };

  if (isLoading || !details?.data)
    return (
      <div className="greyscheme">
        <div
          className="d-flex  justify-content-center align-items-center"
          style={{ height: '100vh' }}
        >
          <Loader />
        </div>
      </div>
    );

  const product = {
    owner: nft.owner,
    id: details.data.id,
    ...details?.data.specs,
  };

  return (
    <div className="greyscheme">
      <section className="container">
        <div className="row mt-md-5 pt-md-4">
          <div className="col-md-6 text-center">
            <img
              src={
                nftImageUrl
                  ? `https://ipfs.io/ipfs/${nftImageUrl}`
                  : "https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
              }
              className="img-fluid img-rounded mb-sm-30"
              alt=""
            />
          </div>
          <div className="col-md-6">
            <div className="item_info">
              <h2>{details?.data?.specs?.productName}</h2>
              <div className="item_info_counts">
                <div className="item_info_type">
                  <i className="fa fa-image"></i>
                  {details?.data.specs.brand}
                </div>
                <div className="item_info_views">
                  <i className="fa fa-eye"></i>
                  {details?.data.specs.views}
                </div>
                <div className="item_info_like">
                  <i className="fa fa-heart"></i>
                  {details?.data.specs.likes}
                </div>
              </div>
              <p>{details?.data?.specs?.description}</p>
              <div className="spacer-40"></div>

              <div className="de_tab">
                <ul className="de_nav">
                  {tabList.map((tab) => (
                    <li
                      className={currentTab === tab ? "active" : ""}
                      key={`tab-${tab}`}
                    >
                      <button onClick={() => setCurrentTab(tab)}>{tab}</button>
                    </li>
                  ))}
                </ul>
                <div className="de_tab_content">
                  {currentTab === Tabs.DETAILS && (
                    <div className="tab-1 onStep fadeIn">
                      <div className="d-block mb-3">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <span>
                                <img
                                  className="lazy"
                                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                                  alt=""
                                />
                                <i className="fa fa-check" />
                              </span>
                            </div>
                            <div className="author_list_info">
                              <span>{nft.owner.username}</span>
                            </div>
                          </div>
                        </div>
                        {details?.data?.variants && (
                          <div className="row mt-5">
                            {details?.data?.variants.map((variant) => (
                              <div
                                className="col-lg-4 col-md-6 col-sm-6"
                                key={`variant-${variant.id}`}
                              >
                                <input
                                  id={String(variant.id)}
                                  type="radio"
                                  value={variant.id}
                                  name="variant"
                                  onChange={(e) => {
                                    setPurchaseDetails({
                                      ...purchaseDetails,
                                      variantId: parseInt(e.target.value),
                                    });
                                  }}
                                  className="product-variant"
                                />
                                <label
                                  htmlFor={String(variant.id)}
                                  className="nft_attr"
                                >
                                  <h4>{variant.size}</h4>
                                  <span>BID</span>
                                </label>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {currentTab === Tabs.BIDS && (
                    <div className="tab-2 onStep fadeIn">
                      <Bids listingId={product.id} />
                    </div>
                  )}
                  {currentTab === Tabs.HISTORY && (
                    <div className="tab-3 onStep fadeIn">
                      <Asks listingId={product.id} />
                    </div>
                  )}
                </div>
                <div className="de_tab_content">
                  <div className="detailcheckout mt-4">
                    <div className="listcheckout">
                      <h5>Price</h5>
                      <div className="subtotal">
                        {details?.data?.specs?.price}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-row mt-5">
                    <button
                      className="btn-main lead mb-5 me-3"
                      onClick={() => setIsCheckout(true)}
                    >
                      Buy Now
                    </button>
                    <button
                      className="btn-main btn2 lead mb-5 me-3"
                      onClick={() => setIsBidCheckout(true)}
                    >
                      Place Bid
                    </button>
                    <button
                      className="btn-main btn2 lead mb-5"
                      onClick={() => setPlaceAsk(true)}
                    >
                      Place Ask
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* details?.data.specs is kept in condition to make sure we have info */}
        {isBidCheckout && !!details?.data.specs && (
          <BidCheckout
            onClose={() => setIsBidCheckout(false)}
            product={product}
            onCheckout={() => setIsBidCheckout(false)}
            orderType={OrderType.BID}
          />
        )}
        {isPlaceAsk && !!details?.data.specs && (
          <BidCheckout
            onClose={() => setPlaceAsk(false)}
            product={product}
            onCheckout={() => setPlaceAsk(false)}
            orderType={OrderType.ASK}
          />
        )}
        {isCheckout && !!details?.data.specs && (
          <Checkout
            onClose={() => setIsCheckout(false)}
            product={product}
            onCheckout={(checkout) => {
              setPurchaseDetails({ ...purchaseDetails, checkout });
              setIsCheckout(false);
              setIsPurchase(true);
            }}
          />
        )}
        {isPurchase && purchaseDetails && (
          <Purchase
            onClose={() => setIsPurchase(false)}
            purchaseDetails={purchaseDetails}
            setPurchaseDetails={setPurchaseDetails}
            onPurchase={onPurchase}
          />
        )}
      </section>
    </div>
  );
};

export default NftDetail;
