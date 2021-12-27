/*global document*/
import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';

import DragAndDrop from './drag-and-drop';

import { createWorker } from 'tesseract.js';

const worker = createWorker({
  logger: m => console.log(m)
});

function processImage (imgUri, setResult) {
    (async () => {
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        // await worker.setParameters
        const { data : {paragraphs: {lines}}} = await worker.recognize(imgUri);
        setResult(lines)
        await worker.terminate();
    })();
}

// worker.addEventListener('message', (event) => {
//     const msg = event.data;
//     switch (msg.type) {
//         case "progress":
//             // ...handle progress message, progress is in `msg.progress`
//             break;
//         case "data":
//             // ...handle data message, data is in `msg.data`
//             break;
//     }
// });

function App() {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [result, setResult] = useState([]);

  const imgEl = useRef(null);


  const onChangeImage = fileList => {
      const reader = new FileReader();
      reader.onload = function () {
        imgEl.current.src = reader.result;
        processImage(reader.result, setResult)
        imgEl.current.height = 1000;
        setImgLoaded(true);
      }
      reader.readAsDataURL(fileList[0])
  }

  return (
      <div>
      <h1>ok</h1>
        <DragAndDrop handleDrop={onChangeImage}>
            <div style={{height: 300, width: 300}}>
                <div style={{background: 'red'}}>
                    Drop an image here
                    <img ref={imgEl} type={"image/jpeg"}/>
                </div>
            </div>
        </DragAndDrop>
        <div>{JSON.stringify(result)}</div>
      </div>
  );
}

let appContainer = document.getElementById('app-container');
if (!appContainer) {
    appContainer = document.createElement('div');
    appContainer.id = 'app-container'
    document.body.appendChild(appContainer);
}

ReactDOM.render(
    <App />,
    appContainer
)