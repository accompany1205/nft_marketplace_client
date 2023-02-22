import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { createGlobalStyle } from 'styled-components';
import HeroSection from '../../components/common/heroSection';
import FaqSectionCard from './FaqSectionCard';
import Accordian from '../../components/common/accordian';

const GlobalStyles = createGlobalStyle`
`;

const FAQS = [
  {
    id: 1,
    title: 'General',
    description: 'Create account, Terms & conditions',
    readMoreTarget: 'general-faq',
    qnas: [
      { id: 1, question: 'What is Designbook ?', answers: ['Designbook is a second hand fashion live marketplace for certified goods. Powered by blockchain, products transacting are verified and authentified guaranteeing the highest level of accuracy. Live marketplace means that the price is fixed by anonymous buyers and sellers reflecting the offer and demand of a specific item in the market.'] },
      {
        id: 2,
        question: 'What items can I buy on the marketplace ?',
        answers: [
          'Designbook lists only items that have sold with a genuine digital certificate issued by partner brands. Accessories are the main scope but expanding quickly to other categories. Items on sale are accepted only if they are new or unused items (dead stock). Reconditioned items are only considered for accessories and if to a level of standard Grade A. All items need to be in their original packaging with accessories.',
          'GRADE A. Products are in As New condition. Box Opened Only. No Visible Signs of Use or Cosmetic Wear. The item is still in full 100% working order.',
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
          "If you choose the 'Buy Now' option to secure the item, you are automatically matched with the lowest overall ask price to conclude the sale. The deal will be removed from the listing so other offers/bids can continue. Your wallet balance will be deducted from the item price plus shipping and tax fees and funds will be secured into an escrow account pending item validation.",
        ],
      },
      {
        id: 3,
        question: 'I received my funds back, what happened ?',
        answers: [
          'If the seller failed to send the item within the deadline, the item failed to pass the multi layer validation i.e. certificate authenticity on Blockchain or item genuinity and condition test, then the transaction is cancelled. In this case, Designbook will do its best to match you with another seller at the same price conditions, if we cannot secure this for you, your funds will be immediately sent back to your wallet and your order will be put back in the market at the price agreed before.',
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
          'If you ordered an item by mistake or ordered the wrong size, we cannot unfortunately not cancel. You will only be able to resell it later once received, so make sure you place orders on items you are sure about.',
        ],
      },
      {
        id: 8,
        question: 'How much does Designbook charge for shipping to buyers?',
        answers: [
          'Shipping fees will be charged based on the nature of the item and your location. When you place a purchase, you will be able to see the price computation with shipping feeds after you fill in your shipping details plus tax according to your delivery address..',
        ],
      },
      {
        id: 9,
        question: 'When can I expect to receive my item?',
        answers: [
          'Delay of reception depends on your delivery address. Please note that our policy is strict, the item has to be with our certification team at latest 48h after concluding the sale and we authenticate and ship the item in 24h to you. Generally items can get to you between 1 to 2 weeks depending on your geographical location. Making sure the item is genuine and in the best conditions is our priority.',
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
          "With the purchase price, you will have to pay a fixed processing fee and potentially import duties/sales tax based on multiple factors such as price, size and item type. Shipping costs are determined by our carrier partners. These fees are calculated based on your shipping address and always shown to you in the 'Price Computation' page when you complete a purchase.",
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
          "If you own the digital certificate and the item, all you need to do is select the product you want to sell, set your offer and connect your wallet. The live marketplace will show you the highest bid at any given time. You can choose to Sell Now and close the transaction with the highest bid or you can place a higher offer and wait for a buyer to improve. Other sellers can compete with you on the price, so you can also change your offer at any time. Only sellers who possess the digital certificate in their wallet are able to place an order. All improvements in the prices from sellers or buyers will be notified to you in full transparency. Once you're matched with a buyer at an agreed price, you're both taken out of the listing and market resume between other parties involved. Your digital certificate is pulled into an escrow account along with the buyer's funds while we wait to receive your item and complete verification.",
        ],
      },
      {
        id: 2,
        question: "How and when will I get paid after I've sold my item?",
        answers: [
          "We lock buyer's funds in an escrow account once your offer is matched, and once your item is received and passed validation, we instantly the funds in your wallet with our platform fees deducted. Please note that you will receive the equivalent of the amount in HBAR currency. The reason behind this is that for transactions to be registered on the blockchain, they require that they transact in the native digital currency of the blockchain. This guarantees the highest level of traceability and accuracy of historical data for each item.",
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
          'Please note that there are shipping fees to add on top that depend on your location and that will be deducted from your selling amount once concluded.',
        ],
      },
      {
        id: 5,
        question: 'What happens if I fail item Validation ?',
        answers: [
          'If your item fails validation there can be 2 main problems;',
          '● item is not genuine',
          '● or the condition is not new and not up to the level of standart',
          'In both cases, we will have to reject the transaction and will ship you back the item. You will be charged shipping fees for not respecting the terms and conditions and cancel the transaction.',
          'After the second attempt of shipping items that do not respect our terms and conditions, you will be flagged and banned from the platform thus not allowed to sell anymore. This rule guarantees that only serious sellers operate on the platform. Curation and quality is a priority for Desgnbook. If you have a doubt of the condition of your item or genuineness please refer to the relevant section or contact our support by email.',
        ],
      },
      {
        id: 6,
        question: "When do I have to ship my item to Designbook after it's sold?",
        answers: [
          'You will have 48h to dispatch the item to us for verification, from when you receive our pre-paid label.',

        ],
      },
      {
        id: 7,
        question: "How do I ship my item to Designbook after it's sold, and how much does it cost?",
        answers: [
          'In order to simplify the process for you we generate and share a prepaid label which you can use for shipping. The cost of this is deducted from your total payout, and the amount varies depending on the type and size of the item you sold, as well as where you are located.',
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
      {
        id: 4,
        question: 'What are the required item conditions ?',
        answers: [
          'An item should be in ‘Never Worn, with Original Tags’ condition. This means your item should be in perfect condition:',
          '● No defect',
          '● No modification or alteration',
          '● Unused',
          '● Come with original, undamaged tag and packaging',
        ],
      },
      {
        id: 6,
        question: 'What if the item condition fails to pass ?',
        answers: [
          'If your item fails validation there can be 2 main problems;',
          '● item is not genuine',
          '● or the condition is not new and not up to the level of standart',
          'In both cases, we will have to reject the transaction and will ship you back the item. You will be charged shipping fees for not respecting the terms and conditions and cancel the transaction. After the second attempt of shipping items that do not respect our terms and conditions, you will be flagged and banned from the platform thus not allowed to sell anymore. This rule guarantees that only serious sellers operate on the platform. Curation and quality is a priority for Desgnbook. If you have a doubt of the condition of your item or genuineness please refer to the relevant section or contact our support by email.',
        ],
      },
      {
        id: 7,
        question: 'What if my product has been detected as counterfeit ?',
        answers: [
          'You can only sell genuine items with valid digital certificates on our platform. If you decide to violate this by sending us a counterfeit item which fails our verification, we will return the item back to you and deduct related verification and shipping fees from your wallet.',
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
  {
    id: 6,
    title: 'Shipping & Fees & Taxes',
    description: 'Deadlines, Instructions, Package, Fees',
    readMoreTarget: 'shipping-taxes-faq',

    qnas: [
      {
        id: 1,
        question: 'How long do I have to ship the product ?',
        answers: [
          'You will have 48h to dispatch the item to us for verification, from when you receive our pre-paid label.',
        ],
      },
      {
        id: 2,
        question: 'How do I need to package the item ?',
        answers: [
          'The item needs to be in perfect condition with accessories and original packaging. Please place your item into a bigger shipping box. Use bubble wrap and/or shipping paper to secure the item in the box while in transit.Tape or stick the provided shipping label to the outside of the shipping box.',
        ],
      },
      {
        id: 3,
        question: 'Where do I need to send the item to ?',
        answers: [
          'When a sale is concluded you automatically receive a prepaid label that indicates the shipping address you will be able to find and drop off to the nearest store location. We use local shipping carriers such as UPS, DHL, Fedex, DPD and many more to guarantee the most competitive rates.',
        ],
      },
      {
        id: 4,
        question: 'What are the shipping Fees ?',
        answers: [
          'Shipping fees will be charged based on the nature of the item and your location. For buyers, this will be determined when you place a purchase, you will be able to see the price computation with shipping feeds after you fill in your shipping details (plus tax) according to your delivery address. For sellers, we generate and share a prepaid label which you can use for shipping. The cost of this is deducted from your total payout, and the amount varies depending on the type and size of the item you sold, as well as where you are located.',
          {
            type: 'html',
            content: <>
              <p className="text-decoration-underline mb-0">
                Estimated Buyer Outbound Shipping Cost:
              </p>
              <img src="/static/images/faq-table-1.png" alt="table" />
              <br />
              {' '}
              <br />
              <p className="text-decoration-underline mb-2">
                Estimated Seller Inbound Shipping Cost:
              </p>
              <img src="/static/images/faq-table-2.png" alt="table" />
              <br />
              <br />
              <table className="table table-bordered faq-table">
                <tbody>
                  <tr>
                    <td>Zone 1</td>
                    <td>
                      Andorra, Austria, Belgium, Denmark, Faroe Is, Finland, France,
                      Germany, Greece, Greenland, Ireland, Luxembourg, Monaco,
                      Netherlands, Portugal, Spain, Sweden, United Kingdom

                    </td>
                  </tr>
                  <tr>
                    <td>Zone 2</td>
                    <td>Gibraltar, Iceland, Liechtenstein, Norway, Switzerland</td>
                  </tr>
                  <tr>
                    <td>Zone 3 </td>
                    <td>Canada, USA, Mexico</td>
                  </tr>
                  <tr>
                    <td>Zone 4 </td>
                    <td>
                      Australia, Brunei, Cambodia, China, East, Timor, Hong Kong,
                      Indonesia, Japan, Laos, Macau, Malaysia, Myanmar, New Zealand,
                      Singapore, South Korea, Taiwan, Thailand, Vietnam
                    </td>
                  </tr>
                  <tr>
                    <td>Zone 5</td>
                    <td>
                      Anguilla, Antigua, Argentina, Aruba, Bahamas, Barbados, Belize,
                      Bolivia, Brazil, Cayman Island, Chile, Colombia, Costa Rica,
                      Dominica, Dominica Rep, Ecuador, El Salvador, French Guinea,
                      Grenada, Guadeloupe, Guatemala, Guyana, Haiti, Honduras, Jamaica,
                      Martinique, Montserrat, Nicaragua, Panama, Paraguay, Peru, British
                      Virgin, St Kitts &amp; Nevis, St. Lucia, St. Vincent, Suriname, Trinidad
                      &amp; Tobago, Turks &amp; Caicos, Uruguay, Venezuela, Virgin Island, NL
                      Antilles
                    </td>
                  </tr>
                  <tr>
                    <td>Zone 6</td>
                    <td>
                      Bahrain, Bangladesh, Botham, Cyprus, Egypt, India, Israel, Jordan,
                      Ille, Lebanon, Maldives, Malta, Nepal, Oman, Pakistan, Palestine,
                      Philippines, Qatar, Saudi Arabia, Sri Lanka, Syria, Tunisia, Turkey,
                      U.A.E., Yemen, Seychelles, Kuwait
                    </td>
                  </tr>
                  <tr>
                    <td>Zone 7</td>
                    <td>
                      Albania, Belarus, Bosnia, Bulgaria, Croatia, Czech Rep, Estonia,
                      Georgia, Hungary, Latvia, Lithuania, Macedonia, Moldova, Montenegro,
                      Poland, Romania, Russia, Serbia, Montenegro, Slovakia, Slovenia,
                      Ukraine
                    </td>
                  </tr>
                  <tr>
                    <td>Zone 8</td>
                    <td>
                      Algeria, Angola-Armenia, Afghanistan, American Samoa, Azerbaijan,
                      Botswana, Burkina Faso, Burundi Benin, Cameroon, Cape Verde, Central
                      Africa Republic, Chad, Congo, Democratic Republic, Djibouti,
                      Equatorial Guinea, Eritrea - Ethiopia, Fiji, French Polynesia, Gabon
                      - Gambia, Guinea, Ghana - Guam, Morocco, Ivory Coast, Kazakhstan,
                      Kenya - Kiribati, Kyrgyzstan, Liberia, Madagascar - Malawi, Senegal,
                      Marshall Islands, Mauritania - Mauritius, Micronesia, Mongolia,
                      Mozambique, Namibia -Nauru, New Caledonia, Niger - Nigeria, Niue
                      -Palau, Reunion Island, Rwanda, Saipan - Samoa -Sierra Leone,
                      Solomon Island, Somalia - Sudan, Sudan-Swaziland, Tanzania -Togo,
                      Turkmenistan, Tonga - Tuvalu, Uganda, Uzbekistan, Vanuatu, Wallis &amp;
                      Futuna, Zaire - Zambia, Zimbabwe, Cook Islands, Lesotho, Papua
                      Guinea, South Africa
                    </td>
                  </tr>
                </tbody>
              </table>
                     </>,
          },
        ],
      },
      {
        id: 5,
        question: 'How long does Designbook take to deliver the item?',
        answers: [
          'Delay of reception depends on your delivery address. Please note that our policy is strict, the item has to be without our certification team at latest 48h after concluding the sale and we authenticate and ship the item in 24h to you. Generally items can get to you between 1 to 2 weeks depending on your geographical location. Making sure the item is genuine and in the best conditions is our priority.',
        ],
      },
    ],

  },
];

const HowItWorks:React.FC = () => (
  <>
    <Head>
      <link rel="stylesheet" href="/static/css/plugins.css" />
      <link href="/static/css/style.css" rel="stylesheet" type="text/css" />
      <link id="colors" href="/static/css/colors/scheme-01.css" rel="stylesheet" type="text/css" />
      <link href="/static/css/coloring.css" rel="stylesheet" type="text/css" />
      <link href="/static/css/faq-custom.css" rel="stylesheet" type="text/css" />

    </Head>
    <GlobalStyles />

    <div id="wrapper">
      {/* content begin */}
      <div className="no-bottom no-top" id="content">
        <div id="top" />
        {/* section begin */}
        <HeroSection bgImgUrl="/static/images/background/subheader2.jpg" title="Frequently Asked Questions">
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
                                        {
                                            qna.answers.map((ans) => {
                                              if (typeof ans !== 'string') {
                                                return ans.content;
                                              }
                                              return <p>{ans}</p>;
                                            })
                                        }
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

    <Script src="/static/js/plugins.js" />
    <Script src="/static/js/designesia.js" />
  </>
);
export default HowItWorks;
