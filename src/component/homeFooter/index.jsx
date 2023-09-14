import { ReactSVG } from "react-svg";
import facebook from "../../assets/facebook.svg"
import instagram from "../../assets/instagram.svg"
import twitter from "../../assets/twitter.svg"
import "./style.css"
const HomeFooter = () => {
    return <div className="footer-main">
        <div className="aboutdiv">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvB6jiJ5ET9r9JphceF1zUBii-U_whg8_rbg&usqp=CAU"></img>
            <div className="appname">Trickly</div></div>
        <div className="footer">
            <div className="footer-about">
                <div className="about">
                    About Us
                </div>
                <div className="about-content">
                    Sorem ipsum dolor amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                </div>
                <div className="sociallink">
                    <ReactSVG src={facebook}></ReactSVG>
                    <ReactSVG src={instagram}></ReactSVG>
                    <ReactSVG src={twitter}></ReactSVG>
                </div>
            </div>
            <div className="Quick">
                <div className="quicklink">Quick Links</div>
                <div className="recent">
                    <div>Latest New</div>
                    <div>Recipes</div>
                    <div>Our Products</div>
                    <div>Author</div>
                    <div>Recipe Details</div>
                </div>
            </div>
            <div className="Recipe">
                <div className="recent-recipes">Recent Recipes</div>
                <div className="recents">
                    <img src="https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg" style={{
                        height: "80px",
                        width: "80px"
                    }}></img>
                    <div>
                        <div className="burgers">Burgers</div>
                        <div className="burgers descriptions">
                            Sorem ipsum dolor amet consectetur adipiscing elit
                        </div>
                    </div>
                </div>
                <div className="recents">
                    <img src="https://www.acouplecooks.com/wp-content/uploads/2022/10/Margherita-Pizza-093.jpg" style={{
                        height: "80px",
                        width: "80px"
                    }}></img>
                    <div>
                        <div className="burgers">Pizza</div>
                        <div className="burgers descriptions">
                            Sorem ipsum dolor amet consectetur adipiscing elit
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
}
export default HomeFooter;