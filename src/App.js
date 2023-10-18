import React from 'react';
import './App.css';

function App() {
  const [error, setError] = React.useState()
  const [isEnabled,setEnabled] = React.useState(false)
  const videoRef = React.useRef(null);
  const streamRef = React.useRef(null)

  const startStream = () => {
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true,
    })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => videoRef.current.play();
        })
        .catch(err => {
          setError(err.name)
        });
  }

  const stopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
  }

  React.useEffect(() => {
    setError(null)
    stopStream()
    if (isEnabled) startStream()
  }, [isEnabled])

  return (
      <>
        {isEnabled && (
            <>
              <video playsInline muted autoPlay ref={videoRef}/>
              {error && <div className="error">{error}</div>}
            </>
        )}
        <div className='controls'>
          <button onClick={() => setEnabled(!isEnabled)}>
            {isEnabled ? 'Off' : 'ON'}
          </button>
        </div>
      </>
  );
}

export default App;