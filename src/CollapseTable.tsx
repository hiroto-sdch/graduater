import { Collapse, Table } from "antd";
import React from "react";

const { Panel } = Collapse;

type Props ={
    fusoku: string[];
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