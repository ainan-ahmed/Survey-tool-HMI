import React from 'react';
import Spinner from './spinner';
class Spinner extends Component {
    state = {  }
    render() { 
        return (
          <Spinner
            animation="border"
            variant="primary"
            role="status"
            size="xl"
            className="justify-content-center"
          >
            <span className="sr-only">Loading...</span>
          </Spinner>
        );
    }
}
 
export default Spinner;