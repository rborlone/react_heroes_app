import React, { useMemo } from 'react'
import queryString from 'query-string';

import { useLocation } from 'react-router-dom';
import { heroes } from '../../data/heroes'
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../heroes/HeroCard';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({history}) => {

    const location = useLocation();

    const { q = '' } = queryString.parse(location.search);

    const [{find}, handleInputChange] = useForm({
        find: q
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        history.push(`?q=${find}`);

        console.log(find);
    }
    const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

    return (
        <div>
            <h1>Search Screen</h1>
            <hr />
            <div className="row">
                <div className="col-5">
                    <h4>search form</h4>
                    <hr/>

                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text"
                            name="find"
                            placeholder="Find"
                            className="form-control" 
                            autoComplete="off"
                            onChange={handleInputChange}
                            value={find}
                            />
                        
                        <button
                            type="submit"
                            className="btn m-1 btn-block btn-outline-primary"
                        >
                            Search...
                        </button>
                    </form>

                </div>
                <div className="col-7">
                    <h4>Results</h4>
                    <hr/>

                    {
                        (q==='') 
                            &&
                            <div className="alert alert-info">
                                Search a Hero
                            </div>
                    }
                    {
                        (q!=='' && heroesFiltered.length === 0) 
                            &&
                            <div className="alert alert-danger">
                                there is no a hero with { q }
                            </div>
                    }       
                    {
                        heroesFiltered.map(hero => 
                            <HeroCard key={hero.id} {...hero} />
                        )
                    }

                </div>
            </div>
        </div>
    )
}
