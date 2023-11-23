import React from "react";
import Header from "../header/Header";
import { motion } from "framer-motion";

const Layout = (props) => {
  return (
    <>
      <Header />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="px-3 lg:px-28"
      >
        {props.children}
      </motion.div>
    </>
  );
};

export default Layout;
