import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Box, Card } from "rebass";


const Centered = props => (
  <Box
    {...props}
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 1
    }}
  />
);

const modalRoot = document.getElementById("modal");

const Modal = ({ children }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    modalRoot.appendChild(elRef.current);
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(
    <Centered>
      <Card sx={{ boxShadow: 4, borderRadius: 'default' }}>{children}</Card>
    </Centered>,
    elRef.current
  );
};

export default Modal;
