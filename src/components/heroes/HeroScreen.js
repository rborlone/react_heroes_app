import React, { useMemo } from 'react'
import { useParams, Redirect  } from 'react-router-dom'
import { getHeroById } from '../../selectors/getHeroById';

// import batman from '../../assets/heroes/dc-batman.jpg' recurso estatico
import { heroImages } from '../../helpers/heroImages'



export const HeroScreen = ({history}) => {

   

    const {heroeId} = useParams();

    const hero = useMemo(() => getHeroById(heroeId), [heroeId]);
    
    if (!hero){
        return <Redirect to="/" />;
    }

    const handleReturn = () => {
        if (history.length <=2)
            history.push("/");
        else
            history.goBack();
    }
    
     const {id, superhero, publisher, alter_ego, first_appearance, characters} = hero;
     console.log(hero);
     console.log(heroImages(`./${heroeId}.jpg`).default)
    return (
        <div className="row mt-5">
            <div className="col-4">
                <img
                 //src={`../assets/heroes/${heroeId}.jpg`} //desde public/assets
                // src={batman} //desde public/assets importacion recurso estatitco
                src={ heroImages(`./${heroeId}.jpg`).default } //desde context
                alt={superhero}
                className="img-thumbnail animate__animated animate__fadeInLeft"></img>
            </div>

            <div className="col-8 animate__animated animate__fadeIn">
                <h3>{superhero}</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><b>Alter ego: {alter_ego}</b></li>
                    <li className="list-group-item"><b>Publisher: {publisher}</b></li>
                    <li className="list-group-item"><b>First appearance: {first_appearance}</b></li>
                </ul>     

                <h5>Characters</h5>
                <p>{characters}</p>               

                <button 
                className="btn btn-outline-info"
                onClick={handleReturn}
                >Return</button>
            </div>
        </div>

        
    )
}
