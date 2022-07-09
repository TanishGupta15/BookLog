import {
  Box, Container, SimpleGrid, Stack, Text, Button, Input, IconButton, useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { SiBookstack as Logo } from 'react-icons/si';
import { BiMailSend } from 'react-icons/bi';

export default function LargeWithNewsletter() {
  return (
    <Box mt={20} bg={useColorModeValue('gray.200', 'gray.800')}>
      <Container as={Stack} py={10} maxW="90%" mx="auto">
        <SimpleGrid
          spacing={20}
          templateColumns={{ sm: '2fr 1fr', md: '2fr 1fr 2fr' }}
        >
          <Stack spacing={6}>
            <Stack direction="row" align="center">
              <Logo size="50" />
              <Text fontSize="xl" fontWeight={700}>Booklog</Text>
            </Stack>
            <Text fontSize="sm">
              © 2022 BookLog. All rights reserved
            </Text>
            <Stack direction="row" spacing={6}>
              <Button as={Link} label="Twitter" to="/">
                <FaTwitter />
              </Button>
              <Button as={Link} label="YouTube" to="/">
                <FaYoutube />
              </Button>
              <Button as={Link} label="Instagram" to="/">
                <FaInstagram />
              </Button>
            </Stack>
          </Stack>

          <Stack align="flex-start">
            <Text fontWeight="500" fontSize="lg" mb={2}>Company</Text>
            <Link to="/">About us</Link>
            <Link to="/">Blog</Link>
            <Link to="/">Contact us</Link>
            <Link to="/">Pricing</Link>
            <Link to="/">Testimonials</Link>
          </Stack>
          <Stack
            align="flex-start"
            w="full"
            maxW="300px"
          >
            <Text fontWeight="500" fontSize="lg" mb={2}>Stay up to date</Text>
            <Input
              border={0}
              placeholder="Email address"
              bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
            />
            <IconButton aria-label="Subscribe" icon={<BiMailSend />} />
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
