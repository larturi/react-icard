import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import { map } from 'lodash';

import './ListCategories.scss';

export const ListCategories = (props) => {

    const { categories } = props;

    const location = useLocation();
    const history = useHistory();

    const goToCategory = (categoryId) => {
        history.push(`${location.pathname}/${categoryId}`);
    }

    return (
        <div className="list-categories-client">
            {map(categories, (category) => (
                <div 
                    key={category.id} 
                    className="list-categories-client__category" 
                    onClick={() => goToCategory(category.id)}
                >
                    <Image src={category.image} size="small"/>
                    <span>{category.title}</span>
                </div>
            ))}
        </div>
    )
}
