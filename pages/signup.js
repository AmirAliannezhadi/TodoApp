import { getSession } from "next-auth/react";
import SignupPage from "../components/template/SignupPage";

function Signup() {
  return <SignupPage />;
}

export default Signup;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  console.log(session);
  if (session) {
    return {
      redirect: { destination: "/", permanent: false },
    };
  } else {
    return {
      props: { session },
    };
  }
}
