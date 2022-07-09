import {
  Stack, Box, ListItem, UnorderedList, useMediaQuery,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import HeadingComponent from '../Custom Components/HeadingComponent.jsx';
// import { BsSearch } from "react-icons/bs";

const ListItems = ({ list }) => (
  list.map((genre, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <Link to={`/genres/${genre}`} key={index}>
      <ListItem style={{ margin: '0 !important' }}>{genre}</ListItem>
    </Link>
  ))
);

function Row({ list }) {
  return (
    <UnorderedList
      listStyleType="none"
      style={{ lineHeight: 2, marginInlineStart: 0 }}
      fontWeight={600}
      fontSize={{ sm: 'sm', md: 'xl' }}
    >
      <ListItems list={list} />
    </UnorderedList>
  );
}
function GenreLists() {
  const [isSmallDevice, isMediumDevice] = useMediaQuery(['(min-width: 540px)', '(min-width: 768px)']);

  const list1 = ['Art', 'Biography', 'Buisness', 'Comedy', 'Comics', 'Cookbooks', 'Drama'];
  const list2 = ['Fantasy', 'Fiction', 'Historical Fiction', 'History', 'Horror', 'Humor', 'Mystery'];
  const list3 = ['Music', 'Nonfiction', 'Poetry', 'Psychology', 'Romance', 'Science', 'Science Fiction'];
  const list4 = ['Self Help', 'Sports', 'Thriller', 'Travel', 'Young Adult'];

  return (
    <Box maxW="90%" mx="auto" mt={20}>
      <HeadingComponent HeadingText="Browse Books" />
      <Stack
        w="full"
        justifyContent={{ base: 'space-evenly', md: 'space-between' }}
        direction="row"
      >
        {isMediumDevice ? <Row list={list1} /> : null}
        <Row list={list2} />
        {isSmallDevice ? <Row list={list3} /> : null}
        <Row list={list4} />
      </Stack>
    </Box>
  );
}

export default GenreLists;
