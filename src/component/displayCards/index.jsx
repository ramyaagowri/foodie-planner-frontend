import { ReactSVG } from "react-svg";
import clock from "../../assets/clock.svg"
import knife from "../../assets/knife.svg"
import { useState } from "react";
const DisplayCards = ({ recipes }) => {

    return <div className="grid-container">
        {recipes.map((recipes) => {
            const recipeDetailLink = `/details/${recipes.id}`;
            return <div className="grid" key={recipes.id}>
                <div className="imgdiv">
                    <a href={recipeDetailLink}><div className="img" style={{ backgroundImage: `url(${recipes.image})` }} >
                    </div></a>
                </div>
                <div className="expert">
                    <div className="svg">
                        <ReactSVG src={clock} />
                        <div>{recipes.timeToMake} Minutes</div>
                    </div>
                    <div className="svg">
                        <ReactSVG src={knife} style={{
                            height: "20px",
                            width: "20px"
                        }} />
                        <div>{recipes.level}</div>
                    </div>
                </div>
                {/* {console.log(recipe.recipesName)} */}
                <div className="content">
                    <div className="content-heading"><a href={recipeDetailLink}><strong>{recipes.recipeName}</strong></a></div>
                    <div className="content-section">{recipes.description}</div>
                    <a href={recipeDetailLink}><div className="content-footer"><strong>Read More</strong></div></a>
                </div>
            </div>
        })}
    </div>
}

export default DisplayCards;