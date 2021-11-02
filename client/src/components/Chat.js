import React, { useState, useEffect, useRef } from "react";
import socket from "../utils/socket";


const Chat = ({ nombre, other }) => {
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    socket.emit("conectado", nombre);
    console.log(nombre)
  }, [nombre]);

  useEffect(() => {
    socket.on("mensajes", (mensaje) => {
      setMensajes([...mensajes, mensaje]);
    });

    return () => {
      socket.off();
    };
  }, [mensajes]);

  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  const submit = (e) => {
    e.preventDefault();
    socket.emit("mensaje", nombre, mensaje, other);
    setMensaje("");
  };

  const renderChat = () =>{
      return mensajes.map((e, i) => (
        <div key={i}>
            {(() => {
                if((e.nombre !== nombre && e.nombre !== other)) return;
                if(e.other !== nombre && e.nombre !== nombre) return;
                if(e.nombre === nombre){
                    return<div className="xms" style={{float: 'right'}}>
                             <text>{e.mensaje}</text>
                    </div>
                }else{
                    return (
                        <div className="xm" style={{float: 'left'}}>
                             <text>{e.mensaje}</text>
                        </div>
                    ); 
                }
            })()}
            {(() => {
                if((e.nombre !== nombre && e.nombre !== other)) return;
                if(e.other !== nombre && e.nombre !== nombre) return;
                return(
                  <div>
                    <div className="boxer"></div>
                    <div className="boxer"></div>
                  </div>
                );
            })()}

        </div>
      ))
  }

  return (
    <div>
        <div className="xml">
            <h3>CHAT</h3>
        </div>
        <div className="boxer"></div>
      <div className="login">
      <div class="wrapper fadeInDown">
      <div>
        <h2 class="active" > {other}</h2>
      <div>
        <div className="boxer"></div>
        <div className="boxer"></div>
        {renderChat()}
        <div ref={divRef}></div>
      </div>
      <form onSubmit={submit}>
        <input
          class="fadeIn second"
          type="text"
          id="login"
          value={mensaje}
          placeholder="Escibir mensaje"
          onChange={(e) => setMensaje(e.target.value)}
        />
        <input type="submit" class="fadeIn fourth" value="Enviar"/>
      </form>
          
      </div>
      </div>
     
      </div>
      
    </div>
  );
};

export default Chat;
