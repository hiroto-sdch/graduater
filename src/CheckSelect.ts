import Course from './Course';
import codeType from './data/courseCodeTypes';

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

// count_mode : 不足単位数を数える場合、true.  取った単位数を数える場合、false
function CheckSelect(gradeslist: Course[], requirement: any, target_grade: string[], count_mode: boolean): {[name : string]: {[name : string]: number}} {
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
    let selectCheckList : (Course[])[] = selectRequirements.map((e) => ([]));
    let groupCheckList : (Course[])[] = [];
    groups.forEach((e) => {groupCheckList[e.id] = [];});

    gradeslist.filter((e) => (target_grade.includes(e.grade))).forEach((e) => {
        selectRequirements.forEach((req, reqi) => {
            if(!e.checked && ((!req.not && matchRequire(e.id, req.ids)) || (req.not && !matchRequire(e.id, req.ids)))){
                if((selectCheckList[reqi].map((e)=>e.unit).reduce((p,e) => (p+e), 0) < req.max) &&   // CheckList 内の単位数を合計し、上限と比較
                        (groupCheckList[req.group_id].map((e)=>e.unit).reduce((p,e) => (p+e), 0) < groups[req.group_id].max)){
                    selectCheckList[reqi].push(e);
                    e.checked = true;
                }
            }
        });
    });

    // あふれの処理
    selectRequirements.forEach((e, i) => {
        let over : number;
        while((over = (selectCheckList[i].map(e => e.unit).reduce((p, e) => p+e , 0) - e.max)) > 0){
            const r = ((o) => selectCheckList[i].findIndex((e) => e.unit <= o))(over);
            if(r === -1){
                console.log("端数の処理ができませんでした。。。。。。");
                return undefined;
            }
            (gradeslist.find((e) => e === selectCheckList[i][r]) as Course).checked = false;
            selectCheckList[i].splice(r, 1);
        };
    });

    selectRequirements.forEach((req, reqi) => {
        selectCheckList[reqi].forEach((e) => {
            groupCheckList[req.group_id].push(e);

        });
    });

    
    const tmp: {[name : string]: {[name : string]: number}} = {};
    groups.forEach((e, i) => {
        if(count_mode){ // 不足単位数を確認
            const hoge = (e.min - groupCheckList[i].map((e) => e.unit).reduce((p, e) => p+e , 0));
            tmp[e.name] = {};
            tmp[e.name]["全体"] = (hoge > 0 ? hoge : 0);
            selectRequirements.forEach((s, i) => {
                if(s.group_id === e.id){
                    const fuga = (s.min - selectCheckList[i].map((s) => s.unit).reduce((p, s) => p+s , 0));
                    tmp[e.name][s.name] = (fuga > 0 ? fuga : 0);
                }
            });
        } else { // 取った単位数を確認
            const hoge = (groupCheckList[i].map((e) => e.unit).reduce((p, e) => p+e , 0));
            tmp[e.name] = {};
            tmp[e.name]["全体"] = hoge;
            selectRequirements.forEach((s, i) => {
                if(s.group_id === e.id){
                    const fuga = (selectCheckList[i].map((s) => s.unit).reduce((p, s) => p+s , 0));
                    tmp[e.name][s.name] = fuga;
                }
            });
        }
    });

    // console.log(selectCheckList);

    return tmp;

}

export default CheckSelect;