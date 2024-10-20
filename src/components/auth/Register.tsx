import React, { useState } from "react";
import { useAppDispatch } from "../../redux/store";
import { registerAsync } from "../../redux/slices/user";

const RegisterPage = () => {
  const [registerInformation, setRegistrationInformation] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setRegistrationInformation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        email: registerInformation.email,
        password: registerInformation.password,
      };
      
        const response = await dispatch(registerAsync(payload));
        if (response.payload.success) {
          window.location.href = "/notes";
        }
    } catch (error: any) {
      setError(error);
    } finally {
      setError("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
        <form onSubmit={handelSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name={"email"}
              value={registerInformation.email}
              onChange={handleOnChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name={"password"}
              value={registerInformation.password}
              onChange={handleOnChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name={"confirmPassword"}
              value={registerInformation.confirmPassword}
              onChange={handleOnChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <a href="/" className="text-blue-500">
              Login
            </a>
          </p>{" "}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
