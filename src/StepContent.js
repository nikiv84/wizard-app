import React, {Component} from 'react'
import Genres from './Genres'
import AddSubgenre from './AddSubgenre'
import AddBook from './AddBook'
import {contentType} from './common/helpers'

class StepContent extends Component {
  getContent = currentStep => {
    const {GENRE, SUBGENRE} = contentType
    const {getSubgenres} = this.props
    switch (currentStep) {
      case 0:
        return {
          itemType: GENRE,
          items: this.props.genres,
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
    if (checkCurrentStep('Add new subgenre')) {
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

export default StepContent
