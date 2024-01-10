import { UploadOutlined } from '@ant-design/icons/lib/icons';
import { Typography, Upload, Button, Switch, Tabs } from 'antd';
import React, { useState } from 'react';
import Check from './Check';
import Dropdown from './Dropdown';
import CSVconvart from './Csvconvert';
import { CollapseTable, SelectTable } from './CollapseTable';
import Recommend from './Recommend';

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
  const [Senmonkiso, setSenmonkiso] = useState<string[]>([]);
  const [Senmon, setSenmon] = useState<string[]>([]);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const text = CSVconvart(e.target?.result as string);
      const fusoku = Check(text, selectedMajor, ["A+", "A", "B", "C", "P", "認", "履修中"]);
      const fusokuON = Check(text, selectedMajor, ["A+", "A", "B", "C", "P", "認"]);
      const recommended = Recommend(text, selectedMajor, fusoku);
      setSenmonkiso(recommended["専門基礎科目選択"]);
      setSenmon(recommended["専門科目選択"]);
      localStorage.removeItem("currentTab");
      setIsupload(true);
      setMessage(fusoku.Compulsory);
      setSelectMessage(fusoku.Select);
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

  const getRandomElements = (arr:string[], num:number) => {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  }
   const randomSenmonkiso = getRandomElements(Senmonkiso, 5);
   const randomSenmon = getRandomElements(Senmon, 5);

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
          <div>
            {isupload && <h4>未履修専門基礎科目(一部抜粋)</h4>}
            {isupload && randomSenmonkiso.map((item, index)=>(
              <li key={index}>
              <a href={`https://kdb.tsukuba.ac.jp/syllabi/2023/${item}/jpn`} target='blank'>
                {item}
              </a>
            </li>
            ))}
          </div>
          <div>
            {isupload && <h4>未履修専門科目(一部抜粋)</h4>}
            {isupload && randomSenmon.map((item, index)=>(
              <li key={index}>
                <a href={`https://kdb.tsukuba.ac.jp/syllabi/2023/${item}/jpn`} target='blank'>
                  {item}
                </a>
              </li>
            ))}
          </div>
        </div>
      </header>
    </div>
  );
};

export default App;