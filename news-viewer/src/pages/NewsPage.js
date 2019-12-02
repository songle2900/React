import React from 'react';
import Categories from '../components/Categories';
import NewsList from '../components/NewsList'

const NewsPage = ({ match }) => {
    // if categories didnt selected, the default value is all
    const category = match.params.category || 'all';

    return (
        <>
            <Categories />
            <NewsList category={category} />
        </>
    )
}

export default NewsPage;