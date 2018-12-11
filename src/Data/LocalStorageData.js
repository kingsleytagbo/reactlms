 /* Manages LocalStorage data operations */
export default class database {

     /* saves one item or a list of items */
    static save = (key, data) => {
        let items = database.merge(key, data);
        localStorage.setItem(key, JSON.stringify(items));
    };

     /* retrieves one item that matches a key */
    static fetch = (key) => {
        let data = localStorage.getItem(key);
        if (data) {
            return JSON.parse(data);
        }
        else {
            return [];
        }
    };

     /* syncs both additions or modifications of data */
    static merge = (key, data) => {
        let items = localStorage.getItem(key);
        let dataItems = [];
        if (items && data) {
            dataItems = JSON.parse(items);
            let item = data;
            let found = false;
            if ((!item.Id) || (item.Id.length === 0) || (item.Id === 0) ) {
                item.Id = database.getGuid();
            }
            if (dataItems.length > 0) {
                for (let d = 0; d < dataItems.length; d++) {
                    if (dataItems[d].Id === item.Id) {
                        found = true;
                        dataItems[d] = item;
                        break;
                    }
                };
            }
            if (!found) {
                dataItems.push(item);
            }
        }
        return dataItems;
    }

     /* gets an empty model representing the data expected for this key */
    static getModel = () => {
        let model = {
            Id: '',
            Name: '',
            Description: '',
            Label: '',
            Type: ''
        }
        return model;
    }

     /* removes one item that matches the key */
    static removeOne = (key, data) => {
        let items = localStorage.getItem(key);
        let match = false;
        if (items && data) {
            let dataItems = JSON.parse(items);
            let i = dataItems.length
            while (i--) {
                if (data.Id === dataItems[i].Id) {

                    dataItems.splice(i, 1);

                    localStorage.setItem(key, JSON.stringify(dataItems));
                    match = true;
                    break;
                }
            }
        }
        return match;
    }

     /* removes all items for a key and resets to an empty array */
    static removeAll = (key) => {
        localStorage.setItem(key, JSON.stringify([]));
    }

    /* generates a unique identifier similar to a Guid */
    static getGuid = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

};

