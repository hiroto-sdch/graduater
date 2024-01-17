import coins_media21 from './data/coins_media21.json';
import coins_soft21 from './data/coins_soft21.json';
import coins_sys21 from './data/coins_sys21.json';
import esys_intelligence21 from './data/esys_intelligence21.json';
import esys_energy21 from './data/esys_energy21.json';
import art_art21 from './data/art_art21.json';
import art_japan_art21 from './data/art_japan_art21.json';
import coens21_a21 from './data/coens21_a21.json';
import coens21_b21 from './data/coens21_b21.json';
import coens21_c21 from './data/coens21_c21.json';
import coens21_d21 from './data/coens21_d21.json';
import earth21_course1 from './data/earth21_course1.json';
import japanese21 from './data/japanese21.json';
import math21 from './data/math21.json';
import psych21 from './data/psych21.json';
import mast21 from './data/mast21.json';
import klis_irm21 from './data/klis_irm21.json';
import klis_kis21 from './data/klis_kis21.json';
import klis_ksc21 from './data/klis_ksc21.json';

function Requirement(major :string) {
    let requirement: any;
    switch (major) {
        case "ソフトウェアサイエンス":
            requirement = coins_soft21;
            break;
        case "知能情報メディア":
            requirement = coins_media21;
            break;
        case "情報システム":
            requirement = coins_sys21;
            break;
        case "知的・機能工学システム" :
            requirement = esys_intelligence21;
            break;
        case "エネルギー・メカニクス" :
            requirement = esys_energy21;
            break;
        case "芸術":
            requirement = art_art21;
            break;
        case "日本芸術":
            requirement = art_japan_art21;
            break;
        case "応用物理":
            requirement = coens21_a21;
            break;
        case "電子・量子工学":
            requirement = coens21_b21;
            break;
        case "物理工学":
            requirement = coens21_c21;
            break;
        case "物質・分子工学":
            requirement = coens21_d21;
            break;
        case "地球環境学":
            requirement = earth21_course1;
            break;
        case "数学":
            requirement = math21;
            break;
        case "心理学":
            requirement = psych21;
            break;
        case "日本語・日本語文化学":
            requirement = japanese21;
            break;
        case "情報資源経営":
            requirement = klis_irm21;
            break;
        case "知識情報システム":
            requirement = klis_kis21;
            break;
        case "知識化学":
            requirement = klis_ksc21;
            break;
        case "情報メディア創成":
            requirement = mast21;
            break;
        default:
            requirement = coins_soft21;
            break;
    }

    return requirement;
}

export default Requirement;