import React, { useState } from "react";
import QrReader from "react-qr-reader";

const CarmeraScan = () => {
  const [ state, setState ] = useState({
    delay: 300,
    result: "No result"
  })

  const handleScan = (data) => {
    if (data) {
      setState({
        result: data
      });
    }
  }
  const handleError = (err) => {
    console.error(err);
  }
  return (
    <div>
      <QrReader
        delay={state.delay}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
      />
      <p>{state.result}</p>
    </div>
  );
}

export default CarmeraScan