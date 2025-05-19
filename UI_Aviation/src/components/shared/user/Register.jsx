import React, { useState, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { RiLoginBoxLine, RiLoginBoxFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../../api/auth/auth";
import { Toast } from "primereact/toast";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Register() {
  const [visible, setVisible] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register_error_toast = useRef(null);

  const navigate = useNavigate();

  const showMessage = (ref, severity, details) => {
    ref.current.show({
      severity: severity,
      summary: "Register",
      detail: details,
      life: 3000,
    });
  };

  const handleRegister = async (event) => {
    event.preventDefault(); // Formun varsayılan submit davranışını engelle

    if (!firstName || !lastName || !email || !password) {
      showMessage(register_error_toast, "error", "All fields are required");
      return;
    }

    if (!emailRegex.test(email)) {
      showMessage(
        register_error_toast,
        "error",
        "Please enter a valid email address"
      );
      return;
    }

    if (password.length < 6) {
      showMessage(
        register_error_toast,
        "error",
        "Password must be at least 6 characters long"
      );
      return;
    }

    try {
      await AuthService.register({
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
        role: "USER",
      });
      navigate("/login", { state: { message: "Registration successful!" } });
      showMessage(register_error_toast, "success", "Register success");
    } catch (error) {
      if (error.response && error.response.status === 403) {
        showMessage(
          register_error_toast,
          "error",
          "Access forbidden. Check your servers."
        );
      } else if (error.response && error.response.status === 400) {
        showMessage(
          register_error_toast,
          "error",
          "Request failed with status code 400"
        );
      } else {
        showMessage(
          register_error_toast,
          "error",
          "An error occurred during register"
        );
      }
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <Toast ref={register_error_toast} position="bottom-center" />
      {/* <div className="w-full h-full flex items-center justify-center gap-x-44 z-20"></div> */}
      <div className="fixed w-full h-full bg-white/10 flex items-center justify-center gap-x-44 z-30"></div>
      <div className="fixed w-full h-full px-4 flex items-center justify-center gap-x-44 bg-blue-900 z-10">
        <div className="flex items-center justify-center">
          <div className="mx-9 p-8 rounded-3xl hover:scale-105 bg-blue-600 flex align-items-center gap-2">
            <Button
              onClick={() => setVisible(true)}
              className="text-white"
            />{" "}
            <RiLoginBoxLine color="white" fontSize={"24"} />
          </div>
          <Dialog
            visible={visible}
            modal={false}
            onHide={() => setVisible(false)}
            content={({ hide }) => (
              <div className="grid justify-items-center">
                <div
                  className="flex justify-center items-center justify-self-end position-absolute w-3 h-3 
                    hover:rotate-180 duration-1000 hover:scale-150 bg-slate-600 rounded-full translate-y-3 -translate-x-0"
                ></div>
                <div
                  className="flex justify-center items-center justify-self-end position-absolute w-48 h-48 
                  translate-x-24 -translate-y-24 hover:rotate-180 duration-1000 hover:scale-150"
                >
                  {/* <GiShipWheel fontSize={96} color="white" /> */}
                </div>

                {/* <div className="flex justify-center"></div> */}
                <div className="flex flex-column place-items-center w-10/12 md:w-full px-8 gap-4 bg-black/65 rounded-2xl ring-1 py-4 ring-white">
                  <div className="h-48 w-48 hover:scale-125 duration-300">
                    <img
                      className=""
                      src={require("../../../assets/icon/logo.png")}
                      alt="logo"
                    />
                  </div>
                  <div className="flex justify-center ">
                    <span
                      className="text-center text-white text-5xl font-extrabold text-pretty 
                      font-serif"
                    >
                      BLUE BOOK
                    </span>
                  </div>
                  <form
                    className="flex flex-column px-8 gap-2"
                    onSubmit={handleRegister}
                  >
                    <div className="inline-flex flex-column gap-2">
                      <label
                        htmlFor="first_name"
                        className="text-white font-semibold"
                      >
                        First Name
                      </label>
                      <input
                        id="first_name"
                        label="first_name"
                        className="rounded-xl bg-white-alpha-20 border-none p-3 text-primary-50 active:shadow-2xl"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      ></input>
                    </div>
                    <div className="inline-flex flex-column gap-2">
                      <label
                        htmlFor="last_name"
                        className="text-white font-semibold"
                      >
                        Last Name
                      </label>
                      <input
                        id="last_name"
                        label="last_name"
                        className="rounded-xl bg-white-alpha-20 border-none p-3 text-primary-50 active:shadow-2xl"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      ></input>
                    </div>
                    <div className="inline-flex flex-column gap-2">
                      <label
                        htmlFor="email"
                        className="text-white font-semibold"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        label="email"
                        className="rounded-xl bg-white-alpha-20 border-none p-3 text-primary-50 active:shadow-2xl"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      ></input>
                    </div>
                    <div className="inline-flex flex-column gap-2">
                      <label
                        htmlFor="password"
                        className="text-white font-semibold"
                      >
                        Password
                      </label>
                      <input
                        id="password"
                        label="Password"
                        className="rounded-xl bg-white-alpha-20 border-none p-3 text-primary-50"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      ></input>
                    </div>
                  </form>
                  <div className="flex justify-between gap-3 align-items-center">
                    <Button
                      label={
                        <div
                          className="h-12 w-28 rounded-3xl hover:ring-2 ring-white hover:scale-105 bg-blue-600/50
                          flex justify-center items-center gap-2 text-white"
                        >
                          Sign In
                          <RiLoginBoxLine color="white" fontSize={"24"} />
                        </div>
                      }
                      onClick={handleLogin}
                      text
                      className="flex"
                    ></Button>
                    <Button
                      label={
                        <div
                          className="h-12 w-28 rounded-3xl hover:ring-2 ring-white hover:scale-105 bg-blue-600
                          flex justify-center items-center gap-2 text-white"
                        >
                          Sign Up
                          <RiLoginBoxFill color="white" fontSize={"24"} />
                        </div>
                      }
                      onClick={handleRegister}
                      text
                      className="flex"
                    ></Button>
                  </div>
                </div>
              </div>
            )}
          ></Dialog>
        </div>
        {/* <div className="scale-x-[-1] -rotate-12">
          <MdOutlineMenuBook color="white" fontSize={"600"} />
        </div> */}
      </div>
    </>
  );
}

export default Register;
