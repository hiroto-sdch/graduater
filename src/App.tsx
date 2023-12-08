import { UploadOutlined } from '@ant-design/icons/lib/icons';
import { Typography, Upload, Button } from 'antd';
import React, { useState } from 'react';
import Check from './Bool';
import Dropdown from './Dropdown';
import CSVconvart from './Csvconvert';

const { Title } = Typography;

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [isupload, setIsupload] = useState(false);
  const [selectedMajor, setSelectedMajor] = useState<string | null>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const text = CSVconvart(e.target?.result as string);
      console.log(text);
      console.log(`現在の選択主専攻:${selectedMajor}。`);
      console.log(`${file.name} が正常にアップロードされました！`);
      setIsupload(true);
    };
    reader.readAsText(file);
    return false;
  };

  const handleDropdownChange = (selectedValues: { college: string | null; department: string | null; major: string | null }) => {
    console.log('Dropdown selected:', selectedValues);
    setSelectedMajor(selectedValues.major);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <div>
          <Title style={{ textAlign: 'center' }}>卒単チェッカー</Title>
          <div style={{ textAlign: 'center' }}>
            <Dropdown onChange={handleDropdownChange} />
          </div>
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <Upload accept='.csv' beforeUpload={(file) => handleFile(file as File)}>
              <Button icon={<UploadOutlined />} disabled={!selectedMajor}>
                Upload CSV file
              </Button>
            </Upload>
            {isupload && Check() && <h2>卒業！</h2>}
            {isupload && !Check() && <h2>卒業不可！</h2>}
          </div>
        </div>
      </header>
    </div>
  );
};

export default App;

