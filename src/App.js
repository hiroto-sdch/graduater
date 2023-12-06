import { UploadOutlined } from '@ant-design/icons/lib/icons';
import { Typography, Upload, Button, Select } from 'antd';
import React, { useState } from 'react';
import Check from './Bool';

const { Title } = Typography;
const { Option } = Select;

const Dropdown = ({ onChange }) => {
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const handleCollegeChange = (value) => {
    setSelectedCollege(value);
    setSelectedDepartment(null);
    if (onChange) {
      onChange({ college: value, department: null, major: null });
    }
  };
  const handleDepartmentChange = (value) => {
    setSelectedDepartment(value);

    if (onChange) {
      onChange({ college: selectedCollege, department: value, major: null });
    }
  };
  const handleMajorChange = (value) => {
    if (onChange) {
      onChange({ college: selectedCollege, department: selectedDepartment, major: value });
    }
  };

  return (
    <div>
      <Select
        style={{ width: 300 }}
        placeholder="学群を選択してください。"
        onChange={handleCollegeChange}
      >
        <Option value="情報学群">情報学群</Option>
        <Option value="理工学群">理工学群</Option>
      </Select>

      {<Select
          style={{ width: 300, marginLeft: 10 }}
          placeholder="学類を選択してください。"
          onChange={handleDepartmentChange}
          disabled={!selectedCollege}
        >
          {selectedCollege === '情報学群' && (
            <>
              <Option value="情報科学類">情報科学類</Option>
              <Option value="情報メディア創成学類">情報メディア創成学類</Option>
              <Option value="知識情報図書館学類">知識情報図書館学類</Option>
            </>
          )}
          {selectedCollege === '理工学群' && (
            <>
              <Option value="工学システム学類">工学システム学類</Option>
              <Option value="応用理工学類">応用理工学類</Option>
              <Option value="社会工学類">社会工学類</Option>
            </>
          )}
        </Select>}

      {<Select
          style={{ width: 300, marginLeft: 10 }}
          placeholder="主専攻を選択してください。"
          onChange={handleMajorChange}
          disabled={!selectedDepartment}
        >
          {selectedDepartment === '情報科学類' && (
            <>
              <Option value="ソフトウェアサイエンス">ソフトウェアサイエンス</Option>
              <Option value="情報システム">情報システム</Option>
              <Option value="知能情報メディア">知能情報メディア</Option>
            </>
          )}
          {selectedDepartment === '情報メディア創成学類' && (
            <>
              <Option value="情報メディア">情報メディア</Option>
            </>
          )}
        </Select>}
    </div>
  );
};

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
          <Title>卒単チェッカー</Title>
          <div>
            <Dropdown onChange={handleDropdownChange} />
          </div>
          <div>
            <Upload accept='.csv' beforeUpload={handleFile}>
              <Button icon={<UploadOutlined />} disabled={isUploadButtonDisabled}>
                Upload to Click
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
