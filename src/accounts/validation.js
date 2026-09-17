export function validateAccount(values, mode) {
  const errors = {};
  if (
    mode === 'register' &&
    (values.fullName.trim().length < 2 || values.fullName.trim().length > 80)
  ) {
    errors.fullName = 'Enter your full name using 2–80 characters.';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Enter a valid email address, such as name@example.com.';
  }
  if (mode !== 'reset' && !values.password.trim()) {
    errors.password = 'Enter your password.';
  } else if (
    mode === 'register' &&
    (values.password.length < 8 || values.password.length > 128)
  ) {
    errors.password = 'Use a password with 8–128 characters.';
  }
  if (
    mode === 'register' &&
    (!values.confirmPassword || values.confirmPassword !== values.password)
  ) {
    errors.confirmPassword = 'Your passwords must match.';
  }
  return errors;
}
