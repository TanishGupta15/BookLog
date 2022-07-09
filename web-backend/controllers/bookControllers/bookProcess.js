module.exports.booksProcess = (res, bookItems) => {
    let book_titles = []
    let book_images = []
    let book_ids = []
    bookItems.forEach(book => {
      book_ids.push(book.id);
      book_titles.push(book.volumeInfo.title);
      {
        (book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail) ?
          book_images.push(book.volumeInfo.imageLinks.thumbnail) : book_images.push('icons/logo.svg');
      }
    })
    const obj = {
        titles: book_titles,
        images: book_images,
        ids: book_ids
    }
    res.status(200).send(obj);
}