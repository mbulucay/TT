import React, { useEffect, useState, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { RiLoginBoxLine, RiLoginBoxFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { login, authDataAssign } from "../../../store/user/authSlice";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../../api/auth/auth";
import { Toast } from "primereact/toast";
import { useLocation } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login_error_toast = useRef(null);
  const location = useLocation();

  const [visible, setVisible] = useState(true);
  const user = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.message) {
      login_error_toast.current.show({
        severity: "success",
        summary: "Success Message",
        detail: location.state.message,
        life: 3000,
      });
    }
  }, [location]);

  const showMessage = (ref, severity) => {
    ref.current.show({
      severity: severity,
      summary: "Login",
      detail: "Email or password wrong",
      life: 3000,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await AuthService.login({
        email: email,
        password: password,
      });
      dispatch(
        authDataAssign({
          access_token: response.access_token,
          refresh_token: response.refresh_token,
          email: email,
          role: response.user_role,
          firstname: response.user_firstname,
          lastname: response.user_lastname,
        })
      );
      dispatch(login());
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.error("Access forbidden. Check your servers.");
      } else if (error.response && error.response.status === 400) {
        console.error(
          "Error logging in user: Request failed with status code 400"
        );
        showMessage(login_error_toast, "error");
      } else {
        console.error("An error occurred during login:", error.message);
      }
    }
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  return (
    <>
      <Toast ref={login_error_toast} position="bottom-center" />
      {/* <div className="fixed w-full h-full bg-blue-800/50 flex items-center justify-center gap-x-44 z-30"></div> */}
      <div className="fixed w-full h-full bg-white/10 flex items-center justify-center gap-x-44 z-30"></div>
      <div className="fixed w-full h-full px-4 flex items-center justify-center gap-x-44 bg-blue-900 z-10">
        {/* <div className="rotate-12">
          <MdOutlineMenuBook color="white" fontSize={"600"} />
        </div> */}

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
                {/* <div className="flex justify-center"></div> */}
                <div
                  className="flex justify-center items-center justify-self-end position-absolute w-3 h-3 
                    hover:rotate-180 duration-1000 hover:scale-150 bg-slate-600 rounded-full translate-y-3 -translate-x-0"
                ></div>

                <div
                  className="flex justify-center items-center justify-self-end position-absolute w-48 h-48 
                  translate-x-24 -translate-y-24 hover:rotate-180 duration-1000 hover:scale-150 "
                >
                  {/* <GiShipWheel  fontSize={96} color="#E1F7F5" /> */}
                </div>

                <div className="flex flex-column place-items-center w-10/12 md:w-full px-8 gap-4 bg-black/65 rounded-2xl ring-1 py-4 ring-white">
                  <div className="h-48 w-48 hover:scale-125 duration-300">
                    <img
                      className=""
                      src={require("../../../assets/icon/logo.png")}
                      alt="logo"
                    />
                  </div>

                  <div className="flex justify-center">
                    <span
                      className="text-center text-white text-5xl font-extrabold text-pretty 
                      font-serif"
                    >
                      BLUE BOOK
                    </span>
                  </div>

                  <form
                    className="flex flex-column px-8 gap-4"
                    onSubmit={handleLogin}
                  >
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
                    {/* <button type="submit"></button> */}
                  </form>

                  <div className="flex justify-between gap-3 align-items-center">
                    <Button
                      label={
                        <div
                          className="h-12 w-28 rounded-3xl hover:ring-2 ring-white 
                          hover:scale-105 bg-blue-600 
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
                          className="h-12 w-28 rounded-3xl hover:ring-2 ring-white 
                          hover:scale-105 bg-blue-600/50 
                          flex justify-center items-center gap-2 text-white"
                        >
                          Sign Up
                          <RiLoginBoxFill color="white" fontSize={"24"} />
                        </div>
                      }
                      onClick={handleSignUp}
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

export default Login;
