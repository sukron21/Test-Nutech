import React, { useRef, useState, useEffect } from "react";
import Footer from "../../component/footer";
import Style from "./style.module.css";
import Nav from "../../component/nav";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert';

const Index = () => {
  const hiddenFileInput = useRef(null);
  const [queryparams] = useSearchParams();
  const search = queryparams.get("search");
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [imageProduct, setImageProduct] = useState();
  const [dataSearch, setDataSearch] = useState();
    const [ID, setID] = useState ()
    // const [modal, setModal] = useState()
    // const toggleModal = () =>{
    //   setModal((prevstate)=>!prevstate)
    // }
    const handleDetail = (id) => {
      // toggleModal()
      setID(()=>id)
      console.log(id)
    }

  let total = "";

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
    // e.preventDefault();
    // console.log(id_product)
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
          showConfirmButton: false,
          timer: 5000,
        });
        navigate("/home");
        window.location.reload();
      })
      .catch((err) => {
        swal({
          icon: 'error',
          title: "Delete Failed",
          showConfirmButton: false,
          timer: 5000,
        });
      });
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
                dataSearch.map((item, index) => (
                  <div key={index} className={`col-md-3 ${Style.cad}`}>
                    <div className={` ${Style.cards} `}>
                      <img
                        src={item.photo_url}
                        className={Style.listImg}
                        alt="..."
                      />
                      <div className={`card-body ${Style.texts}`}>
                        <h5 className="card-title">{item.product_name}</h5>
                        <p className="card-text py-3">
                          <p>harga Jual: {item.pricej}</p>
                          <p>harga Beli: {item.priceb}</p>
                          <p>Stock : {item.stock}</p>
                        </p>
                        <div
                          className={`d-flex justify-content-center ${Style.profile}`}
                        >
                          <Link to={`/Update/${item.id_product}`}>
                            <button
                              type="button"
                              className="btn btn-primary ms-2"
                            >
                              Update
                            </button>
                          </Link>
                          <div
                            className={`d-flex justify-content-center ${Style.profile}`}
                          >
                            <button
                              type="button"
                              className="btn btn-primary ms-2"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal1"
                              onClick={(e) =>
                                handleDetail(item.id_product)
                              }
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
                                      onClick={(e) =>
                                        deleteProduct()
                                      }
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
