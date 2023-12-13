import Course from "./Course";

function CSVconvert(csvdata: string) : Course[] {
    csvdata = csvdata.replace(/"/g, "");
    const csvlist : string[] = csvdata.split('\n');

    return csvlist
    .filter((e, i) => e && i !== 0)
    .map((e) => {
        const fields : string[] = e.split(",");
        return {id: fields[2],
                name: fields[3],
                unit: Number(fields[4]),
                grade: fields[7],
                year: Number(fields[9]),
                checked : false}
    });
}

export default CSVconvert;