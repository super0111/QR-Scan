import React, { useState, useRef, useEffect } from 'react';


import ScanCanvasQR from 'react-pdf-image-qr-scanner';
import FileUploader from "./components/FileUploader";
import CameraScan from "./components/CameraScan";


import { Container, Tab, TabContent } from './components/Styled'

const QRScanner =() => {
  
  const [ index, setIndex ] = useState(0)
  const [ results, setResults ] = useState([])
	const canvasScannerRef = useRef();

	const [resultText, setResultText] = useState("");

  useEffect(() => {
    console.log(results)
  }, [results])
	async function scanFile(selectedFile) {
		setResultText("");
		try {
			const qrCode = await canvasScannerRef.current.scanFile(selectedFile);
      
			setResultText(qrCode || "No QR code found");
      // console.log(qrCode)
      if (qrCode) setResults([...results, qrCode])
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
            <div className='qr-reader-body-result'>
              <table>
                <thead>
                  <tr>
                    <th>first name</th>
                    <th>last name</th>
                    <th>flight number</th>
                    <th>seat number</th>
                    <th>from</th>
                    <th>to</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    results.map((result, key) => {
                      const items = result.split(' ')
                      
                      console.log(items)
                      return (
                        <tr key={key}>
                          <td>{items[0].split('/')[0].slice(2)}</td>
                          <td>{items[0].split('/')[1]}</td>
                          <td>{items[7]}</td>
                          <td>{items[8]}</td>
                          <td>{items[6].slice(0, 3)}</td>
                          <td>{items[6].slice(3, 6)}</td>
                        </tr>
                      )
                    })
                    }
                </tbody>
              </table>
                    
            </div>
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
