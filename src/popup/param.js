import React from 'react';
import { Flex, Heading, Text } from 'rebass';
export const Param = (props) => {
    const { paramKey, value } = props;
    return (React.createElement(Flex, { key: paramKey, flexDirection: 'column', maxWidth: 100 },
        React.createElement(Heading, { fontSize: 16, fontWeight: 600, my: 0, title: paramKey },
            paramKey,
            ":"),
        React.createElement(Text, { color: 'rgb(107, 114, 128)', sx: {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
            }, title: value }, value)));
};
