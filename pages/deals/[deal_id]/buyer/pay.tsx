import { useRouter } from 'next/router';
import Loader from '../../../../components/Loader';
import Redirect from '../../../../components/Redirect';
import useBuyerPayment from '../../../../hooks/useBuyerPayment';
import { useGetDealQuery } from '../../../../redux/service/appService';
import useImage from '../../../../utils/hooks/FetchNftImage';

const BuyNft = () => {
  const router = useRouter();
  const dealId = router.query.deal_id?.toString();

  const { data, isLoading } = useGetDealQuery(dealId || '');
  const nftImageUrl = useImage(data?.data);

  const { handleSubmit, isLoading: isPaymentLoading } = useBuyerPayment(
    dealId ? parseInt(dealId, 10) : undefined,
    () => router.push('/'),
  );

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

  if (!data?.data) return <Redirect path="/" />;

  const deal = data?.data;

  return (
    <div className="greyscheme">
      <div
        className="d-flex  justify-content-center align-items-center"
        style={{ height: '100vh' }}
      >
        <section className="container">
          <div className="row mt-md-5 pt-md-4">
            <div className="col-md-6 text-center">
              <img
                src={
                  nftImageUrl
                  || 'https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
                }
                className="img-fluid img-rounded mb-sm-30"
                alt=""
              />
            </div>
            <div className="col-md-6">
              <div className="item_info">
                <h2>{deal.nft_data.productName}</h2>
                <p>{deal.nft_data.description}</p>
                <div className="spacer-40" />
                <div className="de_tab">
                  <ul className="de_nav">
                    <li id="Mainbtn">
                      <span>Current Bid</span>
                    </li>
                  </ul>
                  <div className="de_tab_content">
                    <div className="detailcheckout mt-4">
                      <div className="listcheckout">
                        <h5>Price</h5>
                        <div className="subtotal">{deal.amount}</div>
                      </div>
                    </div>
                    <div className="d-flex flex-row mt-5">
                      <button
                        className="btn-main lead mb-5 me-3"
                        type="button"
                        onClick={handleSubmit}
                        disabled={isPaymentLoading}
                      >
                        Pay Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BuyNft;
