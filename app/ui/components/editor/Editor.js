import React, { Component, PropTypes } from 'react';
import createAsciidoctor from 'asciidoctor.js';
const asciidoctor = createAsciidoctor();
const processor = asciidoctor.Asciidoctor(true);

import style from './Editor.module.styl';

export default class Editor extends Component {
  static propTypes = {};

  constructor(...args) {
    super(...args);
    this.state = {previewHtml: null};
  }

  render() {
    const {previewHtml} = this.state;
    var text = `## Title  
Hello.  

* list
* list 
* list `;
    return (
      <div>
        <textarea className={style.editor} ref="text" defaultValue={text}/> 
        <button onClick={() => this.preview()}>Preview</button>
        <hr/>
        <div dangerouslySetInnerHTML={this.getPreviewHtml()}></div>
      </div>
    );
  }

  getPreviewHtml() {
    return {__html: this.state.previewHtml};
  }

  preview() {
    //var options = opal.hash({doctype: 'inline', attributes: ['showtitle']}); 
    var html = processor.$convert(this.refs.text.value);
    this.setState({previewHtml: html});
    console.log(html);
  }
}
