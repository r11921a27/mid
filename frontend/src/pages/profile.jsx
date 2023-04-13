import { useEffect, useState } from "react";
import services from "../services";
import { LockClosedIcon } from "@heroicons/react/20/solid";

function ProfilePage() {
  const [formData, setFormData] = useState({ username: "" });
  const [message, setMessage] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // 在這裡取得用戶資訊
    services.user.getUserInfo().then((data) => {
      setUserInfo(data);
    });
  }, []);

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
      });
    setFormData({ username: "", password: "" });
    event.preventDefault();
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
              <img
                className="mx-auto h-24 w-24 rounded-full"
                src={userInfo.image_url}
                alt="Profile picture"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;

