import React, {
    Component
} from 'react';
import Shape from '../elements/Shape'


function createWebComponent(WrappedComponent, extraConfig) {
    class WrappingWebComponent extends Component{

        render() {
            return (<WrappedComponent {...this.props}  />)
        }
    }

    return WrappingWebComponent;
}


// map from react-svg component name to web implementation
const webComponentMap = {
    "RNSVGSvgView": (props) => <svg {...props} />,
    "RNSVGCircle": (props) => <circle {...props} />,
    "RNSVGClipPath": (props) => <clipPath {...props} />,
    "RNSVGEllipse": (props) => <ellipse {...props} />,
    "RNSVGGroup": (props) => <g {...props} />,
    "RNSVGLine": (props) => <line {...props} />,


};


export function requireNativeComponent(viewName, componentInterface, extraConfig){
    let WebComponent = webComponentMap[viewName];
    //if(!WebComponent) throw new Error("No such web component :" + viewName);
    if(!WebComponent) WebComponent = (props)=> <div />; // TODO this is only for debugging, REMOVE ME
    //return the component but wrapped with extraConfig passed in
    return createWebComponent(WebComponent, extraConfig);
}

export function createReactNativeComponentClass(uiViewClassName, getViewConfig) {
    return requireNativeComponent(uiViewClassName);
}
