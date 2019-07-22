import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button} from 'antd'
import {contentType} from '../common/helpers'

export default class Genres extends Component {
  render() {
    const {content, onButtonClick, selectedGenre, selectedSubgenre} = this.props
    const {itemType, items} = content
    const {SUBGENRE, ADD_SUBGENRE} = contentType

    return (
      <div className="steps-content">
        {items.map(item => {
          const type =
            item.id.toString() === selectedGenre || item.id.toString() === selectedSubgenre ? 'primary' : 'default'
          return (
            <Button
              className="genre-btn"
              key={item.id}
              data-itemid={item.id}
              type={type}
              onClick={e => onButtonClick(e, itemType)}
              size="large">
              {item.name}
            </Button>
          )
        })}
        <div className="line-break" />
        {itemType === SUBGENRE && (
          <Button
            className="add-subgenre-btn"
            type="dashed"
            icon="file-add"
            onClick={e => onButtonClick(e, ADD_SUBGENRE)}
            size="large">
            Add new subgenre
          </Button>
        )}
      </div>
    )
  }
}

Genres.propTypes = {
  content: PropTypes.object.isRequired,
  selectedGenre: PropTypes.string,
  selectedSubgenre: PropTypes.string,
  onButtonClick: PropTypes.func.isRequired,
}
