import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Route } from 'react-router-dom'
import {
  firestore,
  convertCollectionsSnapshotToMap
} from '../../firebase/firebase.util'
import { updateCollections } from '../../redux/shop/shop.actions'
import CollectionPage from '../collections/collection.component'
import CollectionsOverView from '../../components/collections-overview/collections-overview.component'
import WithSpinner from '../../components/with-spinner/with-spinner.component'

import './shop.styles.scss'

const CollectionsOverViewWithSpinner = WithSpinner(CollectionsOverView)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

const ShopPage = ({ match }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  //hooks to pull data from firestore and updates redux store
  useEffect(() => {
    const collectionRef = firestore.collection('collections')

    collectionRef.get().then(snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
      dispatch(updateCollections(collectionsMap))
      setLoading(false)
    })
  }, [])

  return (
    <div className='shop-page'>
      <Route
        exact
        path={`${match.path}`}
        render={props => (
          <CollectionsOverViewWithSpinner isLoading={loading} {...props} />
        )}
      />
      <Route
        path={`${match.path}/:collectionID`}
        render={props => (
          <CollectionPageWithSpinner isLoading={loading} {...props} />
        )}
      />
    </div>
  )
}

export default ShopPage
