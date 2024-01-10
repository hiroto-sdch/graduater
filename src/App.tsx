import { UploadOutlined } from '@ant-design/icons/lib/icons';
import { Typography, Upload, Button, Switch, Tabs } from 'antd';
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
  const [SelectMessage, setSelectMessage] = useState<{[name: string]:any}>([]);
  const [MessageON, setMessageON] = useState<string[]>([]);
  const [SelectMessageON, setSelectMessageON] = useState<string[]>([]);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const text = CSVconvart(e.target?.result as string);
      const fusoku = Check(text, selectedMajor, ["A+", "A", "B", "C", "P", "認", "履修中"]);
      const fusokuON = Check(text, selectedMajor, ["A+", "A", "B", "C", "P", "認"]);
      console.log(`現在の選択主専攻:${selectedMajor}`);
      localStorage.removeItem("currentTab");
      (fusokuON["Compulsory"] as string[]).forEach((e) => {
        if(!fusoku["Compulsory"].includes(e)){
          (fusoku["Compulsory"] as string[]).push(e + "(履修中)");
        }
      });
      const fusokuSelect = (fusokuON["Select"] as {[name : string]: {[name : string]: number}});
      let fusokuRishu : {[name : string]: {[name : string]: {[name : string]: number}}} = {};
      Object.keys(fusokuSelect).forEach((k) => {
        fusokuRishu[k] = {};
        Object.keys(fusokuSelect[k]).forEach((s) => {
          fusokuRishu[k][s] = {fusoku: fusokuSelect[k][s], rishu:fusokuSelect[k][s]- fusoku["Select"][k][s]};
        });
      });
      setIsupload(true);
      setMessage(fusoku.Compulsory);
      setSelectMessage(fusokuRishu);
      setMessageON(fusokuON.Compulsory);
      setSelectMessageON(fusokuON.Select);
    };
    reader.readAsText(file);
    return false;
  };

  const handleDropdownChange = (selectedValues: { college: string | null; department: string | null; major: string }) => {
    setSelectedMajor(selectedValues.major);
  };

  const handleIsCompON = (checked:boolean) =>{
    setIsCompON(checked);
  }

  const items = [
    {
      key:'1',
      label:"必修科目",
      children:<CollapseTable fusoku={Message}></CollapseTable>,
    },
    {
      key:'2',
      label:"選択科目",
      children:<SelectTable Select={SelectMessage}></SelectTable>,
    },
  ]

  const itemsON = [
    {
      key:'1',
      label:"必修科目",
      children:<CollapseTable fusoku={MessageON}></CollapseTable>,
    },
    {
      key:'2',
      label:"選択科目",
      children:<SelectTable Select={SelectMessageON}></SelectTable>,
    },
  ]

  const ONtabchange = (key:string) => { 
    localStorage.setItem("currentTab", key);
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
            {isupload && isCompON && <Tabs defaultActiveKey={localStorage.getItem("currentTab") ?? '1'} items={items} onChange={ONtabchange}></Tabs>}
            {isupload && !isCompON && <Tabs defaultActiveKey={localStorage.getItem("currentTab") ?? '1'} items={itemsON} onChange={ONtabchange}></Tabs>}
          </div>
        </div>
      </header>
    </div>
  );
};

export default App;

