import React from 'react'
import Reveal from 'react-awesome-reveal'
import { keyframes } from '@emotion/react'

const fadeInUp = keyframes`
  0% {
    opacity: 0
    -webkit-transform: translateY(40px)
    transform: translateY(40px)
  }
  100% {
    opacity: 1
    -webkit-transform: translateY(0)
    transform: translateY(0)
  }
`

const featurebox = () => (
  <div className='row'>
    <div className='col-lg-4 col-md-6 mb-3'>
      <div className='feature-box f-boxed style-3' style={{ minHeight: '350px' }}>
        <Reveal
          className='onStep'
          keyframes={fadeInUp}
          delay={0}
          duration={600}
          triggerOnce>
          <i className='bg-color-2 i-boxed icon_cloud-upload_alt' />
        </Reveal>
        <div className='text'>
          <Reveal
            className='onStep'
            keyframes={fadeInUp}
            delay={100}
            duration={600}
            triggerOnce>
            <h4 className=''>Browse items</h4>
          </Reveal>
          <Reveal
            className='onStep'
            keyframes={fadeInUp}
            delay={200}
            duration={600}
            triggerOnce>
            <p className=''>
              Browse items Search for listings by brand, model or colour. Place a desired purchase price or buy now. If you own the item, you can sell now or place a target price.
            </p>
          </Reveal>
        </div>
        <i className='wm icon_wallet' />
      </div>
    </div>
    <div className='col-lg-4 col-md-6 mb-3'>
      <div className='feature-box f-boxed style-3' style={{ minHeight: '350px' }}>
        <Reveal
          className='onStep'
          keyframes={fadeInUp}
          delay={0}
          duration={600}
          triggerOnce>
          <i className=' bg-color-2 i-boxed icon_wallet' />
        </Reveal>
        <div className='text'>
          <Reveal
            className='onStep'
            keyframes={fadeInUp}
            delay={100}
            duration={600}
            triggerOnce>
            <h4 className=''>Purchase or sell</h4>
          </Reveal>
          <Reveal
            className='onStep'
            keyframes={fadeInUp}
            delay={200}
            duration={600}
            triggerOnce>
            <p className=''>
              Listings show the best bid/offer and will inform you of any changes if you have taken part in the sale. Once a deal is closed, digital certificate and physical item
              are checked.
            </p>
          </Reveal>
        </div>
        <i className='wm icon_cloud-upload_alt' />
      </div>
    </div>
    <div className='col-lg-4 col-md-6 mb-3'>
      <div className='feature-box f-boxed style-3' style={{ minHeight: '350px' }}>
        <Reveal
          className='onStep'
          keyframes={fadeInUp}
          delay={0}
          duration={600}
          triggerOnce>
          <i className=' bg-color-2 i-boxed icon_tags_alt' />
        </Reveal>
        <div className='text'>
          <Reveal
            className='onStep'
            keyframes={fadeInUp}
            delay={100}
            duration={600}
            triggerOnce>
            <h4 className=''>Receive your product</h4>
          </Reveal>
          <Reveal
            className='onStep'
            keyframes={fadeInUp}
            delay={200}
            duration={600}
            triggerOnce>
            <p className=''>
              You will first receive the digital certificate on your wallet and the item by post. Sellers will get their monies when product and certificate have been checked.
            </p>
          </Reveal>
        </div>
        <i className='wm icon_tags_alt' />
      </div>
    </div>
  </div>
)
export default featurebox
