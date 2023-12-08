import coins_media21 from './data/coins_media21.json';
import coins_soft21 from './data/coins_soft21.json';
import coins_sys21 from './data/coins_sys21.json';
import Course from './Course';

function Check(gradeslist: Course[], major: string) {
    console.log(coins_soft21);

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
            break
    }

    let checklist: {[name: string]: boolean} = {};
    let compulsory: string[] = requirement["courses"]["compulsory"];
    compulsory.forEach((e) => {
        checklist[e]=gradeslist.some((grades) => {
                        return grades["name"] === e && !["D", "F", "履修中"].includes(grades["grade"]);
                    });
    });
    
    console.log(checklist);
}

export default Check;