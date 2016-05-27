'use strict';

module.exports = (item, array) => {
    return array.filter((current) => {
        return item !== current;
    });
};

