import React from 'react';
import { Flex } from 'rebass';
import { Option } from './option';
export const Options = ({ entries }) => {
    return (React.createElement(Flex, { flexDirection: 'column', sx: {
            gap: 4
        } }, entries.map(entry => React.createElement(Option, Object.assign({}, entry)))));
};
