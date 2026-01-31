import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/loader";



import { useUserContext } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { userSignInAccountMutation } from "@/lib/react-query/quriesAndMutations";
import { SignInValidation } from "@/lib/validation";

const SigninForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  // Query
  const { mutateAsync: signInAccount, isPending } = userSignInAccountMutation();

  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignin = async (user: z.infer<typeof SignInValidation>) => {
    const session = await signInAccount(user);

    if (!session) {
      toast({ title: "Login failed. Please try again." });
      
      return;
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();

      navigate("/");
    } else {
      toast({ title: "Login failed. Please try again.", });
      
      return;
    }
  };

  return (
    <Form {...form}>
      <div className="w-full max-w-md sm:max-w-lg mx-auto flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-6 sm:mb-8">
          <img 
            src="/assets/images/logo.png" 
            alt="logo" 
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain drop-shadow-lg" 
          />
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 sm:mb-3">
          Log in to your account
        </h2>
        <p className="text-light-3 text-sm sm:text-base md:text-lg mt-1 sm:mt-2 text-center px-2 mb-6 sm:mb-8">
          Welcome back! Please enter your details.
        </p>
        <form
          onSubmit={form.handleSubmit(handleSignin)}
          className="flex flex-col gap-5 sm:gap-6 w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="shad-form_label text-base sm:text-lg font-medium">Email</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    className="shad-input text-base sm:text-lg h-12 sm:h-14 rounded-lg" 
                    placeholder="Enter your email"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="shad-form_label text-base sm:text-lg font-medium">Password</FormLabel>
                <FormControl>
                  <Input 
                    type="password" 
                    className="shad-input text-base sm:text-lg h-12 sm:h-14 rounded-lg" 
                    placeholder="Enter your password"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="shad-button_primary w-full text-base sm:text-lg font-semibold py-6 sm:py-7 mt-4 sm:mt-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {isPending || isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Log in"
            )}
          </Button>

          <p className="text-sm sm:text-base text-light-2 text-center mt-6 sm:mt-8">
            Don&apos;t have an account?{" "}
            <Link
              to="/sign-up"
              className="text-primary-500 font-semibold ml-1 hover:underline transition-colors">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SigninForm;