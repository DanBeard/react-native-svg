import React from 'react';
import PropTypes from 'prop-types';
import { createReactNativeComponentClass }  from '../lib/nativeComponents';
import extractText from '../lib/extract/extractText';
import {textProps} from '../lib/props';
import {TextAttributes} from '../lib/attributes';
import extractProps from '../lib/extract/extractProps';
import Shape from './Shape';

export default class extends Shape {
    static displayName = 'Text';

    static propTypes = textProps;

    //noinspection JSUnusedGlobalSymbols
    static childContextTypes = {
        isInAParentText: PropTypes.bool
    };

    //noinspection JSUnusedGlobalSymbols
    getChildContext() {
        return {
            isInAParentText: true
        };
    }

    //noinspection JSUnusedGlobalSymbols
    getContextTypes() {
        return {
            isInAParentText: PropTypes.bool
        };
    }

    setNativeProps = (...args) => {
        this.root.setNativeProps(...args);
    };

    render() {
        const props = this.props;

        return <RNSVGText
            ref={ele => {this.root = ele;}}
            {...extractProps({
                ...props,
                x: null,
                y: null
            }, this)}
            {...extractText(props, true)}
        />;
    }
}

const RNSVGText = createReactNativeComponentClass('RNSVGText', () => ({
    validAttributes: TextAttributes,
    uiViewClassName: 'RNSVGText'
}));
