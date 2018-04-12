import { NextButton, PreviousButton } from '../components/CommonComponents'

import ColorWithOpacity from '../components/Symbolizer/ColorWithOpacity.jsx'
import { Component } from 'react'
import React from 'react'
import StyleWriter from './StyleWriter.jsx'

export default class HeatmapConfigForm extends Component {
    onComplete = () => {
        let { config, styleObj, onChange } = this.props
        this.props.onComplete( StyleWriter.write( config, styleObj ) );
    }
    renderHeader() {
        let { config, styleObj, onChange } = this.props
        return (
            <div className="row">
        <div className="col-xs-5 col-md-4">
          <h4>{'Heatmap Parameters '}</h4>
        </div>
        <div className="col-xs-7 col-md-8">
          <NextButton message={"Save"} disabled={!config.pixelsPerCell || !config.radius} clickAction={() => this.onComplete()} />
          <PreviousButton clickAction={() => this.props.onPrevious()} />
        </div>
      </div>
        )
    }
    render() {
        var { config, styleObj, onChange } = this.props
        const onComplete = () => {
            this.props.onComplete( StyleWriter.write( config, styleObj ) )
        }
        return (
            <div>
        {this.renderHeader()}
        <div className="form-group">
          <label>{"Radius"}</label>
          <br></br>
          <input type="number" className="form-control" id="radius" value={config.radius} 
          onChange={(e)=> {
            if(e.target.value.length>4){
              e.target.value= config.radius
          }
            onChange({
            radius: parseInt(e.target.value)
          })}}
          
          />
        </div>
        <br></br>

        <div className="form-group">
          <label htmlFor={"pixelsPerCell"}>{"Pixels Per Cell"}</label>
          <input type="number" className="form-control" id="pixelsPerCell" value={config.pixelsPerCell} onChange={e => onChange({
            pixelsPerCell: parseInt(e.target.value)
          })} />
        </div>
        <br></br>

        <ColorWithOpacity symbolizer={config} property={"start"} onChange={(config) => onChange(config)} />
        <ColorWithOpacity symbolizer={config} property={"end"} onChange={(config) => onChange(config)} />
      </div>
        )
    }
}
