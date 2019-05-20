import React from "react";
import VisorImagen from "./visorImagen";
import VisorTramite from "./visorTramite";
import $ from "jquery";

export default class Tramites extends React.Component {
  state = {
    loading: true,
    tramites: [],
    imagenUrl: null,
    imagenNombre: null,
    selectedTramite: null
  };

  componentDidMount() {
    this.cargarTramites();
  }

  cargarTramites = async () => {
    this.setState({
      ...this.state,
      tramites: [],
      loading: true
    });
    let response = await fetch("https://eono9vsnk6.execute-api.us-east-1.amazonaws.com/TEST/transacciones");
    const data = await response.json();
    console.log(data);
    this.setState({
      ...this.state,
      loading: false,
      tramites: data
    });
  };

  handlerLinkImagen = (imagenNombre, imagenUrl) => {
    this.setState({
      ...this.state,
      imagenUrl: imagenUrl,
      imagenNombre: imagenNombre
    });
  };

  handlerLinkTramite = item => {
    this.setState({
      ...this.state,
      selectedTramite: item
    });
  };

  handlerSelectedTramiteEstado = event => {
    console.log("selected");
    this.setState({
      ...this.state,
      selectedTramite: {
        ...this.state.selectedTramite,
        estado: event.target.value
      }
    });
  };

  handleGuardar = async () => {
    const url = "https://eono9vsnk6.execute-api.us-east-1.amazonaws.com/TEST/transaccion";
    try {
      await fetch(url, {
        method: "PUT",
        body: JSON.stringify({
          nombre: this.state.selectedTramite.nombre,
          estado: this.state.selectedTramite.estado
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      //Cerramos el cuadro de dialogo
      $("#visorTramite").modal("hide");
      this.cargarTramites();
    } catch (error) {
      console.log("Error al actualizar el registro", error);
    }
  };

  render() {
    return (
      <div>
        <div
          style={{
            width: "100%",
            backgroundColor: "blue",
            color: "white",
            height: 70,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20
          }}>
          <h1>Trámites en gestión</h1>
        </div>
        <GrillaTramites
          tramites={this.state.tramites}
          onLinkImagen={this.handlerLinkImagen}
          onLinkTramite={this.handlerLinkTramite}
        />
        <VisorImagen imagenUrl={this.state.imagenUrl} nombre={this.state.imagenNombre} />
        <VisorTramite
          {...this.state.selectedTramite}
          onEstadoSelected={this.handlerSelectedTramiteEstado}
          onGuardar={this.handleGuardar}
        />
      </div>
    );
  }
}

function GrillaTramites(props) {
  var contador = 0;
  return (
    <div className="container">
      <div style={{ backgroundColor: "blue", color: "white" }} className="row">
        <span className="col-3 text-truncate">
          <strong>Nombre</strong>
        </span>
        <span className="col-2 text-truncate">
          <strong>Fecha</strong>
        </span>
        <span className="col-2 text-truncate">
          <strong>Estado</strong>
        </span>
        <span className="col-1 text-truncate">
          <strong>Subtotal</strong>
        </span>
        <span className="col-1 text-truncate">
          <strong>Iva</strong>
        </span>
        <span className="col-1 text-truncate">
          <strong>Total</strong>
        </span>
        <span className="col-2 text-truncate">
          <strong>Imagen</strong>
        </span>
      </div>
      {props.tramites.length > 0 ? (
        props.tramites.map(item => {
          contador++;
          return (
            <div
              style={{
                backgroundColor: contador % 2 == 0 ? "#EEEEEE" : "white"
              }}
              className="row"
              key={item.nombre}>
              <a
                className="col-3"
                href="#"
                data-toggle="modal"
                data-target="#visorTramite"
                onClick={() => {
                  props.onLinkTramite(item);
                }}>
                <span className="text-truncate">{item.nombre}</span>
              </a>
              <span className="col-2 text-truncate">{item.fecha}</span>
              <span className="col-2 text-truncate" style={{ color: item.estado == "Validado" ? "green" : "black" }}>
                {item.estado}
              </span>
              <span className="col-1 text-truncate text-right">{"$" + parseFloat(item.subtotal).toFixed(2)}</span>
              <span className="col-1 text-truncate text-right">{"$" + parseFloat(item.iva).toFixed(2)}</span>
              <span className="col-1 text-truncate text-right">{"$" + parseFloat(item.total).toFixed(2)}</span>
              <a
                className="col-2 text-truncate"
                href="#"
                data-toggle="modal"
                data-target="#visorImagen"
                onClick={() => {
                  props.onLinkImagen(item.imageName, item.imagenUrl);
                }}>
                <span className="text-truncate">{item.imageName}</span>
              </a>
            </div>
          );
        })
      ) : (
        <div>Cargando...</div>
      )}
    </div>
  );
}
