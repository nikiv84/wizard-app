import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Genres from './Genres'
import AddSubgenre from './AddSubgenre'
import AddBook from './AddBook'
import {contentType, stepTypes} from '../common/helpers'

const {ADD_SUBGENRE} = stepTypes

export default class StepContent extends Component {
  getContent = currentStep => {
    const {GENRE, SUBGENRE} = contentType
    const {getSubgenres, genres} = this.props
    switch (currentStep) {
      case 0:
        return {
          itemType: GENRE,
          items: genres,
        }
      case 1:
        return {
          itemType: SUBGENRE,
          items: getSubgenres(),
        }
      default:
        break
    }
  }

  getComponent = () => {
    const {checkCurrentStep} = this.props
    if (checkCurrentStep(ADD_SUBGENRE)) {
      return <AddSubgenre {...this.props} />
    } else {
      return <AddBook {...this.props} />
    }
  }

  render() {
    const {selectedGenre, currentStep, onButtonClick, selectedSubgenre} = this.props
    switch (currentStep) {
      case 0:
      case 1:
        return (
          <Genres
            selectedGenre={selectedGenre}
            selectedSubgenre={selectedSubgenre}
            content={this.getContent(currentStep)}
            onButtonClick={onButtonClick}
          />
        )
      case 2:
      case 3:
        return this.getComponent()
      default:
        break
    }
  }
}

StepContent.propTypes = {
  genres: PropTypes.array.isRequired,
  getSubgenres: PropTypes.func.isRequired,
  checkCurrentStep: PropTypes.func.isRequired,
  selectedSubgenre: PropTypes.string,
  onButtonClick: PropTypes.func.isRequired,
  currentStep: PropTypes.number.isRequired,
}
