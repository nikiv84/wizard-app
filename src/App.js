import React, {Component} from 'react'
import {Row, Col, Steps, PageHeader, message} from 'antd'
import './App.scss'
import 'antd/dist/antd.css'
import StepContent from './StepContent'
import uuidv1 from 'uuid/v1'
import Navigation from './Navigation'
import {dataService} from './services/dataService'
import Book from './models/Book'
import {stepTypes, contentType} from './common/helpers'
import cloneDeep from 'lodash/cloneDeep'
import AddBookSuccess from './AddBookSuccess'
import Logo from './Logo'

const {GENRE, SUBGENRE, ADD_SUBGENRE, INFORMATION, ELLIPSIS} = stepTypes

class App extends Component {
  disableNexButton = {
    isNextDisabled: true,
  }
  enableNextButton = {
    isNextDisabled: false,
  }
  initialSteps = [
    {
      title: GENRE,
    },
    {
      title: SUBGENRE,
    },
    {
      title: ELLIPSIS,
    },
  ]
  state = {
    current: 0,
    genres: [],
    selectedGenre: null,
    selectedSubgenre: null,
    isNextDisabled: true,
    shouldAddSubgenre: false,
    addBookSubmitForm: false,
    addSubgenreSubmitForm: false,
    newSubgenre: null,
    books: [],
    steps: cloneDeep(this.initialSteps),
    subgenreName: '',
    isBookAdded: false,
  }

  async componentDidMount() {
    try {
      const {
        data: {genres},
      } = await dataService.getGenres()
      this.setState({genres})
    } catch (error) {
      message.error('Error loading genres')
    }
  }

  componentWillUnmount() {
    message.destroy()
  }

  componentDidUpdate(prevProps, prevState) {
    const {current} = this.state

    if (prevState.current !== current) {
      if (prevState.current > current) {
        this.deselectAndDisableNexButton(this.getCurrentStep())
      } else {
        const isNextDisabled = this.checkStepAndNextButtonState()
        this.setState({isNextDisabled})
      }

      if (this.checkCurrentStep(ADD_SUBGENRE)) {
        this.setState(this.enableNextButton)
      }
    }
  }

  deselectAndDisableNexButton = currentStep => {
    let propertiesToReset = {}
    const isNextDisabled = this.checkStepAndNextButtonState()
    if (currentStep === GENRE) {
      propertiesToReset = {steps: cloneDeep(this.initialSteps), subgenreName: ''}
    } else if (currentStep === SUBGENRE) {
      propertiesToReset = {selectedSubgenre: null, subgenreName: ''}
    }
    this.setState({...isNextDisabled, ...propertiesToReset})
  }

  checkStepAndNextButtonState = () => {
    const {selectedGenre, selectedSubgenre} = this.state
    let isNextDisabled = {}
    if (this.checkCurrentStep(GENRE)) {
      if (!selectedGenre) {
        isNextDisabled = {...this.disableNexButton}
      } else {
        isNextDisabled = {...this.enableNextButton}
      }
    }
    if (this.checkCurrentStep(SUBGENRE)) {
      if (!selectedSubgenre) {
        isNextDisabled = {...this.disableNexButton}
      } else {
        isNextDisabled = {...this.enableNextButton}
      }
    }
    return isNextDisabled
  }

  goToNextStep = () => {
    const current = this.state.current + 1
    this.setState({current, isNextDisabled: true})
  }

  goToPrevStep = () => {
    const current = this.state.current - 1
    this.setState({current, isNextDisabled: true})
  }

  selectGenre = selectedGenre => {
    this.setState({
      selectedGenre,
      isNextDisabled: false,
    })
  }

  selectSubgenre = selectedSubgenre => {
    const steps = this.state.steps.filter((item, index) => index !== 3)
    steps[2].title = INFORMATION
    this.setState({
      selectedSubgenre,
      isNextDisabled: false,
      steps,
      newSubgenre: null,
    })
  }

  addNewSubgenre = () => {
    const {steps} = this.state
    steps[2].title = ADD_SUBGENRE
    steps[3] = {
      title: INFORMATION,
    }
    this.setState({
      isNextDisabled: false,
      selectedSubgenre: null,
      steps,
    })
  }

  onButtonClick = (e, type) => {
    const selectedValue = e.target.dataset.itemid
    const {GENRE, SUBGENRE, ADD_SUBGENRE} = contentType

    switch (type) {
      case GENRE:
        return this.selectGenre(selectedValue)
      case SUBGENRE:
        return this.selectSubgenre(selectedValue)
      case ADD_SUBGENRE:
        return this.addNewSubgenre()
      default:
        break
    }
  }

