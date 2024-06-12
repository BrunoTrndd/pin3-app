import React, { useState } from 'react';
import axios from 'axios';
import UploadBox from './components/uploadBox';
import UploadButton from './components/uploadButton';
import './style/App.css';

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

  const handleClassification = () => {
    console.log('Classification button clicked');
    // Adicione a lógica para o botão de Classificação aqui
  };

  const handleGrouping = () => {
    console.log('Grouping button clicked');
    // Adicione a lógica para o botão de Agrupamento aqui
  };

  return (
    <div className="App">
      <h1>Upload File and Display Chart</h1>
      <div className="content">
        <UploadBox onDrop={handleDrop} />
        <div className="buttons">
          <UploadButton text="Classificação" onClick={handleClassification} />
          <UploadButton text="Agrupamento" onClick={handleGrouping} />
          <UploadButton text="Upload" onClick={handleUpload} />
        </div>
      </div>
    </div>
  );
}

export default App;
