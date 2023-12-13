import Course from "./Course";

export function Check(text:Course[]){
    const fusoku: string[] = [];
    for(const items of text){
        fusoku.push(items.name)
    }
    return fusoku;
}

export default Check