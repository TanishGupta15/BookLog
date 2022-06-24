import { Stack, Text, Heading, Box, useColorModeValue } from '@chakra-ui/react';
import HeadingComponent from '../Custom Components/HeadingComponent';

function ChooseUs() {
  const bgColor = useColorModeValue('gray.100', 'gray.800');
  return (
    <Box mt={20} maxW={'90%'} mx='auto' >
      <HeadingComponent HeadingText={'Why Booklog'} />
      <Stack direction={{ base: 'column', lg: 'row' }} alignItems={'baseline'}
        mx='auto' justify={{ base: "start", lg: 'space-between' }}>
        <Stack direction={{ base: 'column', sm: 'row' }}>
          <Stack w={'full'} maxW={'400px'} pr={4} >
            <Heading fontSize={{ base: 'xl', lg: 'lg', xl: 'xl' }} className='heading-section'>
              <Text as={'span'}>Deciding what to read next?</Text>
            </Heading>
            <Text fontWeight={600} color={'gray.500'}>
              You’re in the right place. Tell us what titles or genres you’ve enjoyed in the past, and we’ll give you surprisingly insightful recommendations.
            </Text>
          </Stack>
          <Stack w={'full'} maxW={'400px'} pr={5} py={5}>
            <Heading fontSize={{ base: 'xl', lg: 'lg', xl: 'xl' }} className='heading-section'>
              <Text as={'span'}>What are your friends reading?</Text>
            </Heading>
            <Text fontWeight={600} color={'gray.500'} mb={4}>
              Chances are your friends are discussing their favorite (and least favorite) here.
            </Text>
          </Stack>
        </Stack>

        <Box w={'full'} maxW={'270px'} p={6} textAlign={'center'}
          bg={bgColor} boxShadow={'xl'} rounded={'lg'} >
          <Text fontWeight={600} color={'gray.500'} mb={4}>
            Some random Quote by a Random author which are some words he uttered to just look cool coz back then ppl were shit.
          </Text>
          <Text
            textAlign={'center'}
            color={useColorModeValue('gray.700', 'gray.400')}
            px={3}>
            ~ That Random Author
          </Text>
        </Box>
      </Stack>


    </Box>
  );
}

export default ChooseUs;
