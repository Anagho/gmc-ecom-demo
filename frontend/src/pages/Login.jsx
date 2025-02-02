import { Button, Input } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import validator from "validator";
import { serverUrl } from "../utils/helper";
import { updateUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [userFormData, setUserFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  async function handleUserLogin() {
    if (validator.isEmail(userFormData.email) === false) {
      return alert("Please provide a valid email");
    }

    if (
      validator.isStrongPassword(userFormData.password, {
        minLength: 6,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUpperCase: 1,
      }) === false
    ) {
      return alert(
        "Password must contain UPPERCASE, lowercase, number, special character and a digit"
      );
    }

    setIsLoading(true);
    // Now we can login the user successfully
    try {
      const response = await axios.post(
        `${serverUrl}/auth/login`,
        userFormData
      );

      if (response.data.status === "success") {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        dispatch(updateUser(response.data.user));
      }

      if (response.data.user.userType === "admin") {
        return navigate("/admin");
      }

      navigate("/profile");
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* <div className="grid h-screen place-items-center p-2">
        <form className="flex flex-col gap-4 w-full max-w-[500px] border p-4 rounded-lg">
          <h3 className="text-2xl text-green-800 text-center">Welcome Back</h3>
          <p className="text-gray-500 text-lg font-light text-center">
            Enter your login details to continue
          </p>
          <Input
            onChange={(e) =>
              setUserFormData({ ...userFormData, email: e.target.value })
            }
            placeholder="Enter your email"
            size="large"
          />
          <Input.Password
            onChange={(e) =>
              setUserFormData({ ...userFormData, password: e.target.value })
            }
            placeholder="Password"
            size="large"
          />
          <Button
            onClick={handleUserLogin}
            loading={isLoading}
            type="primary"
            variant="solid"
            color="green"
          >
            Login
          </Button>

          <p>
            Don't have an account yet?{" "}
            <Link className="font-semibold text-gray-500" to={"/register"}>
              Register here
            </Link>
          </p>
        </form>
      </div> */}

      <main className="flex items-center justify-center min-h-screen bg-gray-100">
        <section className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          {/* ** Login Section ** */}
          <div className="flex flex-col justify-center p-8 md:p-16">
            <h1 class="mb-3 text-center text-2xl md:text-3xl font-normal text-green-900">
              Welcome back
            </h1>
            <p class="font-light text-gray-400 mb-8">
              Please enter your details to continue
            </p>

            <form className="space-y-6">
              <Input
                onChange={(e) =>
                  setUserFormData({ ...userFormData, email: e.target.value })
                }
                placeholder="Enter your email"
                size="large"
                class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 outline-none"
              />

              <Input.Password
                onChange={(e) =>
                  setUserFormData({
                    ...userFormData,
                    password: e.target.value,
                  })
                }
                placeholder="Password"
                size="large"
                class="w-full placeholder:font-light placeholder:text-gray-500 outline-none"
              />

              <div class="flex justify-between items-center w-full py-4">
                <div class="flex items-center">
                  <input type="checkbox" class="mr-2" />
                  <label for="remember" class="text-[0.8rem]">
                    Remember me
                  </label>
                </div>
                <a href="#" class="font-bold text-[0.8rem]">
                  Forgot Password?
                </a>
              </div>

              <Button
                onClick={handleUserLogin}
                loading={isLoading}
                type="primary"
                variant="solid"
                size="large"
                block
              >
                Login
              </Button>

              <button class="w-full border border-gray-300 text-md p-2 outline-none rounded-lg mb-6 hover:bg-black hover:text-white hover:border-transparent transition-background duration-300 ease-linear">
                <img
                  src="/images/google-color-icon.svg"
                  alt="google"
                  class="w-6 h-6 inline mr-2"
                />
                Sign in with Google
              </button>

              <p>
                Don't have an account yet?{" "}
                <Link className="font-semibold text-gray-500" to={"/register"}>
                  Register here
                </Link>
              </p>
            </form>
          </div>

          {/* Image with Text Overlay */}
          <div class="relative">
            <img
              src="/images/organic-01.jpg"
              class="w-[400px] h-full hidden rounded-r-2xl md:block object-cover opacity-80"
              alt="Login background"
            />
            <div class="absolute hidden bottom-10 right-6 p-6 bg-black bg-opacity-40 backdrop-blur-sm rounded drop-shadow-lg md:block">
              <p class="text-gray-300 text-xl text-center font-normal shadow-lg">
                "Experience the freshest organic produce, grown with care and
                delivered with love at Farmgry.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
