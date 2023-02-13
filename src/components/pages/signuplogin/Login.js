import { FormControlDiv, Input, Submit, MutedLink } from "./Common.js"
import { AccountContext } from "./AccountContext.js"
import { useContext, useState } from "react";
import {login} from "../../../hooks/store.js";

export default function Login() {

  const { switchToSignup } = useContext(AccountContext)

  const [email,setEmail] = useState("")
  const [password,setPassword]=useState("")
  

  return (
    <FormControlDiv>
      <Input type="email" placeholder="Enter Email Address" autoComplete="on" required onChange={e=>setEmail(e.target.value)} />
      <Input type="password" placeholder="Enter Password" autoComplete="on" required onChange={e=>setPassword(e.target.value)} />
      <Submit type="button" onClick={()=>login(email,password)}>Sign-in</Submit>
      <MutedLink onClick={switchToSignup} type="button">Create New Account</MutedLink>
      
    </FormControlDiv>
  )
}

