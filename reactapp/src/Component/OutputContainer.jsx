import React, {Component} from 'react';

class OutputContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      outputState: 'Your inclusified text will appear here!',
      highlightWords: []
    }
  }

  componentWillReceiveProps(nextProps) {
    this.doAjaxThing(nextProps.outputText, this);
  }

  doAjaxThing(text, scope) {
    var data = JSON.stringify({
      "text": text
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        var highlightwords = []
        var replacements = JSON.parse(this.responseText)[0].replacements
        for(var key in replacements){
          highlightwords.push(JSON.parse(this.responseText)[0].replacements[key]);
        }
        scope.setState({
          outputState: JSON.parse(this.responseText)[0].replacement_string,
          highlightWords : highlightwords
        });

        return;
      }
    });

    xhr.open("POST", "http://cors-anywhere.herokuapp.com/6048d1c6.ngrok.io/alex-text-replace");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "d8b72bb2-d5b1-fcce-79fc-f4f787707ed0");

    xhr.send(data);
  }

  copyToClipboard() {
    const textField = document.getElementById('textToSave');
    textField.select();
    document.execCommand('copy');
    alert("You have copied the text to clipboard!")
  }

  render() {
    return (
      <span className="Output-container" style={
        {
          "float": "left",
          "flex-grow": "1",
          "flex-basis": "0",
          "padding-top": "20px"
        }}>
          <h3>Output</h3>
        <textarea
          id="textToSave"
          onClick={this.copyToClipboard}
          style={{"width": "90%", "height": "200px", "background-color":"#f6f6f6"}}
          value={this.state.outputState}
          readOnly
        />
        <br />
        <br />
        <p>Click the text area above to copy!</p>
      </span>
    );
  }
}

export {OutputContainer};
