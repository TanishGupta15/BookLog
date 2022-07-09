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
} from '@chakra-ui/react';
import './registerPage.css';
import { Link } from 'react-router-dom';
import IMG from '../../assets/images/bg.jpg';

function Register() {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: (values, actions) => {
      // alert(JSON.stringify(values, null, 2));
      actions.resetForm();
    },
  });

  return (
    <Box>
      <Image src={IMG} alt="" className="img" position="absolute" zIndex={-2} />
      <Box align="center" className="main" pt={10}>
        <Stack
          w="f ull"
          bg="gray.200"
          rounded="xl"
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ base: 'sm', md: 'md' }}
        >
          <Heading
            lineHeight={1.1}
            fontSize={{ base: '2xl', md: '3xl' }}
            color="gray.800"
          >
            Forgot your password?
          </Heading>
          <Text color="gray.600" fontSize={{ base: 'sm', sm: 'md' }}>
            You&apos;ll get an email with a reset link
          </Text>
          <FormControl>
            <Input
              name="email"
              placeholder="Email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </FormControl>
          <Stack spacing={6}>
            <Button>Send Reset Mail</Button>
          </Stack>
          <Stack>
            <Link to="/login">
              <Text as="span" color="blue.600" textDecoration="underline">
                Back to Login
              </Text>
            </Link>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export default Register;
