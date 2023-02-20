import React, { useRef, useState, useEffect } from "react";
import Footer from "../../component/footer";
import Style from "./style.module.css";
import Nav from "../../component/nav";
import addPhoto from "../../assets/addphoto.PNG";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert';


const Index = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  // const [modal, setModal]= useState(false)
  const [id, setID] = useState("")
  const [page, setPage] = useState(1);
  const [dataID, setDataID] = useState([]);
  let total = "";
  // const toggleModal = () =>{
  //   setModal((prevstate)=>!prevstate)
  // }
  const handleDetail = (id) => {
    // toggleModal()
    setID(()=>id)
    console.log(id)
  }

  const [data, setData] = useState([]);
  useEffect(() => {
    getData(page);
    const datauser = JSON.parse(localStorage.getItem("name"));
    const id_user = datauser.data.id_seller;
  }, [page]);
  const getData = () => {
    axios
      .get(
        `${
          process.env.REACT_APP_BACKEND_URL
        }/productlist/limit?sort=product_name&asc=asc&limit=4${
          page ? `&page=${page}` : ""
        }`
      )
      .then((response) => {
        // console.log(response.data.data);
        setData(response.data.data.rows);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const NextPage = () => {
    setPage(page + 1);
    getData(5, page);
    // window.location.reload();
  };
  const PreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      getData(5, page);
      // console.log(page);
      // window.location.reload();
    }
  };

  const deleteProduct = () => {
    // console.log(id_product)
    // e.preventDefault();
    axios
      .delete(
        `${process.env.REACT_APP_BACKEND_URL}/product/delete/${id}`
      )
      .then((response) => {
        console.log(response);
        // console.log(id_product)
        // console.log(response.data);
        const posts = product.filter((item) => item.id === id);
        setProduct({ data: posts });
        // alert("Delete Success");
        swal({
          icon: 'success',
          title: 'Delete Success!',
          showConfirmButton: false,
          timer: 5000,
        });
        window.location.reload();
        // return navigate("/home");
      })
      .catch((err) => {
        // console.log(err);
        // alert("Delete Failed");
        swal({
          icon: 'error',
          title: "Delete Failed",
          showConfirmButton: false,
          timer: 5000,
        });
      });
  };
  //   const getDetailid = (id_product) =>{
  //     axios.get(`${process.env.REACT_APP_BACKEND_URL}/productlist/${id_product}`)
  //     .then((response) => {
  //       alert(response.data.rows)
  //       setDataID(response.data)
  //       // console.log(response.data[0]);
  //       // setTitle(response.data[0].nama_recipe)
  //       // setingredients(response.data[0].ingredients.split(','))
  //       // SetImage(response.data[0].image)
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  // }

  return (
    <>
      {/* {JSON.stringify(dataID)} */}
      <div className="container-fluid">
        <Nav />
        <div className="container">
          <div className={Style.bg}>
            <h4>List Product</h4>
            <div className="row d-flex justify-content-center">
              {data.map((item, index) => (
                <div key={index} className={`col-md-3 ${Style.cad}`}  >
                  <div className={` ${Style.cards} `}>
                    <img
                      src={item.photo_url}
                      className={Style.listImg}
                      alt="..."
                    />
                    <div className={`card-body ${Style.texts}`}>
                      <h5 className="card-title ">{item.product_name}</h5>
                      <p className="card-text py-2">
                        <p>harga Jual: {item.pricej}</p>
                        <p>harga Beli: {item.priceb}</p>
                        <p>Stock : {item.stock}</p>
                      </p>
                      <div
                        className={`d-flex justify-content-center ${Style.profile}`}
                      >
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
                        </div>
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
                disabled={data <= 0}
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
