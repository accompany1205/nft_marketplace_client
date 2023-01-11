import React, { useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import SliderImage from '../../public/images/particleBg.jpg'
import Link from 'next/link';
import { ILoginRequest, useLoginMutation } from '../../redux/service/authService';
import { useTypedSelector } from '../../hooks/store';
import { useRouter } from 'next/router';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: #8677a8;
    border-bothrefm: solid 1px #8677a8;
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
      background: #8677a8;
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
    email: Yup.lazy(() =>
        Yup.string()
            .required('Username is required')
    ),
    password: Yup.lazy(() =>
        Yup.string()
            .required('Password is required')
    ),
});

const initialValues = {
    email: 'test1@test.co',
    password: '123566!'
};

const Login = () => {
    const router = useRouter()
    const {error,token} = useTypedSelector(state=>state.auth)
    const [login, { isLoading }] = useLoginMutation()

    const handleSubmitForm = async (values: {}) => {
        try {
            await login(values as ILoginRequest)
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        error && alert(error)
    }, [error])

    useEffect(() => {
        token && router.replace("/")
    }, [token,router])
    
    

    return (
        <div>
            <GlobalStyles />
            <section className='jumbotron breadcumb no-bg' style={{ backgroundImage: `url(${SliderImage.src})`, backgroundPosition: "center", }}>
                <div className='mainbreadcumb'
                    style={{
                    height: "100vh",
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                }}>
                    <div className='container'>
                        <div className='row align-items-center'>
                            <div className="col-lg-5 text-light wow fadeInRight" data-wow-delay=".5s">
                                <div className="spacer-10"></div>
                                <h1>Create, sell or collect digital items.</h1>
                                <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.</p>
                            </div>
                            <div className="col-lg-4 offset-lg-2 wow fadeIn" data-wow-delay=".5s">
                                <div className="box-login">
                                    <h3 className="mb10">Sign In</h3>
                                    <p>Login using an existing account or create a new account <Link href="/register"><span>here</span></Link>.</p>
                                    <Formik
                                        enableReinitialize
                                        validationSchema={validationSchema}
                                        initialValues={initialValues}
                                        validateOnMount={validationSchema.isValidSync(initialValues)}
                                        onSubmit={async (values, { setSubmitting, resetForm }) => {
                                            setSubmitting(true);
                                            await handleSubmitForm(values);
                                            setSubmitting(false);
                                            resetForm();
                                        }}
                                    >
                                        {
                                            ({ values, isSubmitting, isValid }) => {
                                                return (
                                                    <Form className="form-border">
                                                        <div className="field-set">
                                                            <Field placeholder='Email' className="form-control" type="email" name="email" />
                                                            <ErrorMessage name="email" component="div" />
                                                        </div>
                                                        <div className="field-set">
                                                            <Field placeholder='Password' className="form-control" type="password" name="password" />
                                                            <ErrorMessage name="password" component="div" />
                                                        </div>
                                                        <div className="field-set">
                                                            <input type='submit' id='send_message' value='Submit' className="btn btn-main btn-fullwidth color-2" />
                                                        </div>
                                                        <div className="clearfix"></div>
                                                        <div className="spacer-single"></div>
                                                        <ul className="list s3">
                                                            <li>Login with:</li>
                                                            <li><span >Facebook</span></li>
                                                            <li><span >Google</span></li>
                                                        </ul>
                                                        <div className="spacer-half"></div>
                                                    </Form>
                                                )
                                            }
                                        }
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
};
export default Login;