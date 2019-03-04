import React, {Component, useState} from 'react'
import {Subscription, Query} from 'react-apollo'
import gql from 'graphql-tag';


const Feed = props => {
    
    const obj = {}

    return (
        // <Subscription
        // subscription={gql`
        // subscription feed{
        //     id
        //     description
        // }`}
        // >
        //  {result => console.log(result) }

        // </Subscription>
        <Query
        query = {gql`
        query{
        feed{
            id
            description
        }}`

        }
        >
        {({ subscribeToMore, result }) => {
            console.log(result)
            return <p>Test</p>}
    }
        </Query>
    )
}
export default Feed;