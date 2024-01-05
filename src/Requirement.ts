import coins_media21 from './data/coins_media21.json';
import coins_soft21 from './data/coins_soft21.json';
import coins_sys21 from './data/coins_sys21.json';
import esys_intelligence21 from './data/esys_intelligence21.json';
import esys_energy21 from './data/esys_energy21.json';

function Requirement(major :string) {
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
        case "esys_intelligence21" :
            requirement = esys_intelligence21;
            break;
        case "esys_energy21" :
            requirement = esys_energy21;
            break;
        default:
            requirement = coins_soft21;
            break;
    }

    return requirement;
}

export default Requirement;