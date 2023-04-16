import { useEffect, useState } from "react";
import services from "../services";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useLocation } from 'react-router-dom';

function ProfilePage() {
  const [formData, setFormData] = useState({ username: "" });
  const [message, setMessage] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const getName = params.get('name');
  const getPassword = params.get('password');

  useEffect(() => {
    if (!getName || !getPassword) {
        services.user
        .signInAccount( {name: formData.username, password: formData.password} )
        .then((data) => {
        setUserInfo(data);
        });
    }else{
        services.user
        .signInAccount( {name: getName, password: getPassword} )
        .then((data) => {
        setUserInfo(data);
        });
    }
  }, []);

  const handleTextInputChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event) => {
    services.user
      .updateImage({ name: formData.username, image_url: formData.image_url })
      .then((data) => {
        setMessage(JSON.stringify(data, null, 2));
        setFormData({ image_url: "", name: "", password: "" });
        setUserInfo((prev) => ({
          ...prev,
          image_url: data.image_url,
        }));
      });
  };

  const handleImageChange = () => {
    const newImageUrl = prompt("Enter new image URL:");
    setFormData((prev) => ({
      ...prev,
      image_url: newImageUrl,
    }));
  };

  return (
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
              Welcome back, {userInfo && userInfo.name}!
            </h2>
          </div>
          <div>
            {userInfo && (
              <div>
                <img
                  className="mx-auto h-240 w-240 rounded-full cursor-pointer object-cover"
                  src={userInfo.image_url}
                  alt="Profile picture"
                  onClick={() => {
                    const newImageUrl = prompt("Enter new image URL:");
                    setFormData((prev) => ({
                      ...prev,
                      image_url: newImageUrl,
                    }));
                  }}
                />
                <p className="text-center mt-2 text-sm font-medium text-gray-600">
                  Click to update profile picture
                </p>
              </div>
            )}
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="image_url" className="sr-only">
                  Image URL
                </label>
                <input
                  name="image_url"
                  type="text"
                  required
                  className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="New profile picture URL"
                  value={formData.image_url}
                  onChange={handleTextInputChange}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
            Update Picture
          </button>
        </div>
      </form>
    </div>
  </div>
  <pre>{message}</pre>
</>
);
}

export default ProfilePage;
