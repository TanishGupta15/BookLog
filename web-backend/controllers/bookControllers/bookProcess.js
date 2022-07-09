module.exports.booksProcess = (res, bookItems) => {
  const bookTitles = [];
  const bookImages = [];
  const bookIDs = [];
  bookItems.forEach((book) => {
    bookIDs.push(book.id);
    bookTitles.push(book.volumeInfo.title);
    {
        (book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail) ?
            bookImages.push(book.volumeInfo.imageLinks.thumbnail) :
            bookImages.push('icons/logo.svg');
    }
  });
  const obj = {
    titles: bookTitles,
    images: bookImages,
    ids: bookIDs,
  };
  res.status(200).send(obj);
};
