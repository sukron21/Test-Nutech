import React, { useRef, useState, useEffect } from "react";
import Footer from "../../component/footer";
import Style from "./style.module.css";
import Nav from "../../component/nav";
import addPhoto from "../../assets/addphoto.PNG";
import axios from "axios";
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../component/modal";
import { deleted,updateProduct,updateImageProduct, getDataProduct,getDataProductbyID } from "../../redux/action/product";
import { useDispatch } from "react-redux";


const Index = () => {
  const dispatch = useDispatch()
  const [idNih, setID] = useState("");
  const [idNew, setIDNew] = useState("");
  const [page, setPage] = useState(1);
  const hiddenFileInput = useRef(null);
  const [dataSearch, setDataSearch] = useState();
  const [dataUpdate, setDataUpdate] = useState();
  const [imageProduct, setImageProduct] = useState();
  const [update, setUpdate] = useState({
    product_name: dataUpdate && dataUpdate.product_name,
    pricej: dataUpdate && dataUpdate.pricej,
    stock: dataUpdate && dataUpdate.stock,
    description: dataUpdate && dataUpdate.description,
    priceb: dataUpdate && dataUpdate.priceb,
  });

  const handleDetail = (id) => {
    setID(() => id);
    // console.log(id);
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    getData(page);
  }, [page]);
  const getData = () => {
    const pages= page
        const handleSuccessData = (response)=>{
        setData(response.data.data.rows);
      }
      dispatch(getDataProduct(pages,handleSuccessData))
  };
  const NextPage = () => {
    setPage(page + 1);
    getData(5, page);
  };
  const PreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      getData(5, page);
    }
  };

  const deleteProduct = () => {
    const idDelete = idNih
      dispatch(deleted(idDelete))
  };
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    document.getElementById("customBtn").innerHTML = fileUploaded.name;
    // setFileName(fileUploaded.name);
    setImageProduct(fileUploaded);
  };
  const handleUpdateButtonClick = (id) => {
    setIDNew(() => id);
    // fungsi lainnya
  };
  useEffect(() => {
    if (idNew !== "") {
      getDataDetail();
    }
  }, [idNew]);
  const getDataDetail = () => {
    const id=idNew
    
      const handleSuccessDataID=(response)=>{
        setDataSearch(response.data.data.rows[0]);
        setDataUpdate(response.data.data.rows[0]);
      }
      dispatch(getDataProductbyID(id,handleSuccessDataID))
  };

  const handlePost = (e) => {
    e.preventDefault();
    const id = idNew
    const form = {
      product_name: update.product_name,
      pricej: update.pricej,
      stock: update.stock,
      description: update.description,
      priceb: update.priceb,
    };
        const handleSuccess = (res)=>{
        if (res.data.status === "failed") {
          swal({
            icon: "error",
            title: "Nama Product sudah terdaftar",
            buttons: false,
            timer: 5000,
          });
        } else if (imageProduct === undefined) {
          swal({
            icon: "success",
            title: "Sucess to Update Data!",
            buttons: false,
            timer: 5000,
          });
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else {
          let body = new FormData();
          body.append("photo", imageProduct);
            const handleSuccessImage = (response) =>{
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
                setTimeout(() => {
                  window.location.reload();
                }, 3000);
              }
            }
            dispatch(updateImageProduct(body,id,handleSuccessImage))
        }
        
      }
    dispatch(updateProduct(form,id,handleSuccess))
  };

  return (
    <>
      <div className="container-fluid">
        <Nav />
        <div className="container">
          <div className={Style.bg}>
            <h4>List Product</h4>
            <div className="row justify-content-center">
              <div className={`col-md-3  ${Style.cad}`}>
                <div
                  className={`d-flex  justify-content-center ${Style.cards} `}
                >
                  <div className={` ${Style.buttons}`}>
                    <button className={Style.awesome}>
                      <div>
                        <FontAwesomeIcon
                          icon={faCirclePlus}
                          className={Style.iconPlus}
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        />
                      </div>
                    </button>
                    <div>
                      <button
                        type="button"
                        className="btn btn-primary ms-2"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        <span>AddProduct</span>
                      </button>
                    </div>
                    <div
                      className="modal fade modal-xl"
                      id="exampleModal"
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              Add
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <Modal />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {data.map((item) => (
                <div key={item.id_product} className={`col-md-3 ${Style.cad}`}>
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
                                          {dataSearch &&
                                            dataSearch.photo_pub_id}
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
                                                dataSearch &&
                                                dataSearch.product_name
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
                                                dataSearch && dataSearch.pricej
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
                                                dataSearch && dataSearch.priceb
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
                                                dataSearch && dataSearch.stock
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
            <div
              className={`d-flex justify-content-center ${Style.pagination}`}
            >
              <button
                disabled={page === 1}
                className="  my-5 col-md-2  "
                onClick={() => PreviousPage()}
              >
                {" "}
                Preveous{" "}
              </button>
              <button className="  my-5 col-md-2 ">{page}</button>
              <button
                className=" my-5 col-md-2  "
                disabled={data <= 1}
                onClick={() => NextPage()}
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default Index;
