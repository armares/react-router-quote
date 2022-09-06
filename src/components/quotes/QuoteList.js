import { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = ({quotes}) => {
  const navigate=useNavigate();
  const location=useLocation();
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
  
  const queryParams=new URLSearchParams(location.search);
  const isSortingAscending=queryParams.get('sort')==='asc';
  const sortedQuotes=sortQuotes(quotes,isSortingAscending);
  const changeSortingHandler=()=>{
    navigate({
      pathname:rightLocationPath,
      search:'?sort='+(isSortingAscending ? 'desc' :'asc'),
    },{replace:false})
    // navigate( rightLocationPath+'?sort='+ (isSortingAscending ? 'desc' :'asc'),{replace:false});
  };
  return (
    <Fragment>
      <div className={classes.sorting} >
        <button onClick={changeSortingHandler}>Sort {isSortingAscending ? 'Descending' :'Ascending'}</button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
