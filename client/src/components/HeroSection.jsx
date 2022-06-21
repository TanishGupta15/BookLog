import React from "react";
import "./css/heroSection.css";
import captain from "../assets/images/captain-america-book.png";
import iron from "../assets/images/iron-man-book.png";
import spider from "../assets/images/spider-man-book.png";
import uglyTruth from "../assets/images/an-ugly-truth-book.png";
import { Flex, Stack, Heading, Text, Box, Image } from "@chakra-ui/react";

function HeroSection() {
  return (
    <Stack direction={{ base: 'column', lg: 'row' }}
      mt='20px' align={'center'} justify={'center'}
      flex={1} p={8}>

      {/* --------------------Heading Stack --------------------------- */}
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
      <Box align={'center'}>
        <Flex className="books">
          <Image boxSize='150px' fit={'cover'} src={captain} alt="" p={2} />
          <Image boxSize='150px' fit={'cover'} src={iron} alt="" p={2} />
          <Image boxSize='150px' fit={'cover'} src={spider} alt="" p={2} />
          <Image boxSize='150px' src={uglyTruth} alt="" />
        </Flex>
        <Box className="book-shelf" />
      {/* ------------------------------------------------------------- */}

      </Box>
    </Stack>
  );
}
export default HeroSection;