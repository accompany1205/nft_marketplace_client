import React, { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import {
  Form, Formik, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import SliderImage from '../../public/images/particleBg.jpg';
import { IUser, useRegisterMutation } from '../../redux/service/authService';
import { showToast } from '../../redux/slices/layoutSlice';
import useAuth from '../../hooks/useAuth';
import { number } from 'prop-types';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: #403f83;
    border-bothrefm: solid 1px #403f83;
  }
  header#myHeader.navbar .search #quick_search{
    color: #fff;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
  header#myHeader .dropdown-hrefggle::after{
    color: rgba(255, 255, 255, .5);
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: block !important;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #fff;
    }
    .item-dropdown .dropdown a{
      color: #fff !important;
    }
  }
`;

const validationSchema = Yup.object().shape({
  email: Yup.lazy(() => Yup.string().required('Username is required')),
  password: Yup.lazy(() => Yup.string().required('Password is required')),
  first_name: Yup.lazy(() => Yup.string().required('First Name is required')),
  last_name: Yup.lazy(() => Yup.string().required('Last Name is required')),
  country: Yup.lazy(() => Yup.string().required('Country is required')),
  birthdate: Yup.lazy(() => Yup.string().required('Date of Birth is required')),
});

const initialValues = {
  email: '',
  password: '',
  first_name: '',
  last_name: '',
  country: '',
  birthdate: '',
};

const Account = () => {
  const router = useRouter();
  const [register] = useRegisterMutation();
  const dispatch = useDispatch();
  const [transactionType, setTransactionType] = useState<boolean>(false);

  const [transactionAmount, setTractionAmount] = useState<number>(0);

  const { user } = useAuth();

  const balance = 234;

  console.log("account: ", user);

  const handleSubmitForm = async (values: object) => {
    try {
      await register(values as IUser);
      dispatch(showToast({
        message: 'User registered successfully',
        type: 'success',
      }));
      router.replace('/login');
    } catch (error) {
      alert(error);
    }
  };

  const handleTransaction = async () => {
    if(!transactionType){
      if(transactionAmount > balance){
        dispatch(showToast({
          message: 'User widthraw transaction error',
          type: 'error',
        }));
      }
      else{
        dispatch(showToast({
          message: 'User widthraw transaction successfully done',
          type: 'success',
        }));
      }
    }else{
      dispatch(showToast({
        message: 'User deposit transaction successfully done',
        type: 'success',
      }));
    }
  }
  const handleTransactionType = (type: boolean): any => {
    setTransactionType((prevType)=> !prevType);
  }

  return (
    <div>
      <GlobalStyles />
      <section
        className="jumbotron breadcumb no-bg"
        style={{
          backgroundImage: `url(${SliderImage.src})`,
          backgroundPosition: 'center',
        }}
      >
        <div
          className="mainbreadcumb"
          style={{
            height: '100vh',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div className="container">
            <div className="row align-items-start">
              <div
                className="col-lg-5 text-light wow fadeInRight"
                data-wow-delay=".5s"
              >
                <div className="box-login">
                  <h3 className="mb10">My Account</h3>
                  <p>
                    Update your account here.
                  </p>
                  <Formik
                    enableReinitialize
                    validationSchema={validationSchema}
                    initialValues={initialValues}
                    validateOnMount={validationSchema.isValidSync(
                      initialValues,
                    )}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                      setSubmitting(true);
                      await handleSubmitForm(values);
                      setSubmitting(false);
                      resetForm();
                    }}
                  >
                    {() => (
                      <Form className="form-border">
                        <div className="field-set">
                          <Field
                            placeholder="First Name"
                            className="form-control"
                            type="text"
                            name="first_name"
                            value={user?.first_name}
                          />
                          <ErrorMessage
                            className="error-message"
                            name="first_name"
                            component="div"
                          />
                        </div>
                        <div className="field-set">
                          <Field
                            placeholder="Last Name"
                            className="form-control"
                            type="text"
                            name="last_name"
                            value={user?.last_name}

                          />
                          <ErrorMessage
                            className="error-message"
                            name="last_name"
                            component="div"
                          />
                        </div>
                        <div className="field-set">
                          <Field
                            placeholder="Email"
                            className="form-control"
                            type="email"
                            name="email"
                            value={user?.email}
                          />
                          <ErrorMessage
                            className="error-message"
                            name="email"
                            component="div"
                          />
                        </div>
                        <div className="field-set">
                          <Field
                            placeholder="Password"
                            className="form-control"
                            type="password"
                            name="password"
                            value={user?.password}
                          />
                          <ErrorMessage
                            className="error-message"
                            name="password"
                            component="div"
                          />
                        </div>
                        <div className="field-set">
                          <Field
                            placeholder="Country"
                            className="form-control"
                            type="text"
                            name="country"
                            value={user?.country}
                          />
                          <ErrorMessage
                            className="error-message"
                            name="country"
                            component="div"
                          />
                        </div>
                        <div className="field-set">
                          <Field
                            placeholder="Date of Birth"
                            className="form-control"
                            type="date"
                            name="birthdate"
                            value={user?.birthdate}
                          />
                          <ErrorMessage
                            className="error-message"
                            name="birthdate"
                            component="div"
                          />
                        </div>
                        <div className="field-set">
                          <input
                            type="submit"
                            id="send_message"
                            value="Submit"
                            className="btn btn-main btn-fullwidth color-2"
                          />
                        </div>
                        <div className="clearfix" />
                        {/* <div className="spacer-single"></div>
                          <ul className="list s3">
                              <li>Login with:</li>
                              <li><span >Facebook</span></li>
                              <li><span >Google</span></li>
                          </ul> */}
                        <div className="spacer-half" />
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
              <div
                className="col-lg-4 offset-lg-3 wow fadeIn"
                data-wow-delay=".5s"
              >
                <div className="">
                  <div className="balance d-flex flex-row justify-content-end align-items-center mb-3 text-white ">
                    <h4 className='text-white mx-1'>Balance:</h4>
                    <h4 className='space-10 text-white'>{balance}USDT</h4>
                  </div>
                  <div className="balance d-flex flex-row justify-content-between align-items-center text-white">
                    <div className="field-set">
                      <input
                        type="submit"
                        id="withraw"
                        value="Widthraw"
                        className="btn btn-main btn-fullwidth color-1"
                        onClick={(e)=>handleTransactionType(false)}
                      />
                    </div>
                    <div className="field-set">
                      <input
                        type="submit"
                        id="deposit"
                        value="Deposit"
                        className="btn btn-main btn-fullwidth color-1"
                        onClick={(e)=>handleTransactionType(true)}
                      />
                    </div>
                  </div>
                  <div className="box-login">
                    <Form className="form-border">
                      <h2>{!transactionType  ? "Widthraw from Wallet" : "Deposit to Wallet"}</h2>
                      <div className="balance d-flex flex-row justify-content-end align-items-center mb-3 text-white ">
                        <h4 className='text-white mx-1'>Balance:</h4>
                        <h4 className='space-10 text-white'>{balance}USDT</h4>
                      </div>
                      <div className="field-set">
                        <Field
                          placeholder="amount"
                          className="form-control"
                          type="number"
                          name="amount"
                          value={transactionAmount}
                        />
                      </div>
                      <div className="field-set">
                        <input
                          type="submit"
                          id="send_transaction"
                          value="Submit"
                          className="btn btn-main btn-fullwidth color-2"
                          onClick={handleTransaction}
                        />
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Account;
