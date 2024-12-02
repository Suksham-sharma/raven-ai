import { Loader } from "@/components/loaders";
import { AuthContextProvider } from "@/context/use-auth-context";
import { useSignUpForm } from "@/hooks/sign-up/use-sign-up";
import { FormProvider } from "react-hook-form";

interface SignUpFormProviderProps {
  children: React.ReactNode;
}

const SignUpFormProvider: React.FC<SignUpFormProviderProps> = ({
  children,
}: SignUpFormProviderProps) => {
  const { methods, handleSubmit, loading } = useSignUpForm();
  return (
    <AuthContextProvider>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit} className="h-full">
          <div className="flex flex-col gap-3 justify-between h-full">
            <Loader loading={loading}>{children}</Loader>
          </div>
        </form>
      </FormProvider>
    </AuthContextProvider>
  );
};

export default SignUpFormProvider;
