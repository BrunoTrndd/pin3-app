import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import UploadBox from './components/uploadBox';
import UploadButton from './components/uploadButton';
import './style/App.css';


// Cria uma instância do mock adapter
const mock = new MockAdapter(axios, { delayResponse: 500 });

const randomImageUrl = 'https://picsum.photos/600/400'; // URL para obter uma imagem aleatória

function App() {
  const [file, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  const handleDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  useEffect(() => {
    // Configura o mock para a rota de upload
    mock.onPost('http://localhost:5000/upload').reply(200, {
      imageUrl: randomImageUrl,
    });
  }, []);

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', file, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Usa a URL da imagem mockada
      setImageSrc(response.data.imageUrl);
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
        <UploadBox onDrop={handleDrop} fileName={file ? file.name : null} />
        <div className="buttons">
          <UploadButton text="Classificação" onClick={handleClassification} />
          <UploadButton text="Agrupamento" onClick={handleGrouping} />
          <UploadButton text="Upload" onClick={handleUpload} />
        </div>
      </div>
      {imageSrc && (
        <div className="image-container">
          <img src={imageSrc} alt="Processed result" />
        </div>
      )}
    </div>
  );
}

export default App;
