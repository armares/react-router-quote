import React, { Fragment, useEffect, useState } from 'react'
import {  NavLink, useParams } from 'react-router-dom'
import { Routes, useLocation } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';


const QuoteDetail = () => {
    const location = useLocation();
    const [rightLocationPath,setRightLocationPath]=useState(location.pathname);
    useEffect(()=>{
      const locationPathLength=rightLocationPath.length;
      const containsSlashLocationPath=rightLocationPath.charAt(locationPathLength-1)==='/';
      
      if (containsSlashLocationPath) {
        setRightLocationPath((state)=>{
          return state.slice(0,locationPathLength-1);
        })
      }
    },[rightLocationPath]);
    const params = useParams();
    const {sendRequest,status,data:quote,error}=useHttp(getSingleQuote,true);
    // const quote=DUMMY_QUOTES.find(quote=>quote.id===params.quoteId);
    let high=<p>No quote found!</p>;
    useEffect(()=>{
      sendRequest(params.quoteId)
    },[sendRequest,params.quoteId]);
    if (quote) {
      high=(
      <Fragment>
        <HighlightedQuote text={quote.text} author={quote.author} />
        <Routes>
          <Route path='/' element={(
            <div className='centered'>
              <NavLink className='btn--flat' to={`${rightLocationPath}/comments`}>Load Comments</NavLink>
            </div>
          )} />
        </Routes>
        
        <Routes>
              <Route path='/comments' element={<Comments/>} />
        </Routes>
      </Fragment>
      );
    }
    if (status==='pending') {
      high=(
        <div className='centered'>
          <LoadingSpinner/>
        </div>
      );
    }
    if (status==='error') {
      high=(
        <p className='centered focused'>{error}</p>
      );
    }
  return (
    <Fragment>
        {high}
    </Fragment>
  )
}

export default QuoteDetail