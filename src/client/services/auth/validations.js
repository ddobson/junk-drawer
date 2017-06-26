import { SubmissionError } from 'redux-form';

export default function validateSignIn(values) {
  const { email, password } = values;

  // Validate Email
  if (!email) {
    throw new SubmissionError({
      email: 'Required',
      _error: 'Sign In Failed',
    });
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    throw new SubmissionError({
      email: 'Invalid Email Address',
      _error: 'Sign In Failed',
    });
  }

  // Validate Password
  if (!password) {
    throw new SubmissionError({
      password: 'Required',
      _error: 'Sign In Failed',
    });
  } else if (password.length < 8) {
    throw new SubmissionError({
      password: 'Password must be at least 8 characters',
      _error: 'Sign In Failed',
    });
  }
}
