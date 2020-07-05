import React, { useEffect } from 'react';
import { map, filter, toPairs, prop, propOr, flatten } from 'ramda'
import { getMaterials } from './materials';
import { useSelector, useDispatch } from 'react-redux';
import { triggerMaterial } from './redux/materials';
import { loadState } from './redux/io';
import { compose } from 'redux';
import "./App.css"

const useMaterials = () => useSelector(prop("materials"))

const MaterialList = () => {
  const materials = useMaterials();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadState())
  },[dispatch])

  const getMaterial = name => propOr(false,name,materials);
  
  const sets = map(([name,group]) => {
    return <fieldset key={name}>
      <legend>{name}</legend>
      {
        group.map(type => {
          const value = name === "Extra" ? type : `${name} ${type}`
          const handleChange = () => {
            dispatch(triggerMaterial(value));
          }
          return <div key={value}>
            <input 
              id={value} 
              type="checkbox" 
              checked={getMaterial(value)}
              onChange={handleChange}
            />
            <label htmlFor={value}>{value}</label>
          </div>
        })
      }
    </fieldset>
  })(toPairs(getMaterials()))
  return <div className="container">
    {sets}
  </div>
}

const Missing = () => {
  const materials = useMaterials();
  const items = compose(
    map(material => <li>{material}</li>),
    map(prop(0)),
    filter(([name,flag]) => !flag),
    map(material => [material, propOr(false,material,materials)]),
    flatten,
    map(([name,group]) => {
      return group.map(type => name === "Extra" ? type : `${name} ${type}`)
    }),
    toPairs
  )(getMaterials());
  return <div>
    <h1>Missing Shit</h1>
    <ul>
      {items}
    </ul>
  </div>
}

function App() {
  return (
    <div>
      <h1>Kingdom Hearts 2 Final Mix Materials</h1>
      <div style={{ marginBottom: "16px" }}>
        For info on how to find materials go to <a href="https://kingdomhearts.fandom.com/wiki/List_of_Synthesis_Materials">KH2 Wiki</a>
      </div>
      <MaterialList />
      <Missing />
    </div>
  );
}

export default App;
