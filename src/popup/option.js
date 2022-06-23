import { formatDistance } from 'date-fns';
import React from 'react';
import { Flex } from 'rebass';
import { Param } from './param';
// A single search param option
export const Option = (entry) => {
    const { createdAt, uuid, params } = entry;
    return (React.createElement(Flex, { key: uuid, flexDirection: 'column', sx: { gap: 2 } },
        React.createElement(Flex, { sx: { gap: 4 } }, Object.entries(params).map(([key, value]) => React.createElement(Param, { paramKey: key, value: value }))),
        React.createElement("span", null, formatDistance(createdAt, new Date()))));
};
