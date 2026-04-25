import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  type: "faculty" | "student";
  password: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (id: string, password: string, type: "faculty" | "student") => boolean;
  loginWithId: (
    id: string,
    password: string
  ) => { success: boolean; message: string; userType?: "faculty" | "student" };
  logout: () => void;
  register: (name: string, password: string, type: "faculty" | "student") => string;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }

    // Initialize default users if none exist
    const users = localStorage.getItem("users");
    if (!users) {
      const defaultUsers: User[] = [
        {
          id: "FA-1001",
          name: "Dr. John Anderson",
          type: "faculty",
          password: "faculty123"
        },
        {
          id: "ST-1001",
          name: "Emma Wilson",
          type: "student",
          password: "student123"
        }
      ];
      localStorage.setItem("users", JSON.stringify(defaultUsers));
      localStorage.setItem("nextFacultyId", "1002");
      localStorage.setItem("nextStudentId", "1002");
    }
  }, []);

  const login = (id: string, password: string, type: "faculty" | "student"): boolean => {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) => u.id === id && u.password === password && u.type === type
    );

    if (user) {
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      return true;
    }
    return false;
  };

  const loginWithId = (
    id: string,
    password: string
  ): { success: boolean; message: string; userType?: "faculty" | "student" } => {
    const normalizedId = id.trim().toUpperCase();
    const normalizedPassword = password.trim();

    if (!normalizedId || !normalizedPassword) {
      return {
        success: false,
        message: "Please enter both your ID and password.",
      };
    }

    let userType: "faculty" | "student" | null = null;
    if (normalizedId.startsWith("FA-")) userType = "faculty";
    if (normalizedId.startsWith("ST-")) userType = "student";

    if (!userType) {
      return {
        success: false,
        message: "Invalid ID format. Use FA-xxxx for faculty or ST-xxxx for students.",
      };
    }

    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (entry) =>
        entry.id.toUpperCase() === normalizedId &&
        entry.password === normalizedPassword &&
        entry.type === userType
    );

    if (!user) {
      return {
        success: false,
        message: "Incorrect ID or password. Please try again.",
      };
    }

    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
    return { success: true, message: "Login successful.", userType };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  const register = (name: string, password: string, type: "faculty" | "student"): string => {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    let newId: string;
    if (type === "faculty") {
      const nextId = parseInt(localStorage.getItem("nextFacultyId") || "1001");
      newId = `FA-${nextId}`;
      localStorage.setItem("nextFacultyId", (nextId + 1).toString());
    } else {
      const nextId = parseInt(localStorage.getItem("nextStudentId") || "1001");
      newId = `ST-${nextId}`;
      localStorage.setItem("nextStudentId", (nextId + 1).toString());
    }

    const newUser: User = {
      id: newId,
      name,
      type,
      password
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    return newId;
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        loginWithId,
        logout,
        register,
        isAuthenticated: !!currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
