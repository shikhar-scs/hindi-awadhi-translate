import React from 'react';
// import ReactDOM from 'react-dom';
import { Form, Button } from "react-bootstrap";

class Translator extends React.Component {
    constructor(props) {
        super(props);
     
        this.state = {
          rules: null,
          hs: null,
          as: null
        };
    }

    addToRule = () => {
        const json = JSON.parse(document.getElementById("json_rule").value);
        let prevRules = JSON.parse(localStorage.getItem("trans_rules"));
        if(prevRules===null) {
            prevRules = {};
        }
        Object.keys(json).forEach(key => {{}
            if(key in prevRules) {
                let refSet = new Set(prevRules[key]);
                json[key].forEach(val => refSet.add(val));                
                prevRules[key] = Array.from(refSet);
            } else {
                prevRules[key] = json[key];
            }
        });
        localStorage.setItem("trans_rules",JSON.stringify(prevRules));
    }

    transalte = () => {
        const hs = document.getElementById("hindi_sentence").value.split(" ");
        let as = hs.map((val) => {
            if(val in this.state.rules)
                return this.state.rules[val][0];
            return val;
        });
        this.setState({hs: hs.join(" "), as: as.join(" ")});
    }

    render() {
       if(this.state.rules!==null) {
           return(
               <div>
                <div className="text-center my-5">
                    <h1>Hindi - Awadhi Translation Rules</h1>
                    <a style={{cursor: "pointer", color: "#f51010"}} href="/">back to home</a>
                </div>
                <div className="row d-flex justify-content-center">
                    <div className="col-6">
                        <Form id="translate_form">
                            <Form.Label>Enter Hindi sentence</Form.Label>
                            <Form.Control id="hindi_sentence" placeholder="" defaultValue="तुम उसके लिए महान राजा के रूप में रहोगे और वह तुम्हारा अधिकृत वक्ता होगा।"/>
                        </Form>
                    </div>
                </div>
                <div className="mt-3 row d-flex justify-content-center">
                    <div className="col-6 text-center">
                        <Button onClick={() => {this.transalte()}}>translate</Button>
                    </div>
                </div>
                <div className="mt-3 row d-flex justify-content-center">
                    <div className="col-6 text-center">
                        {this.state.hs}
                    </div>
                </div>
                <div className="mt-3 row d-flex justify-content-center">
                    <div className="col-6 text-center">
                        {this.state.as}
                    </div>
                </div>
               </div>
           );
       }
       return (
        <div>
            <div className="text-center my-5">
                <h1>Hindi - Awadhi Translator</h1>
                <a style={{cursor: "pointer", color: "#f51010"}} href="/">back to home</a>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-8">
                    <Form>
                        <Form.Label>Enter JSON rule</Form.Label>
                        <Form.Control id="json_rule" placeholder="" defaultValue=""/>
                    </Form>
                </div>
            </div>
            <div className="mt-4 row d-flex justify-content-center">
                <div className="col-2 text-center">
                    <Button onClick={() => {this.addToRule()}}>Add</Button>
                </div>
                <div className="col-2 text-center">
                    <Button onClick={() => {this.setState({rules: JSON.parse(localStorage.getItem("trans_rules"))})}}className="btn-warning">Start Translation</Button>
                </div>
            </div>
        </div>
       )
    }
 }
 export default Translator;