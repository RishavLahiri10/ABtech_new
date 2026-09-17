import { useEffect, useRef, useState } from 'react';
import { LoginForm, PasswordResetForm, RegistrationForm } from './AccountForms';

const headings = {
  login: 'Welcome back.',
  register: 'Your next chapter starts here.',
  reset: 'Forgot your password?',
};

export default function AccountModal({ onClose, onSuccess }) {
  const [mode, setMode] = useState('login');
  const dialogRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const trigger = document.activeElement;
    dialog.showModal();
    document.body.classList.add('account-modal-open');
    return () => {
      dialog.close();
      document.body.classList.remove('account-modal-open');
      if (trigger?.isConnected) trigger.focus();
    };
  }, []);

  useEffect(() => {
    titleRef.current?.focus();
  }, [mode]);

  return (
    <dialog
      ref={dialogRef}
      className="account-dialog"
      aria-labelledby="account-title"
      aria-describedby="account-demo-note"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <button
        className="account-close"
        type="button"
        aria-label="Close student account dialog"
        onClick={onClose}
      >
        ✕
      </button>
      <p className="eyebrow">STUDENT ACCOUNTS</p>
      <h2 id="account-title" ref={titleRef} tabIndex={-1}>
        {headings[mode]}
      </h2>
      <p id="account-demo-note" className="account-demo-note">
        Frontend demo.{' '}
        {mode === 'login'
          ? 'Any valid email and non-empty sample password opens a demo session; credentials are not verified.'
          : mode === 'register'
            ? 'Registration creates a temporary demo profile, not a real account.'
            : 'Preview the recovery form; no email will be sent.'}{' '}
        Details reset when you refresh.
      </p>
      {mode === 'login' && <LoginForm onSuccess={onSuccess} />}
      {mode === 'register' && <RegistrationForm onSuccess={onSuccess} />}
      {mode === 'reset' && <PasswordResetForm />}
      <div className="account-switch">
        {mode === 'login' ? (
          <>
            <button type="button" onClick={() => setMode('reset')}>
              Forgot password?
            </button>
            <p>
              New to AB Tech Learning?{' '}
              <button type="button" onClick={() => setMode('register')}>
                Register
              </button>
            </p>
          </>
        ) : (
          <button type="button" onClick={() => setMode('login')}>
            Back to login
          </button>
        )}
      </div>
    </dialog>
  );
}
