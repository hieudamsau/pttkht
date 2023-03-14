function image_response(data) {
    return data.split(';').map((url, i) => {
        return {
            id: i + 1,
            url: encodeURI(url),
        }
    });
}
function detail_response(data) {
    return data.split(';').map((url, i) => {
        return {
            id: i + 1,
            url: url,
        }
    });
}

module.exports = { image_response , detail_response};