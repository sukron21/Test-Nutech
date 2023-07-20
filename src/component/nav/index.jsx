import React, { useState } from "react";
import Style from "../nav/style.module.css";
import Pp from "../../assets/pp.png";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHomeLg } from "@fortawesome/free-solid-svg-icons";

const Index = () => {
  const [Search, setSearch] = useState("");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    swal({
      icon: "success",
      title: "Sucess to Logout!",
      buttons: false,
      timer: 3000,
    });
    return navigate("/");
  };
  const onSubmitSearch = (e) => {
    e.preventDefault();
    if (Search === "") {
      swal({
        icon: "error",
        title: "Mohon masukkan Product yang ingin dicari ",
        buttons: false,
        timer: 3000,
      });
    } else {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/productlist/limit/${Search}`)
        .then((response) => {
          if (response.data.data.rowCount === 0) {
            swal({
              icon: "error",
              title: "Data Tidak ada",
              buttons: false,
              timer: 3000,
            });
          } else {
            navigate(`/Searching?search=${Search}`);
            window.location.reload();
          }
        })
        .catch((err) => {
          swal({
            icon: "error",
            title: err,
            buttons: false,
            timer: 3000,
          });
        });
    }
  };
  return (
    <>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link to="/home">
              <FontAwesomeIcon
                icon={faHomeLg}
                style={{ height: "40px" }}
              />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarText"
              aria-controls="navbarText"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item"></li>
                
              </ul> <div className={`d-flex justify-content-end ${Style.searching}`}>
              <form className="d-flex">
                  <input
                    className={`form-control me-2 `}
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={onSubmitSearch}
                    style={{ paddingLeft: "10" }}
                  >
                    Search
                  </button>
                </form>
                </div>
              <div className={`d-flex justify-content-end ${Style.profile}`}>
                <img src={Pp} className={`img-fluid ${Style.profile}`} alt="" />
                <button className={Style.logout} onClick={logout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};
export default Index;
