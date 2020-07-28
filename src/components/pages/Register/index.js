import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import { hasCompatibleMetamask } from 'services/helpers'
import Typography from '@material-ui/core/Typography'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { FaChrome, FaFirefoxBrowser } from 'react-icons/fa'
import InputBase from '@material-ui/core/InputBase'
import classNames from 'classnames'
import MuiLink from '@material-ui/core/Link'
import { Link } from 'react-router-dom'

import {
  createDataloftAccountRequest,
  createMetamaskAccountRequest
} from 'store/auth/actions'

import { bindActionCreators } from 'redux'
import { connect} from 'react-redux'
import compose from 'recompose/compose'

import { 
  BrandIcon,
  Metamask, 
  Dataloft
} from 'components/elements'

const styles = (theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 150,
  },
  page: {
    height: '100vh',
    width: '100%',
    backgroundImage: `url("./img/background/login-bg.jpg")`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  },
  white: {
    color: 'white',
  },
  gray: {
    color: '#898c90',
  },
  graySubtitleWrapper: {
    paddingLeft: 60,
  },
  brandWrapper: {
    paddingLeft: 90,
  },
  login: {
    position: 'relative',
    borderRadius: 5,
    backgroundColor: '#36393f',
    marginLeft: 0,
    paddingLeft: 10,
    width: '100%',
  },
  inputRoot: {
    color: '#303339',
    width: '100%',
    paddingRight: 10,
    height: 50,
  },
  inputInput: {
    border: '1px solid #232529',
    paddingLeft: 10,
    width: '100%',
  },
  buttonWrapper: {
    paddingLeft: 90,
    paddingBottom: 15
  },
  centerDiv: {
    margin: '0 auto',
  }
})

const Register = (props) => {

  const {
      history,
      classes,
      createDataloftAccountRequest,
      dataloft_user,
  } = props

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [hasInstalledMetamask, setHasInstalledMetamask] = useState(true)
  const [hasEnabledMetamask, setHasEnabledMetamask] = useState( false)

  const handleClickRegister = () => {
    createDataloftAccountRequest(username, password)
  }

  const handleClickLoginMetamask = async () => {
    const account = await window.ethereum.enable()
    console.log(account)
    setHasEnabledMetamask(true)
    // const address = account[0]
    //
    // const username = 'dataloft'
    // const password = 'testingpass'
    // createMetamaskAccountRequest(username, password, address)
  }

  const onChange = (e) => {
    const { target } = e
    const { value, name } = target

    if (name === 'username') {
      setUsername(value)
    } else {
      setPassword(value)
    }

  }

  const isCompatible = hasCompatibleMetamask() ? true: false

  useEffect(() => {
    setHasInstalledMetamask(isCompatible)
    //eslint-disable-next-line
  }, [])

  return (
    <div className={classes.page}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
         <div className={classes.paper}>
           <div className={classes.brandWrapper}>
              <BrandIcon />
            </div>
          <div className={classes.login}>
            <div style={{ paddingTop: 15, paddingBottom: 15 }} >
              <Typography
                align='center'
                variant='h6'
                className={classes.white}
              >
                Create an account
              </Typography>
            </div>
            {
              hasEnabledMetamask  && (
                  <React.Fragment>
                    <div style={{ paddingRight: 15, paddingLeft:15, paddingBottom: 10 }}>
                      <InputBase
                          placeholder="Username"
                          classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                          }}
                          inputProps={{
                            'aria-label': 'login',
                            className: classes.white
                          }}
                          name="username"
                          value={username}
                          onChange={onChange}
                      />
                      <InputBase
                          placeholder="Password"
                          classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                          }}
                          inputProps={{
                            'aria-label': 'login',
                            className: classes.white,
                            type: 'password',
                            autoComplete: 'new-password',
                          }}
                          name="password"
                          value={password}
                          onChange={onChange}
                      />
                    </div>
                  </React.Fragment>
              )
            }
            {
              hasEnabledMetamask && (
                  <React.Fragment>
                    <div style={{ paddingBottom: 10, display: 'flex', alignContent: 'center'  }}>
                      <ButtonGroup className={classes.centerDiv} variant="contained" color="primary" aria-label="contained primary button group">
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={handleClickRegister}
                        >
                          <Dataloft />
                          <Typography
                              variant='p'
                          >
                            Create w/ Dataloft
                          </Typography>
                        </Button>
                      </ButtonGroup>
                    </div>
                  </React.Fragment>
              )
            }
            {
              !hasEnabledMetamask && hasInstalledMetamask && (
                <React.Fragment>
                  <div style={{paddingBottom: 10, display: 'flex', alignContent: 'center' }}>
                  <ButtonGroup className={classes.centerDiv} variant="contained" color="primary" aria-label="contained primary button group">
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      onClick={handleClickLoginMetamask}
                    >
                      <Metamask />
                      <Typography
                        variant='p'
                      >
                        Create w/ Metamask
                      </Typography>
                    </Button>
                  </ButtonGroup>
                  </div>
                </React.Fragment>
              )
            }
            {
              !hasInstalledMetamask && (
                <React.Fragment>
                  <Typography variant="subtitle1" className={classes.white}>Please Install Metamask</Typography><br />
                  <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group" fullWidth>
                    <Button
                      startIcon={<FaChrome />}
                      href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
                      rel="noopener noreferrer"
                      target="_blank">
                        Chrome
                      </Button>
                    <Button
                      startIcon={<FaFirefoxBrowser />}
                      href="https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/"
                      rel="noopener noreferrer"
                      target="_blank">
                      Firefox
                    </Button>
                  </ButtonGroup>
                </React.Fragment>
              )
            }

              <div style={{ paddingBottom: 35, paddingLeft: 15, paddingRight: 15 }}>
                <MuiLink component={Link} to={`/login`} className={classes.white}>
                  Already have an account?
                </MuiLink>
                <br/> <br />
                <Typography
                  align='justify'
                  variant='p'
                  className={classNames(classes.gray)}
                >
                  By registering, you agree to Dataloft's &nbsp;
                  <MuiLink component={Link} to={`/register`} className={classes.white}>
                    Terms of Service
                  </MuiLink>
                  &nbsp; and &nbsp;
                  <MuiLink component={Link} to={`/register`} className={classes.white}>
                    Privacy Policy.
                  </MuiLink>
                </Typography>
              </div>
            </div>
         </div>
      </Container>
    </div>
  )
}

const mapStateToProps = (state) => ({
  dataloft_user: state.create.get('dataloft_user'),
})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    createDataloftAccountRequest,
    createMetamaskAccountRequest,
  }, dispatch)
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Register)
