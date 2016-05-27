'use strict';

module.exports = (name, items) => {
    return items.find((item) => {
        return name === item.name;
    });
};

