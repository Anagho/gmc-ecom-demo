import { Button, Input } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import validator from "validator";
import axios from "axios";
import { serverUrl } from "../utils/helper";

const Register = () => {
  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleUserRegistration() {
    if (validator.isEmpty(userFormData.name, { ignore_whitespace: true })) {
      return alert("Please provide your name");
    }

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
    // Now we can register the user successfully
    try {
      const response = await axios.post(
        `${serverUrl}/auth/register`,
        userFormData
      );
      if (response.data.status === "success") {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid h-screen place-items-center p-2">
      <form className="flex flex-col gap-4 w-full max-w-[500px] border p-4 rounded-lg">
        <h3 className="text-2xl text-green-800 text-center">Join Farmgry</h3>
        <p className="text-gray-500 text-lg font-light text-center">
          You enjoy exclusive deals when you register an account with us
        </p>

        <Input
          onChange={(e) =>
            setUserFormData({ ...userFormData, name: e.target.value })
          }
          placeholder="Enter your name"
          size="large"
        />
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
          onClick={handleUserRegistration}
          loading={isLoading}
          type="primary"
          variant="solid"
          color="green"
        >
          Register
        </Button>

        <p>
          Already have an account{" "}
          <Link className="hover:underline font-semibold" to={"/login"}>
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
