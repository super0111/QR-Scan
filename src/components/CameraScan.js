import React, { useEffect, useState } from 'react';
import QrReader from 'react-qr-reader';

const CameraScan = (props) => {
  const [selected, setSelected] = useState("environment");
  const [startScan, setStartScan] = useState(false);
  const [ noResult, setNoResults] = useState(false);
  const [ results, setResults ] = useState([])

  const handleScan = async (scanData) => {
    if(scanData == null) {
      setNoResults(true)
    }
  
    if (scanData && scanData !== "") {
      if(scanData != results[0]) {
        setResults([...results, scanData]);
        setNoResults(false)
      }
    }

  };
  const handleError = (err) => {
    console.error(err);
  };
  return (
    <div className="camera_scan">
      <button onClick={() => { setStartScan(!startScan) }}>
        {startScan ? "Stop Scan" : "Start Scan"}
      </button>
      <div className='dflex'>
      { startScan ? 
        <div>
          <select onChange={(e) => setSelected(e.target.value)}>
            <option value={"environment"}>Back Camera</option>
            <option value={"user"}>Front Camera</option>
          </select>
          <QrReader
            facingMode={selected}
            delay={1000}
            onError={handleError}
            onScan={handleScan}
            videoId={props.videoId}
            style={{ width: "300px" }}
          /> 
        </div> : ""
      }
      {results && 
        <div>
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
                  console.log("items[8]items[8]", items[8])
                  return (
                    <tr key={key}>
                      <td>{items[0].split('/')[0].slice(2)}</td>
                      <td>{items[0].split('/')[1]}</td>
                      <td>{items[7]}</td>
                      <td>{items[8].slice(5, 8)}</td>
                      <td>{items[6].slice(0, 3)}</td>
                      <td>{items[6].slice(3, 6)}</td>
                    </tr>
                  )
                })
                }
            </tbody>
          </table>
          { noResult=== true ? "No Results" : "" }
        </div>}
      </div>
    </div>
  );
};

export default CameraScan;
