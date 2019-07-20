import React, {Component} from 'react'
import {Form, Icon, Input, PageHeader} from 'antd'
import TextArea from 'antd/lib/input/TextArea'

class AddBookForm extends Component {
  state = {
    genre: null,
    subgenre: null,
    isDescriptionRequired: false,
  }

  componentDidMount() {
    const {getGenreData, getSubgenreData} = this.props
    const {name} = getGenreData()
    const {name: subgenre, isDescriptionRequired} = getSubgenreData()
    this.setState({
      genre: name,
      subgenre: subgenre,
      isDescriptionRequired,
    })
  }

  componentDidUpdate(prevProps) {
    const {addBookSubmitForm, addBook} = this.props
    const {genre, subgenre} = this.state
    if (prevProps.addBookSubmitForm !== addBookSubmitForm) {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          addBook(genre, subgenre, values)
        }
      })
    }
  }

  render() {
    const {getFieldDecorator} = this.props.form
    const {genre, subgenre, isDescriptionRequired} = this.state
    const subTitle = `Genre: ${genre} | Subgenre: ${subgenre}`
    const {Item} = Form

    return (
      <div className="steps-content">
        <PageHeader className="steps-content-header" title="Add Book" subTitle={subTitle} />
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Item>
            {getFieldDecorator('title', {
              rules: [{required: true, message: 'Please enter book name'}],
            })(<Input prefix={<Icon type="form" style={{color: 'rgba(0,0,0,.25)'}} />} placeholder="Book title" />)}
          </Item>
          <Item>
            {getFieldDecorator('author', {
              rules: [{required: true, message: 'Please enter author name'}],
            })(<Input prefix={<Icon type="form" style={{color: 'rgba(0,0,0,.25)'}} />} placeholder="Author" />)}
          </Item>
          <Item>
            {getFieldDecorator('isbn', {
              rules: [{required: true, message: 'Please enter ISBN'}],
            })(<Input prefix={<Icon type="form" style={{color: 'rgba(0,0,0,.25)'}} />} placeholder="ISBN" />)}
          </Item>
          <Item>
            {getFieldDecorator('publisher', {
              rules: [{required: true, message: 'Please enter publisher'}],
            })(<Input prefix={<Icon type="form" style={{color: 'rgba(0,0,0,.25)'}} />} placeholder="Publisher" />)}
          </Item>
          <Item>
            {getFieldDecorator('publishDate', {
              rules: [{required: true, message: 'Please choose publish date'}],
            })(
              <Input
                prefix={<Icon type="calendar" style={{color: 'rgba(0,0,0,.25)'}} />}
                type="date"
                placeholder="Date published"
              />
            )}
          </Item>
          <Item>
            {getFieldDecorator('pages', {
              rules: [{required: true, message: 'Please enter number of pages'}],
            })(
              <Input
                prefix={<Icon type="form" style={{color: 'rgba(0,0,0,.25)'}} />}
                type="number"
                placeholder="Number of pages"
              />
            )}
          </Item>
          <Item>
            {getFieldDecorator('format', {
              rules: [{required: true, message: 'Please choose format'}],
            })(<Input prefix={<Icon type="form" style={{color: 'rgba(0,0,0,.25)'}} />} placeholder="Format" />)}
          </Item>
          <Item>
            {getFieldDecorator('edition', {
              rules: [{required: true, message: 'Please enter edition'}],
            })(<Input prefix={<Icon type="form" style={{color: 'rgba(0,0,0,.25)'}} />} placeholder="Edition" />)}
          </Item>
          <Item>
            {getFieldDecorator('language', {
              rules: [{required: true, message: 'Please choose edition language'}],
            })(
              <Input prefix={<Icon type="form" style={{color: 'rgba(0,0,0,.25)'}} />} placeholder="Edition Language" />
            )}
          </Item>
          <Item>
            {getFieldDecorator('description', {
              rules: [
                {
                  required: isDescriptionRequired,
                  message: 'Description is required for this subgenre. Please provide a description',
                },
              ],
            })(<TextArea prefix={<Icon type="form" style={{color: 'rgba(0,0,0,.25)'}} />} placeholder="Description" />)}
          </Item>
        </Form>
      </div>
    )
  }
}

const AddBook = Form.create({name: 'add_book'})(AddBookForm)

export default AddBook
