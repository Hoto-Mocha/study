const BlogPosts = ( {blogArr} ) => {
    return(<div className="w3-third">
        <h3>BLOG POSTS</h3>
        <ul className="w3-ul w3-hoverable">
            {
                blogArr.map(function(item, idx) {
                    return(<li className="w3-padding-16">
                        <img src={item.img} className="w3-left w3-margin-right" style={{width:"50px"}}/>
                        <span className="w3-large">Lorem</span><br/>
                        <span>Sed mattis nunc</span>
                    </li>);
                })
            }
        </ul>
    </div>);
}

export default BlogPosts;