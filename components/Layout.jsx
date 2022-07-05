import React from "react";
import Navbar from "./Navbar";


const Layout = (props) => {
  return (
    <div className="container px-8 py-2 mx-auto">
      <div>
        <Navbar />
      </div>
      {props.children}
    </div>
  );
};

export default Layout;
