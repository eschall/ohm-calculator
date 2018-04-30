import React, { Component } from 'react';
import axios from 'axios';
import Resistor from './resistor';
import ColorCodeTable from './color-code-table';


class Panel extends Component {

  constructor(props){
    super(props);

    this.state = {

      mode: '4-band',
      band1: 'black', band2: 'black', band3: 'black', multiplier: 'black', tolerance: 'brown',
      result: ''
    }

    this.onSelectionsChanged = this.onSelectionsChanged.bind(this);
    this.onClick = this.onClick.bind(this);
}

  render() {
    return (
      <div className="panel">

        <label><b>Resistor Color Code Calculator</b></label>

        <button className="btnPrimary" onClick={this.onClick}>{ 'Switch to ' + (this.state.mode === '4-band' ? '5 Band' : '4 Band') }</button>
        
        <Resistor mode={this.state.mode} band1={this.state.band1} band2={this.state.band2} band3={this.state.band3} multiplier={this.state.multiplier} tolerance={this.state.tolerance}/>
        
        <ColorCodeTable mode={this.state.mode} selectionsChanged={ this.onSelectionsChanged } />

        <h1>{ this.state.result }</h1>
        
      </div>
    );
  }

  onClick(){

    console.log("hello");
    this.setState({mode : this.state.mode === "4-band" ? "5-band" : "4-band"});
  }

  /**
   * Process the selected code and calculates the resistors ohm value and tolerance.
   * @param {*} name The name of the selected code.
   * @param {*} code The color of the selected code.
   */
  onSelectionsChanged(name, code){
        
    if(name === "Band 1"){
            
      this.setState({ band1 : code }, this.calculateResult);
    }
    else if(name === "Band 2"){
        
        this.setState({ band2 : code }, this.calculateResult);
    }
    else if(name === "Band 3"){
        
        this.setState({ band3 : code }, this.calculateResult);
    }
    else if(name === "Mul."){
        
        this.setState({ multiplier : code }, this.calculateResult);
    }
    else{

        this.setState({ tolerance : code }, this.calculateResult);
    }
  }

  /**
   * Makes a request to the server to retireve the resistors ohm value and tolerance based 
   * on the type of resistor and the selected codes.
   */
  calculateResult(){

    let params = '/';

    // Update the parameters for the service call.
    if(this.state.mode ==='4-band'){
      
      // Calculate a 4 band resistor.
      params += 'Get4band/' + this.state.band1 + '/' + this.state.band2 + '/' + this.state.multiplier + '/' + this.state.tolerance;
    }
    else{

      // Calculate a 5 band resistor.
      params += 'Get5band/' + this.state.band1 + '/' + this.state.band2 + '/' + this.state.band3 + '/' + this.state.multiplier + '/' + this.state.tolerance;
    }

    // Get the result for the color code combination. http://ohmcalculatorapi.azurewebsites.net/api/Calculator
    // axios.get(`http://localhost:15794/api/Calculator` + params).then(res => {
    axios.get(`http://ohmcalculatorapi.azurewebsites.net/api/Calculator` + params).then(res => {
      
        this.setState({ result : res.data });
    });
  }
}

export default Panel;