import { useFormik } from 'formik';
import {
  Box,
  Stack,
  Heading,
  Input,
  Button,
  Image,
  FormControl,
  Text,
  InputRightElement,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useState } from 'react';
import './registerPage.css';
import {
  AiOutlineEye as See,
  AiOutlineEyeInvisible as NoSee,
  AiOutlineMail as Mail,
} from 'react-icons/ai';
import { FcGoogle as GoogleIcon } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import axios from 'axios';
import IMG from '../../assets/images/bg.jpg';

function Login() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values, actions) => {
      axios
        .post(`https://booklog-backend.herokuapp.com/user/login`, values)
        .then(() => {
          // console.log(res.data.message);
          actions.resetForm();
          setShow(false);
        })
        .catch((err) => {
          const errors = err.response.data.message;
          const fields = Object.keys(errors);
          fields.forEach((field) => {
            formik.setFieldError(field, errors[field]);
          });
        });
    },
  });
  const googleLogin = () => {
    window.location.href = `https://booklog-backend.herokuapp.com/user/login/google`;
  }

  return (
    <Box>
      <Image src={IMG} alt="" className="img" position="absolute" zIndex={-2} />
      <Box align="center" className="main" pt={10}>
        <Stack
          maxW={{ base: 'sm', md: 'md', lg: 'lg' }}
          bg="gray.200"
          rounded="xl"
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
        >
          <Stack spacing={4}>
            <Heading
              lineHeight={1.1}
              color="gray.800"
              fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
            >
              Login
            </Heading>
          </Stack>
          <Box as="form" mt={10} onSubmit={formik.handleSubmit}>
            <Stack spacing={4}>
              <FormControl
                isInvalid={formik.errors.email && formik.touched.email}
              >
                <InputGroup>
                  <InputLeftElement color="gray.800">
                    <Mail />
                  </InputLeftElement>
                  <Input
                    name="email"
                    placeholder="Email"
                    type="text"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </InputGroup>
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={formik.errors.password && formik.touched.password}
              >
                <InputGroup>
                  <Input
                    name="password"
                    placeholder="Password"
                    type={show ? 'text' : 'password'}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <InputRightElement color="gray.800">
                    {show ? (
                      <NoSee onClick={handleClick} />
                    ) : (
                      <See onClick={handleClick} />
                    )}
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>
            </Stack>

            <Stack spacing={6} mt={2}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align="start"
                justify="space-between"
              >
                <Stack />
                <Link to="/forgot">
                  <Text color="blue.600">Forgot password?</Text>
                </Link>
              </Stack>
            </Stack>
            <Button
              type="submit"
              mt={8}
              w="xs"
              _hover={{
                boxShadow: 'lg',
              }}
            >
              Login
            </Button>
            <Text color='gray.500' pt='1'>
              or
            </Text>
            <Stack pt={1} align='center'>
              <Button
                w='xs'
                variant='ghost'
                bg='gray.100'
                color='gray.600'
                leftIcon={<GoogleIcon />}
                _hover={{
                  shadow: 'lg',
                }}
                onClick={googleLogin}
              >
                Sign Up with Google
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text
                align="center"
                color="gray.500"
                fontSize={{ base: 'sm', sm: 'md' }}
              >
                Not a member?
                <Link to="/register">
                  <Text as="span" color="blue.600" textDecoration="underline">
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
}

export default Login;
