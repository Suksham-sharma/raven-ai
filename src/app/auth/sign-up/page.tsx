"use client";
import SignUpFormProvider from "@/components/forms/sign-up/form-provider";

interface SignUpProps {}

const SignUp = () => {
  return (
    <div className="flex-1 py-36 md:px-16 w-full">
      <div className="flex flex-col h-full gap-3">
        <SignUpFormProvider>
          <div className="flex flex-col">HEy</div>
        </SignUpFormProvider>
      </div>
    </div>
  );
};

export default SignUp;
