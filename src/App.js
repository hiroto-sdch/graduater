import { UploadOutlined } from '@ant-design/icons/lib/icons';
import { Typography, Upload, Button } from 'antd';
import React, { useState } from 'react';
import Check from './Bool';
import Dropdown from './Dropdown';

const { Title } = Typography;

function App() {
  const [uploadMessage, setUploadMessage] = useState('');
  const [selectedMajor, setSelectedMajor] = useState(null);

  function handleFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      console.log(text);
      setUploadMessage(`${file.name} が正常にアップロードされました！`);
    };
    reader.readAsText(file);
    return false;
  }

  const handleDropdownChange = (selectedValues) => {
    console.log('Dropdown selected:', selectedValues);
    setSelectedMajor(selectedValues.major);
  };

  const isUploadButtonDisabled = !selectedMajor;

  return (
    <div className='App'>
      <header className='App-header'>
        <div>
          <Title style={{textAlign: 'center'}}>卒単チェッカー</Title>
          <div style={{textAlign: "center"}}>
            <Dropdown onChange={handleDropdownChange}/>
          </div>
          <div style={{textAlign: "center", marginTop: "10px"}}>
            <Upload accept='.csv' beforeUpload={handleFile}>
              <Button icon={<UploadOutlined />} disabled={isUploadButtonDisabled}>
                Upload CSV file
              </Button>
            </Upload>
            {uploadMessage && Check() && <h2>卒業！</h2>}
            {uploadMessage && !Check() && <h2>卒業不可！</h2>}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
