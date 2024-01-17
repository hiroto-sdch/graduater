import Course from './Course';
import CheckCompulsory from './CheckCompulsory';
import CheckSelect from './CheckSelect';
import CheckUnitCapRelease from './CheckUnitCapRelease';
import CheckRecommendedExam from './CheckRecommendedExam';
import Requirement from './Requirement';

// count_mode : 不足単位数を数える場合、true.  取った単位数を数える場合、false
function Check(gradeslist: Course[], major: string, target_grade: string[], count_mode: boolean) {
    // 卒業要件のJSONを格納
    let requirement = Requirement(major);

    gradeslist.forEach((e) => {
        e.checked = false;
    });
  
    let data: {[name:string] : any} = {};
    data["Compulsory"] = CheckCompulsory(gradeslist, requirement, target_grade, count_mode);
    data["Select"] = CheckSelect(gradeslist, requirement, target_grade, count_mode);
    data["UnitCapRelease"] = CheckUnitCapRelease(gradeslist); //単位上限を解放をするために必要なA以上の単位数を返却
    data["RecommendedExam"] = CheckRecommendedExam(gradeslist); //院試を推薦で受けるために必要なA以上の単位数を返却
    console.log(data);

    return data;
}

export default Check;