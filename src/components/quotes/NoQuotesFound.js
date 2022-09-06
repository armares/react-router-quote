import { NavLink } from 'react-router-dom';
import classes from './NoQuotesFound.module.css';

const NoQuotesFound = () => {
  return (
    <div className={classes.noquotes}>
      <p>No quotes found!</p>
      <NavLink className='btn' to='/new-quote'>
        Add a Quote
      </NavLink>
      {/* <a className='btn'>
        Add a Quote
      </a> */}
    </div>
  );
};

export default NoQuotesFound;
