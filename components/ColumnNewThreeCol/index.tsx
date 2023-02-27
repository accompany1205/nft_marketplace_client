import React, { Component } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props{
}

interface State{
  nfts: {
    previewImg:string
      title:string
      price:string
  }[],
  height: number
}
export default class Responsive extends Component<Props, State> {
  dummyData = [
    {
      previewImg: './images/items/static-1.jpg',
      title: 'Pinky Ocean',
      price: '$45',
    },
    {
      previewImg: './images/items/static-4.jpg',
      title: 'Pinky Ocean',
      price: '$45',
    },
    {
      previewImg: './images/items/static-7.jpg',
      title: 'Pinky Ocean',
      price: '$45',
    },
  ];

  constructor(props:Props) {
    super(props);
    this.state = {
      nfts: this.dummyData.slice(0, 8),
      height: 0,
    };
    this.onImgLoad = this.onImgLoad.bind(this);
  }

  onImgLoad({ target: img }:any) {
    const currentHeight = this.state.height;
    if (currentHeight < img.offsetHeight) {
      this.setState({
        height: img.offsetHeight,
      });
    }
  }

  loadMore = () => {
    const nftState = this.state.nfts;
    const start = nftState.length;
    const end = nftState.length + 4;
    this.setState({
      nfts: [...nftState, ...this.dummyData.slice(start, end)],
    });
  };

  render() {
    return (
      <div className="row">
        {this.state.nfts.map((nft, index) => (
          <div
            key={index}
            className="d-item col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-4"
          >
            <div className="nft__item m-0">
              <div
                className="nft__item_wrap"
                style={{ height: `${this.state.height}px` }}
              >
                <span>
                  <img
                    onLoad={this.onImgLoad}
                    src={nft.previewImg}
                    className="lazy nft__item_preview"
                    alt=""
                  />
                </span>
              </div>
              <div className="nft__item_info">
                <span>
                  <h4>{nft.title}</h4>
                </span>
                <div className="nft__item_price">{nft.price}</div>

                <div
                  className="nft__item_action"
                  style={{ marginBottom: '20px' }}
                >
                  <span
                    onClick={() => alert('this should redirect to details')}
                  >
                    Access details
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* if you need pagination, unlock the button below */}
        {this.state.nfts.length !== this.dummyData.length && false && (
          <div className="col-lg-12">
            <div className="spacer-single" />
            <span
              onClick={() => this.loadMore()}
              className="btn-main lead m-auto"
            >
              Load More
            </span>
          </div>
        )}
      </div>
    );
  }
}
