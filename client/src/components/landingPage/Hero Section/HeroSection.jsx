import "./HeroSection.css";
import captain from "../../../assets/images/captain-america-book.png";
// import captin from '../../../assets'
import iron from "../../../assets/images/iron-man-book.png";
import spider from "../../../assets/images/spider-man-book.png";
import uglyTruth from "../../../assets/images/an-ugly-truth-book.png";
import { Flex, Stack, Heading, Text, Box, Image } from "@chakra-ui/react";

function HeroSection() {
  return (
    <Stack maxW={'90%'} direction={{ base: 'column', lg: 'row' }} overflow={'hidden'}
      mx='auto' my='20px' align={'center'} justify={{base:"start",lg:'space-between'}}
      flex={1} py={8}>

      {/* ---------------------- Text Stack --------------------------- */}
      <Stack w={'full'} maxW={'lg'} pb={10}>
        <Heading fontSize={{ base: '7xl', lg: '6xl', xl: '7xl' }} className='heading-section'>
          <Text as={'span'} className='heading-highlight' >Light</Text>
          <Text as={'span'} className="heading-normal">
            {' '}
            up your<br /> mind
          </Text>
        </Heading>
        <Text fontSize={{ base: 'md', lg: 'lg' }}>
          This is a little description of the website.
        </Text>
      </Stack>
      {/* ------------------------------------------------------------- */}


      {/* ------------------ Books Display Section ---------------------*/}
      <Box align={'center'} >
        <Flex className="books" >
          <Image boxSize='145px' fit={'cover'} src={captain} alt="" p={2} />
          <Image boxSize='145px' fit={'cover'} src={iron} alt="" p={2} />
          <Image boxSize='145px' fit={'cover'} src={spider} alt="" p={2} />
          <Image boxSize='145px' src={uglyTruth} alt="" />
        </Flex>
        <Box className="book-shelf" boxShadow={'md'}/>
      {/* ------------------------------------------------------------- */}

      </Box>
    </Stack>
  );
}
export default HeroSection;