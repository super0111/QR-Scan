import React, { useRef, useState } from "react";

import './App.css';

import ScanCanvasQR from 'react-pdf-image-qr-scanner';
import ImageUploader from "./components/FileUploader";
import CameraScan from "./components/CameraScan";

function App() {
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
		<>
			<div className="App">
				<header className="App-header">
					QR Scanner
				</header>
				<ScanCanvasQR ref={canvasScannerRef}/>
				<div className='qr-reader-body'>
					<div className='qr-reader-body-image-uploader' style={{ padding: '12px' }}>
						<ImageUploader 
							onFileSelectError={(err) => { 
								console.log(err);
								setResultText(err.error) 
							}} 
							onFileSelectSuccess={(file)=>{scanFile(file)}}
							style={{ padding: '12px' }}
						/>
					</div>
					<div style={{height: "200px", width: "50vw", fontSize: "1.5rem", overflowWrap: "anywhere", overflow: "auto", border: "white solid 1px"}}>{resultText}</div>
				</div>
				<CameraScan videoId={`video-container`}/>
			</div>
		</>
	);
}

export default App;
