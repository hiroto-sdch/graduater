import Course from "./Course";

function CheckRecommendedExam(gradelist: Course[]){
    // let totalUnits = 0;
    let aGradeUnits = 0;

    gradelist.forEach((e) => {
        if (e.grade !== 'P') {
            // totalUnits += e.unit;
            if (e.grade === 'A' || e.grade === 'A+') {
                aGradeUnits += e.unit;
            }
        } 
    })

    let ratio = Math.round(aGradeUnits/totalUnits*1000)/10
    return ratio;
}

export default CheckRecommendedExam;