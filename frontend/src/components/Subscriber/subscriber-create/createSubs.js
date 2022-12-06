import React, { Fragment, useState, useEffect, useRef } from "react";
import { Subscriber } from "../../../model/Subscriber";
import axios from "axios";
import {
  updateOneSubscriber,
  getAllSubscribers,
} from "../../../actions/subscriberActions";
import { useParams, useHistory } from "react-router-dom";

import { connect } from "react-redux";
const Subs = ({
  updateOneSubscriber,
  getAllSubscribers,
}) => {
  let initialValues;
  initialValues = new Subscriber("", "", "", "");
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [data, setData] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const { id } = useParams();
  const nameInput = useRef(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    console.log({ ...formValues, _id: id });
    await updateOneSubscriber({ ...formValues, _id: id });
    await getAllSubscribers();
    setFormValues(initialValues);
    nameInput.current.focus();
    setTimeout(() => {
      setIsSubmit(false);
    }, 2000);
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = "Nombre completo es requerido!";
    }
    if (!values.email) {
      errors.email = "Email es requerido!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    return errors;
  };

  const peticionGet = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_APP_URL}/users/${id}`)
      .then((response) => {
        console.log(response);
        setData(response.data.payload);
        initialValues = new Subscriber(response.data.payload.email, "", "", "");
        setFormValues({ ...formValues, email: response.data.payload.email });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    peticionGet();
  }, []);

  return (
    <Fragment>
      <div className="container">
        {isSubmit ? (
          <div className="alert alert-success">
            Datos ingresados correctamente!
          </div>
        ) : (
          <pre></pre>
        )}
      </div>
      <div className="container">
        <div className="card col-md-6 offset-md-2">
          <div className="card-header text-center">
            <div className="card-title">
              <h2>
                <b>Editar Usuario</b>
              </h2>
            </div>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="form-group col-md-12">
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
              </div>
              <div className="row">
                <div className="form-group col-md-12">
                  <input
                    type="text"
                    name="name"
                    ref={nameInput}
                    className="form-control form-control-sm"
                    placeholder="Nombre Completo"
                    value={formValues.name}
                    onChange={handleChange}
                  />
                  <p>{formErrors.name}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 offset-md-3">
                  <button className="btn btn-success btn-block">
                    <i className="fa fa-user pr-1"></i>Actualizar Usuario
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="card-footer">
            <small className="text-muted">
              <em>Subscribers form.</em>
            </small>
          </div>
        </div>
      </div>
      
      <div className="container mt-3">
              <div className="row animated fadeIn">
                <div className="card col-md-12 animated fadeIn cardFriendDetails">
                  <div className="card-header">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4 text-center">
                          <img
                            src='https://i.pinimg.com/564x/e2/7c/87/e27c8735da98ec6ccdcf12e258b26475.jpg'
                            width="240px"
                            className="img-responsive img-thumbnail my-5"
                          ></img>
                        </div>
                        <div className="col-md-8">
                          <ul className="list-group mb-3">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                              <span className="text-muted">
                                <strong>Usuario</strong>
                              </span>
                              <span className="badge badge-secondary badge-pill">
                                ID: {data._id}
                              </span>
                            </h4>
                            <div className="row">
                              <div className="col-md-12 my-3">
                                {" "}
                                <h6 className="my-0">
                                  <strong>email:</strong>{" "}
                                  {data.email}
                                </h6>
                              </div>
                            </div>
                            <li className="list-group-item d-flex justify-content-between lh-condensed">
                              <small className="text-muted">
                                <em>User Data.</em>
                              </small>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    </Fragment>
  );
};

const mapStateProps = ({ buttonReducer }) => ({
  buttonReducer,
});
export default connect(mapStateProps, {
  updateOneSubscriber,
  getAllSubscribers,
})(Subs);

