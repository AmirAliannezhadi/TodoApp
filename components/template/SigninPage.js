import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { data, status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status]);
  console.log({ data, status });
  const loginHandler = async () => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false
    });
    console.log(res);
    if (!res.error) {
        router.push("/")
    }
  };
  return (
    <div className="signin-form">
      <h3>Login Form</h3>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={loginHandler}>Login</button>
      <div>
        <p>Create an acount?</p>
        <Link href="/signup">Sign Up</Link>
      </div>
    </div>
  );
}

export default SigninPage;
