import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
  Grid,
} from '@chakra-ui/react';
import axios from 'axios';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Navbar } from '../Nav Pages/Navbar.jsx';
import BookCard from '../Custom Components/BookCard.jsx';
import Footer from '../Nav Pages/Footer.jsx';

// TODO -> Make Book Cards responsive. Can use Grids.
// TODO -> Add Loading animation and dummy cards while loading.
function GenresPage() {
  const { genre } = useParams();
  const [bookId, setBookId] = useState('');
  const [bookTitle, setBookTitles] = useState('');
  const [bookImage, setBookImages] = useState('');

  useEffect(() => {
    async function get() {
      try {
        const books = await axios.post(`http://localhost:3001/genres/${genre}`);
        console.log(books);
        setBookId(books.data.ids);
        setBookTitles(books.data.titles);
        setBookImages(books.data.images);
      } catch (err) {
        console.log(err);
      }
    }
    get();
  }, []);

  return (
    <>
      <Navbar />
      <Box maxW="90%" mx="auto">
        <Breadcrumb
          separator={<ChevronRightIcon color="gray.500" />}
          mt="2"
          _hover={{ textDecoration: 'none' }}
          color="blue.600"
        >
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="#">
              Genres
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>{genre}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Text fontSize={{ base: 'sm', lg: 'lg' }} fontWeight={600} textTransform="uppercase" mt={5}>
          {`New Releases in ${genre}`}
        </Text>
        <Divider height={3} />
        <Grid templateColumns="repeat(7, 1fr)" gap={10} spacing={2} mt={5}>
          {bookImage ? bookImage.map((book, index) => (
            <Link key={bookId[index]} to={`/books/${bookId[index]}`}>
              <BookCard bookImage={book} />
            </Link>
          )) : null}
        </Grid>
      </Box>
      <Footer />
    </>
  );
}

export default GenresPage;
