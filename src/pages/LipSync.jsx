import React, { useRef, useState, useEffect } from 'react';
import './LipSync.css';

const LipSync = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [recordedAudioURL, setRecordedAudioURL] = useState(null);
  const [recordedVideoURL, setRecordedVideoURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioRecorderRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isVideoRecording, setIsVideoRecording] = useState(false);
  const audioChunks = useRef([]);
  const videoChunks = useRef([]);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);

  // Camera capture
  const startCamera = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      videoRef.current.srcObject = stream;
      setCameraActive(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      setCameraError("Could not access camera. Please check permissions.");
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      setCameraActive(false);
      setIsVideoRecording(false);
      setCameraError(null);
    }
  };

  const capturePhoto = () => {
    if (!cameraActive) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    const imageData = canvas.toDataURL('image/png');
    setCapturedImage(imageData);
  };

  // Video recording
  const startVideoRecording = async () => {
    if (!cameraActive) {
      alert("Please enable camera first");
      return;
    }

    try {
      const stream = videoRef.current.srcObject;
      videoChunks.current = [];
      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'video/webm' });
      
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          videoChunks.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(videoChunks.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedVideoURL(url);
      };

      mediaRecorderRef.current.start(100);
      setIsVideoRecording(true);
    } catch (err) {
      console.error("Error starting video recording:", err);
      setCameraError("Failed to start video recording");
    }
  };

  const stopVideoRecording = () => {
    if (mediaRecorderRef.current && isVideoRecording) {
      mediaRecorderRef.current.stop();
      setIsVideoRecording(false);
    }
  };

  // Audio recording
  const startAudioRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioRecorderRef.current = new MediaRecorder(stream);
      audioChunks.current = [];
      
      audioRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunks.current.push(e.data);
        }
      };

      audioRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunks.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);
        setRecordedAudioURL(url);
      };

      audioRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setCameraError("Could not access microphone. Please check permissions.");
    }
  };

  const stopAudioRecording = () => {
    if (audioRecorderRef.current && isRecording) {
      audioRecorderRef.current.stop();
      setIsRecording(false);
      audioRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
      if (audioRecorderRef.current && audioRecorderRef.current.stream) {
        audioRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="page-container">
      <div className="top-bar">
        <h2 className="title">Lip Sync AI</h2>
        <div className="right-buttons">
          <button className="top-button">❤️</button>
          <button className="top-button">Share</button>
          <button className="top-button export">Export</button>
        </div>
      </div>

      <div className="main-layout">
        {/* Left Panel */}
        <div className="left-panel">
          <div className="upload-box">
            <p className="upload-icon">📷 +</p>
            <p className="upload-text">Drop a video or image to upload</p>
            <input type="file" accept="video/*,image/*" className="file-input" />
            <p className="format-info">Supported: .mp4, .mov, .jpg, .png</p>
            
            {cameraError && (
              <div className="error-message">
                {cameraError}
                <button className="permission-button" onClick={startCamera}>
                  Try Again
                </button>
              </div>
            )}

            {cameraActive ? (
              <>
                <video ref={videoRef} autoPlay muted className="camera-preview" />
                <div className="camera-controls">
                  <button onClick={capturePhoto} className="capture-button">Take Photo</button>
                  {!isVideoRecording ? (
                    <button onClick={startVideoRecording} className="record-button">Start Recording</button>
                  ) : (
                    <button onClick={stopVideoRecording} className="stop-button">Stop Recording</button>
                  )}
                  <button onClick={stopCamera} className="close-button">Close Camera</button>
                </div>
              </>
            ) : (
              <button onClick={startCamera} className="camera-button">📷 Open Camera</button>
            )}
            
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            
            {capturedImage && (
              <div className="media-preview">
                <h4>Captured Photo</h4>
                <img src={capturedImage} alt="Captured" className="captured-image" />
              </div>
            )}
            
            {recordedVideoURL && (
              <div className="media-preview">
                <h4>Recorded Video</h4>
                <video controls src={recordedVideoURL} className="recorded-video" />
              </div>
            )}
          </div>

          <div className="audio-section">
            <label className="section-label">Upload Audio</label>
            <input type="file" accept="audio/*" className="file-input" />
            <p className="format-info">Supported: .mp3, .wav</p>
            <div className="audio-controls">
              {!isRecording ? (
                <button onClick={startAudioRecording} className="mic-button">
                  🎤 Start Recording
                </button>
              ) : (
                <button onClick={stopAudioRecording} className="stop-button">
                  ⏹️ Stop Recording
                </button>
              )}
            </div>
            {recordedAudioURL && (
              <div className="media-preview">
                <h4>Recorded Audio</h4>
                <audio controls src={recordedAudioURL} className="audio-preview" />
              </div>
            )}
          </div>
        </div>

        {/* Right Panel */}
        <div className="right-panel">
          <div className="preview-header">
            <h3>Video Preview</h3>
            <div className="preview-options">
              <button className="preview-option">Original</button>
              <button className="preview-option active">Lip Synced</button>
            </div>
          </div>
          <div className="preview-box">
            {recordedVideoURL ? (
              <video controls src={recordedVideoURL} className="generated-preview" />
            ) : (
              <div className="empty-preview">
                <p>Your generated video will appear here</p>
                <p className="hint">Upload media or use your camera to get started</p>
              </div>
            )}
          </div>
          <div className="generate-controls">
            <div className="settings">
              <label>
                <input type="checkbox" defaultChecked /> Enhance Quality
              </label>
              <label>
                <input type="checkbox" defaultChecked /> Auto Sync
              </label>
            </div>
            <button className="generate-button">Generate Lip Sync</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LipSync;