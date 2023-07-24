import React, { useRef, useState, useEffect } from "react";
import Footer from "../../component/footer";
import Style from "./style.module.css";
import Nav from "../../component/nav";
import addPhoto from "../../assets/addphoto.PNG";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert';

const Index = () => {
  const hiddenFileInput = useRef(null);
  const navigate = useNavigate();
  const [dataSearch, setDataSearch] = useState();
  const [dataUpdate, setDataUpdate] = useState();
  const [imageProduct, setImageProduct] = useState();
  const { id } = useParams();
  const [fileName, setFileName] = useState("");
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    document.getElementById("customBtn").innerHTML = fileUploaded.name;
    setFileName(fileUploaded.name);
    setImageProduct(fileUploaded);
  };


  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/productlist/${id}`)
      .then((response) => {
        console.log(response.data.data.rows)
        setDataSearch(response.data.data.rows);
        setDataUpdate(response.data.data.rows[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  const [update, setUpdate] = useState({
    product_name: dataUpdate && dataUpdate.product_name,
    pricej: dataUpdate && dataUpdate.pricej,
    stock: dataUpdate && dataUpdate.stock,
    description: dataUpdate && dataUpdate.description,
    priceb: dataUpdate && dataUpdate.priceb,
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
        swal({
          icon: 'success',
          title: 'Sucess to Update Data!',
          buttons: false,
          timer: 5000,
        });
        return navigate("/home");
      })
      .catch((err) => {
        swal({
          icon: 'error',
          title: "Update Failed",
          buttons: false,
          timer: 3000,
        });
      });
    if (imageProduct !== undefined) {
      let body = new FormData();
      body.append("photo", imageProduct);
      axios
        .put(
          `${process.env.REACT_APP_BACKEND_URL}/product/update/photo/${id}`,
          body
        )
        .then((res) => {
          swal({
            icon: 'success',
            title: 'Sucess to Update Image!',
            buttons: false,
            timer: 5000,
          });
           navigate("/home");
           setTimeout(() => {
            window.location.reload();
          }, 3000);
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
  };

  return (
    <>
      <Nav />
      {/* {JSON.stringify(dataSearch)} */}
      <div className="container ">
        {dataSearch &&
          dataSearch.map((item,e) => (
              <div key={e}>
                <form className=" mx-5">
                  <div
                    className={`col-md-7 mb-4 my-4  
                                     ${Style.addPhoto}`}
                  >
                    <div className="d-flex justify-content-center pt-5">
                      <img src={addPhoto} alt="" />
                    </div>
                    <div className="d-flex justify-content-center">
        <h5 className="text-muted" id="customBtn" onClick={handleClick}>
          {fileName || "Pilih berkas"} {/* Tampilkan nama berkas atau teks "Pilih berkas" jika belum ada berkas yang dipilih */}
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
                    <div className="d-flex justify-content-center">
                      File Sebelumnya : {item.photo_pub_id}
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
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
           
          ))}
      </div>

      <Footer />
    </>
  );
};
export default Index;
