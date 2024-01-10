import Course from './Course';

function CheckUnitCapRelease(gradeslist: Course[]) {
    let totalUnits = 0;
    let aGradeUnits = 0;
    let activeUnits = 0;

    gradeslist.forEach((e) => {
        if (e.year == 2023) {
            totalUnits += e.unit;
            if (e.grade == 'A' || e.grade == 'A+' || e.grade == 'P') {
                aGradeUnits += e.unit;
            }
            if (e.grade == '履修中'){
                activeUnits += e.unit;
            }
        } 
    })
    let needAUnit = Math.ceil(totalUnits * 0.6 - aGradeUnits)

    return needAUnit;
}

export default CheckUnitCapRelease;