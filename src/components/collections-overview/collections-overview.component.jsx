import React from 'react'
import { connect } from 'react-redux'
import CollectionPreview from '../../components/preview-collection/preview-collection.component'

import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors'

const CollectionsOverview = ({ collections }) => {
  return (
    <div className='collections-overview'>
      {collections &&
        collections.map(({ id, ...otherCollectionProps }) => <CollectionPreview key={id} {...otherCollectionProps} />)}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    collections: selectCollectionsForPreview(state)
  }
}

export default connect(mapStateToProps)(CollectionsOverview)
