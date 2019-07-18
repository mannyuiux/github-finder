import React, { Component } from 'react'

class Search extends Component {
    state = {
        text: '',
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.props.searchUsers(this.state.text)
    }
    onChange = (e) => this.setState({ [e.target.name]: e.target.value });
    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.onSubmit}>
                    <input type="text" name="text" placeholder="Search users..." value={this.state.text} onChange={this.onChange} />
                    <input type="submit" className="btn btn-dark btn-block" />
                </form>
            </React.Fragment>
        )
    }
}

export default Search
