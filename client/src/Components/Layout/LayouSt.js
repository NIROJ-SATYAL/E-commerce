import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({children,title,description,keywords,author} ) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>

        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
      </Helmet>
      <Header />
      <main style={{ minHeight: "80vh" }}>
        <ToastContainer/>
        {children}</main>

      <Footer />
    </>
  );
};
Layout.defaultProps={
  title:"Ecommerce-app",
  description:"mern stack project",
  author:"prabesh katwal",
  keywords:"html css javascript react mongdb express "
}

export default Layout;
