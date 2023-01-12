import { useRouter } from "next/router";
import { useState } from "react";
import {
  BidCheckout,
  Checkout,
  Purchase,
  PurchaseDetails
} from "../../components/checkouts";
import Loader from "../../components/Loader";
import { useGetProductDetailsQuery } from "../../redux/service/appService";
import { store } from "../../redux/store";
import useImage from "../../utils/hooks/FetchNftImage";

const NftDetail = () => {
  const router = useRouter();
  const { data: details, isLoading } = useGetProductDetailsQuery(
    router.query.product ? router.query.product.toString() : ""
  );

  const nftImageUrl = useImage(details?.data);

  const [purchaseDetails, setPurchaseDetails] = useState<PurchaseDetails>();
  const [askDetails, setAskDetails] = useState<PurchaseDetails>();
  const [isBidCheckout, setIsBidCheckout] = useState(false);
  const [isPlaceAsk, setPlaceAsk] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isPurchase, setIsPurchase] = useState(false);

  const nft = {
    title: "Nike",
    category: "Sports Shoes",
    views: 190,
    likes: 200,
    description: "Best Shoe for sports",
    owner: {
      username: "Rameez Raja",
    },
  };

  const onPurchase = () => {
    setIsPurchase(false);
    if (!store.getState().auth.user) return router.push("/login");
    //TODO: check for wallet and funds then process purchase
  };

  return (
    <div className="greyscheme">
      {isLoading ? (
        <div
          className="d-flex  justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <Loader />
        </div>
      ) : (
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
                    <li id="Mainbtn0" className="active">
                      <span>Details</span>
                    </li>
                    <li id="Mainbtn">
                      <span>Bids</span>
                    </li>
                    <li id="Mainbtn1" className="">
                      <span>History</span>
                    </li>
                  </ul>
                  <div className="de_tab_content">
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
                                <i className="fa fa-check"></i>
                              </span>
                            </div>
                            <div className="author_list_info">
                              <span>{nft.owner.username}</span>
                            </div>
                          </div>
                        </div>
                        {details?.data?.variants && (
                          <div className="row mt-5">
                            {details?.data?.variants.map((variant, index) => (
                              <div className="col-lg-4 col-md-6 col-sm-6" key={index}>
                                <div className="nft_attr">
                                  <h4>{variant.size}</h4>
                                  <span>BID</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
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
              product={{
                owner: nft.owner,
                ...details?.data.specs,
              }}
              onCheckout={(checkout) => {
                setPurchaseDetails({ ...purchaseDetails, checkout });
                setIsBidCheckout(false);
                setIsPurchase(true);
              }}
            />
          )}
          {isPlaceAsk && !!details?.data.specs && (
            <BidCheckout
              onClose={() => setPlaceAsk(false)}
              product={{
                owner: nft.owner,
                ...details?.data.specs,
              }}
              onCheckout={(ask) => {
                setPlaceAsk(false);
                setAskDetails({ checkout: ask });
              }}
            />
          )}
          {isCheckout && !!details?.data.specs && (
            <Checkout
              onClose={() => setIsCheckout(false)}
              product={{
                owner: nft.owner,
                ...details?.data.specs,
              }}
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
      )}
    </div>
  );
};

export default NftDetail;
