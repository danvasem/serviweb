import React, { useState } from "react";

function VisorTramite(props) {
  const [loading, setLoading] = useState(false);
  return (
    <div
      className="modal fade"
      id="visorTramite"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {props.nombre}
            </h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ width: 350 }}>
                <span>
                  <strong>{"Nombre: "}</strong>
                  {props.nombre}
                </span>
                <br />
                <span>
                  <strong>{"Fecha: "}</strong>
                  {props.fecha}
                </span>
                <br />
                <span>
                  <strong>{"Subtotal: "}</strong>
                  {props.subtotal}
                </span>
                <br />
                <span>
                  <strong>{"IVA: "}</strong>
                  {props.iva}
                </span>
                <br />
                <span>
                  <strong>{"Total: "}</strong>
                  {props.total}
                </span>
                <br />
                <br />
                <span>
                  <strong>{"Estado: "}</strong>
                </span>
                <br />
                <select
                  style={{ width: 120 }}
                  value={props.estado}
                  className="custom-select"
                  onChange={props.onEstadoSelected}>
                  <option value="Ingresado">Ingresado</option>
                  <option value="En revisión">En revisión</option>
                  <option value="Validado">Validado</option>
                </select>
              </div>
              <div>
                <img style={{ width: "100%", objectFit: "contain" }} src={props.imagenUrl} />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">
              Cerrar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={async () => {
                setLoading(true);
                await props.onGuardar();
                setLoading(false);
              }}>
              {"Guardar cambios "}
              {loading && <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisorTramite;
