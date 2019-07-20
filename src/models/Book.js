export default class Book {
  constructor(
    id,
    genre,
    subgenre,
    title,
    author,
    isbn,
    publisher,
    publishDate,
    pages,
    format,
    edition,
    language,
    description = null
  ) {
    this._id = id
    this._genre = genre
    this._subgenre = subgenre
    this._title = title
    this._author = author
    this._isbn = isbn
    this._publisher = publisher
    this._publishDate = publishDate
    this._pages = pages
    this._format = format
    this._edition = edition
    this._language = language
    this._description = description
  }

  get id() {
    return this._id
  }
  get title() {
    return this._title
  }
  get author() {
    return this._author
  }
  get isbn() {
    return this._isbn
  }
  get publisher() {
    return this._publisher
  }
  get publishDate() {
    return this._publishDate
  }
  get pages() {
    return this._pages
  }
  get format() {
    return this._format
  }
  get edition() {
    return this._edition
  }
  get language() {
    return this._language
  }
  get description() {
    return this._description
  }
}
