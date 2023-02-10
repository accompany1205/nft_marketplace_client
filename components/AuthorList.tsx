import React from 'react';

const AuthorList = () => (
  <div>
    <ol className="author_list">
      <li>
        <div className="author_list_pp">
          <span onClick={() => window.open('', '_self')}>
            <img className="lazy" src="./images/author/author-1.jpg" alt="" />
            {' '}
            <i className="fa fa-check" />
          </span>
        </div>
        <div className="author_list_info">
          <span onClick={() => window.open('', '_self')}>Monica Lucas</span>
          <span className="bot">3.2 ETH</span>
        </div>
      </li>

      <li>
        <div className="author_list_pp">
          <span onClick={() => window.open('', '_self')}>
            <img className="lazy" src="./images/author/author-2.jpg" alt="" />
            {' '}
            <i className="fa fa-check" />
          </span>
        </div>
        <div className="author_list_info">
          <span onClick={() => window.open('', '_self')}>Monica Lucas</span>
          <span className="bot">3.2 ETH</span>
        </div>
      </li>

      <li>
        <div className="author_list_pp">
          <span onClick={() => window.open('', '_self')}>
            <img className="lazy" src="./images/author/author-3.jpg" alt="" />
            {' '}
            <i className="fa fa-check" />
          </span>
        </div>
        <div className="author_list_info">
          <span onClick={() => window.open('', '_self')}>Monica Lucas</span>
          <span className="bot">3.2 ETH</span>
        </div>
      </li>

      <li>
        <div className="author_list_pp">
          <span onClick={() => window.open('', '_self')}>
            <img className="lazy" src="./images/author/author-4.jpg" alt="" />
            {' '}
            <i className="fa fa-check" />
          </span>
        </div>
        <div className="author_list_info">
          <span onClick={() => window.open('', '_self')}>Monica Lucas</span>
          <span className="bot">3.2 ETH</span>
        </div>
      </li>
    </ol>
  </div>
);

export default AuthorList;