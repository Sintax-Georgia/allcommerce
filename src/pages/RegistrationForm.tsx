import { useForm } from "react-hook-form";
import { isValidNumber } from "libphonenumber-js";
// import axios from "../api/axios";
import axios from "../api/axios";
// import {
//   RegistrationContext,
//   RegistrationContextProvider,
// } from "../contexts/RegistrationContext";

type TRegistrationForm = {
  firstName: string;
  lastName: string;
  businessType: string;
  contactNumber: string;
  birthDate: string;
  email: string;
  userName: string;
  password: string;
};

export default function RegistrationForm() {
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TRegistrationForm>();

  async function onSubmit<TRegistrationForm>(data: TRegistrationForm) {
    console.log(JSON.stringify(data));
    try {
      const response = await axios.post(
        "https://reg-v65t.onrender.com/register",
        JSON.stringify(data),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response.data);
      reset();
    } catch (error) {
      console.log(error);
    }
  }

  const validatePassword = (value: string) => {
    // Password must contain at least 8 characters, including at least one letter, one number, and one special character
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!value.match(passwordRegex)) {
      return "Password must contain at least 8 characters, including at least one letter, one number, and one special character";
    }
    return true;
  };

  const validatePhoneNumber = (value: string) => {
    if (!isValidNumber(value)) {
      return "Invalid phone number";
    }
    return true;
  };
  return (
    // <RegistrationContextProvider>
    <form
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <label htmlFor="firstName">Your First Name *</label>
      <input
        type="text"
        id="firstName"
        {...register("firstName", {
          required: { value: true, message: "First Name is required!" },
          maxLength: 20,
        })}
      />
      <p>{errors.firstName?.message}</p>
      <label htmlFor="lastName">Your Last Name *</label>
      <input
        type="text"
        id="lastName"
        {...register("lastName", {
          required: { value: true, message: "Last Name is required!" },
          maxLength: 20,
        })}
      />
      <p>{errors.lastName?.message}</p>
      <label htmlFor="businessType">Business type </label>
      <select id="businessType" {...register("businessType")}>
        <option value="Commercial space">Commercial space</option>
        <option value="Commercial land">Commercial land</option>
        <option value="Office">Office</option>
      </select>
      <label htmlFor="contactNumber">Contact Number</label>
      <input
        id="contactNumber"
        type="tel"
        {...register("contactNumber", {
          required: "Phone Number is required",
          validate: validatePhoneNumber,
          maxLength: 20,
        })}
      />
      <p>{errors.contactNumber?.message}</p>

      <label htmlFor="email">Email *</label>
      <input
        type="email"
        id="email"
        {...register("email", {
          required: "Email is required",
          pattern: /^\S+@\S+$/i,
        })}
      />
      <p>{errors.contactNumber?.message}</p>
      <label
        htmlFor="password"
        title={errors.password ? errors.password.message : ""}
      >
        Password *
      </label>
      <input
        type="password"
        id="password"
        {...register("password", {
          required: "Password is required",
          validate: validatePassword,
        })}
      />
      <p>{errors.password?.message}</p>
      <button>Register</button>
    </form>
    // </RegistrationContextProvider>
  );
}
