import React from 'react';
import { useDropzone } from 'react-dropzone';
import { FaPaperclip } from 'react-icons/fa';
import '../style/uploadBox.css';

const UploadBox = ({ onDrop }) => {
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      <p>Drops files here to upload...</p>
      <FaPaperclip size={30} />
    </div>
  );
};

export default UploadBox;
