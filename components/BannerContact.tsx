import React from 'react';
import { Link } from '@reach/router';

export default () => (
  <section className="container-fluid p-md-0">
    <div className="row">

      <div className="col-md-6">
        <img src="./images/mocks.png" alt="imgbanner" className="w-100 border-radius" />
      </div>
      <div className="col-md-6 centered">
        <div>
          <div className="subheading mt-md-0 mt-5">
            You can trust us
          </div>
          <div className="heading">
            We Made Your Design
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            <span className="br" />
            Fusce vitae egestas mi, vel dapibus diam. Mauris malesuada,
            <span className="br" />
            nisl non rutrum commodo, sem magna.
          </p>
          <Link className="btn" to="/contact-us">
            <span className="shine" />
            <span>Contact Us</span>
          </Link>
        </div>
      </div>

    </div>
  </section>
);
