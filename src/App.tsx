import { UploadOutlined } from '@ant-design/icons/lib/icons';
import { Typography, Upload, Button, Switch } from 'antd';
import React, { useState } from 'react';
import Check from './Check';
import Dropdown from './Dropdown';
import CSVconvart from './Csvconvert';
import { CollapseTable, SelectTable } from './CollapseTable';

const { Title } = Typography;

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [isupload, setIsupload] = useState(false);
  const [selectedMajor, setSelectedMajor] = useState<string>("");
  const [isCompON, setIsCompON] = useState(true);
  const [Message, setMessage] = useState<string[]>([]);
  const [SelectMessage, setSelectMessage] = useState<string[]>([]);
  const [MessageON, setMessageON] = useState<string[]>([]);
  const [SelectMessageON, setSelectMessageON] = useState<string[]>([]);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const text = CSVconvart(e.target?.result as string);
      const fusoku = Check(text, selectedMajor, ["A+", "A", "B", "C", "P", "認", "履修中"]);
      const fusokuON = Check(text, selectedMajor, ["A+", "A", "B", "C", "P", "認"]);
      console.log(`現在の選択主専攻:${selectedMajor}。`);
      setIsupload(true);
      const {Compulsory, Select} = fusoku;
      setMessage(Compulsory);
      setSelectMessage(Select);
      setMessageON(fusokuON.Compulsory);
      setSelectMessageON(fusokuON.Select);
    };
    reader.readAsText(file);
    return false;
  };

  const handleDropdownChange = (selectedValues: { college: string | null; department: string | null; major: string }) => {
    setSelectedMajor(selectedValues.major);
    // console.log('Dropdown selected:', selectedValues);
  };

  const handleIsCompON = (checked:boolean) =>{
    setIsCompON(checked);
  }

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
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <span>履修中の単位を取得済みとする</span>
              <Switch style={{ marginLeft: '8px' }} checked={ isCompON } onChange={ handleIsCompON } />
            </div>
            {isupload && isCompON && <CollapseTable fusoku={Message}></CollapseTable>}
            {isupload && isCompON && <SelectTable Select={SelectMessage}></SelectTable>}
            {isupload && !isCompON && <CollapseTable fusoku={MessageON}></CollapseTable>}
            {isupload && !isCompON && <SelectTable Select={SelectMessageON}></SelectTable>}
          </div>
        </div>
      </header>
    </div>
  );
};

export default App;

