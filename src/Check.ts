import Course from './Course';
import CheckCompulsory from './CheckCompulsory';
import CheckSelect from './CheckSelect';
import CheckUnitCapRelease from './CheckUnitCapRelease';
import CheckRecommendedExam from './CheckRecommendedExam';
import Requirement from './Requirement';

function Check(gradeslist: Course[], major: string, target_grade: string[]) {
    // 卒業要件のJSONを格納
    let requirement = Requirement(major);

    gradeslist.forEach((e) => {
        e.checked = false;
    });
  
    let data: {[name:string] : any} = {};
    data["Compulsory"] = CheckCompulsory(gradeslist, requirement, target_grade);
    data["Select"] = CheckSelect(gradeslist, requirement, target_grade);
    data["UnitCapRelease"] = CheckUnitCapRelease(gradeslist);
    data["RecommendedExam"] = CheckRecommendedExam(gradelist);
    console.log(data);

    return data;
}

export default Check;