import React, { useState } from "react";
import { Container, Spinner, Button } from "react-bootstrap";

const Loading = () => {
  const [message, setMessage] = useState("Loading your game...");
  const [reload, setReload] = useState(false);

  setTimeout(() => {
    setMessage("Something went wrong...");
    setReload(true);
  }, 10000);

  const refreshPage = () => {
    window.location.reload(false);
  };
  return (
    <Container className="d-flex vh-100 align-items-center justify-content-center flex-column">
      <Spinner size="large" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <div className="mt-5">{message}</div>
      <Button
        onClick={refreshPage}
        className={`d-${reload ? "block" : "none"} mt-4`}
        variant="info"
        size="sm"
      >
        Click to reload!
      </Button>
    </Container>
  );
};

export default Loading;
