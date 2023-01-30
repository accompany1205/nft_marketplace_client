import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { head } from 'lodash';
import { Buy, Sell } from '../../components/checkouts';
import Loader from '../../components/Loader';
import { Asks, Bids } from '../../components/productDetails';
import { useGetProductDetailsQuery } from '../../redux/service/appService';
import { INFTVariant } from '../../types';
import useImage from '../../utils/hooks/FetchNftImage';

enum Tabs {
  DETAILS = 'Details',
  BIDS = 'Bids',
  ASKS = 'Asks',
}

const tabList = [Tabs.DETAILS, Tabs.BIDS, Tabs.ASKS];

export interface Product extends INFTVariant {
  id: number;
  productName: string;
  owner: {
    username: string;
  };
}

const NftDetail: React.FC = () => {
  const router = useRouter();

  const { data: details, isLoading, refetch } = useGetProductDetailsQuery(
    router.query.product?.toString() || '',
  );

  const [variant, setVariant] = useState<INFTVariant | undefined>();

  useEffect(() => {
    if (!variant) {
      setVariant(head(details?.data?.variants));
    }
  }, [details]);

  useEffect(() => {
    if (!details?.data) refetch();
  }, [router.query.product]);

  const nftImageUrl = useImage(details?.data);
  const [isBuy, setIsBuy] = useState(false);
  const [isSell, setIsSell] = useState(false);
  const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.DETAILS);

  if (isLoading || !details?.data) {
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
  }

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

  const product = {
    owner: nft.owner,
    id: details.data.id,
    ...details?.data.specs,
  };

  const priceDetails = [
    {
      label: 'Lowest Ask',
      amount: variant?.lowestAsk?.amount || product.price,
    },
    {
      label: 'Highest Bid',
      amount: variant?.highestBid?.amount || product.price,
    },
  ];

  return (
    <div className="greyscheme">
      <section className="container">
        <div className="row mt-md-5 pt-md-4">
          <div className="col-md-6 text-center">
            <img
              src={
                nftImageUrl
                  ? `https://ipfs.io/ipfs/${nftImageUrl}`
                  : 'https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
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
                  <i className="fa fa-image" />
                  {details?.data.specs.brand}
                </div>
                <div className="item_info_views">
                  <i className="fa fa-eye" />
                  {details?.data.specs.views}
                </div>
                <div className="item_info_like">
                  <i className="fa fa-heart" />
                  {details?.data.specs.likes}
                </div>
              </div>
              <p>{details?.data?.specs?.description}</p>
              <div className="spacer-40" />
              <div className="de_tab">
                <ul className="de_nav">
                  {tabList.map((tab: Tabs) => (
                    <li
                      className={currentTab === tab ? 'active' : ''}
                      key={`tab-${tab}`}
                    >
                      <button type="button" onClick={() => setCurrentTab(tab)}>
                        {tab}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="de_tab_content mb-3">
                  {currentTab === Tabs.DETAILS && (
                    <div className="tab-1 onStep fadeIn">
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
                        <div className="row mt-3">
                          {details?.data?.variants.map((option) => (
                            <div
                              className="col-lg-4 col-md-6 col-sm-6"
                              key={`option-${option.id}`}
                            >
                              <input
                                id={String(option.id)}
                                type="radio"
                                value={option.id}
                                name="variant"
                                onChange={() => setVariant(option)}
                                className="product-variant"
                              />
                              <label
                                htmlFor={String(option.id)}
                                className="nft_attr"
                              >
                                <h4>{option.size}</h4>
                                <h4>{option.colour}</h4>
                                {option.highestBid?.amount && (
                                <p className="m-0">
                                  Highest Bid :
                                  {' '}
                                  {option.highestBid?.amount}
                                </p>
                                )}
                                {option.lowestAsk?.amount && (
                                <p className="m-0">
                                  Lowest Ask :
                                  {' '}
                                  {option.lowestAsk?.amount}
                                </p>
                                )}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="mt-2 row">
                        {priceDetails.map(({ label, amount }) => (
                          <div className="col-lg-4 col-md-6 col-sm-6 mt-3" key={`${label}-${amount}`}>
                            <h5>{label}</h5>
                            <div className="subtotal">{amount}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {currentTab === Tabs.BIDS && (
                    <div className="tab-2 onStep fadeIn">
                      <Bids listingId={variant?.id || product.id} />
                    </div>
                  )}
                  {currentTab === Tabs.ASKS && (
                    <div className="tab-3 onStep fadeIn">
                      <Asks listingId={variant?.id || product.id} />
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-5">
                <div className="d-flex flex-row mb-2">
                  <button
                    type="button"
                    className="btn-main lead me-3"
                    onClick={() => {
                      if (variant) setIsBuy(true);
                    }}
                  >
                    Buy
                  </button>
                  <button
                    type="button"
                    className="btn-main btn2 lead me-3"
                    onClick={() => {
                      if (variant) setIsSell(true);
                    }}
                  >
                    Sell
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* details?.data.specs is kept in condition to make sure we have info */}
        {isBuy && variant && (
          <Buy
            onClose={() => setIsBuy(false)}
            product={{
              ...variant,
              owner: product.owner,
              productName: product.productName,
            }}
          />
        )}
        {isSell && variant && (
          <Sell
            onClose={() => setIsSell(false)}
            product={{
              ...variant,
              owner: product.owner,
              productName: product.productName,
            }}
          />
        )}
      </section>
    </div>
  );
};

export default NftDetail;
