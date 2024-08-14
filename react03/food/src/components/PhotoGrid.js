import Photo from "./Photo";

const PhotoGrid = (props) => {
    const photoArr1 = props.photoArr1;
    const photoArr2 = props.photoArr2;

    return(
        <div className="w3-main w3-content w3-padding" style={{maxWidth:"1200px",marginTop:"100px"}}>
            <div className="w3-row-padding w3-padding-16 w3-center" id="food">
                {
                    photoArr1.map(function(item, idx) {
                        return <Photo key={item.no} item={item}/>
                    })
                }
            </div>

            <div className="w3-row-padding w3-padding-16 w3-center">
                {
                    photoArr2.map(function(item, idx) {
                        return <Photo key={item.no} item={item}/>
                    })
                }
            </div>
        </div>
    );
}

export default PhotoGrid;