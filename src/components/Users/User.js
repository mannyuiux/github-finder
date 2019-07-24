import React, { Fragment, useEffect } from 'react';
import Spinner from '../layouts/Spinner';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Repos from '../repos/Repos';

const User = ({user, match, getUser, getUserRepos, repos, loading}) => {
    useEffect(() => {
        getUser(match.params.login);
        getUserRepos(match.params.login);
        //eslint-disable-next-line
    }, []);
    const {
        name,
        company,
        avatar_url,
        location,
        bio,
        blog,
        login,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable
    } = user;
    if (loading) return <Spinner />
    return (
        <Fragment>
            <Link to="/" className="btn">Back to search</Link>
            Hireable: {' '}
            {hireable ? (<i className='fas fa-check text-success'></i>) : (<i className='fas fa-times-circle text-danger'></i>)}
            <div className="card grid-2">
                <div className="all-center">
                    <img src={avatar_url} className="round-img" alt="" style={{ width: '150px' }} />
                    <h1>{name}</h1>
                    <p>Location: {location}</p>
                </div>
                <div>
                    {bio && <Fragment>
                        <h3>Bio</h3>
                        <p>{bio}</p>
                        <a href={html_url} className="btn btn-dark my-1" target="_blank" rel="noopener noreferrer">Visit Github</a>
                    </Fragment>}
                    <ul>
                        <li>{login && <Fragment>
                            <strong>Username: </strong> {login}
                        </Fragment>}</li>
                        <li>{company && <Fragment>
                            <strong>Company: </strong> {company}
                        </Fragment>}</li>
                        <li>{blog && <Fragment>
                            <strong>Website: </strong> <a href={blog} target="_blank" rel="noopener noreferrer">{blog}</a>
                        </Fragment>}</li>
                    </ul>
                </div>
            </div>
            <div className="card text-center">
                <div className="badge badge-primary">Followers: {followers}</div>
                <div className="badge badge-success">Folowing: {following}</div>
                <div className="badge badge-light">Public Repos: {public_repos}</div>
                <div className="badge badge-dark">Public Gists: {public_gists}</div>
            </div>
            <Repos repos={repos} />
        </Fragment>
    )
}
User.propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired,
}
export default User
