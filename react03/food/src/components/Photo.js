const Photo = ( {item} ) => {
    console.log(item);
    return (
        <div className="w3-quarter">
            <img src={item.img} alt="Sandwich" style={{width:"100%"}}/>
            <h3>The Perfect Sandwich, A Real NYC Classic</h3>
            <p>Just some random text, lorem ipsum text praesent tincidunt ipsum lipsum.</p>
        </div>
    );
}

export default Photo;