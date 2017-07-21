import { SubmissionError } from 'redux-form';

export function validateSignIn(values) {
  const { email, password } = values;

  // Validate Email
  if (!email) {
    throw new SubmissionError({
      email: 'Required',
      _error: 'Sign In Failed',
    });
  }

  // Validate Password
  if (!password) {
    throw new SubmissionError({
      password: 'Required',
      _error: 'Sign In Failed',
    });
  }
}

export function validateSignUp(values) {
  const { email, userName, password, passwordConf } = values;

  // Validate Email
  if (!email) {
    throw new SubmissionError({
      email: 'Required',
      _error: 'Sign In Failed',
    });
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    throw new SubmissionError({
      email: 'Invalid Email Address',
      _error: 'Sign Up Failed',
    });
  }

  // Validate Username
  if (!userName) {
    throw new SubmissionError({
      userName: 'Required',
      _error: 'Sign Up Failed',
    });
  } else if (!/^[a-z0-9]+$/i.test(userName)) {
    throw new SubmissionError({
      userName: 'Usernames may only contain alphanumberic characters',
      _error: 'Sign Up Failed',
    });
  } else if (userName.length > 10) {
    throw new SubmissionError({
      userName: 'Usernames have a maximum character limit of 10.',
      _error: 'Sign Up Failed',
    });
  }

  // Validate Password
  if (!password) {
    throw new SubmissionError({
      password: 'Required',
      _error: 'Sign Up Failed',
    });
  } else if (password.length < 8) {
    throw new SubmissionError({
      password: 'Password must be at least 8 characters',
      _error: 'Sign Up Failed',
    });
  }

  // Validate Password Confirmation
  if (!passwordConf) {
    throw new SubmissionError({
      passwordConf: 'Required',
      _error: 'Sign Up Failed',
    });
  } else if (password !== passwordConf) {
    throw new SubmissionError({
      passwordConf: 'Password confirmation must match password',
      _error: 'Sign Up Failed',
    });
  }
}
