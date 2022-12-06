//import React, { Fragment } from "react";
import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { login } from "../../services/auth.service";
import { Invitation } from "../../interface/Invitation";
import Swal from "sweetalert2";
const Button = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-4 offset-md-4 mt-3">
        <button className="btn btn-success btn-block"><i className="fa fa-user-plus pr-1"></i> REGISTRO DE USUARIO </button>
        </div>
      </div>
    </>
  );
};

function Register(): JSX.Element {
  const initialValues = { email: "", name: "" };
  const [formValues, setFormValues] = useState<Invitation>(initialValues);
  const [formErrors, setFormErrors] = useState<any>({});
  const [isSubmit, setIsSubmit] = useState(false);
  const history = useHistory();
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const routerView = () => {
    history.push(`/`);
  };
  const sendForm = async (e: any) => {
    e.preventDefault();
    setFormErrors(await validate(formValues));
    console.log(formErrors);
    //
    if (
      !formErrors.name &&
      !formErrors.email &&
      formValues.name.length !== 0 &&
      formValues.email.length !== 0
    ) {
      const { email, name } = formValues;
      const response: any = await login({ email, password: name });
      console.log("dd", response.error);

      if (response.hasOwnProperty('error')) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `El correo ${formValues.email} no! esta registrado!`,
          footer:
            '<p class="text-lead"><small>porfavor intentelo nuevamente con un correo registrado, muchas gracias</small></p>',
        });
        return;
      } else if(response.hasOwnProperty('data')) {
        setIsSubmit(true);
        if (localStorage.getItem("token_auth") !== null) {
          localStorage.removeItem("token_auth");
          localStorage.setItem("token_auth", response.data.access_token);
        } else {
          localStorage.removeItem("token_auth");
          localStorage.setItem("token_auth", response.data.access_token);
        }

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login exitoso!",
          showConfirmButton: false,
          timer: 1500,
        });
        routerView();
        window.location.reload();
      }
      setTimeout(() => {
        setIsSubmit(false);
      }, 1600);
    }
  };

  const validate = async (values: any) => {
    let errors: any = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (values.name.length === 0) {
      errors.name = "Password es requerido!";
    } else if (!values.name) {
      errors.name = "Password es requerido!";
    } else if (
      values.name.match("^[A-Za-z]{1,20}, [A-Za-z]{1,20}, [A-Za-z]{1,20}")
    ) {
      errors.name = "Password es requerido!";
    }
    if (values.email.length === 0) {
      errors.email = "Email es requerido!";
    } else if (!values.email) {
      errors.email = "Email es requerido!";
    } else if (!regex.test(values.email)) {
      errors.email = "El email no tiene un formato valido!";
    }
    return errors;
  };

  return (
    <Fragment>
      <div className="container">
        {isSubmit ? (
          <div className="alert alert-success">
            Invitación generada correctamente!
          </div>
        ) : (
          <pre></pre>
        )}
      </div>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="jumbotron ">
            <form onSubmit={sendForm}>
              <div className="row">
                <div className="form-group col-md-6">
                  <input
                    type="email"
                    name="email"
                    className="form-control form-control-sm"
                    placeholder="Ingresar tu email"
                    onChange={handleChange}
                    value={formValues.email}
                  />
                  <p>{formErrors.email}</p>
                </div>
                <div className="form-group col-md-6">
                  <input
                    type="password"
                    name="name"
                    className="form-control form-control-sm"
                    placeholder="Password"
                    onChange={handleChange}
                    value={formValues.name}
                  />
                  <p>{formErrors.name}</p>
                </div>
              </div>
              <hr />
              <Button />
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default Register;
