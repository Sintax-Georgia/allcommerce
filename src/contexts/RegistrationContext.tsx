import React, { createContext, ReactNode, useState } from "react";

export interface RegistrationContextType {
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  lastName: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  businessType: string;
  setBusinessType: React.Dispatch<React.SetStateAction<string>>;
}
export const RegistrationContext = createContext<RegistrationContextType>({
  firstName: "",
  setFirstName: () => {},
  lastName: "",
  setLastName: () => {},
  businessType: "",
  setBusinessType: () => {},
});
type Props = {
  children: ReactNode;
};

export const RegistrationContextProvider: React.FC<Props> = ({ children }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [businessType, setBusinessType] = useState("Business type");
  return (
    <RegistrationContext.Provider
      value={{
        firstName,
        setFirstName,
        lastName,
        setLastName,
        businessType,
        setBusinessType,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};
