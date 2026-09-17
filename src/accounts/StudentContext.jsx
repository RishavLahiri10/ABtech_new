import { createContext, useContext, useState } from 'react';

const StudentContext = createContext(null);

export function StudentProvider({ children }) {
  const [student, setStudent] = useState(null);
  const [profile, setProfile] = useState(null);

  // Demo only: replace these methods with API calls and a server session.
  // Passwords are validated by the form and never retained in account state.
  async function login({ email }) {
    setStudent(
      profile?.email === email
        ? profile
        : {
            fullName: 'Demo Student',
            email,
            applicationStatus: 'Not started',
          }
    );
  }

  async function register({ fullName, email }) {
    const nextProfile = { fullName, email, applicationStatus: 'Not started' };
    setProfile(nextProfile);
    setStudent(nextProfile);
  }

  async function requestPasswordReset() {
    return 'Demo only: your email format is valid. No recovery email was sent and no password was changed.';
  }

  function logout() {
    setStudent(null);
  }

  return (
    <StudentContext.Provider
      value={{ student, login, register, requestPasswordReset, logout }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export function useStudent() {
  return useContext(StudentContext);
}
