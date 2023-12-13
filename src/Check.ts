import coins_media21 from './data/coins_media21.json';
import coins_soft21 from './data/coins_soft21.json';
import coins_sys21 from './data/coins_sys21.json';
import art_art21 from './data/art_art21.json';
import art_japan21 from './data/art_japan21.json';
import japanese21 from './data/japanese21.json';
import pe21 from './data/pe21.json';
import Course from './Course';
import CheckCompulsory from './CheckCompulsory';
import CheckSelect from './CheckSelect';

function Check(gradeslist: Course[], major: string) {
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
        case "art_art21":
            requirement = art_art21;
            break;
        case "art_japan21":
            requirement = art_japan21;
            break;
        case "japanese21":
            requirement = japanese21;
            break;
        case "pe21":
            requirement = pe21;
            break;
        default:
            requirement = coins_soft21;
            break;
    }

    let data: {[name:string] : any} = {};
    data["Compulsory"] = CheckCompulsory(gradeslist, requirement);
    data["Select"] = CheckSelect(gradeslist, requirement);
    console.log(data);

    return data;
}

export default Check;