import React, { Fragment } from 'react';
import { spinnerImg } from './spinner.gif';

const Spinner = () => <Fragment>
    <img src={spinnerImg} alt="" style={{ width: '200px', height: '200px', display: 'block', margin: 'auto' }} />
</Fragment>

export default Spinner
