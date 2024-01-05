import { Table, Collapse } from "antd";
import React from "react";

const { Panel } =  Collapse;

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
        <Table columns={tableColumns} dataSource={tableData}/>
    )
}

export const SelectTable = (selected: Selected) =>{
    const {Select} = selected;
    const bunrui = Object.keys(Select);
    const shoubunrui = bunrui.map((e) => (Object.keys((Select as {[name : string]: ({[name : string]: number})})[e])));
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

    const lltable = bunrui.map((item, index) => {
        const tabledata = shoubunrui[index].filter((e) => (e !== "全体")).map((e, i) => ({
            key: i,
            className: e,
            num: numtani[index][e]
        }));
        return (
        <Collapse>
            <Panel header={item+"    不足"+numtani[index]["全体"]+"単位"} key={index}>
                <Table columns={tableColumns} dataSource={tabledata} />
            </Panel>
        </Collapse>
        );
    });

    return(
        <Collapse>
            {lltable}
        </Collapse>
    );
}