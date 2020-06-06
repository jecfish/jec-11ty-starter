const outdent = require('outdent')({ newline: ' ' });
module.exports = (id) => {
    return outdent`
    <div class="video-wrapper">
        <iframe src="https://www.youtube.com/embed/${id}"
            frameborder="0" allowfullscreen       
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture">
        </iframe>
    </div>`;
};
