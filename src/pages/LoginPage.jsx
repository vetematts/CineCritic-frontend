import { NavLink } from "react-router-dom";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <main>
      <h1>CineCritic</h1>
      <LoginForm />
      <p>
        Don&apos;t have an account? <NavLink to = "/signup">Create one</NavLink>
      </p>
    </main>
  );
}
