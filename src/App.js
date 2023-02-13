import React from "react";
import Container from "react-bootstrap/esm/Container";
import Dashboard from "./components/pages/dashboard/Dashboard";
import HeadBar from "./components/HeadBar.js";
import SignUpLogIn from "./components/pages/signuplogin/SignUpLogIn.js"

import { useStorage } from "./hooks/store.js";
import {motion} from "framer-motion"
import Alerts from "./components/Alerts";
import LoaderLow from "./components/LoaderLow";




export default function App() {


  const page = useStorage((state) => state.page)
  
  


  if (page === "login") {
    return (
      <motion.div
      initial={{
        opacity:0
      }}
      animate={{opacity:1}}
      exit={{opacity:0}}
      >
        <Alerts  />
        <SignUpLogIn />
        <LoaderLow />
      </motion.div>
    )
  }
  else {
    return (

      <div>
        <HeadBar />
        <Container>
          <Dashboard />
          <Alerts  />
          <LoaderLow />
        </Container>

      </div>
    )
  }

}
