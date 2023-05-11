import { map } from 'lodash';
import React, { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import ColumnNewThreeCol from '../../components/ColumnNewThreeCol';
import { useGetProductsQuery } from '../../redux/service/appService';
import { IPOOL } from '../../types';

const GlobalStyles = createGlobalStyle`
  .navbar {
    border-bottom: solid 1px rgba(255, 255, 255, .1) !important;
  }
`;

const MarketPlace = () => {
  const { data } = useGetProductsQuery();
  console.log('data', data?.data);

  const nfts: IPOOL[] = map(data?.data, (product) => product);
  const colors: string[] = [];
  const brands: string[] = [];
  nfts.forEach(element => {
    if (colors.indexOf(element.color) < 0)
      colors.push(element.color);
    if (brands.indexOf(element.brand) < 0) {
      brands.push(element.brand);
    }
  });

  console.log("colors: ", colors);
  const [pool, setPools] = useState<IPOOL[]>([...nfts]);
  const [selectedColors, setSelectedColors] = useState<string[]>([...colors]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([...brands]);

  useEffect(() => {
    setPools((_pools) => nfts.filter((_pool) => selectedBrands.indexOf(_pool.brand) >= 0 && selectedColors.indexOf(_pool.color) >= 0));
  }, [selectedBrands, selectedColors])

  const handleClickColorcheckbox = (e: any): void => {
    if (e.target.checked) {
      setSelectedColors(colors => [...colors, e.target.name]);
    } else {
      setSelectedColors(colors => [...colors.filter(color => color !== e.target.name)])
    }
    console.log(colors);
  }

  const handleClickBrandcheckbox = (e: any): void => {
    if (e.target.checked) {
      setSelectedBrands(_brands => [..._brands, e.target.name]);
    } else {
      setSelectedBrands(_brands => [..._brands.filter(brand => brand !== e.target.name)])
    }
  }

  return (
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
                {colors.length > 0 && colors.map((color, index) => {
                  return <div key={index} className="de_checkbox">
                    <input
                      id={`onauction_${index}`}
                      type="checkbox"
                      name={color}
                      onChange={(e) => handleClickColorcheckbox(e)}
                      defaultChecked={selectedColors.indexOf(color) >= 0}
                    />
                    <label htmlFor={`onauction_${index}`}>{color}</label>
                  </div>
                })}

              </div>
            </div>

            <div className="item_filter_group">
              <h4>Brands</h4>
              {brands.length > 0 && brands.map((brand, index) => {
                return <div key={index} className="de_form">
                  <div className="de_checkbox">
                    <input
                      id={`sitems_${index}`}
                      type="checkbox"
                      name={brand}
                      onChange={(e) => handleClickBrandcheckbox(e)}
                      defaultChecked={selectedBrands.indexOf(brand) >= 0}
                    />
                    <label htmlFor={`sitems_${index}`}>{brand}</label>
                  </div>
                </div>
              })}

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
            <ColumnNewThreeCol nfts={pool} />
          </div>
        </div>
      </section>
    </div>
  );
};
export default MarketPlace;
