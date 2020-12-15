import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Grid, Segment} from 'semantic-ui-react'


class RoomsContainer extends Component {
    render(){
        console.log(this.props,"room cont")
    return(

<div>
           
                <Grid centered fluid style={{margin: '5%'}}>
                <Segment style={{ overflow: 'auto', maxHeight: '75vh' }}>
                        <Grid.Column>
                        {

                            
                            // this.props.notes.map(note => {
                            //     return <Room 
                            //     history={this.props.history}
                            //     key={note.id}
                            //     {...note}
                            //     />
                            // })
                            
                        }
                        </Grid.Column>
                    </Segment>
                </Grid>
            
</div>
    )
}
}

const mapStateToProps = (storeState) => {
return{
    rooms: storeState.rooms
    }
}
 
export default connect(mapStateToProps, null)(RoomsContainer);