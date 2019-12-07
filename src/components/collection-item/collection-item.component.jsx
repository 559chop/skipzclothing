import React from 'react'
import { useDispatch, connect } from 'react-redux'
import { addItem } from '../../redux/cart/cart.actions'
import CustomButton from '../custom-button/custom-button.component'

import './collection-item.style.scss'

const CollectionItem = ({ item, addItem }) => {
  const handleCartAdd = () => {
    addItem(item)
  }
  return (
    <div className='collection-item'>
      <div
        className='image'
        style={{
          backgroundImage: `url(${item.imageUrl})`
        }}
      />
      <div className='collection-footer'>
        <span className='name'>{item.name}</span>
        <span className='price'>${item.price}</span>
      </div>
      <CustomButton onClick={handleCartAdd}>ADD TO CART</CustomButton>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item))
})
export default connect(
  null,
  mapDispatchToProps
)(CollectionItem)
