import React, { Component } from 'react';
import { createReactNativeComponentClass }  from '../lib/nativeComponents';

export default class extends Component {
    static displayName = 'Defs';

    render() {
        return <RNSVGDefs>{this.props.children}</RNSVGDefs>;
    }
}

const RNSVGDefs = createReactNativeComponentClass('RNSVGDefs', () => ({
    validAttributes: {},
    uiViewClassName: 'RNSVGDefs'
}));
