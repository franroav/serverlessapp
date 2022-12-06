import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Inicio.css";

function Inicio(): JSX.Element {
  const history = useHistory();
  const [logged, setAuth] = useState(false);
  const routerView = () => {
    if(!logged){
      history.push(`/auth/login`);
    }
    history.push(`/subscribers`);
  };
 

  const buttonSession = () => {
    return (
      <div>
        {logged
          ? (
            <div className="py-2">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => routerView()}
            >
              Navegar
            </button>
          </div>
            )
          : (
            <div className="py-2">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => routerView()}
            >
              Iniciar Sesión
            </button>
          </div>
            )}
      </div>
    );
  };

  useEffect(() => {
    const checkAuthToken = async () => {
      if (localStorage.getItem("token_auth") !== null) {
        setAuth(true);
      }
    };

    checkAuthToken();
  }, []);
  return (
    <Fragment>
      <div className="card text-center">
        <div className="card-header">
          <div className="card-title">
            <h1>Bienvenidos!</h1>
          </div>
        </div>
        <div className="card-body">
          Si no ha iniciado sesión de usuario, porfavor haga click en el boton de mas abajo, para navegar por la
          aplicación, muchas gracias!
          {buttonSession()}
        </div>
      </div>
    </Fragment>
  );
}

export default Inicio;