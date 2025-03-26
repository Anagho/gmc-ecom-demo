import { useState } from "react";
import { Link, useNavigate } from "react-router";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import { Lock, Mail, Loader } from "lucide-react";
import Input from "../components/ui/inputs/Input";
import { motion } from "framer-motion";
import FloatingShape from "../components/ui/FloatingShape";
import toast from "react-hot-toast";
import axios from "axios";
import { serverUrl } from "../utils/helper";
import { loginUser, setLoading } from "../features/auth/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, error } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (validator.isEmail(formData.email) === false) {
      return toast.error("Please provide a valid email");
    }

    if (
      validator.isStrongPassword(formData.password, {
        minLength: 6,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUpperCase: 1,
      }) === false
    ) {
      return toast.error(
        "Password must contain UPPERCASE, lowercase, number, special character and a digit"
      );
    }

    dispatch(setLoading(true));

    try {
      const response = await axios.post(`${serverUrl}/auth/login`, formData, {
        withCredentials: true, // Allows sending and receiving cookies
      });
      // console.log(response.data.user);
      const user = response.data.user;
      const { userType } = response.data.user;

      if (response.data.status === "success") {
        dispatch(loginUser(user));
      }
      navigate(userType === "admin" ? "/admin" : "/");

      toast.success("Logged In Successfully");
    } catch (error) {
      console.log(error);
       toast.error(
         error.response?.data?.message || "An error occurred. Please try again."
       );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
      <FloatingShape
        color="bg-green-500"
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={0}
      />

      <FloatingShape
        color="bg-emerald-500"
        size="w-48 h-48"
        top="70%"
        left="80%"
        delay={5}
      />
      <FloatingShape
        color="bg-lime-500"
        size="w-32 h-32"
        top="40%"
        left="-10%"
        delay={2}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-gray-700 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
            Welcome Back
          </h2>

          <form onSubmit={handleLogin}>
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <Input
              icon={Lock}
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            <div className="flex items-center mb-6">
              <Link
                to="/forgot-password"
                className="text-sm text-green-400 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <motion.button
              className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="animate-spin mx-auto" size={24} />
              ) : (
                "Login"
              )}
            </motion.button>
          </form>
        </div>
        <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to={"/register"} className="text-green-400 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
