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

            // console.log(hoge);
            hoge.forEach((syn) => {
                if (syn.every((_hoge) => (
                    gradeslist.some((grades) => 
                    grades["name"] === _hoge && !["D", "F", "履修中"].includes(grades["grade"])
                    )
                    )
                    )) {
                    checklist[e] = true;
                }
                else{
                    checklist[e] = false;
                }
            });

        } else if (e.includes('::')) {
            let tmp :string[] = e.split('::');
            let codes :string[] = codeType[tmp[0] as keyof typeof codeType].codes;
            let count :number = 0;
       
            codes.forEach((code) => {
                gradeslist.forEach((grade) => {
                    if (grade.id.startsWith(code) && !["D", "F", "履修中"].includes(grade.grade)){
                        count += Number(grade.unit);
                    }
                });
            });
            checklist[tmp[0]] = (count >= Number(tmp[1]));
        }
        else {
            checklist[e]=gradeslist.some((grades) => {
                return grades["name"] === e && !["D", "F", "履修中"].includes(grades["grade"]);
            });
        }
    });
    
    console.log(checklist);

    CheckSelect(gradeslist, requirement);
}

export default Check;