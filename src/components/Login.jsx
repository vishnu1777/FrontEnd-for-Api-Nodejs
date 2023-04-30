import React, { useState } from "react";
import { toast } from "react-hot-toast";
const Login = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);

  const handleUserChange = (e) => {
    setUserName(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://crud-api-qj0r.onrender.com/api/users/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );
    const data = await response.json();

    if (data) {
      setIsLoggedin(true);
      toast.success("Logged in successfully!!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (localStorage.getItem("mail") === email) {
      setIsRegistered(true);
      return;
    }
    console.log(userName, email, password);
    const response = await fetch(
      "https://crud-api-qj0r.onrender.com/api/users/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName,
          email,
          password,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    if (data) {
      setIsRegistered(true);
      localStorage.setItem("mail", email);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full max-w-xs">
        <form
          onSubmit={!isRegistered ? handleSubmit : handleLogin}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          {!isRegistered && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                UserName
              </label>
              <input
                onChange={handleUserChange}
                value={userName}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="userName"
                type="text"
                placeholder="Username"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              onChange={handleEmailChange}
              value={email}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              onChange={handlePasswordChange}
              value={password}
              className={`shadow appearance-none border ${
                password ? "border-gray-500" : "border-red-500"
              } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
              id="password"
              type="password"
              placeholder="******************"
            />
            <p
              className={`${
                password ? "text-green-400" : "text-red-500"
              } text-xs italic`}
            >
              {!password && "Please choose a password"}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {isRegistered ? "Login" : "Sign Up"}
            </button>
            {!isRegistered ? (
              <p
                className="  text-blue-700  cursor-pointer font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setIsRegistered(true)}
              >
                Log in
              </p>
            ) : (
              <p
                className="  text-blue-700  cursor-pointer font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setIsRegistered(false)}
              >
                SignUp
              </p>
            )}
          </div>
        </form>

        <p className="text-center text-gray-500 text-xs">
          &copy;2023 Open Source
        </p>
      </div>
    </div>
  );
};

export default Login;
