let generateCode = (length, obj) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    let id = obj.id.toString();
    while (id.length < 7) {
        id = '0' + id;
    }
    return result + id;
};

let generateNumber = (length) => {
    var result = '';
    var characters = '012345678';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    console.log(result)
    
    return result;
};

let generateCodeTransactionId = (length, obj) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    let id = obj.user_id.toString();
    while (id.length < 7) {
        id = '0' + id;
    }
    return result + id;
};

module.exports = { generateNumber ,generateCode, generateCodeTransactionId };