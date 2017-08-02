let messageOptions = {
    tagName     : 'div',
};

class Chat {
    /**
     * @constructor
     * @param {String} baseElementId
     */
    constructor(baseElementId) {
        this._baseElementId = baseElementId;
        this.createViewport()
    }

    /**
     * Creates chat in specified element
     */
    createViewport() {
        let base = document.getElementById(this._baseElementId);

        let chatSpace = this.createElement({
            tagName     : 'div',
            attributes  : {
                class   : 'chat-space',
                id      : 'chatSpace'
            }
        });

        let interfaceSpace = this.createElement({
            tagName     : 'div',
            attributes  : {
                class   : 'interface'
            }
        });

        let interfaceInfo = this.createElement({
            tagName     : 'div',
            attributes  : {
                class   : 'interface-info'
            }
        });

        let interfaceInput = this.createElement({
            tagName     : 'input',
            attributes  : {
                type    : 'text',
                id      : 'userMessage'
            }
        });

        let interfaceButtons = this.createElement({
            tagName     : 'div',
            attributes  : {
                class   : 'interface-buttons'
            }
        });

        let sendButton = this.createElement({
            tagName     : 'a',
            attributes  : {
                class   : 'btn',
                href    : '#',
                id      : 'sendButton',
            },
            innerHTML   : 'Send message'
        });

        let onlineCounter = this.createElement({
            tagName     : 'div',
            attributes  : {
                class   : 'online',
                id      : 'online'
            }
        });

        interfaceButtons.appendChild(sendButton);
        interfaceButtons.appendChild(onlineCounter);

        interfaceInfo.appendChild(interfaceInput);

        interfaceSpace.appendChild(interfaceInfo);
        interfaceSpace.appendChild(interfaceButtons);

        base.appendChild(chatSpace);
        base.appendChild(interfaceSpace);
    }

    /**
     * Create element with specified tag name and attributes
     * @param {Object} options
     * @returns {Element}
     */
    createElement(options) {
        let element = document.createElement(options.tagName);

        if (options.attributes) {
            for (let att in options.attributes) {
                if (options.attributes.hasOwnProperty(att)) {
                    element.setAttribute(att, options.attributes[att]);
                }
            }
        }

        if (options.innerHTML) {
            element.innerHTML = options.innerHTML;
        }

        return element;
    }

    static setEvents(element, event, callback) {
        element.addEventListener(event, callback);
    }

    static getButton() {
        return document.getElementById('sendButton');
    }

    static getInputMessage() {
        return document.getElementById('userMessage').value;
    }

    static setOnline(usersCount) {
        const onlineTemplate = 'online: ';
        document.getElementById('online').innerHTML = onlineTemplate + usersCount;
    }

    static clearInput() {
        document.getElementById('userMessage').value = '';
    }

    static appendMessage(message) {
        messageOptions.innerHTML = message;
        function _createElement(options) {
            let element = document.createElement(options.tagName);

            if (options.attributes) {
                for (let att in options.attributes) {
                    if (options.attributes.hasOwnProperty(att)) {
                        element.setAttribute(att, options.attributes[att]);
                    }
                }
            }

            if (options.innerHTML) {
                element.innerHTML = options.innerHTML;
            }

            return element;
        }

        document.getElementById('chatSpace').appendChild(_createElement(messageOptions));
    }
}

export default Chat;
