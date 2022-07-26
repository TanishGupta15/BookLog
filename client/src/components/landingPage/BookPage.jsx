// eslint-disable-next-line import/no-unresolved
import {
  Box, Text, Image, Button, Divider, Input, Menu, MenuButton, MenuList, MenuItem, VStack,
  // eslint-disable-next-line import/no-unresolved
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Navbar } from '../Nav Pages/Navbar.jsx';
import img from '../../assets/images/1.png';
import ReadMore from '../Custom Components/ReadMore.jsx';

// TODO -> Add Amazon Buy Link to buy the buy using Amazon Search API
// TODO -> Remove api from frontend and send Data as props.
// TODO -> Description response comes as HTML. Fix it.
function BookPage() {
  const { bookId } = useParams();
  const [bookData, setBookData] = useState('');
  // eslint-disable-next-line

  useEffect(() => {
    async function getData() {
      try {
        const data = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
        setBookData(data.data.volumeInfo);
        console.log(data.data.volumeInfo);
      } catch (err) {
        // console.log(err);
      }
    }
    getData();
  }, []);
  return (
    <>
      <Navbar />
      <Box maxW="90%" mx="auto">
        <Box p={4} display={{ md: 'flex' }}>
          <Box flexShrink={0}>
            <Image
              rounded="md"
              width="180px"
              height="200px"
              shadow="lg"
              src={img}
            />
            <VStack gap={5}>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  mt={3}
                  width="180px"
                  px={4}
                  py={2}
                  transition="all 0.4s"
                >
                  Want to Read
                </MenuButton>
                <MenuList>
                  <MenuItem>Currently Reading</MenuItem>
                  <MenuItem>Have Read</MenuItem>
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  mt={5}
                  width="180px"
                  px={4}
                  py={2}
                  transition="all 0.4s"
                  border="1px solid primary"
                >
                  Download PDF
                </MenuButton>
                <MenuList>
                  <MenuItem>Download .epub</MenuItem>
                  <MenuItem>Send to Kindle</MenuItem>
                </MenuList>
              </Menu>
            </VStack>
          </Box>
          <Box ml={{ md: 4 }}>
            <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
              <Text
                fontWeight="extrabold"
                textTransform="uppercase"
                fontSize={['md', 'md', 'lg']}
                letterSpacing="wide"
                color="primary"
              >
                {bookData.title}
              </Text>
              {bookData ? bookData.authors.map((author) => (
                <Text mt={1} fontWeight="bold" color="primary">
                  {`by ${author}`}
                </Text>
              )) : null}
              <Text mt={1} fontWeight="bold">
                {`Average Ratings : ${bookData.averageRating ? bookData.averageRating : 'Unavailable'}`}
                {' | '}
                {`${bookData.ratingsCount ? `${bookData.ratingsCount} ratings total` : 'Unavailable'}`}
              </Text>
              <Text mt={2}>
                {bookData ? <ReadMore text={bookData.description} /> : ''}
              </Text>
              <Divider height={5} />
              <Text m={2} fontWeight="bold">Get a Copy</Text>
              <Button m={2}>Amazon</Button>
              <a href={bookData.infoLink} target="blank">
                <Button>Google Play</Button>
              </a>
              <Divider height={10} />
              <Text m={2} fontWeight="thin">{`${bookData.pageCount} pages`}</Text>
              <Text m={2} fontWeight="thin">
                {`Published date ${bookData.publishedDate} by ${bookData.publisher}`}
              </Text>
              {/* <Text m={2} fontWeight="thin">
                {`ISBN 10 : ${bookData.industryIdentifiers[0].identifier}`}
              </Text>
              <Text m={2} fontWeight="thin">
                {`ISBN 10 : ${bookData.industryIdentifiers[1].identifier}`}
              </Text> */}
              <Divider height={10} />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default BookPage;
