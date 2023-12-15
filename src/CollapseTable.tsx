import { Collapse, Table } from "antd";
import React from "react";

const { Panel } = Collapse;

type Props ={
    fusoku: string[];
}
type Selected = {
    Select: object;
}

export const CollapseTable = (props: Props) =>{
    const {fusoku} = props;
    const tableColumns = [
        {
            title: "授業名",
            dataIndex: "className",
            key:"className",
        }
    ];

    const tableData = fusoku.map((item, index) => ({
        key: index.toString(),
        className: item,
      }));

    return(
        <Collapse>
            <Panel header="足りない必修科目" key="1">
                <Table columns={tableColumns} dataSource={tableData}/>
            </Panel>
        </Collapse>
    )
}

export const SelectTable = (selected: Selected) =>{
    const {Select} = selected;
    const bunrui = Object.keys(Select);
    const numtani = Object.values(Select);
    const tableColumns = [
        {
            title: "分類",
            dataIndex: "className",
            key: "className",
        },
        {
            title: "単位数",
            dataIndex: "num",
            key: "num",
        }
    ];
    const tabledata1 = bunrui.map((item, index) => ({
        key: index.toString(),
        className: item,
        num: numtani[index]
    }));

    return(
        <Collapse>
            <Panel header="足りない選択科目数" key="2">
                <Table columns={tableColumns} dataSource={tabledata1}/>
            </Panel>
        </Collapse>
    )
}