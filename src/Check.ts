import Course from './Course';
import CheckCompulsory from './CheckCompulsory';
import CheckSelect from './CheckSelect';
import Requirement from './Requirement';

function Check(gradeslist: Course[], major: string) {

    let requirement = Requirement(major);
    console.log(requirement);
    let data: {[name:string] : any} = {};
    data["Compulsory"] = CheckCompulsory(gradeslist, requirement);
    data["Select"] = CheckSelect(gradeslist, requirement);
    console.log(data);

    return data;
}

export default Check;