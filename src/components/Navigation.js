import React from 'react'
import PropTypes from 'prop-types'
import {Button} from 'antd'
import {stepTypes} from '../common/helpers'

export default function Navigation({
  current,
  steps,
  isNextDisabled,
  goToNextStep,
  goToPrevStep,
  triggerAddSubgenreSubmitForm,
  triggerAddBookSubmitForm,
  checkCurrentStep,
}) {
  const handleClick = () => {
    if (checkCurrentStep(stepTypes.ADD_SUBGENRE)) {
      return triggerAddSubgenreSubmitForm()
    }
    goToNextStep()
  }

  return (
    <div className="steps-navigation">
      {current > 0 && (
        <Button className="prev-btn" onClick={goToPrevStep}>
          Previous
        </Button>
      )}
      {current < steps.length - 1 && (
        <Button className="next-btn" disabled={isNextDisabled} type="primary" onClick={() => handleClick()}>
          Next
        </Button>
      )}
      {current === steps.length - 1 && (
        <Button className="add-btn" type="primary" onClick={triggerAddBookSubmitForm}>
          Add
        </Button>
      )}
    </div>
  )
}

Navigation.propTypes = {
  current: PropTypes.number.isRequired,
  steps: PropTypes.array.isRequired,
  isNextDisabled: PropTypes.bool.isRequired,
  goToNextStep: PropTypes.func.isRequired,
  goToPrevStep: PropTypes.func.isRequired,
  triggerAddSubgenreSubmitForm: PropTypes.func.isRequired,
  checkCurrentStep: PropTypes.func.isRequired,
}
