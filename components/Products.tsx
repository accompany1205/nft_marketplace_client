import { map } from 'lodash';
import { useGetProductsQuery } from '../redux/service/appService';
import { IPOOL } from '../types/nft.type';
import Loader from './Loader';
import NftCard from './NftCard';

const Products: React.FC = () => {
  const { data, isLoading } = useGetProductsQuery();

  const nfts = map(data?.data, ( pool ) => pool ).flat(1);

  return isLoading ? (
    <div className="d-flex justify-content-center align-items-center">
      <Loader />
    </div>
  ) : (
    <div className="row">
      {nfts?.length
        && nfts.map((nft: IPOOL, index: number) => (
          <NftCard key={index} nft={nft} />
        ))}
    </div>
  );
};
export default Products;
