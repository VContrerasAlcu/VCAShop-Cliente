import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Temporizador = ({ days = 0, hours = 0, minutes = 0, seconds = 0, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState({
    days,
    hours,
    minutes,
    seconds,
  });

  useEffect(() => {
    const totalSeconds =
      days * 86400 + hours * 3600 + minutes * 60 + seconds; // Convierte todo a segundos
    let countdown = totalSeconds;

    const timer = setInterval(() => {
      if (countdown > 0) {
        countdown--;
        setTimeLeft({
          days: Math.floor(countdown / 86400),
          hours: Math.floor((countdown % 86400) / 3600),
          minutes: Math.floor((countdown % 3600) / 60),
          seconds: countdown % 60,
        });
      } else {
        clearInterval(timer); // Detener el temporizador
        if (onComplete) onComplete(); // Llamar a la función onComplete si existe
      }
    }, 1000);

    return () => clearInterval(timer); // Limpia el temporizador al desmontar el componente
  }, [days, hours, minutes, seconds, onComplete]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card text-center" style={{ padding: "20px" }}>
            <div className="card-header bg-primary text-white">
              <h6 className="mb-0">
                Pulse en el link que se le ha enviado al correo para completar el registro
              </h6>
            </div>
            <div className="card-body">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                {timeLeft.days > 0 && (
                  <>
                    <h3 style={{ fontSize: "1.5rem", margin: "0" }}>
                      {timeLeft.days.toString().padStart(2, "0")}
                    </h3>
                    <h3 style={{ fontSize: "1.5rem", margin: "0" }}>:</h3>
                  </>
                )}
                {timeLeft.hours > 0 && (
                  <>
                    <h3 style={{ fontSize: "1.5rem", margin: "0" }}>
                      {timeLeft.hours.toString().padStart(2, "0")}
                    </h3>
                    <h3 style={{ fontSize: "1.5rem", margin: "0" }}>:</h3>
                  </>
                )}
                <h3 style={{ fontSize: "1.5rem", margin: "0" }}>
                  {timeLeft.minutes.toString().padStart(2, "0")}
                </h3>
                <h3 style={{ fontSize: "1.5rem", margin: "0" }}>:</h3>
                <h3 style={{ fontSize: "1.5rem", margin: "0" }}>
                  {timeLeft.seconds.toString().padStart(2, "0")}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Temporizador;