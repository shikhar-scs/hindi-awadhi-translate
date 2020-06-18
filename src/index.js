import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

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
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  prepare = (hindi_phrase, awadhi_phrase) => {
    if(!hindi_phrase || !awadhi_phrase)
      return;
    hindi_phrase = hindi_phrase.split(" ").map((e,id) => {
      return {
        id: `hindi-phrase-${id}`,
        content: e
      }
    });

    awadhi_phrase = awadhi_phrase.split(" ").map((e,id) => {
      return {
        id: `awadhi-phrase-${id}`,
        content: e
      }
    });

    this.setState({
      itemsLeft: hindi_phrase,
      itemsRight: awadhi_phrase
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="text-center my-5">
            <h1>Hindi - Awadhi Translate</h1>
        </div>
        <div className="row">
          <div className="col-5">
            <Form>
              <Form.Group>
                  <Form.Control id="hindi_phrase" type="email" placeholder="Enter Hindi sentence/phrase" />
              </Form.Group>
            </Form>
          </div>
          <div className="col-5">
            <Form>
              <Form.Group>
                <Form.Control id="awadhi_phrase" type="email" placeholder="Enter Awadhi sentence/phrase" />
              </Form.Group>
            </Form>
          </div>
          <div className="col-2">
            <Button onClick={()=>{this.prepare(document.getElementById("hindi_phrase").value, document.getElementById("awadhi_phrase").value)}}>Generate</Button>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
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
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            {item.content}
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
          <div className="col-6">
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
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            {item.content}
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
      </div>
    );
  }
}

// Put the thing into the DOM!
ReactDOM.render(<App/>, document.getElementById("root"));
