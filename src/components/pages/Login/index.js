import React from 'react'
import Button from '@material-ui/core/Button'


const Login = (props) => {

  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask is installed!");
  } else {
    alert(
      "Metamask is not installed. Get Metamask Plugin https://https://metamask.io/"
    );
  }

  const handleClickLogin = async () => {
    const account = await window.ethereum.enable()
    const address = account[0]
    console.log(address)
  }

  return (
    <React.Fragment>
      <h1> LOGIN </h1>
      <Button 
        variant="contained" 
        color="primary"
        type="submit"
        onClick={handleClickLogin}
      >
        Login with Metamask
      </Button>
    </React.Fragment>
  )
}

export default Login