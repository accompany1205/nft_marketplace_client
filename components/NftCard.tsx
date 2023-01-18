import React, { memo } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { INFT } from '../types/nft.type';
import useImage from '../utils/hooks/FetchNftImage';

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;

interface IProps {
  nft: INFT;
  // className?: string
}

const NftCard = ({ nft }: IProps) => {
  const nftImageUrl = useImage(nft);
  const router = useRouter();
  return (
    <div className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4">
      <div className="nft__item m-0">
        <div className="author_list_pp">
          <span>
            <img
              className="lazy"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              alt=""
            />
            <i className="fa fa-check" />
          </span>
        </div>
        <div className="nft__item_wrap" style={{ height: 'auto' }}>
          <Outer>
            <span>
              <img
                src={
                  nft?.ipfs
                    ? `https://ipfs.io/ipfs/${nftImageUrl}`
                    : 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80'
                }
                className="lazy nft__item_preview"
                alt=""
              />
            </span>
          </Outer>
        </div>
        <div className="nft__item_info">
          <span
            onClick={() => {
              router.push(`product/${nft?.specs.productName}`);
            }}
          >
            <h4>{nft?.specs.productName}</h4>
          </span>

          <div className="has_offers">
            {nft?.specs.price}
            {' '}
            ETH
          </div>
          <div className="nft__item_action">
            <span> Buy Now </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(NftCard);
