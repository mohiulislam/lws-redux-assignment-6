import React, { Fragment } from "react";
import Nav from "../components/Nav";

function MainLayout({ children }) {
  return (
    <Fragment>
      <Nav />
      {children}
    </Fragment>
  );
}

export default MainLayout;
