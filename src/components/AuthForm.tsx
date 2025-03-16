import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { loginWithGithub, loginWithGoogle } from '@/lib/auth.ts';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { FC } from 'react';
import { Link } from 'react-router-dom';

type FormData = {
  email: string;
  password: string;
};

type AuthFormProps = {
  title: string;
};

const AuthForm: FC<AuthFormProps> = ({ title }) => {
  const { register: formRegister, handleSubmit } = useForm<FormData>();

  const onSubmit = () => {};

  return (
    <div className="w-1/3 mt-80 flex flex-col gap-5 items-center">
      <h1 className="text-2xl font-bold">{title}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full">
        <Input
          type="email"
          placeholder="Email"
          {...formRegister('email')}
          className="py-5 border-none bg-secondaryBg"
        />
        <Input
          type="password"
          placeholder="Password"
          {...formRegister('password')}
          className="py-5 border-none bg-secondaryBg"
        />
        <Button
          type="submit"
          className="bg-secondary-background text-secondary hover:bg-secondary py-5 hover:text-white"
        >
          {title}
        </Button>
      </form>
      {title === 'Sign In' && (
        <>
          <span className="font-medium">Forgot password?</span>
          <span className="text-muted-foreground">OR</span>
          <div className="flex gap-3">
            <Button onClick={loginWithGoogle}>
              <FaGoogle />
            </Button>
            <Button onClick={loginWithGithub}>
              <FaGithub />
            </Button>
          </div>
        </>
      )}
      <div className="flex gap-3">
        <span className="text-muted-foreground">
          {title === 'Sign In' ? 'No account yet?' : 'Already have an account?'}
        </span>
        <Link to={title === 'Sign In' ? '/sign-up' : '/sign-in'} className="font-medium">
          {title === 'Sign In' ? 'Sign Up' : 'Sign In'}
        </Link>
      </div>
    </div>
  );
};

export default AuthForm;
