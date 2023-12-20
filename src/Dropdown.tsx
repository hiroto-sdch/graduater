import { Select, Space } from 'antd';
import React, { useState } from 'react';

const { Option } = Select;

interface DropdownProps {
  onChange?: (selectedValues: { college: string | null; department: string | null; major: string}) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ onChange }) => {
  const [selectedCollege, setSelectedCollege] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedMajor, setSelectedMajor] = useState<string | null>(null);

  const handleCollegeChange = (value: string) => {
    setSelectedCollege(value);
    setSelectedDepartment(null);
    setSelectedMajor(null);
    if (onChange) {
      onChange({ college: value, department: null, major: "" });
    }
  };

  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value);
    setSelectedMajor(null);
    if (onChange) {
      onChange({ college: selectedCollege, department: value, major: "" });
    }
  };

  const handleMajorChange = (value: string) => {
    setSelectedMajor(value);
    if (onChange) {
      onChange({ college: selectedCollege, department: selectedDepartment, major: value });
    }
  };
  
    return (
      <div>
        <Space wrap style={{justifyContent:"center", display:"flex"}}>
        <Select
          style={{ width: 300 }}
          placeholder="学群を選択してください。"
          onChange={handleCollegeChange}
          value={selectedCollege}
        >
          <Option value="人文・文化学群">人文・文化学群</Option>
          <Option value="社会・国際学群">社会・国際学群</Option>
          <Option value="人間学群">人間学群</Option>
          <Option value="生命環境学群">生命環境学群</Option>
          <Option value="理工学群">理工学群</Option>
          <Option value="情報学群">情報学群</Option>
          <Option value="医学群">医学群</Option>
          <Option value="体育専門学群">体育専門学群</Option>
          <Option value="芸術専門学群">芸術専門学群</Option>
        </Select>
  
        {<Select
            style={{ width: 300 }}
            placeholder={selectedDepartment ? undefined : "学類を選択してください。"}
            onChange={handleDepartmentChange}
            disabled={!selectedCollege}
            value={selectedDepartment}
          >
            {selectedCollege === '人文・文化学群' && (
              <>
                <Option value="人文学類">人文学類</Option>
                <Option value="比較文化学類">比較文化学類</Option>
                <Option value="日本語・日本文化学類">日本語・日本文化学類</Option>
              </>
            )}
            {selectedCollege === '社会・国際学群' && (
              <>
                <Option value="社会学類">社会学類</Option>
                <Option value="国際総合学類">国際総合学類</Option>
              </>
            )}
            {selectedCollege === '人間学群' && (
              <>
                <Option value="教育学類">教育学類</Option>
                <Option value="心理学類">心理学類</Option>
                <Option value="障害科学類">障害科学類</Option>
              </>
            )}
            {selectedCollege === '生命環境学群' && (
              <>
                <Option value="生物学類">生物学類</Option>
                <Option value="生物資源学類">生物資源学類</Option>
                <Option value="地球学類">地球学類</Option>
              </>
            )}
            {selectedCollege === '理工学群' && (
              <>
                <Option value="数学類">数学類</Option>
                <Option value="物理学類">物理学類</Option>
                <Option value="化学類">化学類</Option>
                <Option value="応用理工学類">応用理工学類</Option>
                <Option value="工学システム学類">工学システム学類</Option>
                <Option value="社会工学類">社会工学類</Option>
              </>
            )}
            {selectedCollege === '情報学群' && (
              <>
                <Option value="情報科学類">情報科学類</Option>
                <Option value="情報メディア創成学類">情報メディア創成学類</Option>
                <Option value="知識情報・図書館学類">知識情報・図書館学類</Option>
              </>
            )}
            {selectedCollege === '医学群' && (
              <>
                <Option value="医学類">医学類</Option>
                <Option value="看護学類">看護学類</Option>
                <Option value="医療科学類">医療科学類</Option>
              </>
            )}
            {selectedCollege === '体育専門学群' && (
              <>
                <Option value="体育専門">体育専門</Option>
              </>
            )}
            {selectedCollege === '芸術専門学群' && (
              <>
                <Option value="芸術専門">芸術専門</Option>
              </>
            )}
          </Select>}
  
        {<Select
            style={{ width: 300 }}
            placeholder={selectedMajor ? undefined : "主専攻を選択してください。"}
            onChange={handleMajorChange}
            disabled={!selectedDepartment}
            value={selectedMajor}
          >
            {selectedDepartment === '人文学類' && (
              <>
                <Option value="哲学">哲学</Option>
                <Option value="史学">史学</Option>
                <Option value="考古学・民俗学">考古学・民俗学</Option>
                <Option value="言語学">言語学</Option>
              </>
            )}
            {selectedDepartment === '比較文化学類' && (
              <>
                <Option value="比較文化">比較文化</Option>
              </>
            )}
            {selectedDepartment === '日本語・日本文化学類' && (
              <>
                <Option value="日本語・日本語文化学">日本語・日本語文化学</Option>
                <Option value="日本語教師養成">日本語教師養成</Option>
              </>
            )}
            {selectedDepartment === '社会学類' && (
              <>
                <Option value="社会学">社会学</Option>
                <Option value="法学">法学</Option>
                <Option value="政治学">政治学</Option>
                <Option value="経済学">経済学</Option>
              </>
            )}
            {selectedDepartment === '国際総合学類' && (
              <>
                <Option value="国際関係学">国際関係学</Option>
                <Option value="国際開発学">国際開発学</Option>
                <Option value="国際社会科学">国際社会科学</Option>
              </>
            )}
            {selectedDepartment === '教育学類' && (
              <>
                <Option value="教育学">教育学</Option>
              </>
            )}
            {selectedDepartment === '心理学類' && (
              <>
                <Option value="心理学">心理学</Option>
              </>
            )}
            {selectedDepartment === '障害科学類' && (
              <>
                <Option value="障害科学">障害科学</Option>
              </>
            )}
            {selectedDepartment === '生物学類' && (
              <>
                <Option value="生物学">生物学</Option>
              </>
            )}
            {selectedDepartment === '生物資源学類' && (
              <>
                <Option value="生物資源科学">生物資源科学</Option>
                <Option value="農学">農学</Option>
              </>
            )}
            {selectedDepartment === '地球学類' && (
              <>
                <Option value="地球環境学">地球環境学</Option>
                <Option value="地球進化学">地球進化学</Option>
              </>
            )}
            {selectedDepartment === '数学類' && (
              <>
                <Option value="数学">数学</Option>
              </>
            )}
            {selectedDepartment === '物理学類' && (
              <>
                <Option value="物理学">物理学</Option>
              </>
            )}
            {selectedDepartment === '化学類' && (
              <>
                <Option value="化学">化学</Option>
              </>
            )}
            {selectedDepartment === '応用理工学類' && (
              <>
                <Option value="応用物理">応用物理</Option>
                <Option value="電子・量子工学">電子・量子工学</Option>
                <Option value="物理工学">物理工学</Option>
                <Option value="物質・分子工学">物質・分子工学</Option>
              </>
            )}
            {selectedDepartment === '工学システム学類' && (
              <>
                <Option value="知的・機能工学システム">知的・機能工学システム</Option>
                <Option value="エネルギー・メカニクス">エネルギー・メカニクス</Option>
              </>
            )}
            {selectedDepartment === '社会工学類' && (
              <>
                <Option value="社会経済システム">社会経済システム</Option>
                <Option value="経営工学">経営工学</Option>
                <Option value="都市計画">都市計画</Option>
              </>
            )}
            {selectedDepartment === '情報科学類' && (
              <>
                <Option value="coins_soft21">ソフトウェアサイエンス</Option>
                <Option value="coins_sys21">情報システム</Option>
                <Option value="coins_media21">知能情報メディア</Option>
              </>
            )}
            {selectedDepartment === '情報メディア創成学類' && (
              <>
                <Option value="情報メディア創成">情報メディア創成</Option>
              </>
            )}
            {selectedDepartment === '知識情報・図書館学類' && (
              <>
                <Option value="知識科学">知識科学</Option>
                <Option value="知識情報システム">知識情報システム</Option>
                <Option value="情報資源経営">情報資源経営</Option>
              </>
            )}
            {selectedDepartment === '医学類' && (
              <>
                <Option value="医学">医学</Option>
                <Option value="新医学">新医学</Option>
              </>
            )}
            {selectedDepartment === '看護学類' && (
              <>
                <Option value="看護学">看護学</Option>
                <Option value="ヘルスケア">ヘルスケア</Option>
              </>
            )}
            {selectedDepartment === '医療科学類' && (
              <>
                <Option value="医療科学">医療科学</Option>
                <Option value="国際医療科学">国際医療科学</Option>
              </>
            )}
            {selectedDepartment === '体育専門' && (
              <>
                <Option value="体育">体育</Option>
              </>
            )}
            {selectedDepartment === '芸術専門' && (
              <>
                <Option value="芸術">芸術</Option>
                <Option value="日本芸術">日本芸術</Option>
              </>
            )}
          </Select>}
          </Space>
      </div>
    );
  };

export default Dropdown;