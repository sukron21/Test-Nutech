import React, { useRef, useState } from "react";
import Style from "../modal/style.module.css";
import swal from "sweetalert";
import addPhoto from "../../assets/addphoto.PNG";
import { useDispatch } from "react-redux";
import {insert} from "../../redux/action/product"

const Index = () => {
  const hiddenFileInput = useRef(null);
  const dispatch = useDispatch()
  const [imageProduct, setImageProduct] = useState();
  const [product, setProduct] = useState({
    seller: "",
    product_name: "",
    pricej: 0,
    stock: 0,
    description: "",
    priceb: 0,
  });
  const onSubmit = (e) => {
    e.preventDefault();
    if(product.pricej<1 ||product.priceb<1 || product.stock<1 || imageProduct===null){
        swal({
            icon: "error",
            title:
              "Harga beli, Harga Jual atau stock tidak boleh dibawah 1 atau data belum lengkap",
            buttons: false,
            timer: 5000,
        })
    }else{
    const datauser = JSON.parse(localStorage.getItem("name"));
    const id_user = datauser.data.id_seller;
    let body = new FormData();
    body.append("seller", id_user);
    body.append("product_name", product.product_name);
    body.append("pricej", product.pricej);
    body.append("stock", product.stock);
    body.append("photo", imageProduct);
    body.append("description", "aa");
    body.append("priceb", product.priceb);
    // axios
      // .post(`${process.env.REACT_APP_BACKEND_URL}/insert`, body)
      // .then((response) => {
        const handleSuccess = (response)=>{
        if (response.data.status === "failed") {
          swal({
            icon: "error",
            title: "Nama Product sudah terdaftar",
            buttons: false,
            timer: 5000,
          });
        } else if (response.data.message === "upload product photo failed bor") {
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
            timer: 3000,
          });
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
        
      }
      // .catch((err) => {
      //   // alert(err)
      //   swal({
      //     icon: "error",
      //     title: err,
      //     buttons: false,
      //     timer: 3000,
      //   });
      // });
      dispatch(insert(body,handleSuccess))
    }
  };
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    document.getElementById("customBtn").innerHTML = fileUploaded.name;
    setImageProduct(fileUploaded);
  };
  return (
    <form>
      <div className="container ">
        <div className={`col-md-7 mb-4   ${Style.addPhoto}`}>
          <div className="d-flex justify-content-center pt-5">
            <img src={addPhoto} alt="" />
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
              <input
                type="text "
                className={`form-control ${Style.costuminput}`}
                id="floatingInputGroup1"
                placeholder="Title"
                onChange={(e) =>
                  setProduct({
                    ...product,
                    product_name: e.target.value,
                  })
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
                onChange={(e) =>
                  setProduct({
                    ...product,
                    pricej: e.target.value,
                  })
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
                onChange={(e) =>
                  setProduct({
                    ...product,
                    priceb: e.target.value,
                  })
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
                onChange={(e) =>
                  setProduct({
                    ...product,
                    stock: e.target.value,
                  })
                }
              />
              <label htmlFor="floatingInputGroup1 ">Stock</label>
            </div>
          </div>
        </div>
        <div className={`d-flex justify-content-end`}>
        <button type="button" className="btn btn-primary" onClick={onSubmit}>
          Save changes
        </button>
      </div>
      </div>
    </form>
  );
};

export default Index;
