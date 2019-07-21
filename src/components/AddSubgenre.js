import React, {Component} from 'react'
import {Form, Icon, Input, Checkbox} from 'antd'

class AddSubgenreForm extends Component {
  componentDidMount() {
    this.props.form.setFieldsValue({
      name: this.props.subgenreName,
    })
  }

  componentDidUpdate(prevProps) {
    const {addSubgenre, addSubgenreSubmitForm} = this.props
    if (prevProps.addSubgenreSubmitForm !== addSubgenreSubmitForm) {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          addSubgenre(values)
        }
      })
    }
  }

  handleChange = e => {
    const name = e.target.value
    this.props.form.setFieldsValue({
      name,
    })
    this.props.setSubgenreName(name)
  }

  render() {
    const {form} = this.props
    const {getFieldDecorator} = form
    return (
      <div className="steps-content">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('name', {
              rules: [{required: true, message: 'Please enter subgenre name!'}],
            })(
              <Input
                onChange={this.handleChange}
                prefix={<Icon type="form" style={{color: 'rgba(0,0,0,.25)'}} />}
                placeholder="Subgenre name"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('isDescriptionRequired', {
              valuePropName: 'checked',
              initialValue: false,
            })(<Checkbox>Description is required for this subgenre</Checkbox>)}
          </Form.Item>
        </Form>
      </div>
    )
  }
}

const AddSubgenre = Form.create({name: 'add_subgenre'})(AddSubgenreForm)

export default AddSubgenre
