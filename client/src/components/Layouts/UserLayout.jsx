import React from "react";
import SwipeableTemporaryDrawer from "../Sidebar";
import Header from "../Header";

const UserLayout = ({ children }) => {
  return (
    <main className={`relative w-3/4 mx-auto py-4`}>
      <SwipeableTemporaryDrawer />
      <Header />
      {children}
    </main>
  );
};

export default UserLayout;
