import React from 'react';
import Link from 'next/link';

const Catgor = () => (
  <div className="row">
    <div className="col-md-2 col-sm-4 col-6 mb-3">
      <Link className="icon-box style-2 rounded" href="">
        <img src="./images/categoriesIcons/bag.png" width="45px" height="45px" />
        <span>Bags</span>
      </Link>
    </div>
    <div className="col-md-2 col-sm-4 col-6 mb-3">
      <Link className="icon-box style-2 rounded" href="">
        <img src="./images/categoriesIcons/wallet.png" width="45px" height="45px" />
        <span>Leather Goods</span>
      </Link>
    </div>
    <div className="col-md-2 col-sm-4 col-6 mb-3">
      <Link className="icon-box style-2 rounded" href="">
        <img src="./images/categoriesIcons/earrings.png" width="45px" height="45px" />
        <span>Jewellery</span>
      </Link>
    </div>
    <div className="col-md-2 col-sm-4 col-6 mb-3">
      <Link className="icon-box style-2 rounded" href="">
        <img src="./images/categoriesIcons/trail.png" width="45px" height="45px" />
        <span>Shoes</span>
      </Link>
    </div>
    <div className="col-md-2 col-sm-4 col-6 mb-3">
      <Link className="icon-box style-2 rounded" href="">
        <img src="./images/categoriesIcons/hand-watch.png" width="45px" height="45px" />
        <span>Watches</span>
      </Link>
    </div>
    <div className="col-md-2 col-sm-4 col-6 mb-3">
      <Link className="icon-box style-2 rounded" href="">
        <img src="./images/categoriesIcons/glasses.png" width="45px" height="45px" />
        <span>Sunglasses</span>
      </Link>
    </div>
  </div>
);
export default Catgor;
