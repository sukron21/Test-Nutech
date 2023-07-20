import React, {useRef, useState, useEffect } from "react";
import Footer from "../../component/footer";
import Style from "./style.module.css";
import Nav from "../../component/nav";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert';
import addPhoto from "../../assets/addphoto.PNG";

const Index = () => {
  const [queryparams] = useSearchParams();
  const search = queryparams.get("search");
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [dataSearch, setDataSearch] = useState();
  const [dataSearchDetail, setDataSearchDeatil] = useState();
  const [ID, setID] = useState ()
  const [imageProduct, setImageProduct] = useState();
  const [dataUpdate, setDataUpdate] = useState();
  const [idNew, setIDNew] = useState("");
  const hiddenFileInput = useRef(null);
  
  const [update, setUpdate] = useState({
    product_name: dataUpdate && dataUpdate.product_name,
    pricej: dataUpdate && dataUpdate.pricej,
    stock: dataUpdate && dataUpdate.stock,
    description: dataUpdate && dataUpdate.description,
    priceb: dataUpdate && dataUpdate.priceb,
  });
    const handleDetail = (id) => {
      setID(()=>id)
      console.log(id)
    }
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/productlist/limit/${search}`)
      .then((response) => {
        setDataSearch(response.data.data.rows);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteProduct = () => {
    axios
      .delete(
        `${process.env.REACT_APP_BACKEND_URL}/product/delete/${ID}`
      )
      .then((response) => {
        const posts = product.filter((item) => item.ID !== ID);
        setProduct({ data: posts });
        swal({
          icon: 'success',
          title: 'Delete Succes!',
          buttons: false,
          timer: 5000,
        });
        navigate("/home");
        window.location.reload();
      })
      .catch((err) => {
        swal({
          icon: 'error',
          title: "Delete Failed",
          buttons: false,
          timer: 5000,
        });
      });
  };
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    document.getElementById("customBtn").innerHTML = fileUploaded.name;
    // setFileName(fileUploaded.name)
    setImageProduct(fileUploaded);
  };
  const handleUpdateButtonClick = (id) => {
    setIDNew(() => id);
    // fungsi lainnya
  };
  useEffect(()=>{
    if(idNew!==""){
      getDataDetail()
    }
  },[idNew])
  const getDataDetail = () => {
      axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/productlist/${idNew}`)
      .then((response) => {
        console.log("anjink")
        console.log(response.data.data.rows[0])
        setDataSearchDeatil(response.data.data.rows[0]);
        setDataUpdate(response.data.data.rows[0]);
        // console.log(dataSearch)
      })
      .catch((err) => {
        console.log(err);
      });

    
  };
  
  const handlePost = (e) => {
    e.preventDefault();
    const form = {
      product_name: update.product_name,
      pricej: update.pricej,
      stock: update.stock,
      description: update.description,
      priceb: update.priceb,
    };
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/product/update/${idNew}`, form)
      .then((res) => {
        if (res.data.status === "failed") {
          swal({
            icon: "error",
            title: "Nama Product sudah terdaftar",
            buttons: false,
            timer: 5000,
          });
        }else if (imageProduct === undefined) {
          swal({
            icon: 'success',
            title: 'Sucess to Update Data!',
            buttons: false,
            timer: 5000,
          });
          window.location.reload();
        }else{
          let body = new FormData();
      body.append("photo", imageProduct);
      axios
        .put(
          `${process.env.REACT_APP_BACKEND_URL}/product/update/photo/${idNew}`,
          body
        )
        .then((response) => {
           if (response.data.message === "upload product photo failed bor") {
            swal({
              icon: "error",
              title:
                "ukuran file melebihi 100kb atau type file tidak didukung mohon masukkan type gambar .jpg atau .png",
              buttons: false,
              timer: 5000,
            });
          } else {
            swal({
              icon: "success",
              title: "Sucess to Add Data!",
              buttons: false,
              timer: 5000,
            });
            window.location.reload();
          }
        })
        .catch((err) => {
          swal({
            icon: 'error',
            title: "Update Failed",
            buttons: false,
            timer: 3000,
          });
    
        });
        }
      })
      .catch((err) => {
        swal({
          icon: 'error',
          title: "Update Failed",
          buttons: false,
          timer: 3000,
        });
      });
    // if (imageProduct !== undefined) {
      
        
    // }

  };

  return (
    <>
      {/* {JSON.stringify(dataSearch)} */}
      <div className="container-fluid">
        <Nav />
        <div className="container">
          <div className={Style.bg}>
            <h4>List Product</h4>
            <div className="row d-flex justify-content-center">
              {dataSearch &&
                dataSearch.map((item, e) => (
                  <div key={e} className={`col-md-3 ${Style.cad}`}>
                  <div className={` ${Style.cards} `}>
                    <img
                      src={item.photo_url}
                      className={Style.listImg}
                      alt="..."
                    />
                    <div className={`card-body  ${Style.texts}`}>
                      <div className="text-center">
                      <h5 className="card-title">{item.product_name}</h5>
                      </div>
                      <div className="card-text py-2">
                        <div className="row justify-content-center">
                          <div className="col-md-6">
                          <span>harga Beli</span>
                          </div>
                          <div className="col-md-1">
                          <span>:</span>
                          </div>
                          <div className="col-md-4">
                          <span>{item.priceb}</span>
                          </div>
                        </div>
                        <div className="row justify-content-center">
                          <div className="col-md-6">
                          <span>harga Jual</span>
                          </div>
                          <div className="col-md-1">
                          <span>:</span>
                          </div>
                          <div className="col-md-4">
                          <span>{item.pricej}</span>
                          </div>
                        </div>
                        <div className="row justify-content-center">
                          <div className="col-md-6">
                          <span>Stock</span>
                          </div>
                          <div className="col-md-1">
                          <span>:</span>
                          </div>
                          <div className="col-md-4">
                          <span>{item.stock}</span>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`d-flex justify-content-center ${Style.profile}`}
                      >
                        <div
                          className={`d-flex justify-content-center ${Style.profile}`}
                        >
                          {/* <Link to={`/Update/${item.id_product}`}> */}
                          <button
                            type="button"
                            className="btn btn-primary ms-2"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal2"
                            onClick={() =>
                              handleUpdateButtonClick(item.id_product)
                            }
                          >
                            Update
                          </button>
                          <div
                            className="modal fade modal-xl"
                            id="exampleModal2"
                            tabIndex="-1"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                          >
                            <div className="modal-dialog">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5
                                    className="modal-title"
                                    id="exampleModalLabel"
                                  >
                                    {/* {JSON.stringify(dataUpdate && dataUpdate)} */}
                                  </h5>
                                  <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div className="modal-body">
                                  {/* <Modal /> */}
                                  <div className="container ">
                                    {/* {dataSearch &&
                                      dataSearch.map((item) => (
                                    <div > */}
                                    <form className=" mx-5">
                                      <div
                                        className={`col-md-7 mb-4 my-4  
                                   ${Style.addPhoto}`}
                                      >
                                        <div className="d-flex justify-content-center pt-5">
                                          <img src={addPhoto} alt="" />
                                        </div>
                                        <div className="d-flex justify-content-center">
                                          <h5
                                            className="text-muted"
                                            id="customBtn"
                                            onClick={handleClick}
                                          >
                                            {/* {fileName || "Pilih berkas"}  */}
                                          </h5>
                                          <input
                                            className=""
                                            type="file"
                                            ref={hiddenFileInput}
                                            id="formFile"
                                            onChange={handleChange}
                                            // style={{ display: "none" }}
                                          />
                                        </div>
                                        <div className="d-flex justify-content-center">
                                          File Sebelumnya :{" "}
                                          {dataSearchDetail && dataSearchDetail.photo_pub_id}
                                        </div>
                                      </div>
                                      <div className="d-flex justify-content-center">
                                        <div className="col-md-7 mb-4 ">
                                          <div className="form-floating pt-3">
                                            <input
                                              type="text "
                                              className={`form-control ${Style.costuminput}`}
                                              id="floatingInputGroup1"
                                              defaultValue={
                                                dataSearchDetail && dataSearchDetail.product_name
                                              }
                                              onChange={(e) =>
                                                setUpdate({
                                                  ...update,
                                                  product_name: e.target.value,
                                                })
                                              }
                                            />
                                            <label htmlFor="floatingInputGroup1 ">
                                              Nama Product
                                            </label>
                                          </div>
                                          <div className="form-floating pt-3">
                                            <input
                                              type="number"
                                              className={`form-control ${Style.costuminput}`}
                                              id="floatingInputGroup1"
                                              placeholder="Title"
                                              defaultValue={
                                                dataSearchDetail && dataSearchDetail.pricej
                                              }
                                              onChange={(e) =>
                                                setUpdate({
                                                  ...update,
                                                  pricej: e.target.value,
                                                })
                                              }
                                            />

                                            <label htmlFor="floatingInputGroup1 ">
                                              Harga Jual
                                            </label>
                                          </div>
                                          <div className="form-floating pt-3">
                                            <input
                                              type="number"
                                              className={`form-control ${Style.costuminput}`}
                                              id="floatingInputGroup1"
                                              placeholder="Title"
                                              defaultValue={
                                                dataSearchDetail && dataSearchDetail.priceb
                                              }
                                              onChange={(e) =>
                                                setUpdate({
                                                  ...update,
                                                  priceb: e.target.value,
                                                })
                                              }
                                            />
                                            <label htmlFor="floatingInputGroup1 ">
                                              Harga Beli
                                            </label>
                                          </div>
                                          <div className="form-floating pt-3">
                                            <input
                                              type="number"
                                              className={`form-control ${Style.costuminput}`}
                                              id="floatingInputGroup1"
                                              placeholder="Title"
                                              defaultValue={
                                                dataSearchDetail && dataSearchDetail.stock
                                              }
                                              onChange={(e) =>
                                                setUpdate({
                                                  ...update,
                                                  stock: e.target.value,
                                                })
                                              }
                                            />
                                            <label htmlFor="floatingInputGroup1 ">
                                              Stock
                                            </label>
                                          </div>
                                          <div className="d-flex justify-content-center pt-5">
                                            <button
                                              onClick={handlePost}
                                              className={`btn btn-primary ${Style.btnUpdate}`}
                                            >
                                              Update
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </form>
                                    {/* </div>
         
        ))} */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* </Link> */}
                        </div>
                        <div
                          className={`d-flex justify-content-center ${Style.profile}`}
                        >
                          <button
                            type="button"
                            className="btn btn-primary ms-2"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal1"
                            onClick={(e) => handleDetail(item.id_product)}
                          >
                            Delete
                          </button>

                          <div
                            className="modal fade"
                            id="exampleModal1"
                            tabIndex="-1"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                          >
                            <div className="modal-dialog">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h1
                                    className="modal-title fs-5"
                                    id="exampleModalLabel"
                                  >
                                    Delete
                                  </h1>
                                  <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div className="modal-body">
                                  Apakah anda yakin untuk menghapus data
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                  >
                                    Close
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={(e) => deleteProduct()}
                                  >
                                    Save changes
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default Index;
