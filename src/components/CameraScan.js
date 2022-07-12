// import React, { useState } from "react";
// import QrReader from "react-qr-reader";

// const CameraScan = () => {
//   const [ state, setState ] = useState({
//     delay: 300,
//     result: "No result"
//   })

//   const handleScan = (data) => {
//     if (data) {
//       setState({
//         result: data
//       });
//     }
//   }
//   const handleError = (err) => {
//     console.error(err);
//   }
//   return (
//     <div>
//       <QrReader
//         delay={state.delay}
//         onError={handleError}
//         onScan={handleScan}
//         style={{ width: "100%" }}
//       />
//       <p>{state.result}</p>
//     </div>
//   );
// }

// export default CameraScan

import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const previewStyle = {
  height: '240px !important',
  width: '320px !important',
  position: 'static !important',
  border: '1px solid white !important',
}

const CameraScan = (props) => {
  const [data, setData] = useState('No result');

  return (
    <>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        
			  style={previewStyle}
        delay={500}
        videoId={props.videoId}
      />
      <p>{data}</p>
    </>
    
  );
};

export default CameraScan
