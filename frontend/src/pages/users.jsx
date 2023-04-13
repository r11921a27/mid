import { useEffect, useState } from "react";
import services from "../services";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useHistory } from "react-router-dom";

function UserPage() {
  const [formData, setFormData] = useState({ username: "" });
  const [message, setMessage] = useState("");

  const handleTextInputChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event) => {
    services.user
      .signInAccount({ name: formData.username, password: formData.password })
      .then((data) => {
        setMessage(JSON.stringify(data, null, 2));
        setUser(data);
        history.push("/profile");
      });
    setFormData({ username: "", password: "" });
    event.preventDefault();
  };

  return(
  <>
  <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="w-full max-w-md space-y-8">
      <div>
        <img
          className="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in your account
        </h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
        <div className="-space-y-px rounded-md shadow-sm">
          <div>
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <input
              name="username"
              type="text"
              required
              className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Username"
              value={formData.username}
              onChange={handleTextInputChange}
            />
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Password"
              value={formData.password}
              onChange={handleTextInputChange}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon
                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              />
            </span>
            Sign-In
          </button>
        </div>
      </form>
    </div>
  </div>
  <pre>{message}</pre>
</>
);
}

export default UserPage;
