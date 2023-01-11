import { useRouter } from "next/router";
import Loader from "../../components/Loader";
import authApi from "../../redux/service/appService";
import useImage from "../../utils/hooks/FetchNftImage";

const NftDetail = () => {
  const router = useRouter();
  const { data: details, isLoading } = authApi.endpoints.getProductDetails.useQuery(router.query.pid && typeof router.query.pid === 'string' ? router.query.pid : '');
  const nftImageUrl = useImage(details?.data);

  console.log(router.query.pid, 'pid')
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
  return (
    <div className="greyscheme">
      {isLoading ? <div className="d-flex  justify-content-center align-items-center" style={{ height: '100vh' }}><Loader /></div> :
        <section className='container'>
          <div className='row mt-md-5 pt-md-4'>
            <div className="col-md-6 text-center">
              <img src={nftImageUrl ? `https://ipfs.io/ipfs/${nftImageUrl}` :'https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'} className="img-fluid img-rounded mb-sm-30" alt="" />
            </div>
            <div className="col-md-6">
              <div className="item_info">
                <h2>{details?.data?.specs?.productName}</h2>
                <div className="item_info_counts">
                  <div className="item_info_type"><i className="fa fa-image"></i>{details?.data.specs.brand}</div>
                  <div className="item_info_views"><i className="fa fa-eye"></i>{details?.data.specs.views}</div>
                  <div className="item_info_like"><i className="fa fa-heart"></i>{details?.data.specs.likes}</div>
                </div>
                <p>{details?.data?.specs?.description}</p>
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
                     {details?.data?.specs?.size  && <div className="row mt-5">
                          <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="nft_attr">
                              <h4>{details?.data?.specs?.size}</h4>
                              <span>BID</span>
                            </div>
                          </div>
                        </div>}
                      </div>
                    </div>
                    <div className='detailcheckout mt-4'>
                      <div className='listcheckout'>
                        <h5>
                          Price
                        </h5>
                        <div className='subtotal'>
                          {details?.data?.specs?.price}
                        </div>
                      </div>
                    </div>
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
      }
    </div>
  );
}

export default NftDetail;