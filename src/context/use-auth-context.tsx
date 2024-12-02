import React, { useState } from "react";

interface initialValueProps {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const initialValue = {
  currentStep: 1,
  setCurrentStep: () => undefined,
};

const authContext = React.createContext<initialValueProps>(initialValue);

const { Provider } = authContext;

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentStep, setCurrentStep] = useState<number>(
    initialValue.currentStep
  );
  const values = {
    currentStep,
    setCurrentStep,
  };
  return <Provider value={values}>{children}</Provider>;
};

export const useAuthContextHook = () => {
  const state = React.useContext(authContext);
  return state;
};
