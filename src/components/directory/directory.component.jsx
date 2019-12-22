import React from 'react'
import { connect } from 'react-redux'
import MenuItem from '../menu-items/menu-item.component'
import { selectDirectorySections } from '../../redux/directory/directory.selectors'
import './directory.style.scss'

const Directory = ({ sections }) => {
  return (
    <div className='directory-menu'>
      {sections.map(({ id, ...otherSectionProps }) => (
        <MenuItem key={id} {...otherSectionProps} />
      ))}
    </div>
  )
}

const mapStateFromProps = state => {
  return {
    sections: selectDirectorySections(state)
  }
}

export default connect(mapStateFromProps)(Directory)
