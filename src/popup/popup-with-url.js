import { BasicCard } from '@components/BasicCard';
import { BasicCardContent } from '@components/BasicCard/content';
import { BasicCardSubtitle } from '@components/BasicCard/subtitle';
import React, { useEffect, useState } from 'react';
import { Options } from './options';
export const PopupWithUrl = ({ url }) => {
    const [entries, setEntries] = useState(null);
    const fetchParams = () => {
        chrome.storage.local.get({ filters: {} }, res => {
            const filters = res.filters;
            if (!filters[url])
                setEntries(null);
            else
                setEntries(filters[url]);
        });
    };
    useEffect(() => fetchParams(), [url]);
    if (!entries) {
        return null;
    }
    return (React.createElement(BasicCard, { title: url },
        React.createElement(BasicCardSubtitle, null, "This is a subtitle"),
        React.createElement(BasicCardContent, null,
            React.createElement(Options, { entries: entries }))));
};
