// import React from 'react'
// import './Dashboard.css'
// function Dashboard() {
//   return (
//     <div>
//         <audio id="success-sound" src="beep.mp3" preload="auto"></audio>
//       <main>
//     <button onclick="startScanning()">Start Scanning</button>
//     <div id="reader"></div>
//     <div id="result"></div>
//     <div id="all-results"></div>
// </main>
//     </div>
//   )
// }

// export default Dashboard

// <script>
//     let scanResults = new Set();
//     let scanner;
//     function startScanning() {
//         scanResults.clear();
//         document.getElementById('result').innerHTML = "";
//         document.getElementById('all-results').innerHTML = "";
//         if (!scanner) {
//             scanner = new Html5QrcodeScanner('reader', {
//                 qrbox: { width: 250, height: 250, },
//                 fps: 20,
//             });
//         }
//         scanner.render(onScanSuccess, onScanError);
//     }

//     function onScanSuccess(result) {
//         document.getElementById('success-sound').play();
//         scanResults.add(result);
//         document.getElementById('result').innerHTML = `
//             <h2>Total Unique Scans: ${scanResults.size}</h2>
//         `;
//         printResults();
//     }

//     function printResults() {
//         let allResultsHtml = "<h2>All Unique Scanned Product IDs:</h2><ul>";
//         scanResults.forEach((productId, index) => {
//             allResultsHtml += <li>${index + 1}: ${productId}</li>;
//         });
//         allResultsHtml += "</ul>";
//         document.getElementById('all-results').innerHTML = allResultsHtml;
//     }

//     function onScanError(err) {
//         console.error(err);
//     }
// </script>

import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode'; // Make sure you have this installed and imported
import './Dashboard.css';

function Dashboard() {
  const [scanResults, setScanResults] = useState(new Set());
  const [scanner, setScanner] = useState(null);

  useEffect(() => {
    // Clean up the scanner on component unmount
    return () => {
      if (scanner) {
        scanner.clear();
      }
    };
  }, [scanner]);

  const startScanning = () => {
    setScanResults(new Set());
    document.getElementById('result').innerHTML = "";
    document.getElementById('all-results').innerHTML = "";

    if (!scanner) {
      const newScanner = new Html5QrcodeScanner('reader', {
        qrbox: { width: 250, height: 250 },
        fps: 20,
      });
      newScanner.render(onScanSuccess, onScanError);
      setScanner(newScanner);
    } else {
      scanner.render(onScanSuccess, onScanError);
    }
  };

  const onScanSuccess = (result) => {
    document.getElementById('success-sound').play();
    setScanResults((prevResults) => {
      const updatedResults = new Set(prevResults);
      updatedResults.add(result);
      return updatedResults;
    });
  };

  const printResults = () => {
    let allResultsHtml = "<h2>All Unique Scanned Product IDs:</h2><ul>";
    scanResults.forEach((productId, index) => {
      allResultsHtml += `<li>${index + 1}: ${productId}</li>`;
    });
    allResultsHtml += "</ul>";
    document.getElementById('all-results').innerHTML = allResultsHtml;
  };

  useEffect(() => {
    document.getElementById('result').innerHTML = `
      <h2>Total Unique Scans: ${scanResults.size}</h2>
    `;
    printResults();
  }, [scanResults]);

  const onScanError = (err) => {
    console.error(err);
  };

  return (
    <div>
      <audio id="success-sound" src="beep.mp3" preload="auto"></audio>
      <main>
        <button onClick={startScanning}>Start Scanning</button>
        <div id="reader"></div>
        <div id="result"></div>
        <div id="all-results"></div>
      </main>
    </div>
  );
}

export default Dashboard;


// import React, { useState, useRef, useEffect } from 'react';
// import { BrowserMultiFormatReader } from '@zxing/library';
// import './Dashboard.css';

// function Dashboard() {
//   const [scanResults, setScanResults] = useState(new Set());
//   const videoRef = useRef(null);
//   const codeReader = useRef(null);

//   useEffect(() => {
//     codeReader.current = new BrowserMultiFormatReader();
//     return () => {
//       // Clean up on unmount
//       stopScanning();
//     };
//   }, []);

//   const startScanning = async () => {
//     setScanResults(new Set());
//     document.getElementById('result').innerHTML = "";
//     document.getElementById('all-results').innerHTML = "";

//     try {
//       const videoInputDevices = await codeReader.current.listVideoInputDevices();
//       if (videoInputDevices.length === 0) {
//         alert('No video input devices found');
//         return;
//       }

//       // Use the first camera available (usually the back camera on mobile)
//       await codeReader.current.decodeFromVideoDevice(videoInputDevices[0].deviceId, videoRef.current, (result, error) => {
//         if (result) {
//           onScanSuccess(result.getText());
//         }
//         if (error) {
//           console.warn(error); // Will print errors until it successfully reads a code
//         }
//       });
//     } catch (err) {
//       console.error("Error starting the scanner: ", err);
//     }
//   };

//   const onScanSuccess = (decodedText) => {
//     document.getElementById('success-sound').play();
//     setScanResults((prevResults) => {
//       const updatedResults = new Set(prevResults);
//       updatedResults.add(decodedText);
//       return updatedResults;
//     });
//   };

//   const printResults = () => {
//     let allResultsHtml = "<h2>All Unique Scanned Product IDs:</h2><ul>";
//     scanResults.forEach((productId, index) => {
//       allResultsHtml += `<li>${index + 1}: ${productId}</li>`;
//     });
//     allResultsHtml += "</ul>";
//     document.getElementById('all-results').innerHTML = allResultsHtml;
//   };

//   useEffect(() => {
//     document.getElementById('result').innerHTML = `
//       <h2>Total Unique Scans: ${scanResults.size}</h2>
//     `;
//     printResults();
//   }, [scanResults]);

//   const stopScanning = () => {
//     if (codeReader.current) {
//       codeReader.current.reset();
//     }
//   };

//   return (
//     <div>
//       <audio id="success-sound" src="beep.mp3" preload="auto"></audio>
//       <main>
//         <button onClick={startScanning}>Start Scanning</button>
//         <button onClick={stopScanning}>Stop Scanning</button>
//         <video ref={videoRef} style={{ width: '100%', maxHeight: '400px' }}></video>
//         <div id="result"></div>
//         <div id="all-results"></div>
//       </main>
//     </div>
//   );
// }

// export default Dashboard;

