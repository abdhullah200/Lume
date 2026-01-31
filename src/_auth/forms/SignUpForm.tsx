import * as z from "zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";




import { SignupValidation } from "@/lib/validation";
import { useUserContext } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { userCreateUserAccountMutation, userSignInAccountMutation } from "@/lib/react-query/quriesAndMutations";
import { Loader } from "lucide-react";

const SignupForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // Queries
  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = userCreateUserAccountMutation();
  const { mutateAsync: signInAccount, isPending: isSigningInUser } = userSignInAccountMutation();

  // Handler
  const handleSignup = async (user: z.infer<typeof SignupValidation>) => {
    try {
      const newUser = await createUserAccount(user);

      if (!newUser) {
        toast({ title: "Sign up failed. Please try again.", });
        
        return;
      }

      const session = await signInAccount({
        email: user.email,
        password: user.password,
      });

      if (!session) {
        toast({ title: "Something went wrong. Please login your new account", });
        
        navigate("/sign-in");
        
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
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Form {...form}>
      <div className="w-full max-w-md sm:max-w-lg mx-auto flex-center flex-col px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-6 sm:mb-8">
          <img 
            src="/assets/images/logo.png" 
            alt="logo" 
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain drop-shadow-lg" 
          />
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 sm:mb-3">
          Create a new account
        </h2>
        <p className="text-light-3 text-sm sm:text-base md:text-lg mt-1 sm:mt-2 text-center px-2 mb-6 sm:mb-8">
          To use snapgram, Please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(handleSignup)}
          className="flex flex-col gap-5 sm:gap-6 w-full">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="shad-form_label text-base sm:text-lg font-medium">Name</FormLabel>
                <FormControl>
                  <Input 
                    type="text" 
                    className="shad-input text-base sm:text-lg h-12 sm:h-14 rounded-lg" 
                    placeholder="Enter your name"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="shad-form_label text-base sm:text-lg font-medium">Username</FormLabel>
                <FormControl>
                  <Input 
                    type="text" 
                    className="shad-input text-base sm:text-lg h-12 sm:h-14 rounded-lg" 
                    placeholder="Choose a username"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                    placeholder="Create a password"
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
            {isCreatingAccount || isSigningInUser || isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>

          <p className="text-sm sm:text-base text-light-2 text-center mt-6 sm:mt-8">
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className="text-primary-500 font-semibold ml-1 hover:underline transition-colors">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignupForm;