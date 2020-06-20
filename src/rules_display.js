import React from 'react';
// import ReactDOM from 'react-dom';

class RulesDisplay extends React.Component {
    constructor(props) {
        super(props);
     
        this.state = {
          data: null,
        };
    }

    componentDidMount() {
        const data = localStorage.getItem("trans_map");
        if(data!==null) {
            this.setState({data: JSON.parse(data)})
        }
    }

    render() {
       if(this.state.data!==null) {
           return(
               <div>
                <div className="text-center my-5">
                    <h1>Hindi - Awadhi Translation Rules</h1>
                    <a style={{cursor: "pointer", color: "#f51010"}} href="/">back to home</a>
                </div>
                <ul>
                    {
                        Object.keys(this.state.data).map((val, idx) => {
                        return(<li>{val} -> {Array.from(this.state.data[val]).join(", ")}</li>);
                        })
                    }
                </ul>
               </div>
           );
       }
       return (
        <div className="text-center my-5">
            <h1>Hindi - Awadhi Translation Rules</h1>
            <a style={{cursor: "pointer", color: "#f51010"}} href="/">back to home</a>
        </div>
       )
    }
 }
 export default RulesDisplay;