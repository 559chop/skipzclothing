import React from 'react'
import { Switch, Route } from 'react-router-dom'

import './App.css'

import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import AuthenticationPage from './pages/authentication/authentication.component'
import Header from './components/header/header.component'
import { auth } from './firebase/firebase.util'

class App extends React.Component {
  constructor () {
    super()

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null

  componentDidMount () {
    // open subscription with firebase, only update if authstate have changed
    auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user })
    })
  }

  componentWillUnmount () {
    this.unsubscribeFromAuth()
  }

  render () {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={AuthenticationPage} />
        </Switch>
      </div>
    )
  }
}

export default App
