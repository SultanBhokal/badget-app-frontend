import styled from "styled-components";

import { motion } from "framer-motion";
import Login from "./Login";
import SignUp from "./SignUp";

import { AccountContext } from "./AccountContext.js";
import { useState } from "react";
import { MutedLink } from "./Common";
import { useStorage } from "../../../hooks/store";


const MainContainer = styled.div`
  position: relative;
  height: 90vh;
  width: 90vw;
  margin: 5vh auto;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 20px rgba(15, 15, 15, 0.3);
  position: relative;
  overflow: hidden;
`;

const HeadingContainer = styled.div`
  padding-top:6px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  
  z-index: 10;
  color: #fff;
`;

const HeadingHeader = styled.h3`
  font-weight: 600;
  font-size: 1.8rem;
`;
const HeadingText = styled.h5`
  font-size: 0.9rem;
`;

const MidContainer = styled.div`
  flex: 3;

  display: flex;
`;

const AnimateDiv = styled(motion.div)`
  top: 0;
  position: absolute;
  width: 100%;
  height: 15vh;
  border-bottom-left-radius: 10vw;
  border-bottom-right-radius: 10vw;

  background-color: #4158d0;
  background-image: linear-gradient(
    42deg,
    #4158d0 0%,
    #c850c0 46%,
    #ffcc70 100%
  );
  z-index:9;
`;

const backdropVariants = {
  expanded: {
    width: "100%",
    height: "110vh",
    borderBottomLeftRadius: "10vw",
    borderBottomRightRadius: "10vw",
  },
  collapsed: {
    width: "100%",
    height: "15vh",
    borderBottomLeftRadius: "10vw",
    borderBottomRightRadius: "10vw",
  },
};

const expandingTransition = {
  type: "spring",
  duration: 2.5,
  stiffness: 30,
};

export default function SignUpLogIn() {
  const setLowLoading = useStorage((state)=>state.setLowLoading)
  setLowLoading(false)
  const [isExpanded, setExpanded] = useState(false);
  const [active, setActive] = useState(() => "signin");
  const setPage=useStorage((state)=>state.setPage)

  const playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1500);
  };

  const switchToSignup = () => {

    playExpandingAnimation();
    setTimeout(() => {
      setActive("signup");
    }, 400);
  };

  const switchToSignin = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signin");
    }, 400);
  };

  

  const contextValue = { switchToSignup, switchToSignin };

  function setPageFunction(){
    setPage("dashboard")
    localStorage.setItem("page","dashboard")
  }

  return (
    <AccountContext.Provider value={contextValue}>
      <MainContainer
      initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}
      >
        <AnimateDiv
          initial={false}
          animate={isExpanded ? "expanded" : "collapsed"}
          variants={backdropVariants}
          transition={expandingTransition}
        />

        <HeadingContainer>
          <HeadingHeader>
            {active === "signin" && "Welcome"}
            {active === "signup" && "Hello!"}
            {active === "guest" && "Guest login"}
          </HeadingHeader>
          <HeadingText>
            {active === "signin" && "Please Log-in"}
            {active === "signup" && "Please register new account"}
            {active === "guest" && "sign-up for better experience"}

          </HeadingText>
        </HeadingContainer>

        <MidContainer>

          {active === "signin" && <Login />}
          {active === "signup" && <SignUp />}
          
         

        </MidContainer>
        <div style={{
          height:"5vh",
          width:"100%",
          display:"flex",
          justifyContent:"center",
          alignItems:"top"

        }}>

        <MutedLink type="button" onClick={setPageFunction}>Home</MutedLink>
        </div>
      </MainContainer>
    </AccountContext.Provider>
  );
}
