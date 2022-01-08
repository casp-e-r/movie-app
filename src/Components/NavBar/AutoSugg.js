import React, { useEffect, useState } from 'react'
import Autosuggest from 'react-autosuggest';
import  axios  from "../../axios";
import { API_KEY } from '../../constants/constants';
import { delay } from '../../helpers/helper';

function AutoSugg() {
    const [results, setResults] = useState([])
    const [state, setState] = useState({
        value: '',
        suggestions: []
      })
      async function fetch(value){
        try{
            await axios.get(`/search/multu?api_key=${API_KEY}&language=en-US&query=${value}&page=1&include_adult=false`).then(e => {  
                setResults(e.data)
            })}
        catch(e){console.log(e);}
        finally{
            await delay(500)
            // setLoading(false)
        }
    }
    
    useEffect(() => {
        
        state.value.length>2 && fetch(state.value)
    }, [state.value])
    const onSuggestionsClearRequested = () => {
        setState({
          suggestions: []
        });
      }
    
      const getSuggestionValue=()=>{
          results && results.map(e=>{
            return(e.id)
          })
      }
      function renderSuggestion(suggestion) {
        return (
          <span>{suggestion.name}</span>
        );
      }
      const onSuggestionsFetchRequested = ({ value }) => {
        setState({
          suggestions: fetch(state.value)
        });
      }
    
      const inputProps = {
        placeholder: 'Type a programming language',
        value:state.value,
        onChange: (e) => {
            setState({
              value: e.target.value
            });
          }
      };
    return (
        <div>
            <Autosuggest
                suggestions={results}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
      />
        </div>
    )
}

export default AutoSugg
