import Course from "./Course";

function CheckRecommendedExam(gradelist: Course[]){
    let totalUnits = 0;
    let aGradeUnits = 0;

    gradelist.forEach((e) => {
        if (e.grade !== 'P' && e.grade !== 'F' && e.grade !== 'D' && e.grade !== "履修中") {
            totalUnits += e.unit;
            if (e.grade === 'A' || e.grade === 'A+') {
                aGradeUnits += e.unit;
            }
        } 
    })

    //return Math.ceil(aGradeUnits/totalUnits*100);
    return [aGradeUnits, totalUnits];
}

export default CheckRecommendedExam;