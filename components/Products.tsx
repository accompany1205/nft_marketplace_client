import { map } from "lodash";
import { useGetProductsQuery } from "../redux/service/appService";
import { INFT } from "../types/nft.type";
import Loader from "./Loader";
import NftCard from "./NftCard";

const Products = function () {
  const { data, isLoading } = useGetProductsQuery();

  const nfts = map(data?.data, ({products}) => products).flat(1);

  return (
    <>
      {isLoading ? <div className="d-flex justify-content-center align-items-center"><Loader /></div> :
        <div className='row'>
         {nfts?.length && nfts.map((nft: INFT, index: number) => {
            return (
              <NftCard key={index} nft={nft} />
            )
          })}
        </div>
      }
    </>
  );
}
export default Products;
