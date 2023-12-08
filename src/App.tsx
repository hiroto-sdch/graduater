import { UploadOutlined } from '@ant-design/icons/lib/icons';
import { Typography, Upload, Button, Collapse, Table } from 'antd';
import React, { useState } from 'react';
import Check from './Bool';
import Dropdown from './Dropdown';
import CSVconvart from './Csvconvert';
import { CollapseTable } from './CollapseTable';

const { Title } = Typography;

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [isupload, setIsupload] = useState(false);
  const [selectedMajor, setSelectedMajor] = useState<string | null>(null);
  const [Message, setMessage] = useState<string[]>([]);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const text = CSVconvart(e.target?.result as string);
      console.log(text);
      const fusoku = Check(text);
      console.log(`現在の選択主専攻:${selectedMajor}。`);
      console.log(`${file.name} が正常にアップロードされました！`);
      setIsupload(true);
      setMessage(fusoku)
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
            {isupload && <CollapseTable fusoku={Message}></CollapseTable>}
          </div>
        </div>
      </header>
    </div>
  );
};

export default App;
