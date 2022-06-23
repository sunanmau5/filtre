var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function getCurrentTab() {
    return __awaiter(this, void 0, void 0, function* () {
        const queryOptions = { active: true, lastFocusedWindow: true };
        const [tab] = yield chrome.tabs.query(queryOptions);
        return tab;
    });
}
function groupParamsByKey(params) {
    return [...params.entries()].reduce((acc, tuple) => {
        const [key, val] = tuple;
        if (acc.hasOwnProperty(key)) {
            if (Array.isArray(acc[key])) {
                acc[key] = [...acc[key], val];
            }
            else {
                acc[key] = [acc[key], val];
            }
        }
        else {
            acc[key] = val;
        }
        return acc;
    }, {});
}
export { getCurrentTab, groupParamsByKey };
