import React from 'react';
import { Heading } from 'rebass';
/**
 *
 * @see {@link HTMLAttributes} for available properties
 * @returns
 */
export const BasicCardTitle = (props) => {
    return (React.createElement(Heading, Object.assign({}, props, { as: 'h3', my: 0, color: 'black', fontWeight: 600 }), props.children));
};
