import React from 'react';
import PropTypes from 'prop-types'

const Useritem = ({ user: { login, avatar_url, html_url }}) => {
    return (
        <div className="card text-center">
            <img src={avatar_url} alt="" style={{ width: "60px" }} />
            <h4>{login}</h4>
            <a href={html_url} className="btn btn-dark btn-sm">More</a>
        </div>
    )
}
Useritem.porpTypes = {
    user: PropTypes.object.isRequired,
}
export default Useritem
