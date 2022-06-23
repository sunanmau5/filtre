import React, { forwardRef, isValidElement } from 'react';
import { Card } from 'rebass';
import { BasicCardTitle } from './title';
// eslint-disable-next-line
export const BasicCard = forwardRef((props, ref) => {
    const { title, children } = props;
    return (React.createElement(Card, { ref: ref, backgroundColor: 'white', p: 4, width: 1, sx: {
            borderWidth: 1,
            borderRadius: 2,
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
        } },
        isValidElement(title) ?
            title :
            React.createElement(BasicCardTitle, null, title),
        children));
});
