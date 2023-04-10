/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import Head from 'next/head';
import { createGlobalStyle } from 'styled-components';
import HeroSection from '../../components/common/heroSection';
import FaqSectionCard from './FaqSectionCard';
import Accordian from '../../components/common/accordian';
import useLoadCustomJs from '../../hooks/useLoadCustomJs';

const GlobalStyles = createGlobalStyle`
`;

const FAQS = [
  {
    id: 1,
    title: 'General',
    description: 'Create account, Terms & conditions',
    readMoreTarget: 'general-faq',
    qnas: [
      { id: 1, question: 'What is Designbook ?', answers: ['Designbook is a secondary exchange and live marketplace of digital certificates (NFTs) of branded exclusive goods. Powered by blockchain, products transactions are verified and authentified guaranteeing the highest level of accuracy. Live marketplace means that the price is fixed by anonymous buyers and sellers reflecting the offer and demand of a specific item in the market.'] },
      {
        id: 2,
        question: 'What items can I buy on the marketplace ?',
        answers: [
          'Designbook lists only items that have sold with a genuine and non-redeemed digital certificate issued by partner brands. Accessories are the main scope but expanding quickly to other categories. ',
        ],
      },
      {
        id: 3,
        question: 'How do I create an account ?',
        answers: [
          'Please sign up on the main page by filling in registration forms. If you are willing to place an order, you will have to connect a compatible hedera wallet.',
        ],
      },
      {
        id: 4,
        question: 'What blockchain does it use ?',
        answers: [
          'We have decided to partner with a corporate grade Blockchain already very active in the Fashion Space : Hedera. The Hedera proof-of-stake public network, powered by hashgraph consensus, achieves the highest-grade of security possible (ABFT), with blazing-fast transaction speeds and incredibly low bandwidth consumption. By combining high-throughput, low fees, and finality in seconds, Hedera leads the way for the future of public ledgers. More information can be found on <a href="https://hedera.com/">https://hedera.com/</a>',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Buyers',
    description: 'Buy now, Place a bid, Shipping & Fees',
    readMoreTarget: 'buyers-faq',

    qnas: [
      {
        id: 1,
        question: 'How do I bid for an item on Designbook?',
        answers: [
          "The live Marketplace will show you the lowest offer at any given time. You can click on ‘Place Bid’ to enter a new bid price against the offer price (your wallet balance will be validated for if it’s sufficient) and see if any sellers are willing to improve their offer. Other buyers can compete with you on the price, you will be notified of any changes and you can change your bid at any time. Only bidders with sufficient balance in their wallet are able to place an order, this is to prevent market manipulation. Once you're matched with a seller at an agreed price, you're both taken out of the listing, and funds will be automatically pulled from your wallet and the market resumes with other parties involved.",
          'The minimum Bid is 20$',
        ],
      },
      {
        id: 2,
        question: "How does 'Buy Now' work?",
        answers: [
          "If you choose the 'Buy Now' option to secure the item, you are automatically matched with the lowest overall ask price to conclude the sale. The deal will be removed from the listing so other offers/bids can continue. Your wallet balance will be deducted from the item price plus shipping and tax fees and funds will be secured into an escrow account pending item certificate validation.",
        ],
      },
      {
        id: 3,
        question: 'I received my funds back, what happened ?',
        answers: [
          'If the seller’s ownership certificate failed to pass our multi-layer validation i.e. certificate authenticity on Blockchain, then the transaction is cancelled. In this case, Designbook will do its best to match you with another seller at the same price conditions, if we cannot secure this for you, your funds will be immediately sent back to your wallet and your order will be put back in the market at the price agreed before.',
        ],
      },
      {
        id: 4,
        question: 'How do I make payment for an item on Designbook?',
        answers: [
          "All the prices are shown in USD, however once a transaction is approved, the equivalent amount in HBAR (native currency of Hedera Hashgraph public blockchain) will be deducted from your wallet. So make sure you have funded your wallet with the equivalent HBAR amount before placing any order. If your balance falls below the bid/offer price, you will not be able to place your order. We always validate wallet balance to ensure it's sufficient to cover the purchase, and to prevent market price manipulation. The reason behind this is that for transactions to be registered on the blockchain, they require that they transact in the native digital currency of the blockchain. This guarantees the highest level of traceability and accuracy of historical data for each item.",
        ],
      },
      {
        id: 5,
        question: 'What wallets are available and how do I fund them ?',
        answers: [
          "We offer for the moment 2 wallets providers Blade <a href='https://www.bladewallet.io/'>https://www.bladewallet.io/</a> and Hashpack <a href='https://www.hashpack.app/download'>https://www.hashpack.app/download</a>. Both support Desktop versions. Only Hasport is available on mobile. Wallets need to be credited with HBAR. To credit the wallet you can use <a href='https://www.moonpay.com'>https://www.moonpay.com</a> directly from the Blade wallet or transfer to your wallet if you're using Haspack.",
        ],
      },
      {
        id: 6,
        question: 'Can I modify an order ?',
        answers: [
          "One of our priorities is to ensure marketplace fairness and prevent price manipulation. Therefore, you are able only to modify or cancel your Ask or Bid orders unless it's been matched. Therefore Buy now and sell now orders are not cancellable. If your order is validated, funds will be pulled out of your account and put into an escrow account pending validation. If validation fails, you will be automatically matched with another seller at the same price conditions alternatively, your funds will be returned immediately.",
        ],
      },
      {
        id: 7,
        question: 'Can I cancel an order ?',
        answers: [
          'If you ordered an item by mistake or ordered the wrong size, unfortunately you would not be able to cancel the order. You will however be able to resell the item on our platform. Please make sure you place orders on items you are sure about.',
        ],
      },
      {
        id: 10,
        question: 'Does Designbook accept returns?',
        answers: [
          'You are welcome to resell your item on Designbook if you no longer wish to hold it, but we are unable to accept requests for returns, exchanges or swaps. This is because we operate as a live market and each item has its unique ID and ownership certificate.',
        ],
      },
      {
        id: 11,
        question: 'What are my Fees to buy ?',
        answers: [
          "With the purchase price, you will have to pay a fixed processing fee, this will always be shown to you in the 'Price Computation' page when you complete a purchase.",
        ],
      },
      {
        id: 12,
        question: 'How can I receive the physical product?',
        answers: [
          'Only non-redeemed products can be transacted thus guaranteeing authenticity and the highest standard of quality of every product sold. You can redeem the physical product at any time by requesting the redemption. All physical items are stored by the brands and will be shipped to you directly from the brands facility.',
        ],
      },
      {
        id: 13,
        question: 'How long does shipping take once I’ve redeemed my physical product?',
        answers: [
          'This will vary based on the brands shipping and service policy. Since product shipping will be entirely handled by brands to ensure authenticity, Designbook cannot advise on shipping time and related fees. You should be informed by the brand directly on shipping information once you redeem the product.',
        ],
      },
    ],

  },
  {
    id: 3,
    title: 'Selling',
    description: 'Sell now, Place an ask, Shipping and Fees',
    readMoreTarget: 'sellers-faq',

    qnas: [

      {
        id: 1,
        question: 'How do I sell my item on Designbook?',
        answers: [
          "If you own the digital certificate and the item, all you need to do is select the product you want to sell, set your offer and connect your wallet. The live marketplace will show you the highest bid at any given time. You can choose to Sell Now and close the transaction with the highest bid or you can place a higher offer and wait for a buyer to improve. Other sellers can compete with you on the price, so you can also change your offer at any time. Only sellers who possess the digital certificate in their wallet are able to place an order. All improvements in the prices from sellers or buyers will be notified to you in full transparency. Once you're matched with a buyer at an agreed price, you're both taken out of the listing and market resume between other parties involved. Your digital certificate is pulled into an escrow account along with the buyer's funds until verification is completed",
        ],
      },
      {
        id: 2,
        question: "How and when will I get paid after I've sold my item?",
        answers: [
          "We lock buyer's funds in an escrow account once your offer is matched, and once your certificate passes validation, we instantly release the funds in your wallet with our platform fees deducted. Please note that you will receive the equivalent of the amount in HBAR currency. The reason behind this is that for transactions to be registered on the blockchain, they require that they transact in the native digital currency of the blockchain. This guarantees the highest level of traceability and accuracy of historical data for each item.",
        ],
      },
      {
        id: 3,
        question: 'How do I withdraw my funds ?',
        answers: [
          'You can withdraw your funds using the 3rd party wallet payment provider Moonpay or any other payment provider compatible with the wallets',
        ],
      },
      {
        id: 4,
        question: 'What are seller fees ?',
        answers: [
          'Seller fees depend on two parameters; number of sales or amount transacted on the platform. We want to incentivise serious sellers by reducing the fees paid each time. Please find below the table',
        ],
      },
      {
        id: 5,
        question: 'What happens if I fail item Validation ?',
        answers: [
          'If your item fails our blockchain authentication we will have to reject the transaction. You will be charged a processing fee for not respecting the terms and conditions, and we will cancel the transaction.',
          'After the second attempt, you will be flagged and banned from the platform thus no longer allowed to sell. This rule guarantees that only serious sellers operate on the platform. Curation and quality is a priority for Desgnbook.',
        ],
      },
      {
        id: 8,
        question: 'The item I want to sell is not on Designbook, can it be added?',
        answers: [
          'We can only list items that have been created with a genuine certificate of authenticity by the brand itself. If you wish to sell an item that is not listed you can send us an email at info@designbook.app and we will check with the brand if the listing exists and come back to you.',
        ],
      },
    ],

  },
  {
    id: 4,
    title: 'Product specifications',
    description: 'What products, Condition of the product, Digital Certificate',
    readMoreTarget: 'product-specs-faq',
    qnas: [

      {
        id: 1,
        question: 'What products can I sell ?',
        answers: [
          'You can only sell items already listed on our marketplace, and for which you own the corresponding digital ownership certificate (the NFT) issued by the brand. This is because we only work with brands that have taken the step to quality and that want to offer customers a higher experience in their purchase by emitting digital certificates for each of their items sold and also then allowing an organised secondary market with us completely trustworthy.',
        ],
      },
      {
        id: 2,
        question: 'What is a Digital Certificate ?',
        answers: [
          'Digital Certificate is the unique ID/ownership certificate that represents the physical items in the digital space. They are linked by a serial number or unique tag that guarantees that the item is genuine.',
        ],
      },
      {
        id: 3,
        question: 'Can there be a physical item with a fake serial number or tag ?',
        answers: [
          'Yes, it is possible that some fraudster would emit a non genuine item with a duplicate serial number. All number/tags are unique which will in the case a copy circulates, it will immediately be known on the blockchain, the history of transaction as well as the location will manage to determine instantly which is the non genuine item. Also to operate he would need to have both the digital (that cannot be falsified) and the physical item, which would result in failing the condition test. The probability of non genuine items is pushed almost to 0 on the platform.',
        ],
      },
    ],

  },
  {
    id: 5,
    title: 'Verifications',
    description: 'Digital certificate check',
    readMoreTarget: '',

  },

];

const Faq:React.FC = () => {
  useLoadCustomJs({ src: '/static/js/designesia.js' });

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/static/css/plugins.css" />
        <link href="/static/css/style.css" rel="stylesheet" type="text/css" />
        <link href="/static/css/faq-custom.css" rel="stylesheet" type="text/css" />

      </Head>
      <GlobalStyles />

      <div id="wrapper">
        {/* content begin */}
        <div className="no-bottom no-top" id="content">
          <div id="top" />
          {/* section begin */}
          <HeroSection title="Frequently Asked Questions">
            <form action="blank.php" className="row" id="form_sb" method="post" name="myForm">
              <div className="col text-center">
                <input className="form-control" id="name_1" name="name_1" placeholder="Type your question here" type="text" />
                {' '}
                <a href="#" id="btn-submit"><i className="arrow_right" /></a>
              </div>
            </form>
            <div className="spacer-20" />
            <p>eg. create item, create wallet.</p>
          </HeroSection>
          {/* section close */}
          {/* section begin */}
          <section aria-label="section" className="pb-0">
            <div className="container">
              <h2 className="text-center d-block">Choose a section</h2>
              <div className="small-border bg-color-2" style={{ backgroundSize: 'cover' }} />
              <div className="row">
                {
                    FAQS.map((faq) => (
                      <FaqSectionCard
                        key={faq.id}
                        title={faq.title}
                        description={faq.description}
                        readMoreTarget={faq.readMoreTarget}
                      />
                    ))
                }
              </div>
            </div>
          </section>
          {/* accordion section */}
          <section className="py-5">
            <div className="container">
              {
                FAQS.map((faq) => (
                  <React.Fragment key={faq.id}>
                    {
                        faq?.qnas?.length
                          && (
                            <>
                              <h4 id={faq.readMoreTarget} className="accordion__section-title">{faq.title}</h4>
                              <div className="small-border bg-color-2" style={{ backgroundSize: 'cover' }} />
                              <div className="accordion accordion-flush" id={`general-accordion-${faq.readMoreTarget}`} style={{ backgroundSize: 'cover' }}>
                                {
                                  faq.qnas.map((qna) => (
                                    <Accordian title={qna.question} key={qna.id} accordianParentId={`general-accordion-${faq.readMoreTarget}`}>
                                      {qna.answers.map((ans) => <p>{ans}</p>)}
                                    </Accordian>
                                  ))
                                }
                              </div>
                            </>
                          )
                    }
                  </React.Fragment>
                ))
            }
            </div>
          </section>
        </div>
        {/* content close */}
        <a href="#" id="back-to-top" />
      </div>
    </>
  );
};
export default Faq;
