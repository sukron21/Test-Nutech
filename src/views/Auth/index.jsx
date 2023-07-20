import React, { useState } from "react";
import Style from "./style.module.css";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import { login } from '../../redux/action/auth';
import { register } from '../../redux/action/auth';
import { useDispatch } from 'react-redux';


const Index = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(1);
  const [form, setform] = useState({
    email: '',
    password: '',
})
const [registForm, setRegistForm] = useState({
  name: "",
  email: "",
  password: "",
});
  const navigate = useNavigate();
const onSubmit = (e) => {
  e.preventDefault();

  // axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, form)
      // .then((response) => {
        const handleSuccess = (data) => {
          if (data.data.status !== 'success') {
              
              swal({
                icon: 'error',
                title: 'failed to login!',
                buttons: false,
                timer: 5000,
              });
          } else {
              // alert("berhasil Login")
              swal({
                icon: 'success',
                title: 'Sucess to login!',
                buttons: false,
                timer: 5000,
              });
              localStorage.setItem("name", JSON.stringify(data.data.data))
              localStorage.setItem("token", data.data.data.token);
              return navigate('/home')}
          }
          dispatch(login(form, handleSuccess));
}
const onSubmitRegist = (e) => {
  e.preventDefault();
  if (
    registForm.name === "" ||
    registForm.email === "" ||
    registForm.password === ""
  ) {
    alert("Semua input wajib diisi");
    swal({
      icon: 'error',
      title: 'Semua input wajib diisi!',
      buttons: false,
      timer: 3000,
    });
  } else {
    const body = {
      name: registForm.name,
      email: registForm.email,
      password: registForm.password,
    };
            const handleSuccess = (response) => {
            if (response.data.status !== "success") {
              swal({
                icon: 'error',
                title: (response.data.message),
                buttons: false,
                timer: 3000,
              });
            } else {
              swal({
                icon: 'success',
                title: 'Sucess to Register!',
                buttons: false,
                timer: 3000,
              });
              window.location.reload();
            }
          }
          // )
          dispatch(register(body, handleSuccess));
  }
};

  return (
    <>
      <div className="container-fluid">
        <div
          className={`col-md-8 col-10 position-absolute start-50 translate-middle-x ${Style.contents}`}
        >
          <div className="text-center">
            <div className={`d-flex justify-content-center`}>
            </div>
            <div className={`d-flex justify-content-center my-3 `}>
              <h4>Hei, How Are You Today ?</h4>
            </div>
            <div
              className={`d-flex justify-content-center ${Style.contentButton}`}
            >
              <button
                className={
                  active === 1
                    ? `col-md-2  ${Style.btnAuth1Active}`
                    : `col-md-2  ${Style.btnAuth1}`
                }
                onClick={() => setActive(1)}
              >
                Login
              </button>
              <button
                className={
                  active === 2
                    ? `col-md-2 ${Style.btnAuth2Active}`
                    : `col-md-2 ${Style.btnAuth2}`
                }
                onClick={() => setActive(2)}
              >
                Register
              </button>
            </div>
            {active === 1 ? (
              <><form onSubmit={(e) => onSubmit(e)}>
                <div className="d-flex justify-content-center">
                <input
                  type="email"
                  className={`form-control  ${Style.inputLogin}`}
                  id="emailInput"
                  placeholder="Email"
                  onChange={(e) => setform({ ...form, email: e.target.value })} 
                  /> </div>
                  <div className="d-flex justify-content-center">
                  <input
                    type="password"
                    className={`form-control  ${Style.inputLogin}`}
                    id="passInput"
                    placeholder="Password"
                    onChange={(e) => setform({ ...form, password: e.target.value })}
                    />
                </div>
                <div className="d-flex justify-content-center">
                  <button className={`col-md-6 ${Style.buttonAuth}`}>Login</button>
                </div>
                </form>
                </>
            ) : (
              <><form onSubmit={(e) => onSubmitRegist(e)}>
              <div className="d-flex justify-content-center row ">
               
                <div className="d-flex justify-content-center">
                <input
                  type="text"
                  className={`form-control  ${Style.inputLogin}`}
                  id="nameInput"
                  placeholder="Name"
                  onChange={(e) => setRegistForm({ ...registForm, name: e.target.value })}
                   />
                   </div>
                <div className="d-flex justify-content-center">
                <input
                  type="email"
                  className={`form-control  ${Style.inputLogin}`}
                  id="emailInput"
                  placeholder="Email" 
                  onChange={(e) => setRegistForm({ ...registForm, email: e.target.value })}
                  />
                   </div>
                  <div className="d-flex justify-content-center">
                  <input
                    type="password"
                    className={`form-control  ${Style.inputLogin}`}
                    id="passInput"
                    placeholder="Password" 
                    onChange={(e) => setRegistForm({ ...registForm, password: e.target.value })}
                    />
                </div>
                <div className="d-flex justify-content-center">
                  <button className={`col-md-6 ${Style.buttonAuth}`}>Register</button>
                  </div>
                </div>
                </form>
                </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Index;
