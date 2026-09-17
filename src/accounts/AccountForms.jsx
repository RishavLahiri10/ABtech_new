import { useRef, useState } from 'react';
import { useStudent } from './StudentContext';
import { validateAccount } from './validation';

function FormField({ label, error, hint, ...inputProps }) {
  const id = `account-${inputProps.name}`;
  return (
    <div className="account-field">
      <label htmlFor={id}>{label}</label>
      <input
        {...inputProps}
        id={id}
        required
        aria-invalid={Boolean(error)}
        aria-describedby={
          error ? `${id}-error` : hint ? `${id}-hint` : undefined
        }
      />
      {hint && !error && (
        <p className="field-hint" id={`${id}-hint`}>
          {hint}
        </p>
      )}
      {error && (
        <p className="field-error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

function AccountForm({ mode, onSuccess }) {
  const { login, register, requestPasswordReset } = useStudent();
  const [values, setValues] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [failure, setFailure] = useState('');
  const formRef = useRef(null);
  const pending = useRef(false);

  function change(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({
      ...current,
      [name]: '',
      ...(name === 'password' ? { confirmPassword: '' } : {}),
    }));
    setMessage('');
    setFailure('');
  }

  async function submit(event) {
    event.preventDefault();
    if (pending.current) return;
    const nextErrors = validateAccount(values, mode);
    setErrors(nextErrors);
    setMessage('');
    setFailure('');
    if (Object.keys(nextErrors).length) {
      formRef.current.elements.namedItem(Object.keys(nextErrors)[0]).focus();
      return;
    }
    pending.current = true;
    setBusy(true);
    const details = {
      ...values,
      fullName: values.fullName.trim(),
      email: values.email.trim().toLowerCase(),
    };
    try {
      if (mode === 'reset') {
        setMessage(await requestPasswordReset({ email: details.email }));
      } else {
        if (mode === 'register') await register(details);
        else await login(details);
        setValues({
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        onSuccess();
      }
    } catch {
      setFailure('We could not complete your request. Please try again.');
    } finally {
      pending.current = false;
      setBusy(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={submit} noValidate aria-busy={busy}>
      <fieldset disabled={busy}>
        <legend className="account-sr-only">
          {mode === 'register'
            ? 'Student registration'
            : mode === 'reset'
              ? 'Password recovery'
              : 'Student login'}
        </legend>
        {mode === 'register' && (
          <FormField
            name="fullName"
            label="Full name"
            autoComplete="name"
            maxLength={80}
            value={values.fullName}
            onChange={change}
            error={errors.fullName}
          />
        )}
        <FormField
          name="email"
          label="Email address"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={change}
          error={errors.email}
        />
        {mode !== 'reset' && (
          <FormField
            name="password"
            label="Password"
            type="password"
            autoComplete={
              mode === 'register' ? 'new-password' : 'current-password'
            }
            value={values.password}
            onChange={change}
            error={errors.password}
            hint={
              mode === 'register'
                ? 'Use 8–128 characters. Use a sample password for this demo.'
                : undefined
            }
          />
        )}
        {mode === 'register' && (
          <FormField
            name="confirmPassword"
            label="Confirm password"
            type="password"
            autoComplete="new-password"
            value={values.confirmPassword}
            onChange={change}
            error={errors.confirmPassword}
          />
        )}
        <button className="button account-submit" type="submit">
          {busy
            ? 'Please wait…'
            : mode === 'register'
              ? 'Create demo account'
              : mode === 'reset'
                ? 'Preview recovery request'
                : 'Log in to demo'}
        </button>
      </fieldset>
      <div role="status">{message && <p className="notice">{message}</p>}</div>
      {failure && (
        <p role="alert" className="field-error">
          {failure}
        </p>
      )}
    </form>
  );
}

export function LoginForm(props) {
  return <AccountForm mode="login" {...props} />;
}
export function RegistrationForm(props) {
  return <AccountForm mode="register" {...props} />;
}
export function PasswordResetForm(props) {
  return <AccountForm mode="reset" {...props} />;
}
