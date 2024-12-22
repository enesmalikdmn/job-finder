'use client';

import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Text } from '@chakra-ui/react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { registerSchema } from './validation';
import { useRouter } from 'next/navigation';


const Register = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
    // api call 
      router.push('/login');
    } catch (error) {
      setErrorMessage('Registration failed');
    }
  };

  return (
    <Box width="400px" margin="auto" padding="20px" boxShadow="md">
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <VStack spacing={4} align="flex-start">
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Field
                name="email"
                as={Input}
                type="email"
                id="email"
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Field
                name="password"
                as={Input}
                type="password"
                id="password"
                placeholder="Enter your password"
              />
              <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <Field
                name="confirmPassword"
                as={Input}
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
              />
              <ErrorMessage name="confirmPassword" component="div" style={{ color: 'red' }} />
            </FormControl>

            {errorMessage && (
              <Text color="red" fontSize="sm">
                {errorMessage}
              </Text>
            )}

            <Button type="submit" colorScheme="teal" width="100%">
              Register
            </Button>
          </VStack>
        </Form>
      </Formik>
    </Box>
  );
};

export default Register;