  addSubgenre = ({name, isDescriptionRequired}) => {
    const id = uuidv1()
    const newSubgenre = {id, name, isDescriptionRequired}
    this.setState({shouldAddSubgenre: false, newSubgenre, isNextDisabled: false}, () => this.goToNextStep())
  }

  getSubgenreData = () =>
    this.state.newSubgenre ||
    this.getSubgenres().find(subgenre => subgenre.id.toString() === this.state.selectedSubgenre)

  getGenreData = () => this.state.genres.find(genre => genre.id.toString() === this.state.selectedGenre)

  getSubgenres = () => this.getGenreData().subgenres

  getCurrentStep = () => this.state.steps[this.state.current].title

  checkCurrentStep = title => title === this.getCurrentStep()

  triggerAddSubgenreSubmitForm = () => {
    const {addSubgenreSubmitForm} = this.state
    this.setState({addSubgenreSubmitForm: !addSubgenreSubmitForm})
  }

  triggerAddBookSubmitForm = () => {
    const {addBookSubmitForm} = this.state
    this.setState({addBookSubmitForm: !addBookSubmitForm})
  }

  addBook = (genre, subgenre, values) => {
    const book = new Book(uuidv1(), genre, subgenre, ...Object.values(values))
    const books = [...this.state.books]
    books.push(book)
    if (this.state.newSubgenre) {
      const genres = [...this.state.genres]
      const subgenres = genres.find(genre => genre.id.toString() === this.state.selectedGenre).subgenres
      subgenres.push(this.state.newSubgenre)
      this.setState({
        isBookAdded: true,
        books,
        genres,
        current: 0,
        selectedGenre: null,
        selectedSubgenre: null,
        newSubgenre: null,
      })
    } else {
      this.setState({
        isBookAdded: true,
        books,
        current: 0,
        selectedGenre: null,
        selectedSubgenre: null,
        newSubgenre: null,
      })
    }
    this.printOutBook(book)
  }

  printOutBook = book => {
    console.log('%c%s', 'color: white; background: #ff4d4f; padding: 0.25rem', 'New book added:')
    Object.entries(book).forEach(([key, value]) => {
      console.log('%c%s', 'color: white; background: #1890ff; padding: 0.25rem', `${key.replace(/_/gi, '')}: ${value}`)
    })
  }

  setSubgenreName = subgenreName => {
    this.setState({subgenreName})
  }

  restartWizard = () => {
    this.setState({
      isBookAdded: false,
      current: 0,
      selectedGenre: null,
      selectedSubgenre: null,
      newSubgenre: null,
      subgenreName: '',
      steps: cloneDeep(this.initialSteps),
      isNextDisabled: true,
    })
  }

  render() {
    const {Step} = Steps
    const {
      steps,
      current,
      genres,
      selectedGenre,
      selectedSubgenre,
      isNextDisabled,
      shouldAddSubgenre,
      addBookSubmitForm,
      addSubgenreSubmitForm,
      subgenreName,
      isBookAdded,
    } = this.state
    const emptyIcon = <span></span>

    if (isBookAdded) return <AddBookSuccess restartWizard={this.restartWizard} />

    return (
      <div className="app">
        <Row>
          <Col span={16} offset={4}>
            <Logo />
            <PageHeader title="Add book - New book" />
          </Col>
        </Row>
        <Row className="wizard-container">
          <Col span={16} offset={4}>
            <Steps current={current}>
              {steps.map(item => {
                const inputProps = {
                  key: item.title,
                  title: item.title,
                }
                if (steps.length === 3 && item.title === ELLIPSIS) {
                  inputProps.icon = emptyIcon
                }
                return <Step {...inputProps} />
              })}
            </Steps>

            <StepContent
              currentStep={current}
              selectedGenre={selectedGenre}
              getSubgenres={this.getSubgenres}
              selectedSubgenre={selectedSubgenre}
              getGenreData={this.getGenreData}
              getSubgenreData={this.getSubgenreData}
              genres={genres}
              onButtonClick={this.onButtonClick}
              addSubgenre={this.addSubgenre}
              shouldAddSubgenre={shouldAddSubgenre}
              addBookSubmitForm={addBookSubmitForm}
              addBook={this.addBook}
              addSubgenreSubmitForm={addSubgenreSubmitForm}
              checkCurrentStep={this.checkCurrentStep}
              subgenreName={subgenreName}
              setSubgenreName={this.setSubgenreName}
            />

            <Navigation
              current={current}
              steps={steps}
              isNextDisabled={isNextDisabled}
              goToNextStep={this.goToNextStep}
              goToPrevStep={this.goToPrevStep}
              checkCurrentStep={this.checkCurrentStep}
              triggerAddSubgenreSubmitForm={this.triggerAddSubgenreSubmitForm}
              triggerAddBookSubmitForm={this.triggerAddBookSubmitForm}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

export default App
