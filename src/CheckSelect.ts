import Course from './Course';

interface SelectRequire {
  ids : string[];
  min : number;
  max : number;
  not : boolean;
  name : string;
  group_id : number;
}

interface Group{
    id : number;
    min : number;
    max : number;
    name : string;
}

function CheckSelect(gradeslist: Course[], requirement: any) {
    const selectRequirements : SelectRequire[] = requirement["courses"]["select"].map((e:(string[] | number | boolean | string)[]) => {
        return {
            ids : e[0],
            min : e[1],
            max : e[2],
            not : e[3],
            name: e[4],
            group_id : e[5],
        };
    });
    const groups : Group[] = requirement["courses"]["groups"].map((e : (number | string)[]) => {
        return {
            id : e[0],
            min : e[1],
            max : e[2],
            name: e[3],
        }
    });
    let selectCheckList : number[] = selectRequirements.map((e) => (0));
    let groupCheckList : number[] = [];
    groups.forEach((e) => {groupCheckList[e.id] = 0;});

    gradeslist.forEach((e, i) => {
        selectRequirements.filter((e) => (!e.not)).forEach((req, reqi) => {
            (req.ids).forEach((req_id) => {
                if(e.id.startsWith(req_id)){
                    if(selectCheckList[reqi] < req.max && groupCheckList[req.group_id] < groups[req.group_id].max){
                        selectCheckList[reqi] += e.unit;
                        groupCheckList[req.group_id] += e.unit;
                        gradeslist.splice(i, 1);
                    }
                }
            });
        });
    });

    console.log(groupCheckList);
    console.log(selectCheckList);
}

export default CheckSelect;