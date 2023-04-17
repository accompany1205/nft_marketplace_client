import { useEffect, useState } from 'react';
import { head } from 'lodash';
import { useRouter } from 'next/router';
import { createGlobalStyle } from 'styled-components';
import {
  Area, AreaChart, CartesianGrid, XAxis, YAxis,
} from 'recharts';
import { Tooltip } from 'react-bootstrap';
import { useWindowWidth } from '@react-hook/window-size';
import { Buy, Sell } from '../../components/checkouts';
import Loader from '../../components/Loader';
import { Asks, Bids } from '../../components/productDetails';
import Redirect from '../../components/Redirect';
import { useGetProductDetailsQuery } from '../../redux/service/appService';
import { INFTVariant } from '../../types';
import useImage from '../../utils/hooks/useImage';
import useMobileMode from '../../hooks/useMobileMode';

enum Tabs {
  DETAILS = 'Details',
  BIDS = 'Bids',
  ASKS = 'Asks',
}

export interface Product extends INFTVariant {
  id: number;
  productName: string;
  owner: {
    username: string;
  };
}

const tabList = [Tabs.DETAILS, Tabs.BIDS, Tabs.ASKS];

const NftDetail: React.FC = () => {
  const router = useRouter();
  const width = useWindowWidth();
  const mobileMode = useMobileMode();

  const productName = router.query.product?.toString();

  const { data: details, isLoading } = useGetProductDetailsQuery(
    productName || '',
    {
      skip: !productName,
    },
  );

  const [variant, setVariant] = useState<INFTVariant | undefined>();

  useEffect(() => {
    if (details?.data?.variants) {
      setVariant(head(details?.data?.variants));
    }
  }, [details]);

  const nftImageUrl = useImage(details?.data);
  const [isBuy, setIsBuy] = useState(false);
  const [isSell, setIsSell] = useState(false);
  const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.DETAILS);

  if (isLoading) {
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

  if (!details?.data) return <Redirect path="/" />;

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

  const chartData = [
    {
      date: 'Apr 4',
      uv: 100,
    },
    {
      date: 'Apr 5',
      uv: 150,
    },
    {
      date: 'Apr 6',
      uv: 160,
    },
    {
      date: 'Apr 7',
      uv: 200,
    },
    {
      date: 'Apr 8',
      uv: 250,
    },
    {
      date: 'Apr 9',
      uv: 310,
    },
    {
      date: 'Apr 10',
      uv: 370,
    },
  ];

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

  const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #fff
    border-bottom: solid 1px #dddddd
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #111
    }
    .item-dropdown .dropdown a{
      color: #111 !important
    }
  }
