module.exports = {

    resultSet: function (queryResults) {
        if (queryResults && Array.isArray(queryResults.docs) && queryResults.docs.length > 0) {
            var documents = queryResults.docs;
            if (documents && documents.length > 0) {
                return documents;
            }

        }
        return null;
    },

    resultInsertionMetaSet: function(queryResults){
        if(queryResults && Array.isArray(queryResults) && queryResults.length > 0) {
            return queryResults[0];
        }
        return null;
    }

};