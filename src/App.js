import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QRScanner } from "./QRScanner";

function App() {

	return (
		<>
			<div className="App">
				<header className="App-header">
					QR Scanner
				</header>
				<QRScanner />
			</div>
		</>
	);
}

export default App;
