import { UploadOutlined } from '@ant-design/icons/lib/icons';
import { Typography, Upload, Button, Switch, Tabs, Divider, Popover } from 'antd';
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
  
  const [RecommendedExam, setRecommendedExam] = useState(0);
  const [UnitCapRelease, setUnitCapRelease] = useState(0);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const text = CSVconvart(e.target?.result as string);
      const fusoku = Check(text, selectedMajor, ["A+", "A", "B", "C", "P", "認", "履修中"]);
      const fusokuON = Check(text, selectedMajor, ["A+", "A", "B", "C", "P", "認"]);
      console.log(`現在の選択主専攻:${selectedMajor}`);
      localStorage.removeItem("currentTab");
      setIsupload(true);
      setMessage(fusoku.Compulsory);
      setSelectMessage(fusoku.Select);
      setMessageON(fusokuON.Compulsory);
      setSelectMessageON(fusokuON.Select);
      setRecommendedExam(fusoku.RecommendedExam);
      setUnitCapRelease(fusoku.UnitCapRelease);
      //console.log(fusoku.RecommendedExam);
      //console.log(fusoku.UnitCapRelease);
    };
    reader.readAsText(file);
    return false;
  };

  console.log(RecommendedExam);
  console.log(UnitCapRelease);

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



  let RecommendedExamText = '大学院推薦入試を受けることができます'
  if (RecommendedExam !== 0) {
    RecommendedExamText = "大学院推薦入試に必要なA以上の単位数：" + RecommendedExam;
  }
  let UnitCapReleaseText = "今学期履修中の単位内で単位上限の解放に必要なA以上の単位数：" + UnitCapRelease;
  if (UnitCapRelease === 0) {
    UnitCapReleaseText = '単位上限を55に解放することができます'
  }

  const content = (
    <div>卒業までに履修する単位内で大学院推薦入試を受験することに最低限必要なA以上の単位数</div>
  )

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
          <div style={{ textAlign: 'center'}}>
            {RecommendedExam !== 0 && <Popover placement='bottom' content={content}><span>{isupload && RecommendedExamText}</span></Popover>}
            {RecommendedExam === 0 && <span>{isupload && RecommendedExamText}</span>}
          </div>
          <div style={{ textAlign: 'center'}}>
            <span>{isupload && UnitCapReleaseText}</span>
          </div>
        </div>
      </header>
    </div>
  );
};

export default App;