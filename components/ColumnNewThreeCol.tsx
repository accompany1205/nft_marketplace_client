import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Component } from 'react';
import { IPOOL } from '../types';
import useImage from '../utils/hooks/useImage';

interface Props {
  nfts: IPOOL[];
}

interface State {
  height: number;
}

const NftCard: React.FC<{
  nft: IPOOL;
  height: number;
  onImgLoad: (data: any) => void;
  index: number;
}> = ({
  nft, height, onImgLoad, index,
}) => {
  const nftImageUrl = useImage(nft);
  const previewImg = nft?.ipfs
    ? `https://ipfs.io/ipfs/${nftImageUrl}`
    : 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80';
  const title = nft?.productName;
  const price = nft?.lowestAsk;
  const router = useRouter();
  return (
    <Link
      href={{ pathname: `/product`, query: { id: nft.id, type: nft.type }}}
      key={index}
      className="d-item col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-4"
    >
      <div className="nft__item m-0">
        <div className="nft__item_wrap" style={{ height: `${height}px` }}>
          <span>
            <img
              onLoad={onImgLoad}
              src={previewImg}
              className="lazy nft__item_preview"
              alt=""
            />
          </span>
        </div>
        <div className="nft__item_info">
          <span>
            <h4>{title}</h4>
          </span>
          <div className="nft__item_price">Price: {price === 0 ? "N/A" : price}</div>

          <div className="nft__item_action" style={{ marginBottom: '20px' }}>
            <span onClick={() => router.push({ pathname: `/product`, query: { id: nft.id, type: nft.type }})}>
              Access details
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default class Responsive extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      height: 0,
    };
    this.onImgLoad = this.onImgLoad.bind(this);
  }

  onImgLoad({ target: img }: any) {
    const currentHeight = this.state.height;
    if (currentHeight < img.offsetHeight) {
      this.setState({
        height: img.offsetHeight,
      });
    }
  }

  // loadMore = () => {
  //   const nftState = this.state.nfts;
  //   const start = nftState.length;
  //   const end = nftState.length + 4;
  //   this.setState({
  //     nfts: [...nftState, ...this.dummyData.slice(start, end)],
  //   });
  // };

  render() {
    return (
      <div className="row">
        {this.props.nfts.map((nft, index) => (
          <NftCard
            nft={nft}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            height={this.state.height}
            onImgLoad={this.onImgLoad}
            index={index}
          />
        ))}
        {/* if you need pagination, unlock the button below */}
        {/* {this.state.nfts.length !== this.dummyData.length && false && (
          <div className="col-lg-12">
            <div className="spacer-single" />
            <span
              onClick={() => this.loadMore()}
              className="btn-main lead m-auto"
            >
              Load More
            </span>
          </div>
        )} */}
      </div>
    );
  }
}
