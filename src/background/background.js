var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getCurrentTab, groupParamsByKey } from "./utils";
const STORE_FORMAT_VERSION = chrome.runtime.getManifest().version;
const upsert = (url, params) => {
    chrome.storage.local.get({ filters: {} }, res => {
        const filters = res.filters;
        if (!filters[url])
            filters[url] = [];
        filters[url].push({
            version: STORE_FORMAT_VERSION,
            uuid: crypto.randomUUID(),
            createdAt: Date.now(),
            params
        });
        console.log({ filters });
        chrome.storage.local.set({ filters });
    });
};
chrome.tabs.onUpdated.addListener((_, changeInfo, tab) => __awaiter(void 0, void 0, void 0, function* () {
    if (changeInfo.status === 'complete' && tab.active) {
        const currentTab = yield getCurrentTab();
        if (currentTab.url) {
            const { hostname, pathname, search } = new URL(currentTab.url);
            const params = new URLSearchParams(search);
            const groupedParams = groupParamsByKey(params);
            if (!!params.toString()) {
                upsert(hostname + pathname, groupedParams);
            }
            else {
                console.log('no params provided');
            }
        }
    }
}));
