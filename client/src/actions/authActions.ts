"use server";

import {
  CHECK_CREDENTIALS_URL,
  FORGOT_PASSWORD_URL,
  LOGIN_URL,
  REGISTER_URL,
  RESET_PASSWORD_URL,
} from "@/lib/apiEndpoints";
import axios, { AxiosError } from "axios";

export async function registerAction(prevState: any, formData: FormData) {
  console.log("User registered");
  try {
    await axios.post(REGISTER_URL, {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirm_password: formData.get("confirm_password"),
    });
    return {
      status: 200,
      message:
        "Account created successfully! Please check your email and verify your email.",
      errors: {},
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 422) {
        return {
          status: 422,
          message: error.response?.data?.message,
          errors: error.response?.data?.errors,
        };
      }
    }
    return {
      status: 500,
      message: "Something went wrong.please try again!",
      errors: {},
    };
  }
}

export async function loginAction(prevState: any, formData: FormData) {
  try {
    await axios.post(CHECK_CREDENTIALS_URL, {
      email: formData.get("email"),
      password: formData.get("password"),
    });
    return {
      status: 200,
      message: "You are logged in, now",
      errors: {},
      data: {
        email: formData.get("email"),
        password: formData.get("password"),
      },
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 422) {
        return {
          status: 422,
          message: error.response?.data?.message,
          errors: error.response?.data?.errors,
          data: {},
        };
      }
    }
    return {
      status: 500,
      message: "Something went wrong.please try again!",
      errors: {},
      data: {},
    };
  }
}

export async function forgotPasswordAction(prevState: any, formData: FormData) {
  try {
    await axios.post(FORGOT_PASSWORD_URL, {
      email: formData.get("email"),
    });
    return {
      status: 200,
      message: "Email sent successfully!! Please check your email.",
      errors: {},
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 422) {
        return {
          status: 422,
          message: error.response?.data?.message,
          errors: error.response?.data?.errors,
        };
      }
    }
    return {
      status: 500,
      message: "Something went wrong.please try again!",
      errors: {},
    };
  }
}

export async function resetPasswordAction(prevState: any, formData: FormData) {
  console.log({
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
    token: formData.get("token"),
  });

  try {
    console.log(formData.get("email"));

    const { data } = await axios.post(RESET_PASSWORD_URL, {
      email: formData.get("email"),
      password: formData.get("password"),
      confirm_password: formData.get("confirm_password"),
      token: formData.get("token"),
    });
    console.log("data", data);

    return {
      status: 200,
      message: data?.message,
      errors: {},
    };
  } catch (error) {
    console.log("error", error);

    if (error instanceof AxiosError) {
      if (error.response?.status === 422) {
        return {
          status: 422,
          message: error.response?.data?.message,
          errors: error.response?.data?.errors,
        };
      }
    }
    return {
      status: 500,
      message: "Something went wrong.please try again!",
      errors: {},
    };
  }
}
