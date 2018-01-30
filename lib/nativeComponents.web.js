import React, {
    Component
} from 'react';


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
    "RNSVGClipPath": (props) =>  {
        let {name, ...new_props} = props;
        return <clipPath id={name} {...new_props} />
    },
    "RNSVGEllipse": (props) => <ellipse {...props} />,
    "RNSVGGroup": (props) => <g {...props} />,
    "RNSVGLine": (props) => <line {...props} />,
    "RNSVGLinearGradient": (props) => <linearGradient {...props} />,
    "RNSVGPath": (props) => <path {...props} />,
    "RNSVGPattern": (props) => <pattern {...props} />,
    "RNSVGPolygon": (props) => <polygon {...props} />,
    "RNSVGPolyLine": (props) => <polyline {...props} />,
    "RNSVGRadialGradient": (props) => <radialGradient {...props} />,
    "RNSVGRect": (props) => <rect {...props} />,
    "RNSVGStop": (props) => <stop {...props} />,
    "RNSVGSymbol": (props) => <symbol {...props} />,
    "RNSVGText": (props) => <text {...props} />,
    "RNSVGTextPath": (props) => <textPath {...props} />,
    "RNSVGTSpan": (props) => <tspan {...props} />,
    "RNSVGUse": (props) => {
        let {href, ...new_props} = props;
        return <use xlinkHref={href} {...new_props} />
    },
    "RNSVGDefs": (props) => <defs {...props} />,
};


export function requireNativeComponent(viewName, componentInterface, extraConfig){
    let WebComponent = webComponentMap[viewName];
    if(!WebComponent) throw new Error("No such web component :" + viewName);
    //if(!WebComponent) WebComponent = (props)=> <div />; // TODO this is only for debugging, REMOVE ME
    //return the component but wrapped with extraConfig passed in
    return createWebComponent(WebComponent, extraConfig);
}

export function createReactNativeComponentClass(uiViewClassName, getViewConfig) {
    return requireNativeComponent(uiViewClassName);
}
