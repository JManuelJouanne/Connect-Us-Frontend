import './cell.css'


const Cell = ({ color, onClick }) => {
  return <div className="tile" style={{ backgroundColor: color }} onClick={onClick}></div>;
};

export default Cell;
