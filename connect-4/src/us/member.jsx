import './member.css'
import rojo from "./../assets/imgs/rojo.png";
import verde from "./../assets/imgs/verde.png";

export default function Member({name, description, image}) {
    return (
        <div className="member">
            <img src={image} alt={name} className="pic-profile"/>
            <h3>{name}</h3>
            <p className='description'>{description}</p>
        </div>
    )
}
