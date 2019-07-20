import React from 'react'
import {Icon, Button} from 'antd'

const AddBookSuccess = ({restartWizard}) => {
  return (
    <div className="add-book-success-wrapper">
      <div className="add-book-success-container">
        <Icon className="icon-success" type="check-circle" theme="twoTone" />
        <h2>Book added successfully</h2>
        <Button type="primary" onClick={restartWizard} size="large">
          <Icon type="file-add" />
          Add another book
        </Button>
      </div>
    </div>
  )
}

export default AddBookSuccess
