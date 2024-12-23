'use client';

import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Text } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { registerSchema } from './validation';
import { registerUser } from '../services/authService';  // authService dosyasını import ediyoruz

const Register = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        await registerUser(values.email, values.password);
        router.push('/job-listings');  // Kayıt başarılıysa job-listings sayfasına yönlendiriyoruz
      } catch (error) {
        console.error('Error during registration:', error); // Hata loglama
        setErrorMessage('Registration failed');
      }
    },
  });

  return (
    <Box width="400px" margin="auto" padding="20px" boxShadow="md">
      <form onSubmit={formik.handleSubmit}>
        <VStack spacing={4} align="flex-start">
          <FormControl isInvalid={formik.touched.email && !!formik.errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <Text color="red" fontSize="sm">
                {formik.errors.email}
              </Text>
            )}
          </FormControl>

          <FormControl isInvalid={formik.touched.password && !!formik.errors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <Text color="red" fontSize="sm">
                {formik.errors.password}
              </Text>
            )}
          </FormControl>

          {errorMessage && (
            <Text color="red" fontSize="sm">
              {errorMessage}
            </Text>
          )}

          <Button type="submit" colorScheme="teal" width="100%" isLoading={formik.isSubmitting}>
            Register
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Register;
