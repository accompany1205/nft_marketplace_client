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
      <div className='feature-box f-boxed style-3'>
        <Reveal
          className='onStep'
          keyframes={fadeInUp}
          delay={0}
          duration={600}
          triggerOnce>
          <i className='bg-color-2 i-boxed icon_cloud-upload_alt'></i>
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
              Search for listings on the marketplace, by brand, model or colour. Once found, you can place a target purchase price or purchase the item now. If you own the item
              and fits our verification standards, you can sell it by placing a target price or sell it instantly at the best offer.
            </p>
          </Reveal>
        </div>
        <i className='wm icon_wallet'></i>
      </div>
    </div>
    <div className='col-lg-4 col-md-6 mb-3'>
      <div className='feature-box f-boxed style-3'>
        <Reveal
          className='onStep'
          keyframes={fadeInUp}
          delay={0}
          duration={600}
          triggerOnce>
          <i className=' bg-color-2 i-boxed icon_wallet'></i>
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
              The listing shows the best bid/offer for each item and will inform you of any price improvement if you have taken part in the process by placing an order. Once a
              deal is closed, the authenticity of digital certificate will be checked on the blockchain and seller has 2 day to ship us the physical item linked to
              this certificate
            </p>
          </Reveal>
        </div>
        <i className='wm icon_cloud-upload_alt'></i>
      </div>
    </div>
    <div className='col-lg-4 col-md-6 mb-3'>
      <div className='feature-box f-boxed style-3'>
        <Reveal
          className='onStep'
          keyframes={fadeInUp}
          delay={0}
          duration={600}
          triggerOnce>
          <i className=' bg-color-2 i-boxed icon_tags_alt'></i>
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
              The Physical tem will have to pass our certification process along with the certificate, if validated, you will first receive your certificate directly on your wallet
              and then the item by post. Sellers will get their monies only once product and digital twin have passed the certification process.
            </p>
          </Reveal>
        </div>
        <i className='wm icon_tags_alt'></i>
      </div>
    </div>
  </div>
)
export default featurebox
