import React from 'react';
// import emailjs from 'emailjs-com';
import { createGlobalStyle } from 'styled-components';
import HeroSection from '../../components/common/heroSection';

const GlobalStyles = createGlobalStyle`
`;

const contact = function () {
  // function sendEmail(e) {

  //   const success = document.getElementById("success");
  //   const button = document.getElementById("buttonsent");
  //   const failed = document.getElementById("failed");
  //   e.preventDefault();

  //   emailjs.sendForm('gmail', 'template_csfdEZiA', e.target, 'user_zu7p2b3lDibMCDutH5hif')
  //     .then((result) => {
  //         console.log(result.text);
  //         success.classList.add('show');
  //         button.classList.add('show');
  //         failed.classList.remove('show');
  //     }, (error) => {
  //         console.log(error.text);
  //         failed.classList.add('show');
  //     });
  // }

  return (
    <>
      <GlobalStyles />
      {/* content begin */}
      <div id="wrapper">
        <div id="top" />
        {/* section begin */}
        <HeroSection title="Contact Us" />
        <section className="container">
          <div className="row">
            <div className="col-lg-12 mb-3">
              <h3>Do you have any questions?</h3>
              <div className="form-side">
                {/* onSubmit={sendEmail} */}
                <form className="formcontact">
                  <input type="text" className="form-control" name="user_name" placeholder="Your Name" required />
                  <input type="email" className="form-control" name="user_email" placeholder="Your Email" required />
                  <input type="text" className="form-control" name="user_phone" placeholder="Your Phone" required />
                  <textarea name="message" className="form-control" placeholder="Your Message" required />
                  <div id="success" className="hide">Your message has been sent...</div>
                  <div id="failed" className="hide">Message failed...</div>
                  <input type="submit" id="buttonsent" value="Submit Now" className="btn btn-main color-2" />
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default contact;
