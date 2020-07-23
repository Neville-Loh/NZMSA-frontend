import React, { useState, useEffect } from 'react';
import MediaCard from '../MediaCardComponent/MediaCard';
import { Grid } from '@material-ui/core';
import './MediaGrid.css';
import { IUserInput } from '../../Common/Interfaces';

interface IState {
    links: any[];
    data: any[];
}
interface IMediaGridProps {
    SearchQuery: (string | null);
    StartDate: (Date | null);
    EndDate: (Date | null);
}
function MediaGrid(props: IMediaGridProps) {
    const [ItemArray, setItemArray] = useState<IState[]>([{ links: [], data: [] }]);

    // Hook to api
    //Use Effect takes 1. A functino and a dependency array.
    // Whenever element of dependency array gets updated, the function is re run
    useEffect(() => {
        fetch('https://images-api.nasa.gov/search?media_type=image&q=' + props.SearchQuery + '&year_start=' + props.StartDate?.getFullYear() + '&year_end=' + props.EndDate?.getFullYear())
            .then(response => response.json())
            .then(response => {
                setItemArray(response.collection.items)
            })
            .catch(() => console.log("it didn't work")
            );

    }, [props.SearchQuery, props.EndDate, props.StartDate]);


    // Cards array that contain JSX elelemnt
    var Cards: JSX.Element[] = [];
    ItemArray.forEach((el: IState, i: Number) => {  //forEach(my_func(ele,index))
        if (!el || !el.links[0] || !el.data) {
            return;
        }
        // Make a new card if element is not empty
        Cards.push(
            <Grid key={"card_"+i} item sm={6} md={4} lg={3} className="MediaGridCard">
                <MediaCard ImageUrl={el['links'][0]['href']} Description={el["data"][0]['description']} />
            </Grid>)
    })

    // Return a html reneder of the card
    return (
        <div>
            <Grid container spacing={3} className="MediaGridContainer">
                {Cards}
            </Grid>
        </div>
    )
}

export default MediaGrid