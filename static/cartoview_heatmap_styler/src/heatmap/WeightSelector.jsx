import { NextButton, PreviousButton, Tip } from '../components/CommonComponents'
import React, { Component } from 'react'

import WMSClient from "../gs-client/WMSClient.jsx"
import classNames from 'classnames'
export class AttributeSelector extends Component {
    state = {
        attrs: [],
        selectedIndex: this.props.index ? this.props.index : -1,
        selectedAttribute: this.props.attribute ? this.props.attribute : ''
    }
    componentDidMount() {
        const { layerName } = this.props.config
        WMSClient.getLayerAttributes( layerName ).then( ( attrs ) => {
            this.setState( { attrs } )
        } )
    }
    selectAttribute = ( a, i ) => {
        this.setState( {
            selectedAttribute: a.attribute,
            selectedIndex: i
        }, () => {
            this.props.selectAttribute( a )
        } )
    }
    render() {
        const { attrs } = this.state
        if ( attrs.length == 0 ) {
            return <div className="loading"></div>
        }
        const { onComplete, filter } = this.props
        const isGeom = ( a ) => {
            return a.attribute_type.toLowerCase().indexOf( "gml:" ) ==
                0
        }
        return (
            <div>
      <ul className="list-group">
        {attrs.map((a, i) => isGeom(a) || !filter(a)
          ? null
          : <li onClick={()=>this.selectAttribute(a,i)} className={classNames("list-group-item li-attribute", { "li-attribute-selected": this.state.selectedIndex == i })}>
            {a.attribute_label || a.attribute}
            ({a.attribute_type})
            </li>)}
      </ul>
      <Tip text={this.props.tip} />
    </div>
        )
    }
}
class WeightSelector extends Component {
    state = {
        showAttributes: false,
        selectedAttribute: null
    }
    componentDidMount() {}
    renderHeader() {
        return (
            <div className="row">
        <div className="col-xs-5 col-md-4">
          <h4>{'Select Weight'}</h4>
        </div>
        <div className="col-xs-7 col-md-8">
          <NextButton disabled={this.state.selectedIndex ? true : false} clickAction={() => this.props.onComplete(this.state.selectedAttribute)} />
          <PreviousButton clickAction={() => this.props.onPrevious()} />
        </div>
      </div>
        )
    }
    render() {
        const { config, onComplete } = this.props
        const attrFilter = ( a ) => [ "xsd:int", "xsd:double", "xsd:long" ]
            .indexOf( a.attribute_type.toLowerCase() ) != -1
        return (
            <div>
        {this.renderHeader()}
        <br></br>

        <div className="panel panel-default">
          <div className="panel-body">
            <p>
              {"Option 1: Set weight by distance"}
              <button className="btn btn-primary pull-right" onMouseDown={() => onComplete(null)}>
                {"Weight by distance"}
              </button>
            </p>
          </div>
        </div>
        <br></br>

        <div className="panel panel-default">
          <div className="panel-body">
            <p>
              {"Option 2: Set Based on Attribute"}
              <button className="btn btn-primary pull-right" onMouseDown={() => this.setState({ showAttributes: true })}>
                {"Select Attribute"}
              </button>
            </p>
          </div>
        </div>
        {this.state.showAttributes && <AttributeSelector selectAttribute={(attribute) => this.setState({ selectedAttribute: attribute })} {...this.props} filter={attrFilter} />}
      </div>
        )
    }
}
export default WeightSelector
