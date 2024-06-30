import { useRouter } from "next/navigation";

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  deleteUser,
} from "firebase/auth";

import { useToast } from "@/components/ui/use-toast";
import { handleSetToken } from "@/lib/actions/setToken";

import { FcGoogle } from "react-icons/fc";

export function GoogleLoginButton() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  const { toast } = useToast();

  async function handleSignInWithGoogle() {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const whitelistedEmails =
      process.env.NEXT_PUBLIC_WHITELISTED_EMAILS?.split(",");

    try {
      if (!whitelistedEmails?.includes(user.email || "")) {
        await deleteUser(user);
        await signOut(auth);
        return toast({
          title: "Seu email não tem permissões de criação de conta!",
          variant: "destructive",
        });
      }

      const idToken = await user.getIdToken();
      handleSetToken({ idToken });

      toast({
        title: "Login realizado com sucesso!",
        description: "Redirecionando para a loja em 3 segundos...",
      });

      // Delay de 3 segundos
      await new Promise((resolve) => setTimeout(resolve, 3000));

      router.push("/store/new-product");
    } catch (err) {
      console.error(err);
      await deleteUser(user);
      await signOut(auth);
    }
  }

  return (
    <button
      className="
            inline-flex
            items-center
            justify-center
            gap-4
            px-6
            py-3
            rounded-full
            whitespace-nowrap
            text-md   
            border
            border-black
            shadow-md
            ring-offset-background
            hover:bg-gray-100
            transition-colors
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-ring
            focus-visible:ring-offset-2
        "
      onClick={handleSignInWithGoogle}
    >
      <FcGoogle size={32} />
      Login com Google
    </button>
  );
}
