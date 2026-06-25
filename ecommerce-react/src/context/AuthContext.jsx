import { createContext, useContext, useEffect, useMemo, useState } from "react";

// Global auth store for logged-in user and auth actions.
const AuthContext = createContext(null);

const AUTH_USER_KEY = "easybuy_auth_user";
const USERS_KEY = "easybuy_users";

function readStoredUser() {
  try {
    const rawUser = localStorage.getItem(AUTH_USER_KEY);
    return rawUser ? JSON.parse(rawUser) : null;
  } catch {
    return null;
  }
}

function readUsers() {
  try {
    const rawUsers = localStorage.getItem(USERS_KEY);
    return rawUsers ? JSON.parse(rawUsers) : [];
  } catch {
    return [];
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Restore user session when app loads.
  useEffect(() => {
    const storedUser = readStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = async (email, password) => {
    const users = readUsers();
    const foundUser = users.find(
      (item) => item.email.toLowerCase() === email.toLowerCase(),
    );

    if (!foundUser || foundUser.password !== password) {
      throw new Error("Invalid email or password.");
    }

    const sessionUser = { name: foundUser.name, email: foundUser.email };
    setUser(sessionUser);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(sessionUser));
    return sessionUser;
  };

  const signup = async (name, email, password) => {
    const users = readUsers();
    const exists = users.some(
      (item) => item.email.toLowerCase() === email.toLowerCase(),
    );

    if (exists) {
      throw new Error("An account with this email already exists.");
    }

    const newUser = { name: name.trim(), email: email.trim(), password };
    writeUsers([...users, newUser]);

    return { name: newUser.name, email: newUser.email };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_USER_KEY);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      signup,
      logout,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }

  return context;
}
