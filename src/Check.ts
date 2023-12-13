import coins_media21 from './data/coins_media21.json';
import coins_soft21 from './data/coins_soft21.json';
import coins_sys21 from './data/coins_sys21.json';
import Course from './Course';
import CheckSelect from './CheckSelect';
import codeType from './data/courseCodeTypes';

function Check(gradeslist: Course[], major: string) {
    console.log(coins_soft21);

    // 卒業要件のJSONを格納
    let requirement: any;
    switch (major) {
        case "coins_soft21":
            requirement = coins_soft21;
            break;
        case "coins_media21":
            requirement = coins_media21;
            break;
        case "coins_sys21":
            requirement = coins_sys21;
            break;
        default:
            requirement = coins_soft21;
            break;
    }

    let checklist: {[name: string]: boolean} = {};  // 科目名：履修したかどうか
    let compulsory: string[] = requirement["courses"]["compulsory"];    // 必修単位の科目名
    compulsory.forEach((e) => {
        if (e.includes('//')) {
            let tmp :string[] = e.split('//');
            let hoge : (string)[][] = tmp.map((syn) => {
                return syn.replace(/\[|\]|\s|\'/g,"").split(",");
            });

            hoge.some((syn) => {
                syn.forEach((_hoge) => {
                    gradeslist.forEach((grades) => {
                        if (_hoge.includes(grades["name"])){
                            grades.checked = true;
                        }
                    });
                });
                if (syn.every((_hoge) => (
                    gradeslist.some((grades) => 
                    grades["name"] === _hoge && !["D", "F"].includes(grades["grade"])
                    )
                    )
                    )) {
                    return checklist[e] = true;
                }
                else{
                    return checklist[e] = false;
                }
            });

        } else if (e.includes('::')) {
            let tmp :string[] = e.split('::');
            let codes :string[] = codeType[tmp[0] as keyof typeof codeType].codes;
            let count :number = 0;
       
            codes.forEach((code) => {
                gradeslist.forEach((grades) => {
                    if (grades.id.startsWith(code) && !["D", "F"].includes(grades.grade)){
                        count += Number(grades.unit);
                        grades.checked = true;
                    }
                });
            });
            checklist[tmp[0]] = (count >= Number(tmp[1]));
        }
        else {
            checklist[e]=gradeslist.some((grades) => {
                return grades["name"] === e && !["D", "F"].includes(grades["grade"]);
            });
        }
    });

    let failureunit: string[] = [];
    Object.keys(checklist).forEach((key) => {
        if (checklist[key] === false){
            failureunit.push(key);
        }
    });
    gradeslist.forEach((grades) => {
        if (Object.keys(checklist).includes(grades["name"])){
            grades.checked = true;
        }
    });
    
    // console.log(checklist);
    // console.log(failureunit);
    // console.log(gradeslist);

    CheckSelect(gradeslist, requirement);
}

export default Check;