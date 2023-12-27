import codeType from "./data/courseCodeTypes";
import Course from "./Course";
import kdb from "./data/kdb"
import Requirement from './Requirement';

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

function Recommend(gradeslist: Course[], major: string, data: any) {
    const matchRequire = (id : string, require : string[]) : boolean => {
        return require.some((e) => {
            if(e.startsWith("*")){ // code type 使用
                const c = codeType[e.slice(1) as keyof typeof codeType]
                if((c.except as string[]).some((e) => id.startsWith(e))){
                    return false;
                }
                if(c.codes.some((e) => id.startsWith(e))){
                    return true;
                }
                return false;
            } else {
                return require.some((e) => id.startsWith(e));
            }
        });
    }

    const requirement = Requirement(major);
    const selectRequirements: SelectRequire[] = requirement["courses"]["select"].map((e:(string[] | number | boolean | string)[]) => {
        return {
            ids : e[0],
            min : e[1],
            max : e[2],
            not : e[3],
            name: e[4],
            group_id : e[5],
        };
    });
    const groups: Group[] = requirement["courses"]["groups"].map((e : (number | string)[]) => {
        return {
            id : e[0],
            min : e[1],
            max : e[2],
            name: e[3],
        }
    });

    const select = data["Select"];
    const sublist: (string[])[] = kdb["data"];
    let shortage: string[] = [];

    Object.keys(select).forEach((key) => {
        if (select[key] !== 0){
            shortage.push(key);
        }
    });

    let searchid: {[name: string]: string[]} = {};
    groups.forEach((group) => {
        if(shortage.includes(group.name)){
            searchid[group.name] = []
            selectRequirements.forEach((e) =>{
                if(e.group_id === group.id){
                    searchid[group.name].push(...e.ids);
                }
            });
        }
    });

    let baserec: {[name: string]: string[]} = {};
    Object.keys(searchid).forEach((key) => {
        baserec[key] = sublist.filter((subject) => {
            return matchRequire(subject[0], searchid[key]);
        }).map((e) => e[0]);
    });


    let got = gradeslist.map((e) => e.id);
    let recommend: {[name: string]: string[]} = {};
    Object.keys(baserec).forEach((key) => {
        if (key != "関連科目選択") {
            recommend[key] = [];
            baserec[key].forEach((id) => {
                if(!got.includes(id)){
                    recommend[key].push(id);
                }
            })
        }
    })
    // console.log(recommend);
    return recommend;
}

export default Recommend;