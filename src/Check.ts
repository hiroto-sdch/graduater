import coins_media21 from './data/coins_media21.json';
import coins_soft21 from './data/coins_soft21.json';
import coins_sys21 from './data/coins_sys21.json';
import Course from './Course';
import CheckCompulsory from './CheckCompulsory';
import CheckSelect from './CheckSelect';

function Check(gradeslist: Course[], major: string, target_grade: string[]) {
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

    let data: {[name:string] : any} = {};
    data["Compulsory"] = CheckCompulsory(gradeslist, requirement, target_grade);
    data["Select"] = CheckSelect(gradeslist, requirement, target_grade);
    console.log(data);

    return data;
}

export default Check;