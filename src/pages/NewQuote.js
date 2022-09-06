import React, { Fragment, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import QuoteForm from '../components/quotes/QuoteForm';
import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/api';


const NewQuote = () => {
  const navigate=useNavigate();
  const {sendRequest,status,data,error}=useHttp(addQuote);
  useEffect(()=>{
    if (status==='completed') {
      navigate('/quotes');
    }
  },[status,navigate]);
  const addQuoteHandler=(quoteData)=>{
    // console.log(quoteData);
    sendRequest(quoteData);
    // navigate('/quotes');
  }
  return (
    <Fragment>
      {status && <p>Loading</p>}
      <QuoteForm isLoading={status==='pending'} onAddQuote={addQuoteHandler} />
    </Fragment>
  )
}

export default NewQuote