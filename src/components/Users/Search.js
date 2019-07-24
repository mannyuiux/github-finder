import React, {useState, useContext} from 'react';
import PropTypes from 'prop-types';
import GithubContext from '../context/github/githubContext';
const Search = ({setAlert, clearUsers, showClear}) => {
    const githubContext = useContext(GithubContext)
    const [text, setText] = useState('');
    const onSubmit = (e) => {
        e.preventDefault();
        if(text === ''){
            setAlert('Please enter something', 'light');
        }
        else{
            githubContext.searchUsers(text);
            setText('');
        }
    }
    const onChange = (e) => setText(e.target.value );
    
        return (
            <React.Fragment>
                <form onSubmit={onSubmit}>
                    <input type="text" name="text" placeholder="Search users..." value={text} onChange={onChange} />
                    <input type="submit" className="btn btn-dark btn-block" />
                </form>
                {showClear &&
                    <button className="btn btn-block btn-light" onClick={clearUsers}>Clear</button>
                }
            </React.Fragment>
        )
}
Search.propTypes = {
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
}
export default Search
