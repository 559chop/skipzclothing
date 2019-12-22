import React from 'react'
import { Route } from 'react-router-dom'

import CollectionPage from '../collections/collection.component'
import CollectionsOverView from '../../components/collections-overview/collections-overview.component'

const ShopPage = ({ match }) => {
  return (
    <div className='shop-page'>
      <Route exact path={`${match.path}`} component={CollectionsOverView} />
      <Route path={`${match.path}/:collectionID`} component={CollectionPage} />
    </div>
  )
}

export default ShopPage
