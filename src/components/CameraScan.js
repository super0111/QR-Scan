import React, { useEffect, useState } from 'react';
import { Button, Table } from "react-bootstrap";
import QrReader from 'react-qr-reader';

const CameraScan = (props) => {
  const [selected, setSelected] = useState("environment");
  const [startScan, setStartScan] = useState(false);
  const [ noResult, setNoResults] = useState(false);
  const [ results, setResults ] = useState([])

  const handleScan = async (scanData) => {
    console.log("scanDatascanData", scanData)
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
      <Button variant="outline-success" className='mb-2' onClick={() => { setStartScan(!startScan) }}>
        {startScan ? "Stop Scan" : "Start Scan"}
      </Button>
      <div className='dflex'>
      { startScan ? 
        <div className='mr-1'>
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
            { noResult=== true ? "No Results" : "" }
          </div>
        }
      </div>
    </div>
  );
};

export default CameraScan;
