import React, { useRef, useState, useEffect } from "react";
import Footer from "../../component/footer";
import Style from "./style.module.css";
import Nav from "../../component/nav";
import addPhoto from "../../assets/addphoto.PNG";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Index = () => {
  const navigate = useNavigate();
  const hiddenFileInput = useRef(null);
  const [imageProduct, setImageProduct] = useState('');
  const [dataSearch, setDataSearch] = useState();
  const { id } = useParams();
  const handleClick = (event) => {
    hiddenFileInput.current.click();
};
const handleChange = (event) => {
  const fileUploaded = event.target.files[0];
  document.getElementById("customBtn").innerHTML = fileUploaded.name;
  setImageProduct(fileUploaded);
};
const [product, setProduct] = useState([])
 
  // console.log("data",dataSearch[0].stock)
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/productlist/${id}`)
      .then((response) => {
        console.log(response.data.data.rows);
        setDataSearch(response.data.data.rows);
      })
      .catch((err) => {
        console.log(err); 
      });
  }, [id]);
  const onSubmit = (e) => {
    e.preventDefault();
    // alert(dataSearch[0].product_name)
    let body = new FormData ()
        body.append("product_name", product.product_name);
        body.append("pricej", product.pricej);
        body.append("stock", product.stock);
        body.append("description", "aa");
        body.append("priceb", product.priceb);
        axios.post((`${process.env.REACT_APP_BACKEND_URL}/product/update/${id}`), body)
            .then((response) => {
                alert("data berhasil ditambahkan")
                console.log(response.data)
                return navigate('/home')
            }).catch((err) => {
                alert(err)            })   
          } 

  return (
    <>
      <Nav />
      {/* {JSON.stringify(dataSearch)} */}
      <div className="container ">
        {dataSearch && dataSearch.map((item, index) => (
          <>
          <div key={index}>
            <form className=" mx-5">
              <div
                className={`col-md-7 mb-4  
                                     ${Style.addPhoto}`}
              >
                <div className="d-flex justify-content-center pt-5">
                  <img src={addPhoto} alt="" />
                </div>
                <div className="d-flex justify-content-center">
                  <h5
                    // className="text-muted"
                    id="customBtn"
                    onClick={handleClick}
                  >
                    {item.photo_pub_id}
                  </h5>
                  <input
                    className=""
                    type="file"
                    ref={hiddenFileInput}
                    id="formFile"
                    onChange={handleChange}
                    // defaultValue={item.photo_url}
                    // style={{ display: "none" }}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <div className="col-md-7 mb-4 ">
                  <div className="form-floating pt-3">
                    <input
                      type="text "
                      className={`form-control ${Style.costuminput}`}
                      id="floatingInputGroup1"
                      defaultValue={item.product_name}
                      onChange={(e) =>
                        setProduct({ ...product, product_name: e.target.value })
                      }
                    />
                    <label htmlFor="floatingInputGroup1 ">Nama Product</label>
                  </div>
                  <div className="form-floating pt-3">
                    <input
                      type="number"
                      className={`form-control ${Style.costuminput}`}
                      id="floatingInputGroup1"
                      placeholder="Title"
                      defaultValue={item.pricej}
                      onChange={(e) =>
                        setProduct({ ...product, pricej: e.target.value })
                      }
                    />

                    <label htmlFor="floatingInputGroup1 ">Harga Jual</label>
                  </div>
                  <div className="form-floating pt-3">
                    <input
                      type="number"
                      className={`form-control ${Style.costuminput}`}
                      id="floatingInputGroup1"
                      placeholder="Title"
                      defaultValue={item.priceb}
                      onChange={(e) =>
                        setProduct({ ...product, priceb: e.target.value })
                      }
                    />
                    <label htmlFor="floatingInputGroup1 ">Harga Beli</label>
                  </div>
                  <div className="form-floating pt-3">
                    <input
                      type="number"
                      className={`form-control ${Style.costuminput}`}
                      id="floatingInputGroup1"
                      placeholder="Title"
                      defaultValue={item.stock}
                      onChange={(e) =>
                        setProduct({ ...product, stock: e.target.value })
                      }
                    />
                    <label htmlFor="floatingInputGroup1 ">Stock</label>
                  </div>
                  <div className="d-flex justify-content-center pt-5">
                    <button
                      onClick={onSubmit}
                      className={`btn btn-primary ${Style.btnUpdate}`}
                    >
                      woi
                    </button>
                  </div>
                </div>
              </div>
            </form>
            </div>
          </>
        ))}
      </div>

      <Footer />
    </>
  );
};
export default Index;
