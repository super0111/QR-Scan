import React, { useState, useRef } from 'react';
import { Table } from "react-bootstrap";
import ScanCanvasQR from 'react-pdf-image-qr-scanner';
import FileUploader from "./components/FileUploader";
import CameraScan from "./components/CameraScan";
import { Container, Tab, TabContent } from './components/Styled';
import { postInfo } from "./api/post";

const QRScanner =() => {
  
  const [ index, setIndex ] = useState(0)
  const [ results, setResults ] = useState([])
	const canvasScannerRef = useRef();
  const [resultText, setResultText] = useState("");
  const [noResult, setNoResult] = useState(false);
  
  const [ flightNum, setFlightNum ] = useState();
  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [ seatNum, setSeatNum ] = useState();
  const [ from, setFrom ] = useState("");
  const [ to, setTo ] = useState();

	async function scanFile(selectedFile) {
		setResultText("");
		try {
			const qrCode = await canvasScannerRef.current.scanFile(selectedFile);
      console.log("qrCodeqrCodeqrCode", qrCode)
      if(qrCode === null) {
        setNoResult(true)
      }
			setResultText(qrCode || "No QR code found");
      if (qrCode) setResults([...results, qrCode])
      results.map((result, i) =>(
        setFirstName(result)
      ))
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
  
  // const handlePost = () => {
  //   const formData = {
  //     flightNum,
  //     firstName,
  //     lastName,
  //     seatNum,
  //     from,
  //     to,
  //   }
  //   postInfo(formData)
  // }

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
              <Table responsive hover>
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
                      console.log("resultttt", result.includes(' '))
                      const _result = result.replace(/  +/g, ' ');
                      const items = _result.split(' ');
                      return (
                        result.includes(' ') === false ?
                        <tr style={{textAlign: "center"}}>
                          {result}
                        </tr> :
                        <tr key={key}>
                          <td>{items[0].split('/')[0].slice(2)}</td>
                          <td>{items[0].split('/')[1]}</td>
                          { items[1] == "M" ?
                            <td>{items[3].slice(-2)}{items[4]}</td> :
                            <td>{items[2].slice(-2)}{items[3]}</td>
                          } 
                          { items[1] == "M" ?
                            <td>{items[5].slice(5, 8)}</td> :
                            <td>{items[4].slice(5, 8)}</td>
                          }
                          <td>{items[2].slice(0, 3)}</td>
                          <td>{items[2].slice(3, 6)}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </Table>
              { resultText === "No QR code found" ?
                <div className='text-dark'>{resultText}</div> : ""
              }
              {/* <button
                className="post_btn"
                onClick={handlePost}
              >
                Post
              </button>  */}
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
