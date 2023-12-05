import React from "react";
import { useForm } from "react-hook-form";
import { validadorOSC } from "./validadorOSC";
function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setFocus,
    resetField,
  } = useForm();
  const obtenerValor = (data) => {
    resetField("telefono");
    setFocus("telefono");
  };
  return (
    <>
      <form onSubmit={handleSubmit(obtenerValor)}>
        <div className="pregunta">
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            placeholder="Tu Nombre"
            autoFocus
            {...register("nombre", {
              required: true,
              maxLength: 15,
            })}
          />
        </div>
        {errors.nombre?.type === "required" && (
          <div className="aviso">El nombre de usuario es obligatorio</div>
        )}
        {errors.nombre?.type === "maxLength" && (
          <div className="aviso">Maximo 15 caracteres</div>
        )}
        <div className="pregunta">
          <label htmlFor="edad">edad</label>
          <input
            id="edad"
            type="number"
            placeholder="Tu edad"
            {...register("edad", {
              min: 1,
              max: 120,
            })}
          />
        </div>
        {errors.edad?.type === "min" && (
          <div className="aviso">valor Minimo es 0</div>
        )}
        {errors.edad?.type === "max" && (
          <div className="aviso">valor Maximo es 120</div>
        )}
        <div className="pregunta">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            placeholder="Tu E-mail"
            {...register("email", {})}
          />
        </div>
        <div className="pregunta">
          <label htmlFor="telefono">telefono</label>
          <input
            type="number"
            id="telefono"
            placeholder="Tu telefono"
            {...register("telefono", {
              validate: validadorOSC,
            })}
          />
        </div>
        {errors.telefono?.type === "validate" && (
          <div className="aviso">El telefono debe ser de Bolivia</div>
        )}
        <div>
          <input type="submit" />
        </div>
      </form>
      <div>
        {watch("nombre") && (
          <div className="resumen">
            Me llamo <strong>{watch("nombre")}</strong>
            {watch("edad") && (
              <span>
                {" "}
                y tengo <strong>{watch("edad")}</strong> años
              </span>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
