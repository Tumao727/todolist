const log = console.log.bind(console)

const e = (selector) => {
    let element = document.querySelector(selector)
    return element
}

const es = (selector) => {
    let elements = document.querySelectorAll(selector)
    return elements
}

const appendHtml = (element, html) => {
    element.insertAdjacentHTML('beforeend', html)
}

const removeClassAll = (className) => {
    let selector = '.' + className
    let elements = es(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.remove(className)
    }
}

const bindEvent = (element, eventName, callback) => {
    element.addEventListener(eventName, callback)
}

const bindAll = (selector, eventName, callback) => {
    let elements = es(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, eventName, callback)
    }
}