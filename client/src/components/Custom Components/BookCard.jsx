import {
  Image,
} from '@chakra-ui/react';

// TODO: Add on hover modal displaying Book Description

function BookCard({ bookImage }) {
  return (
    <Image
      width="140px"
      height="200px"
      objectFit="cover"
      src={bookImage}
      _hover={{
        cursor: 'pointer',
        shadow: 'md',
      }}
    />
  );
}

export default BookCard;
