import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/api";
import PapyrusIcon from "../images/papyrus-icon.png";

function SignupPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });
  const [photo, setPhoto] = useState();

  // controll input
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function getUrl(photo) {
    //photo = state com a foto guardada
    try {
      const multiPartForm = new FormData();

      multiPartForm.append("picture", photo);

      const response = await api.post("/upload/file", multiPartForm);

      console.log(response);

      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    //lógica de submit do form
    e.preventDefault();
    try {
      //chamada para api de upload
      const url = await getUrl(photo);

      const formWithPhoto = {
        ...form,
        profilePicture: url,
      };

      await api.post(
        "https://papyrus-server.cyclic.app/user/signup",
        formWithPhoto
      );

      navigate("/login");
    } catch (error) {
      // Check if the error message indicates a duplicate email
      if (error.response && error.response.status === 500) {
        alert("Email already registered. Please use a different email.");
      } else {
        alert("Error creating user");
      }
      console.error(error);
    }
  }

  function handlePhoto(e) {
    setPhoto(e.target.files[0]);
  }

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src={PapyrusIcon}
            alt="Your Company"
          />
          <h2 className="mt-4 text-center text-2xl font-bold leading-9 text-gray-900">
            Sign up for Papyrus
          </h2>

          <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={form.username}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

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
                  autoComplete="new-password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="mt-2">
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Profile Picture
              </label>
              <div className="flex items-center mt-1 ">
                <label
                  htmlFor="photo"
                  className="w-full text-center cursor-pointer bg-gray-400 px-4 py-1.5 text-sm font-semibold text-gray-600 rounded-md shadow-md hover:bg-gray-500 transition duration-300 ease-in-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5 inline-block mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Choose a Photo
                </label>
                <input
                  id="photo"
                  name="photo"
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handlePhoto}
                  className="hidden"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full justify-center rounded-md bg-papyrus px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                SIGN UP
              </button>
            </div>
          </form>

          <p className="mt-5 text-center text-xs text-gray-500">
            Problems signing up?{" "}
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
    </div>
  );
}

export default SignupPage;

/* 
SEM AS CLASSES
<div>
   <div>
      <img
         src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
         alt="Your Company"
      />
      <h2>Cadastre-se na plataforma</h2>

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
                  autoComplete="new-password"
                  required
                  value={form.password}
                  onChange={handleChange}
               />
            </div>
         </div>

         <div>
            <label htmlFor="photo">Foto de perfil</label>
            <div>
               <label htmlFor="photo" className="cursor-pointer">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                     />
                  </svg>
                  Escolher Foto
               </label>
               <input
                  id="photo"
                  name="photo"
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handlePhoto}
                  className="hidden"
               />
            </div>
         </div>

         <div>
            <button type="submit">CADASTRE-SE</button>
         </div>
      </form>

      <p>
         Problemas com o cadastro?{" "}
         <a
            href="https://wa.me/+5511999999999/?text=Não%20consegui%20me%20cadastrar%20no%20site"
            target="_blank"
            rel="noreferrer noopener"
         >
            Entre em contato com a gente
         </a>
      </p>
   </div>
</div>

*/
