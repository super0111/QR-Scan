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
    <div className='camera-scanner'>
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
    </div>
    
  );
};

export default CameraScan
