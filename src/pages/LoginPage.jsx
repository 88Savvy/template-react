import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PapyrusIcon from "../images/papyrus-icon.png";

function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // Make a POST request to your login route with user data
      const response = await axios.post(
        "https://papyrus-server.cyclic.app/user/login",
        {
          email: form.email,
          password: form.password,
        }
      );

      // Assuming your backend sends a token upon successful login, you can store it in localStorage
      const token = response.data.token;
      localStorage.setItem("userToken", token);
      const userId = response.data.user._id;
      localStorage.setItem("userId", userId);

      navigate("/profile");
    } catch (error) {
      // Handle login error
      console.log(error);
    }
  }

  function handleRadio(e) {
    setUserType(e.target.value);
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-14 w-auto"
          src={PapyrusIcon}
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 text-gray-900">
          Sign in to your account
        </h2>

        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email Address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={form.password}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full justify-center rounded-md bg-papyrus px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign In
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-xs text-gray-500">
          Having trouble logging in?{" "}
          <a
            href="https://wa.me/+5511999999999/?text=Não%20consegui%20me%20cadastrar%20no%20site"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            target="_blank"
            rel="noreferrer noopener"
          >
            Contact the Papyrus team
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;

/* 
VERSÃO SEM ESTILO
  <div>
      <div>
         <img
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
         />
         <h2>Entre na sua conta</h2>

         <form onSubmit={handleSubmit}>
            <div>
               <label htmlFor="email">Email</label>
               <div>
                  <input
                     id="email"
                     name="email"
                     type="email"
                     autoComplete="email"
                     required
                     value={form.email}
                     onChange={handleChange}
                  />
               </div>
            </div>

            <div>
               <label htmlFor="password">Senha</label>
               <div>
                  <input
                     id="password"
                     name="password"
                     type="password"
                     autoComplete="current-password"
                     required
                     value={form.password}
                     onChange={handleChange}
                  />
               </div>
            </div>

            <div>
               <button type="submit">Entrar</button>
            </div>
         </form>
      </div>
   </div>

*/
