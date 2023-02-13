import React, { useRef, useState, useEffect } from "react";
import Footer from "../../component/footer";
import Style from "./style.module.css";
import Nav from "../../component/nav";
import addPhoto from "../../assets/addphoto.PNG";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Index = () => {
  const navigate = useNavigate();
  const [dataSearch, setDataSearch] = useState();
  const [dataUpdate, setDataUpdate] = useState()
  const { id } = useParams();

 
  // console.log("data",dataSearch[0].stock)
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/productlist/${id}`)
      .then((response) => {
        // console.log("didigidaw",response.data.data.rows[0]);
        setDataSearch(response.data.data.rows);
        setDataUpdate(response.data.data.rows[0])
      })
      .catch((err) => {
        console.log(err); 
      });
  }, [id]);
  const [update, setUpdate] = useState({
    product_name: dataUpdate&&dataUpdate.product_name,
    pricej: dataUpdate&&dataUpdate.pricej,
    stock: dataUpdate&&dataUpdate.stock,
    description: dataUpdate&&dataUpdate.description,
    priceb: dataUpdate&&dataUpdate.priceb
  });
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
      .put(`${process.env.REACT_APP_BACKEND_URL}/product/update/${id}`, form)
      .then((res) => {
        console.log(res);
        alert("Update Success");
        return navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        alert("Update Failed");
      });
  };

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
                    // onClick={handleClick}
                  >
                    {/* {item.photo_pub_id} */}
                  </h5>
                  <input
                    className=""
                    type="file"
                    // ref={hiddenFileInput}
                    id="formFile"
                    // onChange={handleChange}
                    // defaultValue={item.photo_url}
                    // style={{ display: "none" }}
                  />
                  {item.photo_pub_id}
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
                        setUpdate({ ...update, product_name: e.target.value })
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
                        setUpdate({ ...update, pricej: e.target.value })
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
                        setUpdate({ ...update, priceb: e.target.value })
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
                        setUpdate({ ...update, stock: e.target.value })
                      }
                    />
                    <label htmlFor="floatingInputGroup1 ">Stock</label>
                  </div>
                  <div className="d-flex justify-content-center pt-5">
                    <button
                      onClick={handlePost}
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
