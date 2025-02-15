import { useState } from "react";
import { Link, useNavigate } from "react-router";
import validator from "validator";
import { motion } from "framer-motion";
import FloatingShape from "../components/ui/FloatingShape";
import Input from "../components/ui/inputs/Input";
import { Loader, Lock, Mail, User } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { serverUrl } from "../utils/helper";
import PasswordStrengthMeter from "../components/ui/PasswordStrengthMeter";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, setLoading } from "../features/auth/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (validator.isEmpty(formData.name, { ignore_whitespace: true })) {
      return toast.error("Please provide your name");
    }

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

    // Now we can register the user successfully
    try {
      const response = await axios.post(
        `${serverUrl}/auth/register`,
        formData,
        {
          withCredentials: true, // Ensures the cookie is stored
        }
      );

      const user = response.data.user;
      console.log(response.data)
      if (response.data.status === "success") {
        dispatch(registerUser(user));
        toast.success("Verification sent to your email")
        navigate("/verify-email");
      }
    } catch (error) {
      error = error.response.data.message || "Error signing up";
      toast.error(error)
      isLoading = false
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
        className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
            Create Account
          </h2>

          <form onSubmit={handleRegistration}>
            <Input
              icon={User}
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
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

            {/* Password strength meter */}
            <PasswordStrengthMeter password={formData.password} />

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
                "Sign Up"
              )}
            </motion.button>
          </form>
        </div>
        <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link to={"/login"} className="text-green-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
