import React, { useState, useRef } from 'react';


import ScanCanvasQR from 'react-pdf-image-qr-scanner';
import FileUploader from "./components/FileUploader";
import CameraScan from "./components/CameraScan";


import { Container, Tab, TabContent } from './components/Styled'

const QRScanner =() => {
  
  const [ index, setIndex ] = useState(1)
	const canvasScannerRef = useRef();

	const [resultText, setResultText] = useState("");

	async function scanFile(selectedFile) {
		setResultText("");
		try {
			const qrCode = await canvasScannerRef.current.scanFile(selectedFile);
			setResultText(qrCode || "No QR code found");
		} catch (e) {

			if (e?.name==="InvalidPDFException") {
				setResultText("Invalid PDF");
			} else if (e instanceof Event) {
				setResultText("Invalid Image");
			} else {
				console.log(e)
				setResultText("Unknown error");
			}
		}
	}

  return (
    <Container>
      <div style={{ display: 'flex' }}>
        <Tab className={`${ index === 0 ? 'tab-active' : '' }`} onClick={() => setIndex(0)}>Scan QR Code By File</Tab>
        <Tab className={`${ index === 1 ? 'tab-active' : '' }`} onClick={() => setIndex(1)}>Scan QR Code By Camera</Tab>
      </div>
      <div>
        <TabContent style={{ display: `${index === 0 ? 'block' : 'none' }`}}>
          <ScanCanvasQR ref={canvasScannerRef}/>
          <div className='qr-reader-body'>
            <div className='qr-reader-body-file-uploader'>
              <FileUploader 
                onFileSelectError={(err) => { 
                  console.log(err);
                  setResultText(err.error) 
                }} 
                onFileSelectSuccess={(file)=>{scanFile(file)}}
                style={{ display: 'flex' }}
              />
            </div>
            <div>{resultText}</div>
          </div>
        </TabContent>
        <TabContent style={{ display: `${index === 1 ? 'block' : 'none' }`}}>
          <CameraScan videoId={`video-container`}/>
        </TabContent>
      </div>
    </Container>
  )
}

export { QRScanner }
