import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import SignIn from '../../components/sign-in/sign-in.component'

import './authentication.style.scss'
import SignUp from '../../components/sign-up/sign-up.component'

const AuthenticationPage = ({ currentUser }) => {
  if (currentUser) return <Redirect to='/' />
  return (
    <div className='sign-in-and-sign-up'>
      <SignIn />
      <SignUp />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser
  }
}

export default connect(mapStateToProps)(AuthenticationPage)
