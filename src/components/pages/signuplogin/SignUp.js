import { FormControlDiv, Input, Submit, MutedLink } from "./Common.js"
import { AccountContext } from "./AccountContext.js"
import { useContext, useRef } from "react"
import { register } from "../../../hooks/store.js"
import { useStorage } from "../../../hooks/store.js"
export default function SignUp() {
  const setLowLoading = useStorage((state) => state.setLowLoading)

  const { switchToSignin } = useContext(AccountContext)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const confirmPassword = useRef(null)
  const userNameRef = useRef(null)

  async function registerUser() {
    if (!emailRef.current.value || !passwordRef.current.value || !confirmPassword.current.value || !userNameRef.current.value || passwordRef.current.value !== confirmPassword.current.value || passwordRef.current.value?.length < 5) {
      useStorage.getState().setAlertMsg("Please Enter Valid Input")
      useStorage.getState().setAlertType("danger")
      useStorage.getState().setAlertShow(true)
      return
    }
    setLowLoading(true)
    const result = await register({
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPassword.current.value,
      userName: userNameRef.current.value
    })

    if (result === true) {
      setLowLoading(false)
      switchToSignin()
    }
    else {
      setLowLoading(false)
      useStorage.getState().setAlertMsg("Please Try Again Something Went Wrong")
      useStorage.getState().setAlertType("danger")
      useStorage.getState().setAlertShow(true)
    }
  }

  return (
    <FormControlDiv>
      <Input type="text" ref={userNameRef} placeholder="Enter Your User Name" required autoComplete="on" />
      <Input type="email" ref={emailRef} placeholder="Enter Email Address" required autoComplete="on" />
      <Input type="password" ref={passwordRef} placeholder="Enter Password min(6 letters)" required autoComplete="on" />
      <Input type="password" ref={confirmPassword} placeholder="Confirm Password" required autoComplete="on" />
      <Submit type="button" onClick={() => registerUser()}>Sign-up</Submit>
      <MutedLink onClick={switchToSignin} type="button">Already Have An Account?</MutedLink>
    </FormControlDiv>
  )
}
