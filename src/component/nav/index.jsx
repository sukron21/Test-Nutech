import React, { useRef, useState } from "react";
import Nutech from "../../assets/Nutech.PNG";
import Style from "../nav/style.module.css";
import Pp from "../../assets/pp.png";
import addPhoto from "../../assets/addphoto.PNG";
import { useNavigate } from "react-router-dom";
import axios from 'axios'


const Index = () => {
  const hiddenFileInput = useRef(null);
  const [Search, setSearch] = useState("");
  const [imageProduct, setImageProduct] = useState();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState({
    seller: "",
    product_name: "",
    pricej:0,
    stock:0,
    description:"",
    priceb:0
  })
//   const [form, setForm] = useState({
//      seller: "",
//     product_name: "",
//     pricej:0,
//     stock:0,
//     description:"",
//     priceb:0
// })
  const onSubmit = (e) => {
    e.preventDefault();
    const datauser = JSON.parse(localStorage.getItem("name"));
    const id_user = datauser.data.id_seller;
    console.log(id_user)
    let body = new FormData ()
        body.append("seller", id_user);
        body.append("product_name", product.product_name);
        body.append("pricej", product.pricej);
        body.append("stock", product.stock);
        body.append("photo", imageProduct);
        body.append("description", "aa");
        body.append("priceb", product.priceb);
        axios.post((`${process.env.REACT_APP_BACKEND_URL}/insert`), body)
            .then((response) => {
              if(response.data.status=="failed"){
                alert("nama sudah terdaftar")
              }else if(response.data.message=="upload product photo failed bor"){
              alert("ukuran file melebihi 100kb atau type file tidak didukung mohon masukkan type gambar .jpg atau .png ")
                
              }else{
                alert("data berhasil ditambahkan")
                console.log(response.data)
                return navigate('/home')
                window.location.reload();
            }
                    // alert("data berhasil ditambahkan")
                    // console.log(response.data)
                    // return navigate('/home')
                // console.log(response.data)
                // return navigate('/')
            }).catch((err) => {
                alert(err)            })   
          }
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    document.getElementById("customBtn").innerHTML = fileUploaded.name;
    setImageProduct(fileUploaded);
  };
  const logout = () => {
    localStorage.clear();
    alert("berhasil");
    return navigate("/");
  };
  const onSubmitSearch = (e) => {
    e.preventDefault();
    console.log(Search);

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/productlist/limit/${Search}`)
      .then((response) => {
        // console.log(response.data.token.data)
        console.log(response.data);
        if (response.data.data.rowCount == 0) {
          alert("Data Tidak ada");
        } else {
          navigate(`/Profile?search=${Search}`)
          window.location.reload();
          // return navigate(`/Profile?search=${Search}`);
        }
        
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg bg-light">
          <div className="container-fluid">
            <img
              src={Nutech}
              alt=""
              // width="130" height="30"
            />
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo01"
              aria-controls="navbarTogglerDemo01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
              <a className="navbar-brand" href="#"></a>
              <form 
                className={`d-flex justify-content-center ${Style.search}`}
                role="search"
                onSubmit={(e) => onSubmitSearch(e)}
              >
                <input
                  className={`form-control ${Style.inputSearch}`}
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="btn btn-primary" type="submit" onClick={onSubmitSearch}>
                  Search
                </button>
              </form>
              <div className={`d-flex justify-content-center ${Style.profile}`}>
              <button
                          type="button"
                          className="btn btn-primary ms-2"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal100"
                        >
                          +AddProduct
                        </button>

                        {/* <!-- Modal --> */}
                        <form  >
                        <div
                          className="modal fade modal-xl"
                          id="exampleModal100"
                          tabIndex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog">
                            --
                            
                            <div className="modal-content">
                              <div className="modal-header">
                                <h1
                                  className="modal-title fs-5"
                                  id="exampleModalLabel"
                                >
                                  Add Product
                                </h1>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div className="modal-body">
                                <div className="container ">
                                 
                                    <div className={`col-md-7 mb-4   ${Style.addPhoto}`}>
                                      <div className="d-flex justify-content-center pt-5">
                                      <img src={addPhoto} alt=""  />
                                      </div>
                                      <div className="d-flex justify-content-center">
                                      <h5
                                        className="text-muted"
                                        id="customBtn"
                                        onClick={handleClick}
                                        onChange={handleChange}
                                      >
                                        Add image
                                      </h5>
                                      <input
                                        className=""
                                        type="file"
                                        ref={hiddenFileInput}
                                        id="formFile"
                                        onChange={handleChange}
                                        style={{ display: "none" }}
                                      />
                                      </div>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                    <div className="col-md-7 mb-4 ">
                                    <div className="form-floating pt-3">
                                        <input type="text " className={`form-control ${Style.costuminput}`} id="floatingInputGroup1" placeholder="Title"
                                        onChange={(e) =>  setProduct({...product, product_name: e.target.value})} />
                                        <label htmlFor="floatingInputGroup1 ">Nama Product</label>
                                    </div>
                                    <div className="form-floating pt-3">
                                        <input type="number" className={`form-control ${Style.costuminput}`} id="floatingInputGroup1" placeholder="Title" 
                                        onChange={(e) =>  setProduct({...product, pricej: e.target.value})} />
                                        <label htmlFor="floatingInputGroup1 ">Harga Jual</label>
                                    </div>
                                    <div className="form-floating pt-3">
                                        <input type="number" className={`form-control ${Style.costuminput}`} id="floatingInputGroup1" placeholder="Title" 
                                        onChange={(e) =>  setProduct({...product,priceb: e.target.value})}/>
                                        <label htmlFor="floatingInputGroup1 ">Harga Beli</label>
                                    </div>
                                    <div className="form-floating">
                                        <input type="number" className={`form-control ${Style.costuminput}`} id="floatingInputGroup1" placeholder="Title" 
                                        onChange={(e) =>  setProduct({...product,stock: e.target.value})}/>
                                        <label htmlFor="floatingInputGroup1 ">Stock</label>
                                    </div>
                                </div>
                                </div>
                                 
                                </div>
                              </div>
                              <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={onSubmit}>
                                  Save changes
                                </button>
                              </div>
                            </div>
                            --
                            
                          </div>
                        </div>
                        </form>
              </div>
              <div className={`d-flex justify-content-center ${Style.profile}`}>
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
