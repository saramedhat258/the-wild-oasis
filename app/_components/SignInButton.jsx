import Image from "next/image";
import { signInAction } from "../_lib/actions";

function SignInButton() {
    return (
        <form action={signInAction}>
            <button className='flex items-center sm:gap-6 gap-2 sm:text-lg border border-primary-300 sm:px-10 px-4 py-4 font-medium'>
                <Image
                    src='https://authjs.dev/img/providers/google.svg'
                    alt='Google logo'
                    height='24'
                    width='24'
                />
                <span>Continue with Google</span>
            </button>
        </form>

    );
}

export default SignInButton;