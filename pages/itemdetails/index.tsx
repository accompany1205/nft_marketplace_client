import React from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { createGlobalStyle } from 'styled-components';
import { useWindowWidth } from '@react-hook/window-size';
import Footer from '../../components/footer';
import useMobileMode from '../../hooks/useMobileMode';

const data = [
  {
    name: 'Sept 4',
    uv: 4000,
  },
  {
    name: 'Sept 5',
    uv: 3000,
  },
  {
    name: 'Sept 6',
    uv: 2000,
  },
  {
    name: 'Sept 7',
    uv: 2780,
  },
  {
    name: 'Sept 8',
    uv: 1890,
  },
  {
    name: 'Sept 9',
    uv: 2390,
  },
  {
    name: 'Sept 10',
    uv: 3490,
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

const ItemDetails = () => {
  const width = useWindowWidth();
  const mobileMode = useMobileMode();
  return (
    <div>
      <GlobalStyles />
      <section className="container">
        <div className="row" style={{ marginTop: '20px' }}>
          <div className="item_info" style={{ marginBottom: '20px' }}>
            <h2>Pinky Ocean</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 text-center">
            <img
              src="./images/items/big-1.jpg"
              className="img-fluid img-rounded mb-sm-30"
              alt=""
            />
          </div>
          <div className="col-md-6 text-center">
            <div className="row" style={{ marginTop: '60px' }}>
              <div className="col-md-4 col-sm-6">
                <button
                  type="button"
                  className="btn-main mb-5"
                  onClick={() => alert('ciao')}>
                  Buy
                </button>
              </div>
              <div className="col-md-8 col-sm-6">
                <button
                  type="button"
                  className="btn-main mb-5"
                  onClick={() => alert('ciao')}>
                  Sell
                </button>
              </div>
            </div>
            <div className="row text-start">
              <p
                style={{
                  fontWeight: 'bold',
                  fontSize: '28px',
                  color: 'black',
                }}>
                Price:
              </p>
              <p style={{ fontSize: '28px', color: 'black' }}>$234</p>
            </div>
          </div>
        </div>
      </section>
      <section className="container no-bottom">
        <div>
          <p style={{ color: 'black', fontWeight: 'bold', fontSize: '20px' }}>
            Product Details
          </p>
        </div>
        <div className="spacer-20" />
        <div className="row">
          <div className="col-md-4" style={{ marginBottom: '20px' }}>
            <div>
              <div>
                <div style={{ display: 'inline-block', width: '180px' }}>
                  Dimensions:
                </div>
                2.7H
              </div>
              <div>
                <div style={{ display: 'inline-block', width: '180px' }}>
                  Material:
                </div>
                Leather
              </div>
              <div>
                <div style={{ display: 'inline-block', width: '180px' }}>
                  Color:
                </div>
                Blue
              </div>

              <div>
                <div style={{ display: 'inline-block', width: '180px' }}>
                  Style:
                </div>
                SSSU
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div>
              <p style={{ color: 'black' }}>Product Description</p>
            </div>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo.
            </p>
          </div>
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
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </section>
      <Footer />
    </div>
  );
};
export default ItemDetails;
