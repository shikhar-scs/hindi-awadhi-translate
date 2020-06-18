import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import RulesDisplay from "./rules_display.js"
import fs from "fs";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 1,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "white",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "#192746" : "#192746",
  padding: grid,
  width: 250
});

const writeToFile = (jsonContent) => {
  // fs.writeFileSync("../public/translation_rules.json", jsonContent);
  // console.log(jsonContent);
  const fileData = JSON.stringify(jsonContent);
  const blob = new Blob([fileData], {type: "text/plain"});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = 'translation_rules.json';
  link.href = url;
  link.click();
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRules: false,
      itemsLeft: [{id: 'empty - 0', content: "empty"}],
      itemsRight: [{id: 'empty - 0', content: "empty"}]
    };
    this.onDragEndLeft = this.onDragEndLeft.bind(this);
    this.onDragEndRight = this.onDragEndRight.bind(this);
  }

  onDragEndLeft(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.itemsLeft,
      result.source.index,
      result.destination.index
    );

    this.setState({
      itemsLeft: items
    });
  }

  onDragEndRight(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.itemsRight,
      result.source.index,
      result.destination.index
    );

    this.setState({
      itemsRight: items
    });
  }

  saveToFile = () => {
    const hindiKeys = this.state.itemsLeft.map(val => val.content);
    const awadhiVals = this.state.itemsRight.map(val => val.content);

    if(hindiKeys.length!==awadhiVals.length) {
      alert("mappings are not one to one");
      return;
    }

    fetch('/translation_rules.json')
          .then(response => response.json())
          .then(data => {
            hindiKeys.forEach((hindiKey,idx) => {
              if(hindiKey in data) {
                data[hindiKey] = Array.from(new Set(data[hindiKey]).add(awadhiVals[idx]));
              } else {
                data[hindiKey] = [awadhiVals[idx]];
              }
            })
            writeToFile(data);
          });
  }

  prepare = (hindi_phrase, awadhi_phrase) => {
    if(!hindi_phrase || !awadhi_phrase)
      return;
    hindi_phrase = hindi_phrase.split(" ").map((e,id) => {
      return {
        id: `hindi-phrase-${id}`,
        content: e,
        className: 'hindi-phrase',
        idNo: id
      }
    });

    awadhi_phrase = awadhi_phrase.split(" ").map((e,id) => {
      return {
        id: `awadhi-phrase-${id}`,
        content: e,
        className: 'awadhi-phrase',
        idNo: id
      }
    });

    this.setState({
      itemsLeft: hindi_phrase,
      itemsRight: awadhi_phrase
    });
  }

  merge = (e) => {
    try {
        let lang = e.target.id.split("_")[0]
        let left = Number(document.getElementById(`${lang}_phrase_merge_left`).value) - 1;
        let right = Number(document.getElementById(`${lang}_phrase_merge_right`).value) -1 ;
        let e1 = document.getElementById(`${lang}-phrase-${left}`);
        let e2 = document.getElementById(`${lang}-phrase-${right}`);
        e1.innerText = e1.innerText + " " + e2.innerText.split(" ")[1]
        e2.remove()
    }
    catch(e)
        { console.error(e); }
  }


  render() {
    if(this.state.showRules) {
      return <RulesDisplay/>;
    }
    return (
      <div className="container-fluid">
        <div className="text-center my-5">
            <h1>Hindi - Awadhi Translate</h1>
            <a onClick={()=>{this.setState({showRules: true})}}>show rules</a>
        </div>
        <div className="row">
          <div className="col-5 offset-1 justify-content-end">
            <Form>
              <Form.Group>
                  <Form.Control id="hindi_phrase" placeholder="Enter Hindi sentence/phrase" defaultValue="4. परमेश्वर ने उजियाले को देखा और वह जान गया कि यह अच्छा है। तब परमेश्वर ने उजियाले को अंधियारे से अलग किया।"/>
              </Form.Group>
            </Form>
          </div>
          <div className="col-5">
            <Form>
              <Form.Group>
                <Form.Control id="awadhi_phrase" placeholder="Enter Awadhi sentence/phrase" defaultValue="4. परमेश्वर ने उजियाले को देखा और वह जान गया कि यह अच्छा है। तब परमेश्वर ने उजियाले को अंधियारे से अलग किया।"/>
              </Form.Group>
            </Form>
          </div>
                  </div>

          <div className="row d-flex justify-content-center mb-3">
              <div className="col-3 justify-content-center">
                <Button type="button" className="btn btn-block " onClick={()=>{this.prepare(document.getElementById("hindi_phrase").value, document.getElementById("awadhi_phrase").value)}}>Generate</Button>
              </div>
          </div>
        <div className="row d-flex justify-content-center">
          <div className=" col-2">
            <Form>
              <Form.Group>
                  <Form.Control id="hindi_phrase_merge_left" placeholder="Enter Index of left word" />
              </Form.Group>
            </Form>
          </div>
          <div className="col-2">
            <Form>
              <Form.Group>
                <Form.Control id="hindi_phrase_merge_right" placeholder="Enter index of right word" />
              </Form.Group>
            </Form>
          </div>
          <div className="col-1 justify-content-center ">
            <Button className="btn-block" id="hindi_merge" onClick={this.merge}>Merge</Button>
          </div>


          <div className="col-2">
            <Form>
              <Form.Group>
                  <Form.Control id="awadhi_phrase_merge_left" placeholder="Enter Index of left word" />
              </Form.Group>
            </Form>
          </div>
          <div className="col-2">
            <Form>
              <Form.Group>
                <Form.Control id="awadhi_phrase_merge_right" placeholder="Enter index of right word" />
              </Form.Group>
            </Form>
          </div>

          <div className="col-1">
            <Button className="btn-block  " id="awadhi_merge" onClick={this.merge}>Merge</Button>
          </div>
        </div>
        <div className="row d-flex ">
          <div className="col-6 d-flex justify-content-end">
            <DragDropContext onDragEnd={this.onDragEndLeft}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {this.state.itemsLeft.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            className={item.className}
                            id={item.id}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                           {item.idNo +1}.       {item.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
          <div className="col-6 d-flex justify-content-left">
            <DragDropContext onDragEnd={this.onDragEndRight}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {this.state.itemsRight.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            className={item.className}
                            id={item.id}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            {item.idNo +1}.    {item.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
        <Button className="btn-success" onClick={()=>{this.saveToFile()}}>Save</Button>
      </div>
    );
  }
}

// Put the thing into the DOM!
ReactDOM.render(<App/>, document.getElementById("root"));
