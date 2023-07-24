import swal from "sweetalert";

export const success = ()=>{
    swal({
      icon: "success",
      title: "Succes",
      buttons: false,
      timer: 3000,
    });
    setTimeout(() => {
        window.location.reload();
      }, 3000);
}

export const error = () =>{
    swal({
        icon: "error",
        title: "Error",
        buttons: false,
        timer: 3000,
      });
}