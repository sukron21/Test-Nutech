import React from "react";
import Style from "./style.module.css"

const Index = () =>{
    return (
        <>
        <div className="container-fluid">
            <div className={`${Style.bg}`}>
            <div className={`text-center `}>
            <div className={`justify-content-center ${Style.footers}`}>
                <h3>"Satisfaction lies in the effort, not in the attainment, full effort is full victory."</h3>
                <i>-Mahatma Gandhi</i>
            </div>
            </div>
            </div>
        </div>
        </>
    )
}
export default Index