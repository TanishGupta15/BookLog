import { NavLink, Link } from "react-router-dom";

import { BsFillSunFill as SunIcon,
  BsFillMoonStarsFill as MoonIcon } from "react-icons/bs";
import { SiBookstack } from "react-icons/si";
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

import { Box, Flex, HStack, Button, Stack,
  useDisclosure, Text, Spacer, IconButton } from '@chakra-ui/react'
import { useColorMode } from "@chakra-ui/react";
// ---------------------- END OF IMPORTS -------------------------


export const Navbar = () => {

  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const NavList = ["Home","Leaderboards","Blogs","Another"]

  const NavLinkStyle = ({ isActive }) => {
    return {
      color: isActive ? '#FFAB24' : '--main-text-color',
      fontWeight: isActive ? 'bold' : 600,
      borderBottom: isActive ? '3px solid #FFAB24' : 'none',
    }
  }

  const DrawerStyle = {
    fontWeight: 600,
    // borderBottom:'3px solid #FFAB24',
  }

  const NavLinks = ({NavList}) =>{
    return(
      NavList.map((nav,index)=>{
        const lowerNav = nav.toLowerCase();
        return(
          <NavLink key={index} style={NavLinkStyle} to={`/${lowerNav}`} >
            {nav}
          </NavLink>
        )
      })
    )
  }

  return (
    <Box px="5%" py={5}>
      <Flex h={16} align={'center'}>
        <Link to='/home'>
          <HStack alignItems={'center'}>
            <SiBookstack size={40} />
            <Text fontSize={'xl'} fontWeight={700}>Booklog</Text>
          </HStack>
        </Link>

        <Spacer />

        {/* -------- Hamburger Menu Only Shows on Small Screens -------- */}
        <IconButton size={'md'} variant={'outline'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ lg: 'none' }} 
          onClick={isOpen ? onClose : onOpen}
        />
        {/* ------------------------------------------------------------- */}


        {/* ------------------ Navmenu links ------------------------- */}
        <HStack align={'center'} justify={'space-between'} spacing='5'
          display={{ base: 'none', lg: 'flex' }}>
          <NavLinks NavList={NavList}/>
        </HStack>
        {/* ------------------------------------------------------------- */}


        {/* ---------------- Navmenu Login and signup buttons ----------- */}
        <HStack alignItems={'center'} justifyContent={'space-between'} spacing='3' ml={10}
          display={{ base: 'none', lg: 'flex' }}>
          <Link to="/login">
            <Button flex={1}>
              Login
            </Button>
          </Link>

          <Link to="/register">
            <Button variant='outline' flex={1}>
              Sign Up
            </Button>
          </Link>

          <Button onClick={() => toggleColorMode()} >
          {colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
          </Button>
        </HStack>
      </Flex>
      {/* --------------------------------------------------------------- */}


      {/* --------------------- Mobile Navbar Drawer --------------------- */}
      {isOpen ? (
        <Box pb={4} display={{ lg: 'none' }} bg={colorMode === 'light' ?'#ffe5b4': '#2a2d32'} borderBottom={'2px solid #ffab24'}>
          <Stack align={'center'} spacing={4} fontSize="xl">
            <NavLinks NavList={NavList} style={DrawerStyle} />
          </Stack>
        </Box>
      ) : null}
      {/* --------------------------------------------------------------- */}

    </Box>
  );
};
