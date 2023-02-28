import React from 'react';
import { createGlobalStyle } from 'styled-components';
import ColumnNewThreeCol from '../../components/ColumnNewThreeCol';

const GlobalStyles = createGlobalStyle`
  .navbar {
    border-bottom: solid 1px rgba(255, 255, 255, .1) !important;
  }
`;

const explore = () => (
  <div>
    <GlobalStyles />
    <section className="container">
      <div className="row">
        <div className="spacer-double" />

        <div className="col-md-3">
          <div className="item_filter_group">
            <h4>Categories</h4>
            <div className="de_form">
              <div className="de_checkbox">
                <input
                  id="check_cat_1"
                  name="check_cat_1"
                  type="checkbox"
                  value="check_cat_1"
                />
                <label htmlFor="check_cat_1">Bags</label>
              </div>

              <div className="de_checkbox">
                <input
                  id="check_cat_2"
                  name="check_cat_2"
                  type="checkbox"
                  value="check_cat_2"
                />
                <label htmlFor="check_cat_2">Leather Goods</label>
              </div>

              <div className="de_checkbox">
                <input
                  id="check_cat_3"
                  name="check_cat_3"
                  type="checkbox"
                  value="check_cat_3"
                />
                <label htmlFor="check_cat_3">Jewellery</label>
              </div>

              <div className="de_checkbox">
                <input
                  id="check_cat_4"
                  name="check_cat_4"
                  type="checkbox"
                  value="check_cat_4"
                />
                <label htmlFor="check_cat_4">Shoes</label>
              </div>

              <div className="de_checkbox">
                <input
                  id="check_cat_5"
                  name="check_cat_5"
                  type="checkbox"
                  value="check_cat_5"
                />
                <label htmlFor="check_cat_5">Watches</label>
              </div>

              <div className="de_checkbox">
                <input
                  id="check_cat_6"
                  name="check_cat_6"
                  type="checkbox"
                  value="check_cat_6"
                />
                <label htmlFor="check_cat_6">Sunglasses</label>
              </div>
            </div>
          </div>

          <div className="item_filter_group">
            <h4>Colours</h4>
            <div className="de_form">
              <div className="de_checkbox">
                <input id="buy" name="buy" type="checkbox" value="buy" />
                <label htmlFor="buy">Black</label>
              </div>

              <div className="de_checkbox">
                <input
                  id="onauction"
                  name="onauction"
                  type="checkbox"
                  value="onauction"
                />
                <label htmlFor="onauction">White</label>
              </div>

              <div className="de_checkbox">
                <input
                  id="offers"
                  name="offers"
                  type="checkbox"
                  value="offers"
                />
                <label htmlFor="offers">Grey</label>
              </div>

              <div className="de_checkbox">
                <input
                  id="offers"
                  name="offers"
                  type="checkbox"
                  value="offers"
                />
                <label htmlFor="offers">Blue Navy</label>
              </div>
            </div>
          </div>

          <div className="item_filter_group">
            <h4>Brands</h4>
            <div className="de_form">
              <div className="de_checkbox">
                <input
                  id="sitems"
                  name="sitems"
                  type="checkbox"
                  value="sitems"
                />
                <label htmlFor="sitems">Artisan Labs</label>
              </div>

              <div className="de_checkbox">
                <input
                  id="bundles"
                  name="bundles"
                  type="checkbox"
                  value="bundles"
                />
                <label htmlFor="bundles">Santoni</label>
              </div>

              <div className="de_checkbox">
                <input
                  id="bundles"
                  name="bundles"
                  type="checkbox"
                  value="bundles"
                />
                <label htmlFor="bundles">Luca Faloni</label>
              </div>
            </div>
          </div>

          <div className="item_filter_group">
            <h4>Price</h4>
            <div className="de_form" />
            <input
              className="form-control"
              id="txt_subscribe"
              name="txt_subscribe"
              placeholder="Min Price"
              type="text"
              style={{ maxWidth: '120px' }}
            />
            <div className="spacer-10" />
            <input
              className="form-control"
              id="txt_subscribe"
              name="txt_subscribe"
              placeholder="Max Price"
              type="text"
              style={{ maxWidth: '120px' }}
            />
          </div>
        </div>

        <div className="col-md-9">
          <ColumnNewThreeCol />
        </div>
      </div>
    </section>
  </div>
);
export default explore;
