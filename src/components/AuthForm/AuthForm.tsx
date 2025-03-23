import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { login, loginWithGithub, loginWithGoogle, register } from '@/lib/auth.ts';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore.ts';
import { auth } from '@/lib/firebaseConfig.ts';
import { toast } from 'sonner';

type FormData = {
  email: string;
  password: string;
};

type AuthFormProps = {
  title: string;
};

const AuthForm: FC<AuthFormProps> = ({ title }) => {
  const { register: formRegister, handleSubmit } = useForm<FormData>();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      if (user) {
        await login(data.email, data.password);
      } else {
        await register(data.email, data.password);
        if (auth.currentUser) {
          navigate('/');
        }
      }
    } catch (err) {
      console.error('Auth error', err);
    }
  };

  return (
    <div className="w-1/3 flex flex-col gap-7 items-center">
      <h1 className="text-2xl font-montserrat text-white font-bold">{title}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full">
        <Input
          type="email"
          placeholder="Email"
          autoComplete="off"
          {...formRegister('email')}
          className="border-none bg-accent text-white h-12"
        />
        <Input
          type="password"
          placeholder="Password"
          autoComplete="off"
          {...formRegister('password')}
          className="border-none bg-accent text-white h-12"
        />
        <Button variant="secondary" type="submit" className=" h-12 hover:text-white">
          {title}
        </Button>
      </form>
      {title === 'Sign In' && (
        <>
          <Button variant="link" onClick={() => toast('Your password: 123 :)')} className="text-sm">
            Forgot password?
          </Button>
          <span className="text-muted-foreground text-sm">OR</span>
          <div className="flex gap-1">
            <Button onClick={loginWithGoogle} className="hover:text-[#4080ee] hover:bg-foreground">
              <FaGoogle />
            </Button>
            <Button onClick={loginWithGithub} className="hover:text-black hover:bg-foreground">
              <FaGithub />
            </Button>
          </div>
        </>
      )}
      <div className="flex items-center">
        <span className="text-muted-foreground text-sm">
          {title === 'Sign In' ? 'No account yet?' : 'Already have an account?'}
        </span>
        <Link to={title === 'Sign In' ? '/sign-up' : '/sign-in'} className="font-medium">
          <Button variant="link" className="text-sm">
            <span>{title === 'Sign In' ? 'Sign Up' : 'Sign In'}</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AuthForm;
