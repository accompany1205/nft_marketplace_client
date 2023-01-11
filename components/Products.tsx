import React from "react";
import NftCard from "./NftCard";
import { INFT } from "../types/nft.type";
import authApi from "../redux/service/appService";
import Loader from "./Loader";

const Products = function () {
  const { data: nft, isLoading } = authApi.endpoints.getProducts.useQuery();
  
  return (
    <>
      {isLoading ? <div className="d-flex justify-content-center align-items-center"><Loader /></div> :
        <div className='row'>
          {nft?.data && nft?.data.map((nft: INFT, index: number) => {
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
