import React, { useState } from 'react';
import axios from 'axios';
import UploadBox from './components/uploadBox';
import UploadButton from './components/uploadButton';

function App() {
  const [file, setFile] = useState(null);
  const [chartData, setChartData] = useState(null);

  const handleDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('YOUR_ENDPOINT_URL', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setChartData(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const data = {
    labels: chartData ? chartData.labels : [],
    datasets: [
      {
        label: 'Dataset',
        data: chartData ? chartData.values : [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="App">
      <h1>Upload File and Display Chart</h1>
      <UploadBox onDrop={handleDrop} />
      <UploadButton onClick={handleUpload} />
    </div>
  );
}

export default App;
