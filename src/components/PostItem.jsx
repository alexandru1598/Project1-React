import React from 'react';

function PostItem(props) {
    const {title, body} = props;

    return (
        <div>
            <p>{title}</p>
            <p>{body}</p>
        </div>
    );
}

export default PostItem;