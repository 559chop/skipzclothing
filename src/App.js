import React from 'react'
import { connect } from 'react-redux'
import './App.css'

import { auth, createUserProfileDocument } from './firebase/firebase.util'
import { setCurrentUser } from './redux/user/user.actions'
import { selectCurrentUser } from './redux/user/user.selectors'

import Layout from './layout/layout.component'

class App extends React.Component {
  unsubscribeFromAuth = null

  componentDidMount () {
    const { setCurrentUser } = this.props
    // open subscription with firebase, only update if authstate have changed
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        // calls our createUserProfile function and passing in userAuth if it exists
        const userRef = await createUserProfileDocument(userAuth)

        //sets currentUser in redux store whenever snapshot updates
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            // use .data() what the data is in snapshot
            ...snapshot.data()
          })
        })
      }
      setCurrentUser(userAuth)
    })
  }

  componentWillUnmount () {
    // unsubscribes from the auth listeners we used to ensure no memory leaks
    this.unsubscribeFromAuth()
  }

  render () {
    return (
      <div>
        <Layout currentUser={this.props.currentUser} />{' '}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

const mapStateToProps = state => ({
  currentUser: selectCurrentUser(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
