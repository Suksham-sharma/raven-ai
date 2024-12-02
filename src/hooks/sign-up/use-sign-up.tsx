import { useState } from "react";
import { useToast } from "../use-toast";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  UserRegistrationProps,
  UserRegistrationSchema,
} from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { onCompleteUserRegistration } from "@/actions/auth";

export const useSignUpForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const { signUp, isLoaded, setActive } = useSignUp();
  const router = useRouter();

  const methods = useForm<UserRegistrationProps>({
    resolver: zodResolver(UserRegistrationSchema),
    defaultValues: {
      type: "owner",
    },
    mode: "onChange",
  });

  const handleGenerateOTP = async (
    email: string,
    password: string,
    onNext: React.Dispatch<React.SetStateAction<number>>
  ) => {
    if (!isLoaded) return;
    try {
      await signUp.create({
        emailAddress: email,
        password: password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      onNext((prev) => prev + 1);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.errors[0].longMessage,
      });
    }
  };

  const handleSubmit = methods.handleSubmit(
    async (data: UserRegistrationProps) => {
      if (!isLoaded) return;
      try {
        setLoading(true);
        const completeSignUp = await signUp.attemptEmailAddressVerification({
          code: data.otp,
        });

        if (completeSignUp.status !== "complete") {
          return { message: "Something went wrong" };
        }

        if (completeSignUp.status === "complete") {
          if (!signUp.createdUserId) return;

          const registered = await onCompleteUserRegistration(
            data.fullName,
            signUp.createdUserId,
            data.type
          );

          if (registered?.status == 200 && registered?.user) {
            await setActive({
              session: completeSignUp.createdSessionId,
            });

            setLoading(false);
            router.push("/dashboard");
          }
        }
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.errors[0].longMessage,
        });
      }
    }
  );
  return { methods, handleSubmit, handleGenerateOTP, loading };
};
