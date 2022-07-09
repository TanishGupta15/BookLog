import {
  Heading, Avatar, Box, Center, Text, Stack, Button, useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function CardComponent({
  id, image, name, description,
}) {
  // const bgColor = useColorModeValue('gray.200', '#616161');
  const bgColor = useColorModeValue('gray.200', 'gray.800');
  return (
    <Center py={6}>
      <Box
        maxW="230px"
        p={6}
        textAlign="center"
        bg={bgColor}
        boxShadow="sm"
        rounded="lg"
      >
        <Avatar
          size="2xl"
          src={image}
          alt={name}
          mb={4}
          pos="relative"
        />
        <Link to={`/user/${id}`}>
          <Heading fontSize="2xl">
            {name}
          </Heading>
        </Link>
        <Text fontWeight={600} color="gray.500" mb={4}>
          {`@_${name}`}
        </Text>
        <Text
          textAlign="center"
          color={useColorModeValue('gray.700', 'gray.400')}
          px={3}
        >
          {description}
        </Text>

        <Stack mt={8} direction="row" spacing={4}>
          <Button
            variant="outline"
            flex={1}
            fontSize="sm"
            rounded="full"
          >
            Message
          </Button>
          <Button
            flex={1}
            fontSize="sm"
            rounded="full"
          >
            Follow
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}

export default CardComponent;
