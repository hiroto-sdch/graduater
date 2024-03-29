import Course from './Course';
import codeType from './data/courseCodeTypes';

// count_mode : 不足単位数を数える場合、true.  取った単位数を数える場合、false
function CheckCompulsory(gradeslist: Course[], requirement: any, target_grade: string[], count_mode: boolean) {

    let checklist: {[name: string]: boolean} = {};  // 科目名：履修したかどうか
    let compulsory: string[] = requirement["courses"]["compulsory"];    // 必修単位の科目名

    compulsory.forEach((e) => {
        if (e.includes('//')) {
            let tmp :string[] = e.split('//');
            let hoge : (string)[][] = tmp.map((syn) => {
                return syn.replace(/\[|\]|\s|'/g,"").split(",");
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
                    grades["name"] === _hoge && target_grade.includes(grades["grade"])
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
                    if (grades.id.startsWith(code) && target_grade.includes(grades.grade)){
                        count += Number(grades.unit);
                        grades.checked = true;
                    }
                });
            });
            checklist[tmp[0]] = (count >= Number(tmp[1]));
        }
        else {
            checklist[e]=gradeslist.some((grades) => {
                return grades["name"] === e && target_grade.includes(grades["grade"]);
            });
        }
    });

    if(count_mode){ // 不足単位数確認
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
        
        return failureunit;
    } else {  // 取った単位数確認
        gradeslist.forEach((grades) => {
            if (Object.keys(checklist).includes(grades["name"])){
                grades.checked = true;
            }
        });
        let passedunit: string[] = [];
        Object.keys(checklist).forEach((key) => {
            if (checklist[key] === false){
                passedunit.push(key);
            }
        });
 
        return passedunit;
    }
}

export default CheckCompulsory;