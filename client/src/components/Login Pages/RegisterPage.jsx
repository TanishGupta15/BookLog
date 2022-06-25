import { useFormik } from "formik";
import {
  Box, Stack, Heading, Text, Input, Button, Image, Flex, FormControl,
  InputRightElement, InputGroup, InputLeftElement
} from '@chakra-ui/react';
import { useState } from "react";
import "./registerPage.css";
import IMG from '../../assets/images/bg.jpg'
import {
  AiOutlineEye as See, AiOutlineEyeInvisible as NoSee,
  AiOutlineMail as Mail
} from "react-icons/ai";
import { FcGoogle as GoogleIcon } from 'react-icons/fc'
import { Link } from "react-router-dom";

const Register = () => {

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: (values, actions) => {
      alert(JSON.stringify(values, null, 2));
      actions.resetForm();
    },
  })

  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  // const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  // const hasNumber = /\d/;


  return (
    <Box>
      <Image src={IMG} alt="" className="img" position={'absolute'} zIndex={-2} />
      <Box align={'center'} className="main" pt={10}>
        <Stack maxW={{ base: 'sm', md: 'md', lg: 'lg' }} bg={'gray.200'} rounded={'xl'}
          p={{ base: 4, sm: 6, md: 8 }} spacing={{ base: 8 }} >

          <Stack spacing={4}>
            <Heading lineHeight={1.1}
              color={'gray.800'} fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
              Join our Community
            </Heading>
            <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
              Sign up and Join commmunity of amazing readers!
            </Text>
          </Stack>
          <Box as={'form'} mt={10}
            onSubmit={formik.handleSubmit}>
            <Stack spacing={4}>
              <Flex gap={3}>
                <FormControl>
                  <Input name='firstName' placeholder="First Name"
                    type={'text'}
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                  />
                </FormControl>
                <FormControl>
                  <Input name='lastName' placeholder="Last Name"
                    type={'text'}
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                  />
                </FormControl>
              </Flex>

              <FormControl>
                <InputGroup>
                  <InputLeftElement children={<Mail />} color="gray.800" />
                  <Input name='email' placeholder="Email"
                    type={'email'}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <Input name="password" placeholder="Password"
                    type={show ? 'text' : 'password'}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  <InputRightElement color={'gray.800'}>
                    {show ? < NoSee onClick={handleClick} /> : <See onClick={handleClick} />}
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <Input name="confirmPassword" placeholder="Confirm password"
                    type={show ? 'text' : 'password'}
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                  />
                  <InputRightElement color={'gray.800'}>
                    {show ? < NoSee onClick={handleClick} /> : <See onClick={handleClick} />}
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </Stack>
            <Button type="submit" mt={8} w={'full'}
              _hover={{
                boxShadow: 'lg',
              }}>
              Sign Up
            </Button>
            <Stack pt={3}>
              <Text align={'center'} color={'gray.600'} fontSize={{ base: 'sm', sm: 'md' }}>
                or signup with
                <Link to={'#'}>
                  <Button size={'sm'} variant={'abcd'}
                    _hover={{ shadow: 'sm' }} ml={2}>
                    <GoogleIcon size={'md'} />
                  </Button>
                </Link>
              </Text>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'} color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
                Already a user?
                <Link to='/login' >
                  <Text as='span' color={'blue.600'} textDecoration='underline'>
                    Login
                  </Text>
                </Link>
              </Text>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default Register;