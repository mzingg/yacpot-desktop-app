(function(exports) {

    var yacpot = exports.yacpot = {
        userId: null,
        userKey: null
    }

    yacpot.isAuthenticated = function() {
        return yacpot.userKey != null;
    }

    yacpot.authenticate = function(userEmail, userPassword) {
        // Derive a more suited key from the users email and password (we do not want to store the password in cleartext)
        var userKeySalt = userEmail + userPassword;
        var userKey = CryptoJS.PBKDF2(userPassword, userKeySalt, { keySize: 512/32, iterations: 1000 });

        // The authorization code is a HMAC control hash containing the userId and a timestamp encrypted
        // with the userKey (which is NOT transmitted)
        // The server is able to recreate the userKey from data in the database and validating the submitted
        // authCode by creating a HMAC by itself and comparing it with the transmitted one.
        // If they are identical the user is successfully authenticated and the userId and userKey is stored locally
        // to be reused for the communication with the server.
        var utcTimestamp = Math.round(new Date().valueOf() / 1000);
        var authCodeInput = userEmail + utcTimestamp;
        var authCode = CryptoJS.HmacSHA512(authCodeInput, userKey);

        var parameterObject = {
            userId: userEmail,
            timestamp: utcTimestamp,
            authCode: authCode.toString()
        }

        console.log(parameterObject);
    }

})(window);