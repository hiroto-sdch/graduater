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
            title: "不足している授業",
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
            title: "不足",
            dataIndex: "fusoku",
            key: "fusoku",
        },
        {
            title: "履修中",
            dataIndex: "rishu",
            key: "rishu",
        }
    ];

    const lltable = bunrui.map((item, index) => {
        const tabledata = shoubunrui[index].filter((e) => (e !== "全体")).map((e, i) => ({
            key: i,
            className: e,
            fusoku: numtani[index][e].fusoku,
            rishu: numtani[index][e].rishu
        }));
        return (
        <Collapse style={{ backgroundColor: numtani[index]["全体"].fusoku > 0 ? 'pink' : 'white' }}>
            <Panel header={item+"    "+numtani[index]["全体"].fusoku+"単位不足    "+numtani[index]["全体"].rishu+"単位履修中"} key={index}>
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