import React,{Component} from "react";

export class Button extends Component { 

    render(){
        let{label, onClick,className ,isDisabled} = this.props;
        
        return(
            <button  disabled={isDisabled} type="button" onClick={onClick} className={`btn btn-${className}`}>
            {label}
            </button>
        )
    }

}

export default Button;
