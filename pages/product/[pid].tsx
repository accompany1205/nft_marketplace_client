import React, { memo, useEffect } from "react";

const NftDetail = () => {

  const nft = {
    title: "Nike",
    category: 'Sports Shoes',
    views: 190,
    likes: 200,
    description: 'Best Shoe for sports',
    owner: {
      username: 'Rameez Raja',
    }
  }
  const sizes = [
    'US 5W',
    'US 5.5W',
    'US 6W',
    'US 7W',
    'US 8W',
    'US 9W',

  ]

  return (
    <div className="greyscheme">
      <section className='container'>
        <div className='row mt-md-5 pt-md-4'>
          <div className="col-md-6 text-center">
            <img src='https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80' className="img-fluid img-rounded mb-sm-30" alt="" />
          </div>
          <div className="col-md-6">
            <div className="item_info">
              <h2>{nft.title}</h2>
              <div className="item_info_counts">
                <div className="item_info_type"><i className="fa fa-image"></i>{nft.category}</div>
                <div className="item_info_views"><i className="fa fa-eye"></i>{nft.views}</div>
                <div className="item_info_like"><i className="fa fa-heart"></i>{nft.likes}</div>
              </div>
              <p>{nft.description}</p>

              <div className="spacer-40"></div>

              <div className="de_tab">

                <ul className="de_nav">
                  <li id='Mainbtn0' className="active"><span >Details</span></li>
                  <li id='Mainbtn' ><span >Bids</span></li>
                  <li id='Mainbtn1' className=''><span >History</span></li>
                </ul>

                <div className="de_tab_content">
                  <div className="tab-1 onStep fadeIn">
                    <div className="d-block mb-3">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <span>
                              <img className="lazy" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" alt="" />

                              <i className="fa fa-check"></i>
                            </span>
                          </div>
                          <div className="author_list_info">
                            <span>{nft.owner.username}</span>
                          </div>
                        </div>
                      </div>

                      <div className="row mt-5">
                        {sizes.map((e, index) => {
                          return (
                            <div key={index} className="col-lg-4 col-md-6 col-sm-6">
                              <div className="nft_attr">
                                <h4>{e}</h4>
                                <span>BID</span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  {/* button for checkout */}
                  <div className="d-flex flex-row mt-5">
                    <button className='btn-main lead mb-5 me-3' >Buy Now</button>
                    <button className='btn-main btn2 lead mb-5' >Place Bid</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default memo(NftDetail);