`;

  return (
    <div>
      <GlobalStyles />
      <section className="container no-bottom">
        <div className="row" style={{ marginTop: '20px' }}>
          <div className="item_info" style={{ marginBottom: '20px' }}>
            <h2>{details?.data?.specs?.productName}</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 text-center">
            <img
              src={
                nftImageUrl
                  ? `https://ipfs.io/ipfs/${nftImageUrl}`
                  : 'https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
              }
              width="100%"
              alt=""
            />
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col text-center">
                <select
                  className="form-control"
                  id="size"
                  name="size"
                  placeholder="Size"
                  style={{ width: '325px' }}
                >
                  <option value="" selected disabled hidden>Size</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                  <option value="XXXL">XXXL</option>
                  <option value="XXXXL">XXXXL</option>
                  <option value="XXXXXL">XXXXL</option>
                </select>
              </div>
            </div>
            <div className="spacer-20" />
            <div className="row" style={{ marginTop: '0px' }}>
              <div className="col-md-4 col-sm-6">
                <button
                  type="button"
                  className="btn-main mb-3"
                  onClick={() => variant && setIsBuy(true)}
                >
                  Buy
                </button>
              </div>
              <div className="col-md-8 col-sm-6">
                <button
                  type="button"
                  className="btn-main mb-3"
                  onClick={() => variant && setIsSell(true)}
                >
                  Sell
                </button>
              </div>
            </div>
            <div className="row text-start">
              {priceDetails.map(({ label, amount }) => (
                <div
                  className="col-lg-4 col-md-6 col-sm-6"
                  key={`${label}-${amount}`}
                >
                  <p
                    style={{
                      fontWeight: 'bold',
                      fontSize: '28px',
                      color: 'black',
                    }}
                  >
                    {label}
                    :
                  </p>
                  <p style={{ fontSize: '28px', color: 'black' }}>
                    $
                    {amount}
                  </p>
                </div>
              ))}
            </div>
            <div className="spacer-20" />
            <div className="item_info">
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
              <div className="spacer-20" />
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
                      {details?.data?.variants && (
                        <div className="row">
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
                                checked={variant?.id === option.id}
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
            </div>
          </div>
        </div>
      </section>

      <section className="container no-bottom" style={{ marginTop: '-70px' }}>
        <div>
          <p style={{ color: 'black', fontWeight: 'bold', fontSize: '20px' }}>
            Product Details
          </p>
        </div>
        <div className="spacer-10" />
        <div className="row">
          <div className="col-md-4" style={{ marginBottom: '20px' }}>
            <p style={{ color: 'black' }}>Product Characteristics</p>
            <div>
              <div>
                <div style={{ display: 'inline-block', width: '180px' }}>
                  Brand:
                </div>
                {details?.data.specs.brand}
              </div>
              <div>
                <div style={{ display: 'inline-block', width: '180px' }}>
                  Material:
                </div>
                {details?.data.specs.material}
              </div>
              <div>
                <div style={{ display: 'inline-block', width: '180px' }}>
                  Color:
                </div>
                {details?.data.specs.colour}
              </div>

              <div>
                <div style={{ display: 'inline-block', width: '180px' }}>
                  Size:
                </div>
                {details?.data.specs.size}
              </div>
            </div>
          </div>
          <div className="col-md-4" style={{ marginBottom: '20px' }}>
            <div>
              <p style={{ color: 'black' }}>Product Description</p>
            </div>
            <p>{details?.data?.specs?.description}</p>
          </div>
          {/* <div className="col-md-8">
            <div>
              <p style={{ color: 'black' }}>Perks</p>
            </div>
            <p>Product perks go here. TODO: Replace with API data.</p>
          </div> */}
        </div>
      </section>

      <section className="container">
        <div>
          <p style={{ color: 'black', fontWeight: 'bold', fontSize: '20px' }}>
            Price History
          </p>
        </div>
        <div className="spacer-20" />
        <AreaChart
          width={mobileMode ? width * 0.9 : width * 0.75}
          height={300}
          data={chartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" axisLine={false} hide />
          <YAxis axisLine={false} />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </section>

      {/*
Existing Detail page Design
*/}

      {/* <div className="greyscheme">
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
                        key={`tab-${tab}`}>
                        <button
                          type="button"
                          onClick={() => setCurrentTab(tab)}>
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
                            {details?.data?.variants.map(option => (
                              <div
                                className="col-lg-4 col-md-6 col-sm-6"
                                key={`option-${option.id}`}>
                                <input
                                  id={String(option.id)}
                                  type="radio"
                                  value={option.id}
                                  name="variant"
                                  onChange={() => setVariant(option)}
                                  checked={variant?.id === option.id}
                                  className="product-variant"
                                />
                                <label
                                  htmlFor={String(option.id)}
                                  className="nft_attr">
                                  <h4>{option.size}</h4>
                                  <h4>{option.colour}</h4>
                                  {option.highestBid?.amount && (
                                    <p className="m-0">
                                      Highest Bid : {option.highestBid?.amount}
                                    </p>
                                  )}
                                  {option.lowestAsk?.amount && (
                                    <p className="m-0">
                                      Lowest Ask : {option.lowestAsk?.amount}
                                    </p>
                                  )}
                                </label>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="mt-2 row">
                          {priceDetails.map(({ label, amount }) => (
                            <div
                              className="col-lg-4 col-md-6 col-sm-6 mt-3"
                              key={`${label}-${amount}`}>
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
                      }}>
                      Buy
                    </button>
                    <button
                      type="button"
                      className="btn-main btn2 lead me-3"
                      onClick={() => {
                        if (variant) setIsSell(true);
                      }}>
                      Sell
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </section>
      </div>
          */}
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
    </div>
  );
};

export default NftDetail;
