import React, { useRef, useState,useEffect  } from "react";
import Footer from "../../component/footer";
import Style from "./style.module.css";
import Nav from "../../component/nav";
import ayam from "../../assets/maxresdefault.jpg";
import addPhoto from "../../assets/addphoto.PNG";
import { useNavigate,useSearchParams } from "react-router-dom";
import axios from 'axios'

const Index = () => {
  const hiddenFileInput = useRef(null);
  const [queryparams]=useSearchParams();
  const search = queryparams.get('search');
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [imageProduct, setImageProduct] = useState();
  const [dataSearch, setDataSearch] =useState()

  let total = "";
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    document.getElementById("customBtn").innerHTML = fileUploaded.name;
    // setImage(fileUploaded);
  };
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/productlist/limit/${search}`)
      .then((response) => {
        console.log(response.data)
        // setDataSearch(response.data)
        // console.log(response.data[0]);
        // setTitle(response.data[0].nama_recipe)
        // setingredients(response.data[0].ingredients.split(','))
        // SetImage(response.data[0].image)
      })
      .catch((err) => {
        console.log(err);
      });
      
  },[]);
  
  const deleteProduct = (id_product, e) => {
    e.preventDefault();
    // console.log(id_product)
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/product/delete/${id_product}`)
        .then((response) => {
          console.log(response);
          console.log(response.data);
          const posts = product.filter((item) => item.id_product !== id_product);
          setProduct({ data: posts });
          alert("Delete Success");
          return navigate("/home");
        })
        .catch((err) => {
          console.log(err);
          alert("Delete Failed");
        })
  };
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
                    alert("data berhasil ditambahkan")
                    console.log(response.data)
                    return navigate('/home')
                // console.log(response.data)
                // return navigate('/')
            }).catch((err) => {
                alert(err)            })   
          }
  
  return (
    <>
    {JSON.stringify(dataSearch)}
      <div className="container-fluid">
        <Nav />
        <div className="container">
          <div className={Style.bg}>
            <h4>List Product</h4>
            <div className="row d-flex justify-content-center">
              {dataSearch.map((item, index)=>(
                <div key={index} className="col-md-3  ">
                <div className={` ${Style.cards} `}>
                  <img src={item.photo_url} className={Style.listImg} alt="..." />
                  <div className={`card-body ${Style.texts}`}>
                    <h5 className="card-title">{item.product_name}</h5>
                    <p className="card-text">
                      <p>harga Jual: {item.pricej}</p>
                      <p>harga Beli: {item.priceb}</p>
                      <p>Stock     : {item.stock}</p>
                      
                    </p>
                    <div
                      className={`d-flex justify-content-center ${Style.profile}`}
                    >
                      <div
                        className={`d-flex justify-content-center ${Style.profile}`}
                      >
                        <button
                          type="button"
                          className="btn btn-primary ms-2"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal4"
                        >
                          Update
                        </button>
                        <div
                          className="modal fade modal-xl"
                          id="exampleModal4"
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
                                  Update
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
                                  <form className=" mx-5">
                                    <div 
                                    className={`col-md-7 mb-4  
                                     ${Style.addPhoto}`}
                                     >
                                      <div className="d-flex justify-content-center pt-5">
                                      <img src={addPhoto} alt=""  />
                                      </div>
                                      <div className="d-flex justify-content-center">
                                      <h5
                                        // className="text-muted"
                                        id="customBtn"
                                        onClick={handleClick}
                                      >
                                        
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
                                  </form>
                                </div>
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                >
                                  Close
                                </button>
                                <button type="button" className="btn btn-primary"
                                onClick={(e) => deleteProduct(item.id_product, e)}
                               >
                                  Save changes
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`d-flex justify-content-center ${Style.profile}`}
                      >
                        <button
                          type="button"
                          className="btn btn-primary ms-2"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal1"
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
                                <button type="button" className="btn btn-primary"
                                 onClick={(e) => deleteProduct(item.id_product, e)}
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
