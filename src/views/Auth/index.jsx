import React, { useState } from "react";
import Nutech from "../../assets/Nutech.PNG";
import Style from "./style.module.css";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';


const Index = () => {
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
  // console.log(form)
  axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, form)
      .then((response) => {
          // console.log("data",response.data)
          if (response.data.status !== 'success') {
              // alert(response.data.message)
              swal({
                icon: 'error',
                title: 'failed to login!',
                showConfirmButton: false,
                timer: 5000,
              });
          } else {
              // alert("berhasil Login")
              swal({
                icon: 'success',
                title: 'Sucess to login!',
                showConfirmButton: false,
                timer: 5000,
              });
              localStorage.setItem("name", JSON.stringify(response.data.data))
              localStorage.setItem("token", response.data.data.token);
              return navigate('/home')}
          })
      .catch((err) => {
        swal({
          icon: 'error',
          title: (err),
          showConfirmButton: false,
          timer: 5000,
        });
          // console.log(err);
      })      
}
const onSubmitRegist = (e) => {
  e.preventDefault();
  if (
    registForm.name === "" ||
    registForm.email === "" ||
    registForm.password === ""
  ) {
    alert("Semua input wajib diisi");
  } else {
    const body = {
      name: registForm.name,
      email: registForm.email,
      password: registForm.password,
    };
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, body)
          .then((response) => {
            if (response.data.status != "success") {
              // alert(response.data.message);
              swal({
                icon: 'error',
                title: (response.data.message),
                showConfirmButton: false,
                timer: 3000,
              });
            } else {
              // alert("data berhasil ditambahkan");
              swal({
                icon: 'success',
                title: 'Sucess to Register!',
                showConfirmButton: false,
                timer: 3000,
              });
              window.location.reload();
            }
          })
          .catch((err) => {
            // console.error(err);
            swal({
              icon: 'error',
              title: 'Failed to register',
              showConfirmButton: false,
              timer: 1500,
            });
          })
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
              <img src={Nutech} alt="" />
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
