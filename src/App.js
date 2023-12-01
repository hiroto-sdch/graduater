import { UploadOutlined } from '@ant-design/icons/lib/icons';
import { Typography, Upload, Button } from 'antd';
import React, { useState } from 'react';

const { Title } = Typography;

function App() {
  const [uploadMessage, setUploadMessage] = useState('');

  function handleFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      console.log(text);
      // ファイルの読み込みが完了したらメッセージを設定
      setUploadMessage(`${file.name} が正常にアップロードされました！`);
    };
    reader.readAsText(file);
    return false;
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <div>
          <Title>卒単チェッカー</Title>
          <div>
            <Upload accept='.csv' beforeUpload={handleFile}>
              <Button icon={<UploadOutlined />}>Upload to Click</Button>
            </Upload>
            {uploadMessage && <h2>{uploadMessage}</h2>}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
