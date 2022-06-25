import { useFormik } from "formik";
import {
  Box, Stack, Heading, Input, Button, Image, FormControl, Checkbox, Text,
  InputRightElement, InputGroup, InputLeftElement
} from '@chakra-ui/react';
import { useState } from "react";
import "./registerPage.css";
import IMG from '../../assets/images/bg.jpg'
import {
  AiOutlineEye as See, AiOutlineEyeInvisible as NoSee,
  AiOutlineMail as Mail } from "react-icons/ai";
import { Link } from "react-router-dom";

const Register = () => {

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    onSubmit: (values, actions) => {
      alert(JSON.stringify(values, null, 2));
      actions.resetForm();
    },
  })

  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)


  return (
    <Box>
      <Image src={IMG} alt="" className="img" position={'absolute'} zIndex={-2} />
      <Box align={'center'} className="main" pt={10}>
        <Stack maxW={{ base: 'sm', md: 'md', lg: 'lg' }} bg={'gray.200'} rounded={'xl'}
          p={{ base: 4, sm: 6, md: 8 }} spacing={{ base: 8 }} >

          <Stack spacing={4}>
            <Heading lineHeight={1.1} color={'gray.800'}
              fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
              Login
            </Heading>
          </Stack>
          <Box as={'form'} mt={10} onSubmit={formik.handleSubmit}>
            <Stack spacing={4}>
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
            </Stack>

            <Stack spacing={6} mt={2}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox colorScheme='orange'
                  value={formik.values.rememberMe}
                  onChange={formik.handleChange}
                  color={'gray.500'}>
                  Remember me
                </Checkbox>
                <Link to='/forgot' ><Text color={'blue.600'}>Forgot password?</Text></Link>
              </Stack>
            </Stack>
            <Button type="submit" mt={8} w={'full'}
              _hover={{
                boxShadow: 'lg',
              }}>
              Login
            </Button>
            <Stack pt={6}>
              <Text align={'center'} color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
                Not a member? 
                <Link to='/register' >
                  <Text as='span'color={'blue.600'} textDecoration='underline'>
                    Sign Up
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