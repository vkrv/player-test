'use strict'
var log = null
/** @const @type {!CoreObject} */
var qml = (function() {/** @const */
var exports = {};
exports._get = function(name) { return exports[name] }
/** @const */
var _globals = exports
if (!_globals.core) /** @const */ _globals.core = {}
if (!_globals.html5) /** @const */ _globals.html5 = {}
if (!_globals.html5.dist) /** @const */ _globals.html5.dist = {}
if (!_globals.controls) /** @const */ _globals.controls = {}
if (!_globals.controls.core) /** @const */ _globals.controls.core = {}
if (!_globals.controls.mixins) /** @const */ _globals.controls.mixins = {}
if (!_globals.controls.web) /** @const */ _globals.controls.web = {}
if (!_globals.controls.pure) /** @const */ _globals.controls.pure = {}
if (!_globals.controls.input) /** @const */ _globals.controls.input = {}
if (!_globals.src) /** @const */ _globals.src = {}
_globals.core.core = (function() {/** @const */
var exports = _globals;
exports._get = function(name) { return exports[name] }
//=====[import core.core]=====================

//WARNING: no log() function usage before init.js

exports.core.device = 0
exports.core.vendor = ""

exports.core.trace = { key: false, focus: false, listeners: false }

exports.core.os = navigator.platform
exports.core.userAgent = navigator.userAgent
exports.core.language = navigator.language

exports.core.keyCodes = {
	13: 'Select',
	27: 'Back',
	37: 'Left',
	32: 'Space',
	33: 'PageUp',
	34: 'PageDown',
	38: 'Up',
	39: 'Right',
	40: 'Down',
	48: '0',
	49: '1',
	50: '2',
	51: '3',
	52: '4',
	53: '5',
	54: '6',
	55: '7',
	56: '8',
	57: '9',
	65: 'A',
	66: 'B',
	67: 'C',
	68: 'D',
	69: 'E',
	70: 'F',
	71: 'G',
	72: 'H',
	73: 'I',
	74: 'J',
	75: 'K',
	76: 'L',
	77: 'M',
	78: 'N',
	79: 'O',
	80: 'P',
	81: 'Q',
	82: 'R',
	83: 'S',
	84: 'T',
	85: 'U',
	86: 'V',
	87: 'W',
	88: 'X',
	89: 'Y',
	90: 'Z',
	112: 'Red',
	113: 'Green',
	114: 'Yellow',
	115: 'Blue'
}

var _checkDevice = function(target, info) {
	if (navigator.userAgent.indexOf(target) < 0)
		return

	exports.core.vendor = info.vendor
	exports.core.device = info.device
	exports.core.os = info.os
}

if (!exports.core.vendor) {
	_checkDevice('Blackberry', { 'vendor': 'blackberry', 'device': 2, 'os': 'blackberry' })
	_checkDevice('Android', { 'vendor': 'google', 'device': 2, 'os': 'android' })
	_checkDevice('iPhone', { 'vendor': 'apple', 'device': 2, 'os': 'iOS' })
	_checkDevice('iPad', { 'vendor': 'apple', 'device': 2, 'os': 'iOS' })
	_checkDevice('iPod', { 'vendor': 'apple', 'device': 2, 'os': 'iOS' })
}

if (navigator.userAgent.indexOf('Chromium') >= 0)
	exports.core.browser = "Chromium"
else if (navigator.userAgent.indexOf('Chrome') >= 0)
	exports.core.browser = "Chrome"
else if (navigator.userAgent.indexOf('Opera') >= 0)
	exports.core.browser = "Opera"
else if (navigator.userAgent.indexOf('Firefox') >= 0)
	exports.core.browser = "Firefox"
else if (navigator.userAgent.indexOf('Safari') >= 0)
	exports.core.browser = "Safari"
else if (navigator.userAgent.indexOf('MSIE') >= 0)
	exports.core.browser = "IE"
else if (navigator.userAgent.indexOf('YaBrowser') >= 0)
	exports.core.browser = "Yandex"
else
	exports.core.browser = ''


_globals._backend = function() { return _globals.html5.html }


if (log === null)
	log = console.log.bind(console)

/** @const */
/** @param {string} text @param {...} args */
_globals.qsTr = function(text, args) { return _globals._context.qsTr.apply(qml._context, arguments) }

var colorTable = {
	'maroon':	'800000',
	'red':		'ff0000',
	'orange':	'ffA500',
	'yellow':	'ffff00',
	'olive':	'808000',
	'purple':	'800080',
	'fuchsia':	'ff00ff',
	'white':	'ffffff',
	'lime':		'00ff00',
	'green':	'008000',
	'navy':		'000080',
	'blue':		'0000ff',
	'aqua':		'00ffff',
	'teal':		'008080',
	'black':	'000000',
	'silver':	'c0c0c0',
	'gray':		'080808',
	'transparent': '0000'
}

var safeCallImpl = function(callback, self, args, onError) {
	try { return callback.apply(self, args) } catch(ex) { onError(ex) }
}

exports.core.safeCall = function(self, args, onError) {
	return function(callback) { return safeCallImpl(callback, self, args, onError) }
}

/**
 * @constructor
 */
var CoreObjectComponent = exports.core.CoreObject = function() { }
var CoreObjectComponentPrototype = CoreObjectComponent.prototype
CoreObjectComponentPrototype.constructor = exports.core.CoreObject
CoreObjectComponentPrototype.__create = function() { }
CoreObjectComponentPrototype.__setup = function() { }


/** @constructor */
var Color = exports.core.Color = function(value) {
	if (Array.isArray(value)) {
		this.r = value[0]
		this.g = value[1]
		this.b = value[2]
		this.a = value[3] !== undefined? value[3]: 255
		return
	}
	if (typeof value !== 'string')
	{
		this.r = this.b = this.a = 255
		this.g = 0
		log("invalid color specification: " + value)
		return
	}
	var triplet
	if (value.substring(0, 4) == "rgba") {
		var b = value.indexOf('('), e = value.lastIndexOf(')')
		value = value.substring(b + 1, e).split(',')
		this.r = parseInt(value[0], 10)
		this.g = parseInt(value[1], 10)
		this.b = parseInt(value[2], 10)
		this.a = Math.floor(parseFloat(value[3]) * 255)
		return
	}
	else {
		var h = value.charAt(0);
		if (h != '#')
			triplet = colorTable[value];
		else
			triplet = value.substring(1)
	}

	if (!triplet) {
		this.r = 255
		this.g = 0
		this.b = 255
		log("invalid color specification: " + value)
		return
	}

	var len = triplet.length;
	if (len == 3 || len == 4) {
		var r = parseInt(triplet.charAt(0), 16)
		var g = parseInt(triplet.charAt(1), 16)
		var b = parseInt(triplet.charAt(2), 16)
		var a = (len == 4)? parseInt(triplet.charAt(3), 16): 15
		this.r = (r << 4) | r;
		this.g = (g << 4) | g;
		this.b = (b << 4) | b;
		this.a = (a << 4) | a;
	} else if (len == 6 || len == 8) {
		this.r = parseInt(triplet.substring(0, 2), 16)
		this.g = parseInt(triplet.substring(2, 4), 16)
		this.b = parseInt(triplet.substring(4, 6), 16)
		this.a = (len == 8)? parseInt(triplet.substring(6, 8), 16): 255
	} else
		throw new Error("invalid color specification: " + value)
}
var ColorPrototype = Color.prototype
ColorPrototype.constructor = exports.core.Color
/** @const */

ColorPrototype.rgba = function() {
	return "rgba(" + this.r + "," + this.g + "," + this.b + "," + (this.a / 255) + ")";
}

var hexByte = function(v) {
	return ('0' + (Number(v).toString(16))).slice(-2)
}

ColorPrototype.hex = function() {
	return '#' + hexByte(this.r) + hexByte(this.g) + hexByte(this.b) + hexByte(this.a)
}

exports.core.normalizeColor = function(spec) {
	return (new Color(spec)).rgba()
}

exports.core.mixColor = function(specA, specB, r) {
	var a = new Color(specA)
	var b = new Color(specB)
	var mix = function(a, b, r) { return Math.floor((b - a) * r + a) }
	return [mix(a.r, b.r, r), mix(a.g, b.g, r), mix(a.b, b.b, r), mix(a.a, b.a, r)]
}

/** @constructor */
exports.core.DelayedAction = function(context, action) {
	this.context = context
	this.action = function() {
		this._scheduled = false
		action()
	}.bind(this)
}

exports.core.DelayedAction.prototype.schedule = function() {
	if (!this._scheduled) {
		this._scheduled = true
		this.context.scheduleAction(this.action)
	}
}

exports.addProperty = function(proto, type, name, defaultValue) {
	var convert
	switch(type) {
		case 'enum':
		case 'int':		convert = function(value) { return ~~value }; break
		case 'bool':	convert = function(value) { return value? true: false }; break
		case 'real':	convert = function(value) { return +value }; break
		case 'string':	convert = function(value) { return String(value) }; break
		default:		convert = function(value) { return value }; break
	}

	if (defaultValue !== undefined) {
		defaultValue = convert(defaultValue)
	} else {
		switch(type) {
			case 'enum': //fixme: add default value here
			case 'int':		defaultValue = 0; break
			case 'bool':	defaultValue = false; break
			case 'real':	defaultValue = 0.0; break
			case 'string':	defaultValue = ""; break
			case 'array':	defaultValue = []; break
			case 'Color':	defaultValue = '#0000'; break
			default:
				defaultValue = (type[0].toUpperCase() == type[0])? null: undefined
		}
	}

	var storageName = '__property_' + name
	var forwardName = '__forward_' + name

	Object.defineProperty(proto, name, {
		get: function() {
			var p = this[storageName]
			return p !== undefined?
				p.interpolatedValue !== undefined? p.interpolatedValue: p.value:
				defaultValue
		},

		set: function(newValue) {
			newValue = convert(newValue)
			var p = this[storageName]
			if (p === undefined) { //no storage
				if (newValue === defaultValue) //value == defaultValue, no storage allocation
					return

				p = this[storageName] = { value : defaultValue }
			}
			var backend = this._context.backend
			var animation = this.getAnimation(name)
			if (animation && p.value !== newValue) {
				if (p.frameRequest)
					backend.cancelAnimationFrame(p.frameRequest)

				var now = new Date()
				p.started = now.getTime() + now.getMilliseconds() / 1000.0

				var src = p.interpolatedValue !== undefined? p.interpolatedValue: p.value
				var dst = newValue

				var self = this

				var complete = function() {
					backend.cancelAnimationFrame(p.frameRequest)
					p.frameRequest = undefined
					animation.complete = function() { }
					animation.running = false
					p.interpolatedValue = undefined
					p.started = undefined
					self._update(name, dst, src)
				}

				var duration = animation.duration

				var nextFrame = function() {
					var date = new Date()
					var now = date.getTime() + date.getMilliseconds() / 1000.0
					var t = 1.0 * (now - p.started) / duration
					if (t >= 1) {
						complete()
					} else {
						p.interpolatedValue = convert(animation.interpolate(dst, src, t))
						self._update(name, p.interpolatedValue, src)
						p.frameRequest = backend.requestAnimationFrame(nextFrame)
					}
				}

				p.frameRequest = backend.requestAnimationFrame(nextFrame)

				animation.running = true
				animation.complete = complete
			}
			var oldValue = p.value
			if (oldValue !== newValue) {
				var forwardTarget = this[forwardName]
				if (forwardTarget !== undefined) {
					if (oldValue !== null && (oldValue instanceof Object)) {
						//forward property update for mixins
						var forwardedOldValue = oldValue[forwardTarget]
						if (newValue !== forwardedOldValue) {
							oldValue[forwardTarget] = newValue
							this._update(name, newValue, forwardedOldValue)
						}
						return
					} else if (newValue instanceof Object) {
						//first assignment of mixin
						this.connectOnChanged(newValue, forwardTarget, function(v, ov) { this._update(name, v, ov) }.bind(this))
					}
				}
				p.value = newValue
				if ((!animation || !animation.running) && newValue == defaultValue)
					delete this[storageName]
				if (!animation)
					this._update(name, newValue, oldValue)
			}
		},
		enumerable: true
	})
}

exports.addAliasProperty = function(self, name, getObject, srcProperty) {
	var target = getObject()
	self.connectOnChanged(target, srcProperty, function(value) { self._update(name, value) })

	Object.defineProperty(self, name, {
		get: function() { return target[srcProperty] },
		set: function(value) { target[srcProperty] = value },
		enumerable: true
	})
}

exports.core.createSignal = function(name) {
	return function() { 
	/* COPY_ARGS(args, 0) */
	var $n = arguments.length
	var args = new Array($n)
	for(var $i = 0; $i < $n; ++$i) {
		args[$i] = arguments[$i]
	}
 this.emitWithArgs(name, args) }
}
exports.core.createSignalForwarder = function(object, name) {
	return (function() { 
	/* COPY_ARGS(args, 0) */
	var $n = arguments.length
	var args = new Array($n)
	for(var $i = 0; $i < $n; ++$i) {
		args[$i] = arguments[$i]
	}
 object.emitWithArgs(name, args) })
}

/** @constructor */
exports.core.EventBinder = function(target) {
	this.target = target
	this.callbacks = {}
	this.enabled = false
}

exports.core.EventBinder.prototype.on = function(event, callback) {
	if (event in this.callbacks)
		throw new Error('double adding of event (' + event + ')')
	this.callbacks[event] = callback
	if (this.enabled)
		this.target.on(event, callback)
}

exports.core.EventBinder.prototype.constructor = exports.core.EventBinder

exports.core.EventBinder.prototype.enable = function(value) {
	if (value != this.enabled) {
		var target = this.target
		this.enabled = value
		if (value) {
			for(var event in this.callbacks)
				target.on(event, this.callbacks[event])
		} else {
			for(var event in this.callbacks)
				target.removeListener(event, this.callbacks[event])
		}
	}
}

var protoEvent = function(prefix, proto, name, callback) {
	var name = '__' + prefix + '__' + name
	if (name in proto) {
		proto[name] = function() {
			try {
				callback.apply(this, arguments)
			} catch(ex) {
				log('error invoking base prototype event ' + prefix + ':' + name, ex, ex.stack)
			}
		}
	} else
		proto[name] = callback
}

exports.core._protoOn = function(proto, name, callback)
{ protoEvent('on', proto, name, callback) }

exports.core._protoOnChanged = function(proto, name, callback)
{ protoEvent('changed', proto, name, callback) }

exports.core._protoOnKey = function(proto, name, callback)
{ protoEvent('key', proto, name, callback) }

var ObjectEnumerator = function(callback) {
	this._callback = callback
	this._queue = []
	this.history = []
}

var ObjectEnumeratorPrototype = ObjectEnumerator.prototype
ObjectEnumeratorPrototype.constructor = ObjectEnumerator

ObjectEnumeratorPrototype.unshift = function() {
	var q = this._queue
	q.unshift.apply(q, arguments)
}

ObjectEnumeratorPrototype.push = function() {
	var q = this._queue
	q.push.apply(q, arguments)
}

ObjectEnumeratorPrototype.enumerate = function(root, arg) {
	var args = [this, arg]
	var queue = this._queue
	queue.unshift(root)
	while(queue.length) {
		var el = queue.shift()
		this.history.push(el)
		var r = this._callback.apply(el, args)
		if (r)
			break
	}
}

exports.forEach = function(root, callback, arg) {
	var oe = new ObjectEnumerator(callback)
	oe.enumerate(root, arg)
	return arg
}

return exports;
} )()
//========================================

/** @const @type {!CoreObject} */
var core = _globals.core.core


//=====[component core.EventEmitter]=====================

	var EventEmitterBaseComponent = _globals.core.CoreObject
	var EventEmitterBasePrototype = EventEmitterBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.core.CoreObject}
 */
	var EventEmitterComponent = _globals.core.EventEmitter = function(parent, _delegate) {
		EventEmitterBaseComponent.apply(this, arguments)
	//custom constructor:
	{
		this._eventHandlers = {}
		this._onConnections = []
	}

	}
	var EventEmitterPrototype = EventEmitterComponent.prototype = Object.create(EventEmitterBasePrototype)

	EventEmitterPrototype.constructor = EventEmitterComponent

	EventEmitterPrototype.componentName = 'core.EventEmitter'
	EventEmitterPrototype.on = function(name,callback) {
		if (name === '')
			throw new Error('empty listener name')

		if (name in this._eventHandlers)
			this._eventHandlers[name].push(callback)
		else {
			if (this._eventHandlers[name])
				throw new Error('listener callback added event handler')
			this._eventHandlers[name] = [callback]
		}
	}
	EventEmitterPrototype.discard = function() {
		for(var name in this._eventHandlers)
			this.removeAllListeners(name)
		this._onConnections.forEach(function(connection) {
			connection[0].removeListener(connection[1], connection[2])
		})
		this._onConnections = []
	}
	EventEmitterPrototype.emitWithArgs = function(name,args) {
		if (name === '')
			throw new Error('empty listener name')

		var proto_callback = this['__on__' + name]
		var handlers = this._eventHandlers[name]

		if (proto_callback === undefined && handlers === undefined)
			return

		var invoker = _globals.core.safeCall(
			this, args,
			function(ex) { log("event/signal " + name + " handler failed:", ex, ex.stack) }
		)

		if (proto_callback !== undefined)
			invoker(proto_callback)

		if (handlers !== undefined)
			handlers.forEach(invoker)
	}
	EventEmitterPrototype.connectOn = function(target,name,callback) {
		target.on(name, callback)
		this._onConnections.push([target, name, callback])
	}
	EventEmitterPrototype.removeListener = function(name,callback) {
		if (!(name in this._eventHandlers) || callback === undefined || callback === null || name === '') {
			if (_globals.core.trace.listeners)
				log('invalid removeListener(' + name + ', ' + callback + ') invocation', new Error().stack)
			return
		}

		var handlers = this._eventHandlers[name]
		var idx = handlers.indexOf(callback)
		if (idx >= 0)
			handlers.splice(idx, 1)
		else if (_globals.core.trace.listeners)
			log('failed to remove listener for', name, 'from', this)

		if (!handlers.length)
			this.removeAllListeners(name)
	}
	EventEmitterPrototype.emit = function(name) {
		if (name === '')
			throw new Error('empty listener name')

		var proto_callback = this['__on__' + name]
		var handlers = this._eventHandlers[name]

		if (proto_callback === undefined && handlers === undefined)
			return

		
	/* COPY_ARGS(args, 1) */
	var $n = arguments.length
	var args = new Array($n - 1)
	for(var $i = 1; $i < $n; ++$i) {
		args[$i - 1] = arguments[$i]
	}


		var invoker = _globals.core.safeCall(
			this, args,
			function(ex) { log("event/signal " + name + " handler failed:", ex, ex.stack) }
		)

		if (proto_callback !== undefined)
			invoker(proto_callback)

		if (handlers !== undefined)
			handlers.forEach(invoker)
	}
	EventEmitterPrototype.removeAllListeners = function(name) {
		delete this._eventHandlers[name]
	}

//=====[component core.Object]=====================

	var ObjectBaseComponent = _globals.core.EventEmitter
	var ObjectBasePrototype = ObjectBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.core.EventEmitter}
 */
	var ObjectComponent = _globals.core.Object = function(parent, _delegate) {
		ObjectBaseComponent.apply(this, arguments)
	//custom constructor:
	{
		this.parent = parent
		this.children = []

		this._context = parent? parent._context: null
		this._local = {}
		if (_delegate === true)
			this._local['_delegate'] = this
		this._changedHandlers = {}
		this._changedConnections = []
		this._pressedHandlers = {}
		this._animations = {}
		this._updaters = {}
	}

	}
	var ObjectPrototype = ObjectComponent.prototype = Object.create(ObjectBasePrototype)

	ObjectPrototype.constructor = ObjectComponent

	ObjectPrototype.componentName = 'core.Object'
	ObjectPrototype.addChild = function(child) {
		this.children.push(child);
	}
	ObjectPrototype.setAnimation = function(name,animation) {
		this._animations[name] = animation;
	}
	ObjectPrototype.removeOnChanged = function(name,callback) {
		if (name in this._changedHandlers) {
			var handlers = this._changedHandlers[name];
			var idx = handlers.indexOf(callback)
			if (idx >= 0)
				handlers.splice(idx, 1)
			else
				log('failed to remove changed listener for', name, 'from', this)
		}
	}
	ObjectPrototype.connectOnChanged = function(target,name,callback) {
		target.onChanged(name, callback)
		this._changedConnections.push([target, name, callback])
	}
	ObjectPrototype.onChanged = function(name,callback) {
		if (name in this._changedHandlers)
			this._changedHandlers[name].push(callback);
		else
			this._changedHandlers[name] = [callback];
	}
	ObjectPrototype.discard = function() {
		this._changedConnections.forEach(function(connection) {
			connection[0].removeOnChanged(connection[1], connection[2])
		})
		this._changedConnections = []

		this.children.forEach(function(child) { child.discard() })
		this.children = []

		this.parent = null
		this._local = {}
		this._changedHandlers = {}
		this._pressedHandlers = {}
		this._animations = {}
		//for(var name in this._updaters) //fixme: it was added once, then removed, is it needed at all? it double-deletes callbacks
		//	this._removeUpdater(name)
		this._updaters = {}

		_globals.core.EventEmitter.prototype.discard.apply(this)
	}
	ObjectPrototype._tryFocus = function() { return false }
	ObjectPrototype._get = function(name) {
		if (name in this)
			return this[name]

		var object = this
		while(object) {
			if (name in object._local)
				return object._local[name]
			object = object.parent
		}

		throw new Error("invalid property requested: '" + name)
	}
	ObjectPrototype.onPressed = function(name,callback) {
		var wrapper
		if (name != 'Key')
			wrapper = function(key, event) { event.accepted = true; callback(key, event); return event.accepted }
		else
			wrapper = callback;

		if (name in this._pressedHandlers)
			this._pressedHandlers[name].push(wrapper);
		else
			this._pressedHandlers[name] = [wrapper];
	}
	ObjectPrototype._setId = function(name) {
		var p = this;
		while(p) {
			p._local[name] = this;
			p = p.parent;
		}
	}
	ObjectPrototype._update = function(name,value) {
		var proto_callback = this['__changed__' + name]
		var handlers = this._changedHandlers[name]

		if (proto_callback === undefined && handlers === undefined)
			return

		var invoker = _globals.core.safeCall(this, [value], function(ex) { log("on " + name + " changed callback failed: ", ex, ex.stack) })

		if (proto_callback !== undefined)
			invoker(proto_callback)

		if (handlers !== undefined)
			handlers.forEach(invoker)
	}
	ObjectPrototype._removeUpdater = function(name,newUpdaters) {
		var updaters = this._updaters
		var oldUpdaters = updaters[name]
		if (oldUpdaters !== undefined) {
			oldUpdaters.forEach(function(data) {
				var object = data[0]
				var name = data[1]
				var callback = data[2]
				object.removeOnChanged(name, callback)
			})
		}

		if (newUpdaters)
			updaters[name] = newUpdaters
		else
			delete updaters[name]
	}
	ObjectPrototype.getAnimation = function(name,animation) {
		var a = this._animations[name]
		return (a && a.enabled())? a: null;
	}

//=====[component core.Item]=====================

	var ItemBaseComponent = _globals.core.Object
	var ItemBasePrototype = ItemBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	var ItemComponent = _globals.core.Item = function(parent, _delegate) {
		ItemBaseComponent.apply(this, arguments)
	//custom constructor:
	{
		this._topPadding = 0
		if (parent) {
			if (this.element)
				throw new Error('double ctor call')

			this.createElement(this.getTag())
		} //no parent == top level element, skip
	}

	}
	var ItemPrototype = ItemComponent.prototype = Object.create(ItemBasePrototype)

	ItemPrototype.constructor = ItemComponent

	ItemPrototype.componentName = 'core.Item'
	ItemPrototype.boxChanged = _globals.core.createSignal('boxChanged')
	ItemPrototype.createElement = function(tag) {
		this.element = this._context.createElement(tag)
		this._context.registerStyle(this, tag)
		this.parent.element.append(this.element)
	}
	ItemPrototype.registerStyle = function(style,tag) {
		style.addRule(tag, 'position: absolute; visibility: inherit; border-style: solid; border-width: 0px; white-space: nowrap; border-radius: 0px; opacity: 1.0; transform: none; left: 0px; top: 0px; width: 0px; height: 0px;')
	}
	ItemPrototype.hasActiveFocus = function() {
		var item = this
		while(item.parent) {
			if (item.parent.focusedChild != item)
				return false

			item = item.parent
		}
		return true
	}
	ItemPrototype._focusTree = function(active) {
		this.activeFocus = active;
		if (this.focusedChild)
			this.focusedChild._focusTree(active);
	}
	ItemPrototype._update = function(name,value) {
		switch(name) {
			case 'width':
				this.style('width', value)
				this.boxChanged()
				break;

			case 'height':
				this.style('height', value - this._topPadding);
				this.boxChanged()
				break;

			case 'x':
			case 'viewX':
				var x = this.x + this.viewX
				this.style('left', x);
				this.boxChanged()
				break;

			case 'y':
			case 'viewY':
				var y = this.y + this.viewY
				this.style('top', y);
				this.boxChanged()
				break;

			case 'opacity': if (this.element) this.style('opacity', value); break;
			case 'visibleInView':
			case 'visible':
				if (this.element)
					this.style('visibility', (this.visible && this.visibleInView)? 'inherit': 'hidden')
					break
			case 'z':		this.style('z-index', value); break;
			case 'radius':	this.style('border-radius', value); break;
			case 'clip':	this.style('overflow', value? 'hidden': 'visible'); break;
		}
		_globals.core.Object.prototype._update.apply(this, arguments);
	}
	ItemPrototype.getTag = function() { return 'div' }
	ItemPrototype.forceActiveFocus = function() {
		var item = this;
		while(item.parent) {
			item.parent._focusChild(item);
			item = item.parent;
		}
	}
	ItemPrototype._tryFocus = function() {
		if (!this.visible)
			return false

		if (this.focusedChild && this.focusedChild._tryFocus())
			return true

		var children = this.children
		for(var i = 0; i < children.length; ++i) {
			var child = children[i]
			if (child._tryFocus()) {
				this._focusChild(child)
				return true
			}
		}
		return this.focus
	}
	ItemPrototype._focusChild = function(child) {
		if (child.parent !== this)
			throw new Error('invalid object passed as child')
		if (this.focusedChild === child)
			return
		if (this.focusedChild)
			this.focusedChild._focusTree(false)
		this.focusedChild = child
		if (this.focusedChild)
			this.focusedChild._focusTree(this.hasActiveFocus())
	}
	ItemPrototype._mapCSSAttribute = function(name) {
		return { width: 'width', height: 'height', x: 'left', y: 'top', viewX: 'left', viewY: 'top', opacity: 'opacity', radius: 'border-radius', rotate: 'transform', boxshadow: 'box-shadow', transform: 'transform', visible: 'visibility', visibleInView: 'visibility', background: 'background', color: 'color', font: 'font' }[name]
	}
	ItemPrototype._updateAnimation = function(name,animation) {
		if (!this._context.backend.capabilities.csstransitions || (animation && !animation.cssTransition))
			return false

		var css = this._mapCSSAttribute(name)

		if (css !== undefined) {
			if (!animation)
				throw new Error('resetting transition was not implemented')

			animation._target = name
			return this.setTransition(css, animation)
		} else {
			return false
		}
	}
	ItemPrototype.toScreen = function() {
		var item = this
		var x = 0, y = 0
		var w = this.width, h = this.height
		while(item) {
			x += item.x
			y += item.y
			if ('view' in item) {
				x += item.viewX + item.view.content.x
				y += item.viewY + item.view.content.y
			}
			item = item.parent
		}
		return [x, y, x + w, y + h, x + w / 2, y + h / 2];
	}
	ItemPrototype.setAnimation = function(name,animation) {
		if (!this._updateAnimation(name, animation))
			_globals.core.Object.prototype.setAnimation.apply(this, arguments);
	}
	ItemPrototype.focusChild = function(child) {
		this._propagateFocusToParents()
		this._focusChild(child)
	}
	ItemPrototype.setTransition = function(name,animation) {
		var backend = this._context.backend
		if (!backend.capabilities.csstransitions)
			return false

		var html5 = backend //remove me
		var transition = {
			property: html5.getPrefixedName('transition-property'),
			delay: html5.getPrefixedName('transition-delay'),
			duration: html5.getPrefixedName('transition-duration'),
			timing: html5.getPrefixedName('transition-timing-function')
		}

		name = html5.getPrefixedName(name) || name //replace transform: <prefix>rotate hack

		var property = this.style(transition.property) || []
		var duration = this.style(transition.duration) || []
		var timing = this.style(transition.timing) || []
		var delay = this.style(transition.delay) || []

		var idx = property.indexOf(name)
		if (idx === -1) { //if property not set
			property.push(name)
			duration.push(animation.duration + 'ms')
			timing.push(animation.easing)
			delay.push(animation.delay + 'ms')
		} else { //property already set, adjust the params
			duration[idx] = animation.duration + 'ms'
			timing[idx] = animation.easing
			delay[idx] = animation.delay + 'ms'
		}

		var style = {}
		style[transition.property] = property
		style[transition.duration] = duration
		style[transition.timing] = timing
		style[transition.delay] = delay

		//FIXME: smarttv 2003 animation won't work without this shit =(
		if (this._context.system.os === 'smartTV' || this._context.system.os === 'netcast') {
			style["transition-property"] = property
			style["transition-duration"] = duration
			style["transition-delay"] = delay
			style["transition-timing-function"] = timing
		}
		this.style(style)
		return true
	}
	ItemPrototype.style = function(name,style) {
		var element = this.element
		if (element)
			return element.style(name, style)
		else
			log('WARNING: style skipped:', name, style)
	}
	ItemPrototype._updateStyle = function() {
		var element = this.element
		if (element)
			element.updateStyle()
	}
	ItemPrototype.addChild = function(child) {
		_globals.core.Object.prototype.addChild.apply(this, arguments)
		if (child._tryFocus())
			child._propagateFocusToParents()
	}
	ItemPrototype._propagateFocusToParents = function() {
		var item = this;
		while(item.parent && (!item.parent.focusedChild || !item.parent.focusedChild.visible)) {
			item.parent._focusChild(item)
			item = item.parent
		}
	}
	ItemPrototype.setFocus = function() { this.forceActiveFocus() }
	ItemPrototype.discard = function() {
		_globals.core.Object.prototype.discard.apply(this)
		this.focusedChild = null
		if (this.element)
			this.element.discard()
	}
	ItemPrototype._processKey = function(event) {
		var key = _globals.core.keyCodes[event.which || event.keyCode];
		if (key) {
			//fixme: create invoker only if any of handlers exist
			var invoker = _globals.core.safeCall(this, [key, event], function (ex) { log("on " + key + " handler failed:", ex, ex.stack) })
			var proto_callback = this['__key__' + key]

			if (key in this._pressedHandlers) {
				var handlers = this._pressedHandlers[key]
				for(var i = handlers.length - 1; i >= 0; --i) {
					var callback = handlers[i]
					if (invoker(callback)) {
						if (_globals.core.trace.key)
							log("key", key, "handled by", this, new Error().stack)
						return true;
					}
				}
			}

			if (proto_callback)
				invoker(proto_callback)

			var proto_callback = this['__key__Key']
			if ('Key' in this._pressedHandlers) {
				var handlers = this._pressedHandlers['Key']
				for(var i = handlers.length - 1; i >= 0; --i) {
					var callback = handlers[i]
					if (invoker(callback)) {
						if (_globals.core.trace.key)
							log("key", key, "handled by", this, new Error().stack)
						return true
					}
				}
			}
			if (proto_callback)
				invoker(proto_callback)
		}
		else {
			log("unknown key", event.which);
		}
		return false;
	}
	ItemPrototype._enqueueNextChildInFocusChain = function(queue,handlers) {
		this._tryFocus() //soft-restore focus for invisible components
		var focusedChild = this.focusedChild
		if (focusedChild && focusedChild.visible) {
			queue.unshift(focusedChild)
			handlers.unshift(focusedChild)
		}
	}
	core.addProperty(ItemPrototype, 'int', 'x')
	core.addProperty(ItemPrototype, 'int', 'y')
	core.addProperty(ItemPrototype, 'int', 'z')
	core.addProperty(ItemPrototype, 'int', 'width')
	core.addProperty(ItemPrototype, 'int', 'height')
	core.addProperty(ItemPrototype, 'bool', 'clip')
	core.addProperty(ItemPrototype, 'real', 'radius')
	core.addProperty(ItemPrototype, 'bool', 'focus')
	core.addProperty(ItemPrototype, 'bool', 'focused')
	core.addProperty(ItemPrototype, 'bool', 'activeFocus')
	core.addProperty(ItemPrototype, 'Item', 'focusedChild')
	core.addProperty(ItemPrototype, 'bool', 'visible', (true))
	core.addProperty(ItemPrototype, 'bool', 'visibleInView', (true))
	core.addProperty(ItemPrototype, 'bool', 'recursiveVisible', (true))
	core.addProperty(ItemPrototype, 'real', 'opacity', (1))
	core.addProperty(ItemPrototype, 'Anchors', 'anchors')
	core.addProperty(ItemPrototype, 'Effects', 'effects')
	core.addProperty(ItemPrototype, 'Transform', 'transform')
	core.addProperty(ItemPrototype, 'AnchorLine', 'left')
	core.addProperty(ItemPrototype, 'AnchorLine', 'top')
	core.addProperty(ItemPrototype, 'AnchorLine', 'right')
	core.addProperty(ItemPrototype, 'AnchorLine', 'bottom')
	core.addProperty(ItemPrototype, 'AnchorLine', 'horizontalCenter')
	core.addProperty(ItemPrototype, 'AnchorLine', 'verticalCenter')
	core.addProperty(ItemPrototype, 'int', 'viewX')
	core.addProperty(ItemPrototype, 'int', 'viewY')
	_globals.core._protoOnChanged(ItemPrototype, 'visible', (function(value) {
		this.recursiveVisible = value && this.visibleInView && this.parent.recursiveVisible
		if (!value)
			this.parent._tryFocus()
	} ))
	_globals.core._protoOnChanged(ItemPrototype, 'visibleInView', (function(value) {
		this.recursiveVisible = value && this.visible && this.parent.recursiveVisible
	} ))
	_globals.core._protoOnChanged(ItemPrototype, 'recursiveVisible', (function(value) {
		this.children.forEach(function(child) {
			child.recursiveVisible = value && child.visible && child.visibleInView
		})
	} ))

	ItemPrototype.__create = function(__closure) {
		ItemBasePrototype.__create.call(this, __closure.__base = { })
//creating component core.<anonymous>
		var this$right = new _globals.core.AnchorLine(this)
		__closure.this$right = this$right

//creating component AnchorLine
		this$right.__create(__closure.__closure_this$right = { })

		this.right = this$right
//creating component core.<anonymous>
		var this$anchors = new _globals.core.Anchors(this)
		__closure.this$anchors = this$anchors

//creating component Anchors
		this$anchors.__create(__closure.__closure_this$anchors = { })

		this.anchors = this$anchors
//creating component core.<anonymous>
		var this$bottom = new _globals.core.AnchorLine(this)
		__closure.this$bottom = this$bottom

//creating component AnchorLine
		this$bottom.__create(__closure.__closure_this$bottom = { })

		this.bottom = this$bottom
//creating component core.<anonymous>
		var this$top = new _globals.core.AnchorLine(this)
		__closure.this$top = this$top

//creating component AnchorLine
		this$top.__create(__closure.__closure_this$top = { })

		this.top = this$top
//creating component core.<anonymous>
		var this$verticalCenter = new _globals.core.AnchorLine(this)
		__closure.this$verticalCenter = this$verticalCenter

//creating component AnchorLine
		this$verticalCenter.__create(__closure.__closure_this$verticalCenter = { })

		this.verticalCenter = this$verticalCenter
//creating component core.<anonymous>
		var this$transform = new _globals.core.Transform(this)
		__closure.this$transform = this$transform

//creating component Transform
		this$transform.__create(__closure.__closure_this$transform = { })

		this.transform = this$transform
//creating component core.<anonymous>
		var this$horizontalCenter = new _globals.core.AnchorLine(this)
		__closure.this$horizontalCenter = this$horizontalCenter

//creating component AnchorLine
		this$horizontalCenter.__create(__closure.__closure_this$horizontalCenter = { })

		this.horizontalCenter = this$horizontalCenter
//creating component core.<anonymous>
		var this$effects = new _globals.core.Effects(this)
		__closure.this$effects = this$effects

//creating component Effects
		this$effects.__create(__closure.__closure_this$effects = { })

		this.effects = this$effects
//creating component core.<anonymous>
		var this$left = new _globals.core.AnchorLine(this)
		__closure.this$left = this$left

//creating component AnchorLine
		this$left.__create(__closure.__closure_this$left = { })

		this.left = this$left
	}
	ItemPrototype.__setup = function(__closure) {
	ItemBasePrototype.__setup.call(this, __closure.__base); delete __closure.__base
//setting up component AnchorLine
			var this$right = __closure.this$right
			this$right.__setup(__closure.__closure_this$right)
			delete __closure.__closure_this$right

//assigning boxIndex to (2)
			this$right._removeUpdater('boxIndex'); this$right.boxIndex = ((2));


//setting up component Anchors
			var this$anchors = __closure.this$anchors
			this$anchors.__setup(__closure.__closure_this$anchors)
			delete __closure.__closure_this$anchors



//setting up component AnchorLine
			var this$bottom = __closure.this$bottom
			this$bottom.__setup(__closure.__closure_this$bottom)
			delete __closure.__closure_this$bottom

//assigning boxIndex to (3)
			this$bottom._removeUpdater('boxIndex'); this$bottom.boxIndex = ((3));


//setting up component AnchorLine
			var this$top = __closure.this$top
			this$top.__setup(__closure.__closure_this$top)
			delete __closure.__closure_this$top

//assigning boxIndex to (1)
			this$top._removeUpdater('boxIndex'); this$top.boxIndex = ((1));


//setting up component AnchorLine
			var this$verticalCenter = __closure.this$verticalCenter
			this$verticalCenter.__setup(__closure.__closure_this$verticalCenter)
			delete __closure.__closure_this$verticalCenter

//assigning boxIndex to (5)
			this$verticalCenter._removeUpdater('boxIndex'); this$verticalCenter.boxIndex = ((5));


//setting up component Transform
			var this$transform = __closure.this$transform
			this$transform.__setup(__closure.__closure_this$transform)
			delete __closure.__closure_this$transform



//setting up component AnchorLine
			var this$horizontalCenter = __closure.this$horizontalCenter
			this$horizontalCenter.__setup(__closure.__closure_this$horizontalCenter)
			delete __closure.__closure_this$horizontalCenter

//assigning boxIndex to (4)
			this$horizontalCenter._removeUpdater('boxIndex'); this$horizontalCenter.boxIndex = ((4));

//assigning focused to (this._get('focusedChild') === this)
			var update$this$focused = (function() { this.focused = ((this._get('focusedChild') === this)); }).bind(this)
			var dep$this$focused$0 = this
			this.connectOnChanged(dep$this$focused$0, 'focusedChild', update$this$focused)
			this._removeUpdater('focused', [[dep$this$focused$0, 'focusedChild', update$this$focused]])
			update$this$focused();

//setting up component Effects
			var this$effects = __closure.this$effects
			this$effects.__setup(__closure.__closure_this$effects)
			delete __closure.__closure_this$effects



//setting up component AnchorLine
			var this$left = __closure.this$left
			this$left.__setup(__closure.__closure_this$left)
			delete __closure.__closure_this$left

//assigning boxIndex to (0)
			this$left._removeUpdater('boxIndex'); this$left.boxIndex = ((0));
}


//=====[component controls.Bitmovin]=====================

	var BitmovinBaseComponent = _globals.core.Item
	var BitmovinBasePrototype = BitmovinBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.core.Item}
 */
	var BitmovinComponent = _globals.controls.Bitmovin = function(parent, _delegate) {
		BitmovinBaseComponent.apply(this, arguments)
	//custom constructor:
	{
		this.element.setAttribute('id', 'bitmovin')

		this.conf = {
			key:       "8ea98414-488b-41cf-ac9b-fdec00b58572",
			source: {
				poster:      "//bitmovin-a.akamaihd.net/content/MI201109210084_1/poster.jpg"
			}
		};

		this._player = window.bitmovin.player("bitmovin");
	}

	}
	var BitmovinPrototype = BitmovinComponent.prototype = Object.create(BitmovinBasePrototype)

	BitmovinPrototype.constructor = BitmovinComponent

	BitmovinPrototype.componentName = 'controls.Bitmovin'
	BitmovinPrototype.finished = _globals.core.createSignal('finished')
	BitmovinPrototype.error = _globals.core.createSignal('error')
	BitmovinPrototype.play = function(state) {
		// this._player.play(state)
	}
	BitmovinPrototype.loadPlaylist = function(pl) {

		this._player.setup(pl[0])

		var self = this;

		this._player.on('all', function (e, x) {
			if (e !== "time" && self.logsEnabled)
			    console.log("JWplayer event", e, x)
		})



		this._player.load(pl)
	}
	core.addProperty(BitmovinPrototype, 'string', 'source')
	core.addProperty(BitmovinPrototype, 'Color', 'backgroundColor', ("#000"))
	core.addProperty(BitmovinPrototype, 'float', 'volume', (1.0))
	core.addProperty(BitmovinPrototype, 'bool', 'loop', (false))
	core.addProperty(BitmovinPrototype, 'bool', 'ready', (false))
	core.addProperty(BitmovinPrototype, 'bool', 'muted', (false))
	core.addProperty(BitmovinPrototype, 'bool', 'paused', (false))
	core.addProperty(BitmovinPrototype, 'bool', 'waiting', (false))
	core.addProperty(BitmovinPrototype, 'bool', 'seeking', (false))
	core.addProperty(BitmovinPrototype, 'bool', 'autoPlay', (false))
	core.addProperty(BitmovinPrototype, 'int', 'duration')
	core.addProperty(BitmovinPrototype, 'int', 'progress')
	core.addProperty(BitmovinPrototype, 'int', 'buffered')
	core.addProperty(BitmovinPrototype, 'bool', 'logsEnabled')
	_globals.core._protoOnChanged(BitmovinPrototype, 'source', (function(value) {
		this.conf.source.hls = value;

		if (this._player.isSetup())
			this._player.unload()

		this._player.setup(this.conf).then(function(value) {
			// Success
			console.log("Successfully created bitmovin player instance");
		}, function(reason) {
			// Error!
			console.log("Error while creating bitmovin player instance");
		});

	} ))
	_globals.core._protoOnChanged(BitmovinPrototype, 'width', (function(value) { this.element.dom.width = value; } ))
	_globals.core._protoOnChanged(BitmovinPrototype, 'height', (function(value) { this.element.dom.height = value; } ))

	BitmovinPrototype.__create = function(__closure) {
		BitmovinBasePrototype.__create.call(this, __closure.__base = { })

	}
	BitmovinPrototype.__setup = function(__closure) {
	BitmovinBasePrototype.__setup.call(this, __closure.__base); delete __closure.__base
//assigning width to (640)
			this._removeUpdater('width'); this.width = ((640));
//assigning logsEnabled to (this._get('recursiveVisible'))
			var update$this$logsEnabled = (function() { this.logsEnabled = ((this._get('recursiveVisible'))); }).bind(this)
			var dep$this$logsEnabled$0 = this
			this.connectOnChanged(dep$this$logsEnabled$0, 'recursiveVisible', update$this$logsEnabled)
			this._removeUpdater('logsEnabled', [[dep$this$logsEnabled$0, 'recursiveVisible', update$this$logsEnabled]])
			update$this$logsEnabled();
//assigning height to (480)
			this._removeUpdater('height'); this.height = ((480));
}


//=====[component core.BaseLayout]=====================

	var BaseLayoutBaseComponent = _globals.core.Item
	var BaseLayoutBasePrototype = BaseLayoutBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.core.Item}
 */
	var BaseLayoutComponent = _globals.core.BaseLayout = function(parent, _delegate) {
		BaseLayoutBaseComponent.apply(this, arguments)
	//custom constructor:
	{
		this.count = 0
		this._delayedLayout = new _globals.core.DelayedAction(this._context, function() {
			this._processUpdates()
			this._layout()
		}.bind(this))
	}

	}
	var BaseLayoutPrototype = BaseLayoutComponent.prototype = Object.create(BaseLayoutBasePrototype)

	BaseLayoutPrototype.constructor = BaseLayoutComponent

	BaseLayoutPrototype.componentName = 'core.BaseLayout'
	BaseLayoutPrototype._update = function(name,value) {
		switch(name) {
			case 'spacing': this._delayedLayout.schedule(); break;
		}
		qml.core.Item.prototype._update.apply(this, arguments);
	}
	BaseLayoutPrototype._processUpdates = function() { }
	core.addProperty(BaseLayoutPrototype, 'int', 'count')
	core.addProperty(BaseLayoutPrototype, 'int', 'spacing')
	core.addProperty(BaseLayoutPrototype, 'int', 'currentIndex')
	core.addProperty(BaseLayoutPrototype, 'int', 'contentWidth')
	core.addProperty(BaseLayoutPrototype, 'int', 'contentHeight')
	core.addProperty(BaseLayoutPrototype, 'bool', 'keyNavigationWraps')
	core.addProperty(BaseLayoutPrototype, 'bool', 'handleNavigationKeys')

//=====[component core.Layout]=====================

	var LayoutBaseComponent = _globals.core.BaseLayout
	var LayoutBasePrototype = LayoutBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.core.BaseLayout}
 */
	var LayoutComponent = _globals.core.Layout = function(parent, _delegate) {
		LayoutBaseComponent.apply(this, arguments)

	}
	var LayoutPrototype = LayoutComponent.prototype = Object.create(LayoutBasePrototype)

	LayoutPrototype.constructor = LayoutComponent

	LayoutPrototype.componentName = 'core.Layout'
	LayoutPrototype.focusPrevChild = function() {
		var idx = 0;
		if (this.focusedChild)
			idx = this.children.indexOf(this.focusedChild)

		if (!this.keyNavigationWraps && idx == 0)
			return

		idx = (idx + this.children.length - 1) % this.children.length
		this.currentIndex = idx
		this.focusChild(this.children[idx])
	}
	LayoutPrototype.focusNextChild = function() {
		var idx = 0;
		if (this.focusedChild)
			idx = this.children.indexOf(this.focusedChild)

		if (!this.keyNavigationWraps && idx == this.children.length - 1)
			return

		idx = (idx + 1) % this.children.length
		this.currentIndex = idx
		this.focusChild(this.children[idx])
	}

	LayoutPrototype.__create = function(__closure) {
		LayoutBasePrototype.__create.call(this, __closure.__base = { })

	}
	LayoutPrototype.__setup = function(__closure) {
	LayoutBasePrototype.__setup.call(this, __closure.__base); delete __closure.__base
//assigning keyNavigationWraps to (true)
			this._removeUpdater('keyNavigationWraps'); this.keyNavigationWraps = ((true));
//assigning width to (this._get('contentWidth'))
			var update$this$width = (function() { this.width = ((this._get('contentWidth'))); }).bind(this)
			var dep$this$width$0 = this
			this.connectOnChanged(dep$this$width$0, 'contentWidth', update$this$width)
			this._removeUpdater('width', [[dep$this$width$0, 'contentWidth', update$this$width]])
			update$this$width();
//assigning handleNavigationKeys to (true)
			this._removeUpdater('handleNavigationKeys'); this.handleNavigationKeys = ((true));
//assigning height to (this._get('contentHeight'))
			var update$this$height = (function() { this.height = ((this._get('contentHeight'))); }).bind(this)
			var dep$this$height$0 = this
			this.connectOnChanged(dep$this$height$0, 'contentHeight', update$this$height)
			this._removeUpdater('height', [[dep$this$height$0, 'contentHeight', update$this$height]])
			update$this$height();
			this._context._onCompleted((function() { this._delayedLayout.schedule() } ).bind(this))
}


//=====[component core.Column]=====================

	var ColumnBaseComponent = _globals.core.Layout
	var ColumnBasePrototype = ColumnBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.core.Layout}
 */
	var ColumnComponent = _globals.core.Column = function(parent, _delegate) {
		ColumnBaseComponent.apply(this, arguments)

	}
	var ColumnPrototype = ColumnComponent.prototype = Object.create(ColumnBasePrototype)

	ColumnPrototype.constructor = ColumnComponent

	ColumnPrototype.componentName = 'core.Column'
	ColumnPrototype.addChild = function(child) {
		_globals.core.Item.prototype.addChild.apply(this, arguments)

		if (!('height' in child))
			return

		var delayedLayout = this._delayedLayout
		child.onChanged('height', delayedLayout.schedule.bind(delayedLayout))
		child.onChanged('recursiveVisible', delayedLayout.schedule.bind(delayedLayout))
		child.anchors.on('marginsUpdated', delayedLayout.schedule.bind(delayedLayout))
	}
	ColumnPrototype._layout = function() {
		if (!this.recursiveVisible)
			return

		var children = this.children;
		var p = 0
		var w = 0
		this.count = children.length
		for(var i = 0; i < children.length; ++i) {
			var c = children[i]
			if (!('height' in c))
				continue

			var tm = c.anchors.topMargin || c.anchors.margins
			var bm = c.anchors.bottomMargin || c.anchors.margins

			var r = c.x + c.width
			if (r > w)
				w = r
			c.viewY = p + tm
			if (c.recursiveVisible)
				p += c.height + tm + bm + this.spacing
		}
		if (p > 0)
			p -= this.spacing
		this.contentWidth = w
		this.contentHeight = p
	}
	_globals.core._protoOnKey(ColumnPrototype, 'Key', (function(key, event) {
		if (!this.handleNavigationKeys)
			return false;

		switch (key) {
			case 'Up':		this.focusPrevChild(); return true;
			case 'Down':	this.focusNextChild(); return true;
		}
	} ))

//=====[component core.Shadow]=====================

	var ShadowBaseComponent = _globals.core.Object
	var ShadowBasePrototype = ShadowBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	var ShadowComponent = _globals.core.Shadow = function(parent, _delegate) {
		ShadowBaseComponent.apply(this, arguments)

	}
	var ShadowPrototype = ShadowComponent.prototype = Object.create(ShadowBasePrototype)

	ShadowPrototype.constructor = ShadowComponent

	ShadowPrototype.componentName = 'core.Shadow'
	ShadowPrototype._getFilterStyle = function() {
		var style = this.x + "px " + this.y + "px " + this.blur + "px "
		if (this.spread > 0)
			style += this.spread + "px "
		style += _globals.core.normalizeColor(this.color)
		return style
	}
	ShadowPrototype._update = function(name,value) {
		this.parent._updateStyle(true)
		_globals.core.Object.prototype._update.apply(this, arguments);
	}
	ShadowPrototype._empty = function() {
		return !this.x && !this.y && !this.blur && !this.spread;
	}
	core.addProperty(ShadowPrototype, 'real', 'x')
	core.addProperty(ShadowPrototype, 'real', 'y')
	core.addProperty(ShadowPrototype, 'Color', 'color', ("black"))
	core.addProperty(ShadowPrototype, 'real', 'blur')
	core.addProperty(ShadowPrototype, 'real', 'spread')

//=====[component core.BaseViewContent]=====================

	var BaseViewContentBaseComponent = _globals.core.Item
	var BaseViewContentBasePrototype = BaseViewContentBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.core.Item}
 */
	var BaseViewContentComponent = _globals.core.BaseViewContent = function(parent, _delegate) {
		BaseViewContentBaseComponent.apply(this, arguments)

	}
	var BaseViewContentPrototype = BaseViewContentComponent.prototype = Object.create(BaseViewContentBasePrototype)

	BaseViewContentPrototype.constructor = BaseViewContentComponent

	BaseViewContentPrototype.componentName = 'core.BaseViewContent'
	_globals.core._protoOnChanged(BaseViewContentPrototype, 'x', (function(value) { this.parent._delayedLayout.schedule() } ))
	_globals.core._protoOnChanged(BaseViewContentPrototype, 'y', (function(value) { this.parent._delayedLayout.schedule() } ))

//=====[component controls.core.Request]=====================

	var RequestBaseComponent = _globals.core.Object
	var RequestBasePrototype = RequestBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	var RequestComponent = _globals.controls.core.Request = function(parent, _delegate) {
		RequestBaseComponent.apply(this, arguments)

	}
	var RequestPrototype = RequestComponent.prototype = Object.create(RequestBasePrototype)

	RequestPrototype.constructor = RequestComponent

	RequestPrototype.componentName = 'controls.core.Request'
	RequestPrototype.ajax = function(request) {
		var url = request.url
		var error = request.error,
			headers = request.headers,
			done = request.done,
			settings = request.settings

		var xhr = new XMLHttpRequest()

		var self = this
		if (error)
			xhr.addEventListener('error', function(event) { self.loading = false; log("Error"); error(event) })

		if (done)
			xhr.addEventListener('load', function(event) { self.loading = false; done(event) })

		xhr.open(request.method || 'GET', url);

		for (var i in settings)
			xhr[i] = settings[i]

		for (var i in headers)
			xhr.setRequestHeader(i, headers[i])

		this.loading = true
		if (request.data)
			xhr.send(request.data)
		else
			xhr.send()
	}
	core.addProperty(RequestPrototype, 'bool', 'loading', (false))

//=====[component core.Animation]=====================

	var AnimationBaseComponent = _globals.core.Object
	var AnimationBasePrototype = AnimationBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	var AnimationComponent = _globals.core.Animation = function(parent, _delegate) {
		AnimationBaseComponent.apply(this, arguments)
	//custom constructor:
	{ this._disabled = 0 }

	}
	var AnimationPrototype = AnimationComponent.prototype = Object.create(AnimationBasePrototype)

	AnimationPrototype.constructor = AnimationComponent

	AnimationPrototype.componentName = 'core.Animation'
	AnimationPrototype.interpolate = function(dst,src,t) {
		return t * (dst - src) + src;
	}
	AnimationPrototype.disable = function() { ++this._disabled }
	AnimationPrototype.enabled = function() { return this._disabled == 0 }
	AnimationPrototype.complete = function() { }
	AnimationPrototype._update = function(name,value) {
		var parent = this.parent
		if (this._target && parent && parent._updateAnimation)
			parent._updateAnimation(this._target, this.enabled() ? this: null)

		_globals.core.Object.prototype._update.apply(this, arguments)
	}
	AnimationPrototype.enable = function() { --this._disabled }
	core.addProperty(AnimationPrototype, 'int', 'delay', (0))
	core.addProperty(AnimationPrototype, 'int', 'duration', (200))
	core.addProperty(AnimationPrototype, 'bool', 'cssTransition', (true))
	core.addProperty(AnimationPrototype, 'bool', 'running', (false))
	core.addProperty(AnimationPrototype, 'string', 'easing', ("ease"))

//=====[component controls.input.BaseInput]=====================

	var BaseInputBaseComponent = _globals.core.Item
	var BaseInputBasePrototype = BaseInputBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.core.Item}
 */
	var BaseInputComponent = _globals.controls.input.BaseInput = function(parent, _delegate) {
		BaseInputBaseComponent.apply(this, arguments)
	//custom constructor:
	{
		this._placeholderClass = ''
		this.element.on("focus", function() { this.activeFocus = true; }.bind(this))
		this.element.on("blur", function() { this.activeFocus = false; }.bind(this))
	}

	}
	var BaseInputPrototype = BaseInputComponent.prototype = Object.create(BaseInputBasePrototype)

	BaseInputPrototype.constructor = BaseInputComponent

	BaseInputPrototype.componentName = 'controls.input.BaseInput'
	BaseInputPrototype._update = function(name,value) {
		switch (name) {
			case 'type': this.element.dom.type = value; break
			case 'width': this._updateSize(); break
			case 'height': this._updateSize(); break
			case 'color': this.style('color', value); break
			case 'backgroundColor': this.style('background', value); break
			case 'horizontalAlignment':
				switch(value) {
				case this.AlignLeft:	this.style('text-align', 'left'); break
				case this.AlignRight:	this.style('text-align', 'right'); break
				case this.AlignHCenter:	this.style('text-align', 'center'); break
				case this.AlignJustify:	this.style('text-align', 'justify'); break
				}
				break
		}

		_globals.core.Item.prototype._update.apply(this, arguments);
	}
	BaseInputPrototype.getTag = function() { return 'input' }
	BaseInputPrototype.registerStyle = function(style) {
		style.addRule('input', "position: absolute; visibility: inherit; border-style: solid; border-width: 0px; box-sizing: border-box;")
		style.addRule('input:focus', "outline: none;")
	}
	BaseInputPrototype._updateSize = function() {
		var style = { width: this.width, height: this.height }
		this.style(style)
	}
	core.addProperty(BaseInputPrototype, 'Paddings', 'paddings')
	core.addProperty(BaseInputPrototype, 'Color', 'color', ("#000"))
	core.addProperty(BaseInputPrototype, 'Color', 'backgroundColor', ("#fff"))
	core.addProperty(BaseInputPrototype, 'Font', 'font')
	core.addProperty(BaseInputPrototype, 'Border', 'border')
	core.addProperty(BaseInputPrototype, 'string', 'type', ("text"))
	core.addProperty(BaseInputPrototype, 'PlaceHolder', 'placeholder')
/** @const @type {number} */
	BaseInputPrototype.AlignLeft = 0
/** @const @type {number} */
	BaseInputComponent.AlignLeft = 0
/** @const @type {number} */
	BaseInputPrototype.AlignRight = 1
/** @const @type {number} */
	BaseInputComponent.AlignRight = 1
/** @const @type {number} */
	BaseInputPrototype.AlignHCenter = 2
/** @const @type {number} */
	BaseInputComponent.AlignHCenter = 2
/** @const @type {number} */
	BaseInputPrototype.Justify = 3
/** @const @type {number} */
	BaseInputComponent.Justify = 3
	core.addProperty(BaseInputPrototype, 'enum', 'horizontalAlignment')
	_globals.core._protoOnChanged(BaseInputPrototype, 'activeFocus', (function(value) {
		if (value)
			this.element.dom.select()
		else
			this.element.dom.blur()
	} ))
	_globals.core._protoOnChanged(BaseInputPrototype, 'recursiveVisible', (function(value) {
		if (!value)
			this.element.dom.blur()
	} ))

	BaseInputPrototype.__create = function(__closure) {
		BaseInputBasePrototype.__create.call(this, __closure.__base = { })
//creating component controls.input.<anonymous>
		var this$placeholder = new _globals.controls.core.PlaceHolder(this)
		__closure.this$placeholder = this$placeholder

//creating component PlaceHolder
		this$placeholder.__create(__closure.__closure_this$placeholder = { })

		this.placeholder = this$placeholder
//creating component controls.input.<anonymous>
		var this$font = new _globals.core.Font(this)
		__closure.this$font = this$font

//creating component Font
		this$font.__create(__closure.__closure_this$font = { })

		this.font = this$font
//creating component controls.input.<anonymous>
		var this$border = new _globals.core.Border(this)
		__closure.this$border = this$border

//creating component Border
		this$border.__create(__closure.__closure_this$border = { })

		this.border = this$border
//creating component controls.input.<anonymous>
		var this$paddings = new _globals.controls.core.Paddings(this)
		__closure.this$paddings = this$paddings

//creating component Paddings
		this$paddings.__create(__closure.__closure_this$paddings = { })

		this.paddings = this$paddings
	}
	BaseInputPrototype.__setup = function(__closure) {
	BaseInputBasePrototype.__setup.call(this, __closure.__base); delete __closure.__base
//setting up component PlaceHolder
			var this$placeholder = __closure.this$placeholder
			this$placeholder.__setup(__closure.__closure_this$placeholder)
			delete __closure.__closure_this$placeholder



//setting up component Font
			var this$font = __closure.this$font
			this$font.__setup(__closure.__closure_this$font)
			delete __closure.__closure_this$font



//setting up component Border
			var this$border = __closure.this$border
			this$border.__setup(__closure.__closure_this$border)
			delete __closure.__closure_this$border



//setting up component Paddings
			var this$paddings = __closure.this$paddings
			this$paddings.__setup(__closure.__closure_this$paddings)
			delete __closure.__closure_this$paddings
}


//=====[component controls.input.TextInput]=====================

	var TextInputBaseComponent = _globals.controls.input.BaseInput
	var TextInputBasePrototype = TextInputBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.controls.input.BaseInput}
 */
	var TextInputComponent = _globals.controls.input.TextInput = function(parent, _delegate) {
		TextInputBaseComponent.apply(this, arguments)
	//custom constructor:
	{
		this.element.on("input", function() { this.text = this.element.dom.value }.bind(this))
	}

	}
	var TextInputPrototype = TextInputComponent.prototype = Object.create(TextInputBasePrototype)

	TextInputPrototype.constructor = TextInputComponent

	TextInputPrototype.componentName = 'controls.input.TextInput'
	TextInputPrototype._update = function(name,value) {
		switch (name) {
			case 'text': if (value != this.element.dom.value) this.element.dom.value = value; break
		}
		_globals.controls.input.BaseInput.prototype._update.apply(this, arguments);
	}
	core.addProperty(TextInputPrototype, 'string', 'text')
	core.addProperty(TextInputPrototype, 'bool', 'passwordMode', (false))
	_globals.core._protoOnChanged(TextInputPrototype, 'activeFocus', (function(value) {
		if (value) {
			this.element.dom.select()
			var len = this.text.length
			this.element.dom.setSelectionRange(len, len)
		} else {
			this.element.dom.blur()
		}
	} ))

	TextInputPrototype.__create = function(__closure) {
		TextInputBasePrototype.__create.call(this, __closure.__base = { })

	}
	TextInputPrototype.__setup = function(__closure) {
	TextInputBasePrototype.__setup.call(this, __closure.__base); delete __closure.__base
//assigning width to (173)
			this._removeUpdater('width'); this.width = ((173));
//assigning type to (this._get('passwordMode') ? "password" : "text")
			var update$this$type = (function() { this.type = ((this._get('passwordMode') ? "password" : "text")); }).bind(this)
			var dep$this$type$0 = this
			this.connectOnChanged(dep$this$type$0, 'passwordMode', update$this$type)
			this._removeUpdater('type', [[dep$this$type$0, 'passwordMode', update$this$type]])
			update$this$type();
//assigning height to (20)
			this._removeUpdater('height'); this.height = ((20));
}


//=====[component core.System]=====================

	var SystemBaseComponent = _globals.core.Object
	var SystemBasePrototype = SystemBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	var SystemComponent = _globals.core.System = function(parent, _delegate) {
		SystemBaseComponent.apply(this, arguments)
	//custom constructor:
	{
		var ctx = this._context
		this.browser = _globals.core.browser
		this.userAgent = _globals.core.userAgent
		this.webkit = this.userAgent.toLowerCase().indexOf('webkit') >= 0
		this.device = _globals.core.device
		this.vendor = _globals.core.vendor
		this.os = _globals.core.os
		this.language = _globals.core.language
		ctx.language = this.language.replace('-', '_')

		this.support3dTransforms = ctx.backend.capabilities.csstransforms3d || false
		this.supportTransforms = ctx.backend.capabilities.csstransforms || false
		this.supportTransitions = ctx.backend.capabilities.csstransitions || false

		this.screenWidth = window.screen.width
		this.screenHeight = window.screen.height
	}

	}
	var SystemPrototype = SystemComponent.prototype = Object.create(SystemBasePrototype)

	SystemPrototype.constructor = SystemComponent

	SystemPrototype.componentName = 'core.System'
	SystemPrototype._updateLayoutType = function() {
		if (!this.contextWidth || !this.contextHeight)
			return
		var min = this.contextWidth;// < this.contextHeight ? this.contextWidth : this.contextHeight

		if (min <= 320)
			this.layoutType = this.MobileS
		else if (min <= 375)
			this.layoutType = this.MobileM
		else if (min <= 425)
			this.layoutType = this.MobileL
		else if (min <= 768)
			this.layoutType = this.Tablet
		else if (this.contextWidth <= 1024)
			this.layoutType = this.Laptop
		else if (this.contextWidth <= 1440)
			this.layoutType = this.LaptopL
		else
			this.layoutType = this.Laptop4K
	}
	core.addProperty(SystemPrototype, 'string', 'userAgent')
	core.addProperty(SystemPrototype, 'string', 'language')
	core.addProperty(SystemPrototype, 'string', 'browser')
	core.addProperty(SystemPrototype, 'string', 'vendor')
	core.addProperty(SystemPrototype, 'string', 'os')
	core.addProperty(SystemPrototype, 'bool', 'webkit')
	core.addProperty(SystemPrototype, 'bool', 'support3dTransforms')
	core.addProperty(SystemPrototype, 'bool', 'supportTransforms')
	core.addProperty(SystemPrototype, 'bool', 'supportTransitions')
	core.addProperty(SystemPrototype, 'bool', 'portrait')
	core.addProperty(SystemPrototype, 'bool', 'landscape')
	core.addProperty(SystemPrototype, 'bool', 'pageActive', (true))
	core.addProperty(SystemPrototype, 'int', 'screenWidth')
	core.addProperty(SystemPrototype, 'int', 'screenHeight')
	core.addProperty(SystemPrototype, 'int', 'contextWidth')
	core.addProperty(SystemPrototype, 'int', 'contextHeight')
/** @const @type {number} */
	SystemPrototype.Desktop = 0
/** @const @type {number} */
	SystemComponent.Desktop = 0
/** @const @type {number} */
	SystemPrototype.Tv = 1
/** @const @type {number} */
	SystemComponent.Tv = 1
/** @const @type {number} */
	SystemPrototype.Mobile = 2
/** @const @type {number} */
	SystemComponent.Mobile = 2
	core.addProperty(SystemPrototype, 'enum', 'device')
/** @const @type {number} */
	SystemPrototype.MobileS = 0
/** @const @type {number} */
	SystemComponent.MobileS = 0
/** @const @type {number} */
	SystemPrototype.MobileM = 1
/** @const @type {number} */
	SystemComponent.MobileM = 1
/** @const @type {number} */
	SystemPrototype.MobileL = 2
/** @const @type {number} */
	SystemComponent.MobileL = 2
/** @const @type {number} */
	SystemPrototype.Tablet = 3
/** @const @type {number} */
	SystemComponent.Tablet = 3
/** @const @type {number} */
	SystemPrototype.Laptop = 4
/** @const @type {number} */
	SystemComponent.Laptop = 4
/** @const @type {number} */
	SystemPrototype.LaptopL = 5
/** @const @type {number} */
	SystemComponent.LaptopL = 5
/** @const @type {number} */
	SystemPrototype.Laptop4K = 6
/** @const @type {number} */
	SystemComponent.Laptop4K = 6
	core.addProperty(SystemPrototype, 'enum', 'layoutType')
	_globals.core._protoOnChanged(SystemPrototype, 'contextHeight', (function(value) { this._updateLayoutType() } ))
	_globals.core._protoOnChanged(SystemPrototype, 'contextWidth', (function(value) { this._updateLayoutType() } ))

	SystemPrototype.__create = function(__closure) {
		SystemBasePrototype.__create.call(this, __closure.__base = { })

	}
	SystemPrototype.__setup = function(__closure) {
	SystemBasePrototype.__setup.call(this, __closure.__base); delete __closure.__base
//assigning portrait to (this._get('parent')._get('width') < this._get('parent')._get('height'))
			var update$this$portrait = (function() { this.portrait = ((this._get('parent')._get('width') < this._get('parent')._get('height'))); }).bind(this)
			var dep$this$portrait$0 = this._get('parent')
			this.connectOnChanged(dep$this$portrait$0, 'height', update$this$portrait)
			var dep$this$portrait$1 = this._get('parent')
			this.connectOnChanged(dep$this$portrait$1, 'width', update$this$portrait)
			this._removeUpdater('portrait', [[dep$this$portrait$0, 'height', update$this$portrait],[dep$this$portrait$1, 'width', update$this$portrait]])
			update$this$portrait();
//assigning contextWidth to (this._get('context')._get('width'))
			var update$this$contextWidth = (function() { this.contextWidth = ((this._get('context')._get('width'))); }).bind(this)
			var dep$this$contextWidth$0 = this._get('context')
			this.connectOnChanged(dep$this$contextWidth$0, 'width', update$this$contextWidth)
			this._removeUpdater('contextWidth', [[dep$this$contextWidth$0, 'width', update$this$contextWidth]])
			update$this$contextWidth();
//assigning landscape to (! this._get('portrait'))
			var update$this$landscape = (function() { this.landscape = ((! this._get('portrait'))); }).bind(this)
			var dep$this$landscape$0 = this
			this.connectOnChanged(dep$this$landscape$0, 'portrait', update$this$landscape)
			this._removeUpdater('landscape', [[dep$this$landscape$0, 'portrait', update$this$landscape]])
			update$this$landscape();
//assigning contextHeight to (this._get('context')._get('height'))
			var update$this$contextHeight = (function() { this.contextHeight = ((this._get('context')._get('height'))); }).bind(this)
			var dep$this$contextHeight$0 = this._get('context')
			this.connectOnChanged(dep$this$contextHeight$0, 'height', update$this$contextHeight)
			this._removeUpdater('contextHeight', [[dep$this$contextHeight$0, 'height', update$this$contextHeight]])
			update$this$contextHeight();
}


//=====[component controls.core.Paddings]=====================

	var PaddingsBaseComponent = _globals.core.Object
	var PaddingsBasePrototype = PaddingsBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	var PaddingsComponent = _globals.controls.core.Paddings = function(parent, _delegate) {
		PaddingsBaseComponent.apply(this, arguments)

	}
	var PaddingsPrototype = PaddingsComponent.prototype = Object.create(PaddingsBasePrototype)

	PaddingsPrototype.constructor = PaddingsComponent

	PaddingsPrototype.componentName = 'controls.core.Paddings'
	PaddingsPrototype._update = function(name,value) {
		switch(name) {
			case 'left': this.parent.style('padding-left', value); break;
			case 'right': this.parent.style('padding-right', value); break;
			case 'top': this.parent.style('padding-top', value); break;
			case 'bottom': this.parent.style('padding-bottom', value); break;
		}
		_globals.core.Object.prototype._update.apply(this, arguments)
	}
	core.addProperty(PaddingsPrototype, 'int', 'left')
	core.addProperty(PaddingsPrototype, 'int', 'right')
	core.addProperty(PaddingsPrototype, 'int', 'top')
	core.addProperty(PaddingsPrototype, 'int', 'bottom')
	core.addProperty(PaddingsPrototype, 'int', 'all')

	PaddingsPrototype.__create = function(__closure) {
		PaddingsBasePrototype.__create.call(this, __closure.__base = { })

	}
	PaddingsPrototype.__setup = function(__closure) {
	PaddingsBasePrototype.__setup.call(this, __closure.__base); delete __closure.__base
//assigning top to (this._get('all'))
			var update$this$top = (function() { this.top = ((this._get('all'))); }).bind(this)
			var dep$this$top$0 = this
			this.connectOnChanged(dep$this$top$0, 'all', update$this$top)
			this._removeUpdater('top', [[dep$this$top$0, 'all', update$this$top]])
			update$this$top();
//assigning right to (this._get('all'))
			var update$this$right = (function() { this.right = ((this._get('all'))); }).bind(this)
			var dep$this$right$0 = this
			this.connectOnChanged(dep$this$right$0, 'all', update$this$right)
			this._removeUpdater('right', [[dep$this$right$0, 'all', update$this$right]])
			update$this$right();
//assigning bottom to (this._get('all'))
			var update$this$bottom = (function() { this.bottom = ((this._get('all'))); }).bind(this)
			var dep$this$bottom$0 = this
			this.connectOnChanged(dep$this$bottom$0, 'all', update$this$bottom)
			this._removeUpdater('bottom', [[dep$this$bottom$0, 'all', update$this$bottom]])
			update$this$bottom();
//assigning left to (this._get('all'))
			var update$this$left = (function() { this.left = ((this._get('all'))); }).bind(this)
			var dep$this$left$0 = this
			this.connectOnChanged(dep$this$left$0, 'all', update$this$left)
			this._removeUpdater('left', [[dep$this$left$0, 'all', update$this$left]])
			update$this$left();
}


//=====[component controls.TheOPlayer]=====================

	var TheOPlayerBaseComponent = _globals.core.Item
	var TheOPlayerBasePrototype = TheOPlayerBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.core.Item}
 */
	var TheOPlayerComponent = _globals.controls.TheOPlayer = function(parent, _delegate) {
		TheOPlayerBaseComponent.apply(this, arguments)
	//custom constructor:
	{
		this.element.setAttribute('class', 'theoplayer-container video-js theoplayer-skin theo-seekbar-above-controls')

		var element = document.querySelector('.theoplayer-container'); 
		this._player = new window.THEOplayer.Player(element, { 
			libraryLocation : ''
		});

		// this._player.source = {
		// 	sources : [{
		// 		src : '//cdn.theoplayer.com/video/star_wars_episode_vii-the_force_awakens_official_comic-con_2015_reel_(2015)/index.m3u8',
		// 		type : 'application/x-mpegurl'
		// 	}]
		// };
	}

	}
	var TheOPlayerPrototype = TheOPlayerComponent.prototype = Object.create(TheOPlayerBasePrototype)

	TheOPlayerPrototype.constructor = TheOPlayerComponent

	TheOPlayerPrototype.componentName = 'controls.TheOPlayer'
	TheOPlayerPrototype.finished = _globals.core.createSignal('finished')
	TheOPlayerPrototype.error = _globals.core.createSignal('error')
	TheOPlayerPrototype.play = function(state) {
		// this._player.play(state)
	}
	TheOPlayerPrototype.loadPlaylist = function(pl) {

	}
	core.addProperty(TheOPlayerPrototype, 'string', 'source')
	core.addProperty(TheOPlayerPrototype, 'Color', 'backgroundColor', ("#000"))
	core.addProperty(TheOPlayerPrototype, 'float', 'volume', (1.0))
	core.addProperty(TheOPlayerPrototype, 'bool', 'loop', (false))
	core.addProperty(TheOPlayerPrototype, 'bool', 'ready', (false))
	core.addProperty(TheOPlayerPrototype, 'bool', 'muted', (false))
	core.addProperty(TheOPlayerPrototype, 'bool', 'paused', (false))
	core.addProperty(TheOPlayerPrototype, 'bool', 'waiting', (false))
	core.addProperty(TheOPlayerPrototype, 'bool', 'seeking', (false))
	core.addProperty(TheOPlayerPrototype, 'bool', 'autoPlay', (false))
	core.addProperty(TheOPlayerPrototype, 'int', 'duration')
	core.addProperty(TheOPlayerPrototype, 'int', 'progress')
	core.addProperty(TheOPlayerPrototype, 'int', 'buffered')
	core.addProperty(TheOPlayerPrototype, 'bool', 'logsEnabled')
	_globals.core._protoOnChanged(TheOPlayerPrototype, 'source', (function(value) {
		this._player.source = {
			sources : [{
				src : value,
				type : 'application/x-mpegurl'
			}]
		};
	} ))
	_globals.core._protoOnChanged(TheOPlayerPrototype, 'width', (function(value) { this.element.dom.width = value; } ))
	_globals.core._protoOnChanged(TheOPlayerPrototype, 'height', (function(value) { this.element.dom.height = value; } ))

	TheOPlayerPrototype.__create = function(__closure) {
		TheOPlayerBasePrototype.__create.call(this, __closure.__base = { })

	}
	TheOPlayerPrototype.__setup = function(__closure) {
	TheOPlayerBasePrototype.__setup.call(this, __closure.__base); delete __closure.__base
//assigning width to (640)
			this._removeUpdater('width'); this.width = ((640));
//assigning logsEnabled to (this._get('recursiveVisible'))
			var update$this$logsEnabled = (function() { this.logsEnabled = ((this._get('recursiveVisible'))); }).bind(this)
			var dep$this$logsEnabled$0 = this
			this.connectOnChanged(dep$this$logsEnabled$0, 'recursiveVisible', update$this$logsEnabled)
			this._removeUpdater('logsEnabled', [[dep$this$logsEnabled$0, 'recursiveVisible', update$this$logsEnabled]])
			update$this$logsEnabled();
//assigning height to (480)
			this._removeUpdater('height'); this.height = ((480));
}


//=====[component src.UiApp]=====================

	var UiAppBaseComponent = _globals.core.Item
	var UiAppBasePrototype = UiAppBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.core.Item}
 */
	var UiAppComponent = _globals.src.UiApp = function(parent, _delegate) {
		UiAppBaseComponent.apply(this, arguments)

	}
	var UiAppPrototype = UiAppComponent.prototype = Object.create(UiAppBasePrototype)

	UiAppPrototype.constructor = UiAppComponent

	UiAppPrototype.componentName = 'src.UiApp'

	UiAppPrototype.__create = function(__closure) {
		UiAppBasePrototype.__create.call(this, __closure.__base = { })
var this$child0 = new _globals.controls.core.Resource(this)
		__closure.this$child0 = this$child0

//creating component Resource
		this$child0.__create(__closure.__closure_this$child0 = { })
		this$child0._setId('resource')
		var this$child1 = new _globals.controls.input.TextInput(this)
		__closure.this$child1 = this$child1

//creating component TextInput
		this$child1.__create(__closure.__closure_this$child1 = { })

		var this$child2 = new _globals.core.Column(this)
		__closure.this$child2 = this$child2

//creating component Column
		this$child2.__create(__closure.__closure_this$child2 = { })
		var this_child2$child0 = new _globals.src.TextButton(this$child2)
		__closure.this_child2$child0 = this_child2$child0

//creating component TextButton
		this_child2$child0.__create(__closure.__closure_this_child2$child0 = { })

		var this_child2$child1 = new _globals.controls.ShakaPlayer(this$child2)
		__closure.this_child2$child1 = this_child2$child1

//creating component ShakaPlayer
		this_child2$child1.__create(__closure.__closure_this_child2$child1 = { })
		this_child2$child1._setId('shakap')
		var this_child2$child2 = new _globals.src.TextButton(this$child2)
		__closure.this_child2$child2 = this_child2$child2

//creating component TextButton
		this_child2$child2.__create(__closure.__closure_this_child2$child2 = { })

		var this_child2$child3 = new _globals.core.Item(this$child2)
		__closure.this_child2$child3 = this_child2$child3

//creating component Item
		this_child2$child3.__create(__closure.__closure_this_child2$child3 = { })
		var this_child2_child3$child0 = new _globals.controls.JWPlayer(this_child2$child3)
		__closure.this_child2_child3$child0 = this_child2_child3$child0

//creating component JWPlayer
		this_child2_child3$child0.__create(__closure.__closure_this_child2_child3$child0 = { })
		this_child2_child3$child0._setId('jwp')
		var this_child2$child4 = new _globals.src.TextButton(this$child2)
		__closure.this_child2$child4 = this_child2$child4

//creating component TextButton
		this_child2$child4.__create(__closure.__closure_this_child2$child4 = { })

		var this_child2$child5 = new _globals.core.Item(this$child2)
		__closure.this_child2$child5 = this_child2$child5

//creating component Item
		this_child2$child5.__create(__closure.__closure_this_child2$child5 = { })
		var this_child2_child5$child0 = new _globals.controls.Bitmovin(this_child2$child5)
		__closure.this_child2_child5$child0 = this_child2_child5$child0

//creating component Bitmovin
		this_child2_child5$child0.__create(__closure.__closure_this_child2_child5$child0 = { })
		this_child2_child5$child0._setId('btm')
		var this_child2$child6 = new _globals.src.TextButton(this$child2)
		__closure.this_child2$child6 = this_child2$child6

//creating component TextButton
		this_child2$child6.__create(__closure.__closure_this_child2$child6 = { })

		var this_child2$child7 = new _globals.core.Item(this$child2)
		__closure.this_child2$child7 = this_child2$child7

//creating component Item
		this_child2$child7.__create(__closure.__closure_this_child2$child7 = { })
		var this_child2_child7$child0 = new _globals.controls.TheOPlayer(this_child2$child7)
		__closure.this_child2_child7$child0 = this_child2_child7$child0

//creating component TheOPlayer
		this_child2_child7$child0.__create(__closure.__closure_this_child2_child7$child0 = { })
		this_child2_child7$child0._setId('theo')
		var this_child2$child8 = new _globals.src.TextButton(this$child2)
		__closure.this_child2$child8 = this_child2$child8

//creating component TextButton
		this_child2$child8.__create(__closure.__closure_this_child2$child8 = { })

		var this_child2$child9 = new _globals.core.Item(this$child2)
		__closure.this_child2$child9 = this_child2$child9

//creating component Item
		this_child2$child9.__create(__closure.__closure_this_child2$child9 = { })
		var this_child2_child9$child0 = new _globals.controls.VideoJS(this_child2$child9)
		__closure.this_child2_child9$child0 = this_child2_child9$child0

//creating component VideoJS
		this_child2_child9$child0.__create(__closure.__closure_this_child2_child9$child0 = { })
		this_child2_child9$child0._setId('vjs')
		this$child2._setId('playerRect')
		var this$child3 = new _globals.core.Rectangle(this)
		__closure.this$child3 = this$child3

//creating component Rectangle
		this$child3.__create(__closure.__closure_this$child3 = { })
		var this_child3$child0 = new _globals.controls.mixins.OverflowMixin(this$child3)
		__closure.this_child3$child0 = this_child3$child0

//creating component OverflowMixin
		this_child3$child0.__create(__closure.__closure_this_child3$child0 = { })

		var this_child3$child1 = new _globals.core.ListView(this$child3)
		__closure.this_child3$child1 = this_child3$child1

//creating component ListView
		this_child3$child1.__create(__closure.__closure_this_child3$child1 = { })
		this_child3$child1.delegate = (function(__parent) {
		var delegate = new _globals.controls.web.WebItem(__parent, true)
		var __closure = { delegate: delegate }

//creating component WebItem
			delegate.__create(__closure.__closure_delegate = { })
	core.addProperty(delegate, 'string', 'videoUrl')
			var delegate$child0 = new _globals.core.Image(delegate)
			__closure.delegate$child0 = delegate$child0

//creating component Image
			delegate$child0.__create(__closure.__closure_delegate$child0 = { })

			var delegate$child1 = new _globals.core.Text(delegate)
			__closure.delegate$child1 = delegate$child1

//creating component Text
			delegate$child1.__create(__closure.__closure_delegate$child1 = { })


//setting up component WebItem
			var delegate = __closure.delegate
			delegate.__setup(__closure.__closure_delegate)
			delete __closure.__closure_delegate

//assigning width to ((this._get('parent')._get('width') * ((100) / 100)))
			var update$delegate$width = (function() { delegate.width = (((this._get('parent')._get('width') * ((100) / 100)))); }).bind(delegate)
			var dep$delegate$width$0 = delegate._get('parent')
			delegate.connectOnChanged(dep$delegate$width$0, 'width', update$delegate$width)
			delegate._removeUpdater('width', [[dep$delegate$width$0, 'width', update$delegate$width]])
			update$delegate$width();
//assigning videoUrl to (this._get('model').file)
			var update$delegate$videoUrl = (function() { delegate.videoUrl = ((this._get('model').file)); }).bind(delegate)
			var dep$delegate$videoUrl$0 = delegate._get('_delegate')
			delegate.connectOnChanged(dep$delegate$videoUrl$0, '_row', update$delegate$videoUrl)
			delegate._removeUpdater('videoUrl', [[dep$delegate$videoUrl$0, '_row', update$delegate$videoUrl]])
			update$delegate$videoUrl();
//assigning height to (100)
			delegate._removeUpdater('height'); delegate.height = ((100));
			delegate.on('clicked', (function() {
					this._get('btm').source = this.videoUrl;
				} ).bind(delegate))


//setting up component Image
			var delegate$child0 = __closure.delegate$child0
			delegate$child0.__setup(__closure.__closure_delegate$child0)
			delete __closure.__closure_delegate$child0

//assigning source to (this._get('model').image)
			var update$delegate_child0$source = (function() { delegate$child0.source = ((this._get('model').image)); }).bind(delegate$child0)
			var dep$delegate_child0$source$0 = delegate$child0._get('_delegate')
			delegate$child0.connectOnChanged(dep$delegate_child0$source$0, '_row', update$delegate_child0$source)
			delegate$child0._removeUpdater('source', [[dep$delegate_child0$source$0, '_row', update$delegate_child0$source]])
			update$delegate_child0$source();
//assigning height to ((this._get('parent')._get('height') * ((100) / 100)))
			var update$delegate_child0$height = (function() { delegate$child0.height = (((this._get('parent')._get('height') * ((100) / 100)))); }).bind(delegate$child0)
			var dep$delegate_child0$height$0 = delegate$child0._get('parent')
			delegate$child0.connectOnChanged(dep$delegate_child0$height$0, 'height', update$delegate_child0$height)
			delegate$child0._removeUpdater('height', [[dep$delegate_child0$height$0, 'height', update$delegate_child0$height]])
			update$delegate_child0$height();

			delegate.addChild(delegate$child0)

//setting up component Text
			var delegate$child1 = __closure.delegate$child1
			delegate$child1.__setup(__closure.__closure_delegate$child1)
			delete __closure.__closure_delegate$child1

//assigning y to (10)
			delegate$child1._removeUpdater('y'); delegate$child1.y = ((10));
//assigning x to (this._get('parent')._get('height') * 2)
			var update$delegate_child1$x = (function() { delegate$child1.x = ((this._get('parent')._get('height') * 2)); }).bind(delegate$child1)
			var dep$delegate_child1$x$0 = delegate$child1._get('parent')
			delegate$child1.connectOnChanged(dep$delegate_child1$x$0, 'height', update$delegate_child1$x)
			delegate$child1._removeUpdater('x', [[dep$delegate_child1$x$0, 'height', update$delegate_child1$x]])
			update$delegate_child1$x();
//assigning text to (this._get('model').title)
			var update$delegate_child1$text = (function() { delegate$child1.text = ((this._get('model').title)); }).bind(delegate$child1)
			var dep$delegate_child1$text$0 = delegate$child1._get('_delegate')
			delegate$child1.connectOnChanged(dep$delegate_child1$text$0, '_row', update$delegate_child1$text)
			delegate$child1._removeUpdater('text', [[dep$delegate_child1$text$0, '_row', update$delegate_child1$text]])
			update$delegate_child1$text();

			delegate.addChild(delegate$child1)

		return delegate
})
//creating component src.<anonymous>
		var this_child3_child1$model = new _globals.core.ListModel(this_child3$child1)
		__closure.this_child3_child1$model = this_child3_child1$model

//creating component ListModel
		this_child3_child1$model.__create(__closure.__closure_this_child3_child1$model = { })

		this_child3$child1.model = this_child3_child1$model
		this_child3$child1._setId('plView')
	}
	UiAppPrototype.__setup = function(__closure) {
	UiAppBasePrototype.__setup.call(this, __closure.__base); delete __closure.__base
//assigning anchors.fill to (this._get('context'))
			var update$this$anchors_fill = (function() { this._get('anchors').fill = ((this._get('context'))); }).bind(this)
			var dep$this$anchors_fill$0 = this
			this.connectOnChanged(dep$this$anchors_fill$0, 'context', update$this$anchors_fill)
			this._removeUpdater('anchors.fill', [[dep$this$anchors_fill$0, 'context', update$this$anchors_fill]])
			update$this$anchors_fill();


//setting up component Resource
			var this$child0 = __closure.this$child0
			this$child0.__setup(__closure.__closure_this$child0)
			delete __closure.__closure_this$child0

			this$child0.onChanged('data', (function(value) {
			var playlist = [];
			var plModel = []
			var obj = JSON.parse(value);
			log(obj)
			var items = obj.items[0].items;
			for (var index in items)
			{
				let item = items[index]
				playlist.push({
					title: item.title,
					file: item.video_src,
					image: '\"' + item.packshot.image_1x + '\"',
					description: item.description 
					})
				plModel.push({
					title: item.title,
					file: item.video_src,
					image: item.packshot.image_1x,
					description: item.description 
					})

			}

			log("playlist", playlist)

			this._get('jwp').loadPlaylist(playlist)

			this._get('btm').source = playlist[0].file
			this._get('theo').source = playlist[0].file

			this._get('plView').model.append(plModel)

		} ).bind(this$child0))

			this.addChild(this$child0)

//setting up component TextInput
			var this$child1 = __closure.this$child1
			this$child1.__setup(__closure.__closure_this$child1)
			delete __closure.__closure_this$child1

//assigning y to (20)
			this$child1._removeUpdater('y'); this$child1.y = ((20));
//assigning x to ((this._get('parent')._get('width') * ((5) / 100)))
			var update$this_child1$x = (function() { this$child1.x = (((this._get('parent')._get('width') * ((5) / 100)))); }).bind(this$child1)
			var dep$this_child1$x$0 = this$child1._get('parent')
			this$child1.connectOnChanged(dep$this_child1$x$0, 'width', update$this_child1$x)
			this$child1._removeUpdater('x', [[dep$this_child1$x$0, 'width', update$this_child1$x]])
			update$this_child1$x();
//assigning placeholder.text to ("Series test URL")
			this$child1._removeUpdater('placeholder.text'); this$child1._get('placeholder').text = (("Series test URL"));
//assigning width to ((this._get('parent')._get('width') * ((90) / 100)))
			var update$this_child1$width = (function() { this$child1.width = (((this._get('parent')._get('width') * ((90) / 100)))); }).bind(this$child1)
			var dep$this_child1$width$0 = this$child1._get('parent')
			this$child1.connectOnChanged(dep$this_child1$width$0, 'width', update$this_child1$width)
			this$child1._removeUpdater('width', [[dep$this_child1$width$0, 'width', update$this_child1$width]])
			update$this_child1$width();
			this$child1.onChanged('text', (function(value) {
			this._get('resource').url = value;
		} ).bind(this$child1))

			this.addChild(this$child1)

//setting up component Column
			var this$child2 = __closure.this$child2
			this$child2.__setup(__closure.__closure_this$child2)
			delete __closure.__closure_this$child2

//assigning y to (80)
			this$child2._removeUpdater('y'); this$child2.y = ((80));
//assigning width to ((this._get('parent')._get('width') * ((60) / 100)))
			var update$this_child2$width = (function() { this$child2.width = (((this._get('parent')._get('width') * ((60) / 100)))); }).bind(this$child2)
			var dep$this_child2$width$0 = this$child2._get('parent')
			this$child2.connectOnChanged(dep$this_child2$width$0, 'width', update$this_child2$width)
			this$child2._removeUpdater('width', [[dep$this_child2$width$0, 'width', update$this_child2$width]])
			update$this_child2$width();
//assigning spacing to (20)
			this$child2._removeUpdater('spacing'); this$child2.spacing = ((20));
//assigning x to ((this._get('parent')._get('width') * ((5) / 100)))
			var update$this_child2$x = (function() { this$child2.x = (((this._get('parent')._get('width') * ((5) / 100)))); }).bind(this$child2)
			var dep$this_child2$x$0 = this$child2._get('parent')
			this$child2.connectOnChanged(dep$this_child2$x$0, 'width', update$this_child2$x)
			this$child2._removeUpdater('x', [[dep$this_child2$x$0, 'width', update$this_child2$x]])
			update$this_child2$x();


//setting up component TextButton
			var this_child2$child0 = __closure.this_child2$child0
			this_child2$child0.__setup(__closure.__closure_this_child2$child0)
			delete __closure.__closure_this_child2$child0

//assigning text to ("Shaka-Player")
			this_child2$child0._removeUpdater('text'); this_child2$child0.text = (("Shaka-Player"));

			this$child2.addChild(this_child2$child0)

//setting up component ShakaPlayer
			var this_child2$child1 = __closure.this_child2$child1
			this_child2$child1.__setup(__closure.__closure_this_child2$child1)
			delete __closure.__closure_this_child2$child1

//assigning source to ("//storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd")
			this_child2$child1._removeUpdater('source'); this_child2$child1.source = (("//storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd"));
//assigning width to ((this._get('parent')._get('width') * ((100) / 100)))
			var update$this_child2_child1$width = (function() { this_child2$child1.width = (((this._get('parent')._get('width') * ((100) / 100)))); }).bind(this_child2$child1)
			var dep$this_child2_child1$width$0 = this_child2$child1._get('parent')
			this_child2$child1.connectOnChanged(dep$this_child2_child1$width$0, 'width', update$this_child2_child1$width)
			this_child2$child1._removeUpdater('width', [[dep$this_child2_child1$width$0, 'width', update$this_child2_child1$width]])
			update$this_child2_child1$width();
//assigning height to (this._get('width') * 0.75)
			var update$this_child2_child1$height = (function() { this_child2$child1.height = ((this._get('width') * 0.75)); }).bind(this_child2$child1)
			var dep$this_child2_child1$height$0 = this_child2$child1
			this_child2$child1.connectOnChanged(dep$this_child2_child1$height$0, 'width', update$this_child2_child1$height)
			this_child2$child1._removeUpdater('height', [[dep$this_child2_child1$height$0, 'width', update$this_child2_child1$height]])
			update$this_child2_child1$height();

			this$child2.addChild(this_child2$child1)

//setting up component TextButton
			var this_child2$child2 = __closure.this_child2$child2
			this_child2$child2.__setup(__closure.__closure_this_child2$child2)
			delete __closure.__closure_this_child2$child2

//assigning text to ("JWPlayer")
			this_child2$child2._removeUpdater('text'); this_child2$child2.text = (("JWPlayer"));

			this$child2.addChild(this_child2$child2)

//setting up component Item
			var this_child2$child3 = __closure.this_child2$child3
			this_child2$child3.__setup(__closure.__closure_this_child2$child3)
			delete __closure.__closure_this_child2$child3

//assigning width to ((this._get('parent')._get('width') * ((100) / 100)))
			var update$this_child2_child3$width = (function() { this_child2$child3.width = (((this._get('parent')._get('width') * ((100) / 100)))); }).bind(this_child2$child3)
			var dep$this_child2_child3$width$0 = this_child2$child3._get('parent')
			this_child2$child3.connectOnChanged(dep$this_child2_child3$width$0, 'width', update$this_child2_child3$width)
			this_child2$child3._removeUpdater('width', [[dep$this_child2_child3$width$0, 'width', update$this_child2_child3$width]])
			update$this_child2_child3$width();
//assigning height to (this._get('width') * 0.75)
			var update$this_child2_child3$height = (function() { this_child2$child3.height = ((this._get('width') * 0.75)); }).bind(this_child2$child3)
			var dep$this_child2_child3$height$0 = this_child2$child3
			this_child2$child3.connectOnChanged(dep$this_child2_child3$height$0, 'width', update$this_child2_child3$height)
			this_child2$child3._removeUpdater('height', [[dep$this_child2_child3$height$0, 'width', update$this_child2_child3$height]])
			update$this_child2_child3$height();
			this_child2$child3.onChanged('visible', (function(value) {
				this._get('jwp').play(value)
			} ).bind(this_child2$child3))


//setting up component JWPlayer
			var this_child2_child3$child0 = __closure.this_child2_child3$child0
			this_child2_child3$child0.__setup(__closure.__closure_this_child2_child3$child0)
			delete __closure.__closure_this_child2_child3$child0

//assigning width to ((this._get('parent')._get('width') * ((100) / 100)))
			var update$this_child2_child3_child0$width = (function() { this_child2_child3$child0.width = (((this._get('parent')._get('width') * ((100) / 100)))); }).bind(this_child2_child3$child0)
			var dep$this_child2_child3_child0$width$0 = this_child2_child3$child0._get('parent')
			this_child2_child3$child0.connectOnChanged(dep$this_child2_child3_child0$width$0, 'width', update$this_child2_child3_child0$width)
			this_child2_child3$child0._removeUpdater('width', [[dep$this_child2_child3_child0$width$0, 'width', update$this_child2_child3_child0$width]])
			update$this_child2_child3_child0$width();
//assigning height to ((this._get('parent')._get('height') * ((100) / 100)))
			var update$this_child2_child3_child0$height = (function() { this_child2_child3$child0.height = (((this._get('parent')._get('height') * ((100) / 100)))); }).bind(this_child2_child3$child0)
			var dep$this_child2_child3_child0$height$0 = this_child2_child3$child0._get('parent')
			this_child2_child3$child0.connectOnChanged(dep$this_child2_child3_child0$height$0, 'height', update$this_child2_child3_child0$height)
			this_child2_child3$child0._removeUpdater('height', [[dep$this_child2_child3_child0$height$0, 'height', update$this_child2_child3_child0$height]])
			update$this_child2_child3_child0$height();

			this_child2$child3.addChild(this_child2_child3$child0)
			this$child2.addChild(this_child2$child3)

//setting up component TextButton
			var this_child2$child4 = __closure.this_child2$child4
			this_child2$child4.__setup(__closure.__closure_this_child2$child4)
			delete __closure.__closure_this_child2$child4

//assigning text to ("Bitmovin")
			this_child2$child4._removeUpdater('text'); this_child2$child4.text = (("Bitmovin"));

			this$child2.addChild(this_child2$child4)

//setting up component Item
			var this_child2$child5 = __closure.this_child2$child5
			this_child2$child5.__setup(__closure.__closure_this_child2$child5)
			delete __closure.__closure_this_child2$child5

//assigning width to ((this._get('parent')._get('width') * ((100) / 100)))
			var update$this_child2_child5$width = (function() { this_child2$child5.width = (((this._get('parent')._get('width') * ((100) / 100)))); }).bind(this_child2$child5)
			var dep$this_child2_child5$width$0 = this_child2$child5._get('parent')
			this_child2$child5.connectOnChanged(dep$this_child2_child5$width$0, 'width', update$this_child2_child5$width)
			this_child2$child5._removeUpdater('width', [[dep$this_child2_child5$width$0, 'width', update$this_child2_child5$width]])
			update$this_child2_child5$width();
//assigning height to (this._get('width') * 0.75)
			var update$this_child2_child5$height = (function() { this_child2$child5.height = ((this._get('width') * 0.75)); }).bind(this_child2$child5)
			var dep$this_child2_child5$height$0 = this_child2$child5
			this_child2$child5.connectOnChanged(dep$this_child2_child5$height$0, 'width', update$this_child2_child5$height)
			this_child2$child5._removeUpdater('height', [[dep$this_child2_child5$height$0, 'width', update$this_child2_child5$height]])
			update$this_child2_child5$height();
			this_child2$child5.onChanged('visible', (function(value) {
				this._get('btm').play(value)
			} ).bind(this_child2$child5))


//setting up component Bitmovin
			var this_child2_child5$child0 = __closure.this_child2_child5$child0
			this_child2_child5$child0.__setup(__closure.__closure_this_child2_child5$child0)
			delete __closure.__closure_this_child2_child5$child0

//assigning width to ((this._get('parent')._get('width') * ((100) / 100)))
			var update$this_child2_child5_child0$width = (function() { this_child2_child5$child0.width = (((this._get('parent')._get('width') * ((100) / 100)))); }).bind(this_child2_child5$child0)
			var dep$this_child2_child5_child0$width$0 = this_child2_child5$child0._get('parent')
			this_child2_child5$child0.connectOnChanged(dep$this_child2_child5_child0$width$0, 'width', update$this_child2_child5_child0$width)
			this_child2_child5$child0._removeUpdater('width', [[dep$this_child2_child5_child0$width$0, 'width', update$this_child2_child5_child0$width]])
			update$this_child2_child5_child0$width();
//assigning height to ((this._get('parent')._get('height') * ((100) / 100)))
			var update$this_child2_child5_child0$height = (function() { this_child2_child5$child0.height = (((this._get('parent')._get('height') * ((100) / 100)))); }).bind(this_child2_child5$child0)
			var dep$this_child2_child5_child0$height$0 = this_child2_child5$child0._get('parent')
			this_child2_child5$child0.connectOnChanged(dep$this_child2_child5_child0$height$0, 'height', update$this_child2_child5_child0$height)
			this_child2_child5$child0._removeUpdater('height', [[dep$this_child2_child5_child0$height$0, 'height', update$this_child2_child5_child0$height]])
			update$this_child2_child5_child0$height();

			this_child2$child5.addChild(this_child2_child5$child0)
			this$child2.addChild(this_child2$child5)

//setting up component TextButton
			var this_child2$child6 = __closure.this_child2$child6
			this_child2$child6.__setup(__closure.__closure_this_child2$child6)
			delete __closure.__closure_this_child2$child6

//assigning text to ("TheOPlayer")
			this_child2$child6._removeUpdater('text'); this_child2$child6.text = (("TheOPlayer"));

			this$child2.addChild(this_child2$child6)

//setting up component Item
			var this_child2$child7 = __closure.this_child2$child7
			this_child2$child7.__setup(__closure.__closure_this_child2$child7)
			delete __closure.__closure_this_child2$child7

//assigning width to ((this._get('parent')._get('width') * ((100) / 100)))
			var update$this_child2_child7$width = (function() { this_child2$child7.width = (((this._get('parent')._get('width') * ((100) / 100)))); }).bind(this_child2$child7)
			var dep$this_child2_child7$width$0 = this_child2$child7._get('parent')
			this_child2$child7.connectOnChanged(dep$this_child2_child7$width$0, 'width', update$this_child2_child7$width)
			this_child2$child7._removeUpdater('width', [[dep$this_child2_child7$width$0, 'width', update$this_child2_child7$width]])
			update$this_child2_child7$width();
//assigning height to (this._get('width') * 0.75)
			var update$this_child2_child7$height = (function() { this_child2$child7.height = ((this._get('width') * 0.75)); }).bind(this_child2$child7)
			var dep$this_child2_child7$height$0 = this_child2$child7
			this_child2$child7.connectOnChanged(dep$this_child2_child7$height$0, 'width', update$this_child2_child7$height)
			this_child2$child7._removeUpdater('height', [[dep$this_child2_child7$height$0, 'width', update$this_child2_child7$height]])
			update$this_child2_child7$height();
			this_child2$child7.onChanged('visible', (function(value) {
				this._get('theo').play(value)
			} ).bind(this_child2$child7))


//setting up component TheOPlayer
			var this_child2_child7$child0 = __closure.this_child2_child7$child0
			this_child2_child7$child0.__setup(__closure.__closure_this_child2_child7$child0)
			delete __closure.__closure_this_child2_child7$child0

//assigning width to ((this._get('parent')._get('width') * ((100) / 100)))
			var update$this_child2_child7_child0$width = (function() { this_child2_child7$child0.width = (((this._get('parent')._get('width') * ((100) / 100)))); }).bind(this_child2_child7$child0)
			var dep$this_child2_child7_child0$width$0 = this_child2_child7$child0._get('parent')
			this_child2_child7$child0.connectOnChanged(dep$this_child2_child7_child0$width$0, 'width', update$this_child2_child7_child0$width)
			this_child2_child7$child0._removeUpdater('width', [[dep$this_child2_child7_child0$width$0, 'width', update$this_child2_child7_child0$width]])
			update$this_child2_child7_child0$width();
//assigning height to ((this._get('parent')._get('height') * ((100) / 100)))
			var update$this_child2_child7_child0$height = (function() { this_child2_child7$child0.height = (((this._get('parent')._get('height') * ((100) / 100)))); }).bind(this_child2_child7$child0)
			var dep$this_child2_child7_child0$height$0 = this_child2_child7$child0._get('parent')
			this_child2_child7$child0.connectOnChanged(dep$this_child2_child7_child0$height$0, 'height', update$this_child2_child7_child0$height)
			this_child2_child7$child0._removeUpdater('height', [[dep$this_child2_child7_child0$height$0, 'height', update$this_child2_child7_child0$height]])
			update$this_child2_child7_child0$height();

			this_child2$child7.addChild(this_child2_child7$child0)
			this$child2.addChild(this_child2$child7)

//setting up component TextButton
			var this_child2$child8 = __closure.this_child2$child8
			this_child2$child8.__setup(__closure.__closure_this_child2$child8)
			delete __closure.__closure_this_child2$child8

//assigning text to ("VideoJS")
			this_child2$child8._removeUpdater('text'); this_child2$child8.text = (("VideoJS"));

			this$child2.addChild(this_child2$child8)

//setting up component Item
			var this_child2$child9 = __closure.this_child2$child9
			this_child2$child9.__setup(__closure.__closure_this_child2$child9)
			delete __closure.__closure_this_child2$child9

//assigning width to ((this._get('parent')._get('width') * ((100) / 100)))
			var update$this_child2_child9$width = (function() { this_child2$child9.width = (((this._get('parent')._get('width') * ((100) / 100)))); }).bind(this_child2$child9)
			var dep$this_child2_child9$width$0 = this_child2$child9._get('parent')
			this_child2$child9.connectOnChanged(dep$this_child2_child9$width$0, 'width', update$this_child2_child9$width)
			this_child2$child9._removeUpdater('width', [[dep$this_child2_child9$width$0, 'width', update$this_child2_child9$width]])
			update$this_child2_child9$width();
//assigning height to (this._get('width') * 0.75)
			var update$this_child2_child9$height = (function() { this_child2$child9.height = ((this._get('width') * 0.75)); }).bind(this_child2$child9)
			var dep$this_child2_child9$height$0 = this_child2$child9
			this_child2$child9.connectOnChanged(dep$this_child2_child9$height$0, 'width', update$this_child2_child9$height)
			this_child2$child9._removeUpdater('height', [[dep$this_child2_child9$height$0, 'width', update$this_child2_child9$height]])
			update$this_child2_child9$height();
			this_child2$child9.onChanged('visible', (function(value) {
				this._get('vjs').play(value)
			} ).bind(this_child2$child9))


//setting up component VideoJS
			var this_child2_child9$child0 = __closure.this_child2_child9$child0
			this_child2_child9$child0.__setup(__closure.__closure_this_child2_child9$child0)
			delete __closure.__closure_this_child2_child9$child0

//assigning source to ("https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm")
			this_child2_child9$child0._removeUpdater('source'); this_child2_child9$child0.source = (("https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"));
//assigning height to ((this._get('parent')._get('height') * ((100) / 100)))
			var update$this_child2_child9_child0$height = (function() { this_child2_child9$child0.height = (((this._get('parent')._get('height') * ((100) / 100)))); }).bind(this_child2_child9$child0)
			var dep$this_child2_child9_child0$height$0 = this_child2_child9$child0._get('parent')
			this_child2_child9$child0.connectOnChanged(dep$this_child2_child9_child0$height$0, 'height', update$this_child2_child9_child0$height)
			this_child2_child9$child0._removeUpdater('height', [[dep$this_child2_child9_child0$height$0, 'height', update$this_child2_child9_child0$height]])
			update$this_child2_child9_child0$height();
//assigning width to ((this._get('parent')._get('width') * ((100) / 100)))
			var update$this_child2_child9_child0$width = (function() { this_child2_child9$child0.width = (((this._get('parent')._get('width') * ((100) / 100)))); }).bind(this_child2_child9$child0)
			var dep$this_child2_child9_child0$width$0 = this_child2_child9$child0._get('parent')
			this_child2_child9$child0.connectOnChanged(dep$this_child2_child9_child0$width$0, 'width', update$this_child2_child9_child0$width)
			this_child2_child9$child0._removeUpdater('width', [[dep$this_child2_child9_child0$width$0, 'width', update$this_child2_child9_child0$width]])
			update$this_child2_child9_child0$width();

			this_child2$child9.addChild(this_child2_child9$child0)
			this$child2.addChild(this_child2$child9)
			this.addChild(this$child2)

//setting up component Rectangle
			var this$child3 = __closure.this$child3
			this$child3.__setup(__closure.__closure_this$child3)
			delete __closure.__closure_this$child3

//assigning y to (80)
			this$child3._removeUpdater('y'); this$child3.y = ((80));
//assigning width to ((this._get('parent')._get('width') * ((25) / 100)))
			var update$this_child3$width = (function() { this$child3.width = (((this._get('parent')._get('width') * ((25) / 100)))); }).bind(this$child3)
			var dep$this_child3$width$0 = this$child3._get('parent')
			this$child3.connectOnChanged(dep$this_child3$width$0, 'width', update$this_child3$width)
			this$child3._removeUpdater('width', [[dep$this_child3$width$0, 'width', update$this_child3$width]])
			update$this_child3$width();
//assigning x to ((this._get('parent')._get('width') * ((70) / 100)))
			var update$this_child3$x = (function() { this$child3.x = (((this._get('parent')._get('width') * ((70) / 100)))); }).bind(this$child3)
			var dep$this_child3$x$0 = this$child3._get('parent')
			this$child3.connectOnChanged(dep$this_child3$x$0, 'width', update$this_child3$x)
			this$child3._removeUpdater('x', [[dep$this_child3$x$0, 'width', update$this_child3$x]])
			update$this_child3$x();
//assigning color to ("#EEE")
			this$child3._removeUpdater('color'); this$child3.color = (("#EEE"));
//assigning height to (600)
			this$child3._removeUpdater('height'); this$child3.height = ((600));


//setting up component OverflowMixin
			var this_child3$child0 = __closure.this_child3$child0
			this_child3$child0.__setup(__closure.__closure_this_child3$child0)
			delete __closure.__closure_this_child3$child0

//assigning value to (_globals.controls.mixins.OverflowMixin.prototype.Scroll)
			this_child3$child0._removeUpdater('value'); this_child3$child0.value = ((_globals.controls.mixins.OverflowMixin.prototype.Scroll));

			this$child3.addChild(this_child3$child0)

//setting up component ListView
			var this_child3$child1 = __closure.this_child3$child1
			this_child3$child1.__setup(__closure.__closure_this_child3$child1)
			delete __closure.__closure_this_child3$child1

//assigning spacing to (10)
			this_child3$child1._removeUpdater('spacing'); this_child3$child1.spacing = ((10));
//assigning height to (this._get('contentHeight'))
			var update$this_child3_child1$height = (function() { this_child3$child1.height = ((this._get('contentHeight'))); }).bind(this_child3$child1)
			var dep$this_child3_child1$height$0 = this_child3$child1
			this_child3$child1.connectOnChanged(dep$this_child3_child1$height$0, 'contentHeight', update$this_child3_child1$height)
			this_child3$child1._removeUpdater('height', [[dep$this_child3_child1$height$0, 'contentHeight', update$this_child3_child1$height]])
			update$this_child3_child1$height();
//assigning width to ((this._get('parent')._get('width') * ((100) / 100)))
			var update$this_child3_child1$width = (function() { this_child3$child1.width = (((this._get('parent')._get('width') * ((100) / 100)))); }).bind(this_child3$child1)
			var dep$this_child3_child1$width$0 = this_child3$child1._get('parent')
			this_child3$child1.connectOnChanged(dep$this_child3_child1$width$0, 'width', update$this_child3_child1$width)
			this_child3$child1._removeUpdater('width', [[dep$this_child3_child1$width$0, 'width', update$this_child3_child1$width]])
			update$this_child3_child1$width();

//setting up component ListModel
			var this_child3_child1$model = __closure.this_child3_child1$model
			this_child3_child1$model.__setup(__closure.__closure_this_child3_child1$model)
			delete __closure.__closure_this_child3_child1$model



			this$child3.addChild(this_child3$child1)
			this.addChild(this$child3)
}


//=====[component controls.core.PlaceHolder]=====================

	var PlaceHolderBaseComponent = _globals.core.Object
	var PlaceHolderBasePrototype = PlaceHolderBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	var PlaceHolderComponent = _globals.controls.core.PlaceHolder = function(parent, _delegate) {
		PlaceHolderBaseComponent.apply(this, arguments)
	//custom constructor:
	{
		this._placeholderClass = ''
	}

	}
	var PlaceHolderPrototype = PlaceHolderComponent.prototype = Object.create(PlaceHolderBasePrototype)

	PlaceHolderPrototype.constructor = PlaceHolderComponent

	PlaceHolderPrototype.componentName = 'controls.core.PlaceHolder'
	PlaceHolderPrototype._update = function(name,value) {
		switch (name) {
			case 'text': this.parent.element.setAttribute('placeholder', value); break
			case 'color': this.setPlaceholderColor(value); break
		}

		_globals.core.Item.prototype._update.apply(this, arguments);
	}
	PlaceHolderPrototype.setPlaceholderColor = function(color) {
		var cls = this.getClass()

		var rgba = new _globals.core.Color(color).rgba()
		//fixme: port to modernizr
		var selectors = ['::-webkit-input-placeholder', '::-moz-placeholder', ':-moz-placeholder', ':-ms-input-placeholder']
		selectors.forEach(function(selector) {
			try {
				this._context.stylesheet._addRule('.' + cls + selector, 'color: ' + rgba)
				log('added rule for .' + cls + selector)
			} catch(ex) {
				//log(ex)
			}
		}.bind(this))
	}
	PlaceHolderPrototype.getClass = function() {
		var cls
		if (!this._placeholderClass) {
			cls = this._placeholderClass = this._context.stylesheet.allocateClass('input')
			this.parent.element.addClass(cls)
		}
		else
			cls = this._placeholderClass
		return cls
	}
	core.addProperty(PlaceHolderPrototype, 'string', 'text')
	core.addProperty(PlaceHolderPrototype, 'Color', 'color')
	core.addProperty(PlaceHolderPrototype, 'Font', 'font')

	PlaceHolderPrototype.__create = function(__closure) {
		PlaceHolderBasePrototype.__create.call(this, __closure.__base = { })
//creating component controls.core.<anonymous>
		var this$font = new _globals.controls.core.PlaceholderFont(this)
		__closure.this$font = this$font

//creating component PlaceholderFont
		this$font.__create(__closure.__closure_this$font = { })

		this.font = this$font
	}
	PlaceHolderPrototype.__setup = function(__closure) {
	PlaceHolderBasePrototype.__setup.call(this, __closure.__base); delete __closure.__base
//setting up component PlaceholderFont
			var this$font = __closure.this$font
			this$font.__setup(__closure.__closure_this$font)
			delete __closure.__closure_this$font
}


//=====[component controls.ShakaPlayer]=====================

	var ShakaPlayerBaseComponent = _globals.core.Item
	var ShakaPlayerBasePrototype = ShakaPlayerBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.core.Item}
 */
	var ShakaPlayerComponent = _globals.controls.ShakaPlayer = function(parent, _delegate) {
		ShakaPlayerBaseComponent.apply(this, arguments)
	//custom constructor:
	{
		var shaka = window.shaka
		if (!shaka) {
			log("shaka is undefined maybe you forget to include 'shaka-player.compiled.js'")
			return
		}
		if (!shaka.Player.isBrowserSupported()) {
			log("shaka player is not supported for this browser")
			return
		}

		this._player = new shaka.Player(this.element.dom)

		var errorCallback = function(event) { log("Error", event) }
		this._player.addEventListener('error', this.error);
		this.element.setAttribute('controls', '')
		this.element.setAttribute('autoplay', '')
	}

	}
	var ShakaPlayerPrototype = ShakaPlayerComponent.prototype = Object.create(ShakaPlayerBasePrototype)

	ShakaPlayerPrototype.constructor = ShakaPlayerComponent

	ShakaPlayerPrototype.componentName = 'controls.ShakaPlayer'
	ShakaPlayerPrototype.finished = _globals.core.createSignal('finished')
	ShakaPlayerPrototype.error = _globals.core.createSignal('error')
	ShakaPlayerPrototype.getTag = function() { return 'video' }
	core.addProperty(ShakaPlayerPrototype, 'string', 'source')
	core.addProperty(ShakaPlayerPrototype, 'Color', 'backgroundColor', ("#000"))
	core.addProperty(ShakaPlayerPrototype, 'float', 'volume', (1.0))
	core.addProperty(ShakaPlayerPrototype, 'bool', 'loop', (false))
	core.addProperty(ShakaPlayerPrototype, 'bool', 'ready', (false))
	core.addProperty(ShakaPlayerPrototype, 'bool', 'muted', (false))
	core.addProperty(ShakaPlayerPrototype, 'bool', 'paused', (false))
	core.addProperty(ShakaPlayerPrototype, 'bool', 'waiting', (false))
	core.addProperty(ShakaPlayerPrototype, 'bool', 'seeking', (false))
	core.addProperty(ShakaPlayerPrototype, 'bool', 'autoPlay', (false))
	core.addProperty(ShakaPlayerPrototype, 'int', 'duration')
	core.addProperty(ShakaPlayerPrototype, 'int', 'progress')
	core.addProperty(ShakaPlayerPrototype, 'int', 'buffered')
	_globals.core._protoOnChanged(ShakaPlayerPrototype, 'source', (function(value) {
		if (this._player)
			this._player.load(this.source).then(function() {
				log('The video has now been loaded!');
			}).catch(function(err) {
				log("Error while loading", err)
			});
	} ))
	_globals.core._protoOnChanged(ShakaPlayerPrototype, 'width', (function(value) { this.element.dom.width = value; } ))
	_globals.core._protoOnChanged(ShakaPlayerPrototype, 'height', (function(value) { this.element.dom.height = value; } ))

	ShakaPlayerPrototype.__create = function(__closure) {
		ShakaPlayerBasePrototype.__create.call(this, __closure.__base = { })

	}
	ShakaPlayerPrototype.__setup = function(__closure) {
	ShakaPlayerBasePrototype.__setup.call(this, __closure.__base); delete __closure.__base
//assigning width to (640)
			this._removeUpdater('width'); this.width = ((640));
//assigning height to (480)
			this._removeUpdater('height'); this.height = ((480));
}


//=====[component core.BaseView]=====================

	var BaseViewBaseComponent = _globals.core.BaseLayout
	var BaseViewBasePrototype = BaseViewBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.core.BaseLayout}
 */
	var BaseViewComponent = _globals.core.BaseView = function(parent, _delegate) {
		BaseViewBaseComponent.apply(this, arguments)
	//custom constructor:
	{
		this._items = []
		this._modelUpdate = new _globals.core.model.ModelUpdate()
	}

	}
	var BaseViewPrototype = BaseViewComponent.prototype = Object.create(BaseViewBasePrototype)

	BaseViewPrototype.constructor = BaseViewComponent

	BaseViewPrototype.componentName = 'core.BaseView'
	BaseViewPrototype.layoutFinished = _globals.core.createSignal('layoutFinished')
	BaseViewPrototype._onRowsChanged = function(begin,end) {
		if (this.trace)
			log("rows changed", begin, end)

		this._modelUpdate.update(this.model, begin, end)
		this._delayedLayout.schedule()
	}
	BaseViewPrototype._updateDelegateIndex = function(idx) {
		var item = this._items[idx]
		if (item) {
			item._local.model.index = idx
			_globals.core.Object.prototype._update.call(item, '_rowIndex')
		}
	}
	BaseViewPrototype.focusCurrent = function() {
		var n = this.count
		if (n == 0)
			return

		var idx = this.currentIndex
		if (idx < 0 || idx >= n) {
			if (this.keyNavigationWraps)
				this.currentIndex = (idx + n) % n
			else
				this.currentIndex = idx < 0? 0: n - 1
			return
		}
		var item = this._items[idx]

		if (item)
			this.focusChild(item)
		if (this.contentFollowsCurrentItem)
			this.positionViewAtIndex(idx)
	}
	BaseViewPrototype._updateItems = function(begin,end) {
		for(var i = begin; i < end; ++i)
			this._updateDelegate(i)
	}
	BaseViewPrototype._createDelegate = function(idx) {
		var items = this._items
		if (items[idx] !== null)
			return

		var row = this.model.get(idx)
		row['index'] = idx
		this._local['model'] = row

		var item = this.delegate(this)
		items[idx] = item
		item.view = this
		item.element.remove()
		this.content.element.append(item.element)

		item._local['model'] = row
		delete this._local['model']
		return item
	}
	BaseViewPrototype._updateDelegate = function(idx) {
		var item = this._items[idx]
		if (item) {
			var row = this.model.get(idx)
			row.index = idx
			item._local.model = row
			_globals.core.Object.prototype._update.call(item, '_row')
		}
	}
	BaseViewPrototype._insertItems = function(begin,end) {
		var n = end - begin + 2
		var args = Array(n)
		args[0] = begin
		args[1] = 0
		for(var i = 2; i < n; ++i)
			args[i] = null
		Array.prototype.splice.apply(this._items, args)
	}
	BaseViewPrototype._onReset = function() {
		var model = this.model
		if (this.trace)
			log("reset", this._items.length, model.count)

		this._modelUpdate.reset(model)
		this._delayedLayout.schedule()
	}
	BaseViewPrototype._discardItem = function(item) {
		if (item === null)
			return
		if (this.focusedChild === item)
			this.focusedChild = null;
		item.discard()
	}
	BaseViewPrototype._onRowsRemoved = function(begin,end) {
		if (this.trace)
			log("rows removed", begin, end)

		this._modelUpdate.remove(this.model, begin, end)
		this._delayedLayout.schedule()
	}
	BaseViewPrototype._onRowsInserted = function(begin,end) {
		if (this.trace)
			log("rows inserted", begin, end)

		this._modelUpdate.insert(this.model, begin, end)
		this._delayedLayout.schedule()
	}
	BaseViewPrototype._removeItems = function(begin,end) {
		var deleted = this._items.splice(begin, end - begin)
		var view = this
		deleted.forEach(function(item) { view._discardItem(item)})
	}
	BaseViewPrototype._update = function(name,value) {
		switch(name) {
		case 'delegate':
			if (value)
				value.visible = false
			break
		}
		_globals.core.Item.prototype._update.apply(this, arguments);
	}
	BaseViewPrototype.itemAt = function(x,y) {
		var idx = this.indexAt(x, y)
		return idx >= 0? this._items[idx]: null
	}
	BaseViewPrototype._attach = function() {
		if (this._attached || !this.model || !this.delegate)
			return

		this.model.on('reset', this._onReset.bind(this))
		this.model.on('rowsInserted', this._onRowsInserted.bind(this))
		this.model.on('rowsChanged', this._onRowsChanged.bind(this))
		this.model.on('rowsRemoved', this._onRowsRemoved.bind(this))
		this._attached = true
		this._onReset()
	}
	BaseViewPrototype._processUpdates = function() {
		this._modelUpdate.apply(this)
		qml.core.BaseLayout.prototype._processUpdates.apply(this)
	}
	core.addProperty(BaseViewPrototype, 'Object', 'model')
	core.addProperty(BaseViewPrototype, 'Item', 'delegate')
	core.addProperty(BaseViewPrototype, 'int', 'contentX')
	core.addProperty(BaseViewPrototype, 'int', 'contentY')
	core.addProperty(BaseViewPrototype, 'int', 'scrollingStep', (0))
	core.addProperty(BaseViewPrototype, 'int', 'animationDuration', (0))
	core.addProperty(BaseViewPrototype, 'bool', 'contentFollowsCurrentItem', (true))
	core.addProperty(BaseViewPrototype, 'bool', 'trace')
	core.addProperty(BaseViewPrototype, 'BaseViewContent', 'content')
/** @const @type {number} */
	BaseViewPrototype.Beginning = 0
/** @const @type {number} */
	BaseViewComponent.Beginning = 0
/** @const @type {number} */
	BaseViewPrototype.Center = 1
/** @const @type {number} */
	BaseViewComponent.Center = 1
/** @const @type {number} */
	BaseViewPrototype.End = 2
/** @const @type {number} */
	BaseViewComponent.End = 2
/** @const @type {number} */
	BaseViewPrototype.Visible = 3
/** @const @type {number} */
	BaseViewComponent.Visible = 3
/** @const @type {number} */
	BaseViewPrototype.Contain = 4
/** @const @type {number} */
	BaseViewComponent.Contain = 4
/** @const @type {number} */
	BaseViewPrototype.Page = 5
/** @const @type {number} */
	BaseViewComponent.Page = 5
	core.addProperty(BaseViewPrototype, 'enum', 'positionMode')
	_globals.core._protoOnChanged(BaseViewPrototype, 'contentX', (function(value) { this.content.x = -value; } ))
	_globals.core._protoOnChanged(BaseViewPrototype, 'height', (function(value) { this._delayedLayout.schedule() } ))
	_globals.core._protoOnChanged(BaseViewPrototype, 'contentY', (function(value) { this.content.y = -value; } ))
	_globals.core._protoOnChanged(BaseViewPrototype, 'recursiveVisible', (function(value) { if (value) this._delayedLayout.schedule(); } ))
	_globals.core._protoOnChanged(BaseViewPrototype, 'width', (function(value) { this._delayedLayout.schedule() } ))
	_globals.core._protoOnChanged(BaseViewPrototype, 'focusedChild', (function(value) {
		var idx = this._items.indexOf(this.focusedChild)
		if (idx >= 0)
			this.currentIndex = idx
	} ))
	_globals.core._protoOnChanged(BaseViewPrototype, 'currentIndex', (function(value) {
		this.focusCurrent()
	} ))

	BaseViewPrototype.__create = function(__closure) {
		BaseViewBasePrototype.__create.call(this, __closure.__base = { })
//creating component core.<anonymous>
		var this$content = new _globals.core.BaseViewContent(this)
		__closure.this$content = this$content

//creating component BaseViewContent
		this$content.__create(__closure.__closure_this$content = { })

		this.content = this$content
	}
	BaseViewPrototype.__setup = function(__closure) {
	BaseViewBasePrototype.__setup.call(this, __closure.__base); delete __closure.__base
//assigning keyNavigationWraps to (true)
			this._removeUpdater('keyNavigationWraps'); this.keyNavigationWraps = ((true));
//assigning contentWidth to (1)
			this._removeUpdater('contentWidth'); this.contentWidth = ((1));
//assigning contentHeight to (1)
			this._removeUpdater('contentHeight'); this.contentHeight = ((1));
//assigning handleNavigationKeys to (true)
			this._removeUpdater('handleNavigationKeys'); this.handleNavigationKeys = ((true));

//setting up component BaseViewContent
			var this$content = __closure.this$content
			this$content.__setup(__closure.__closure_this$content)
			delete __closure.__closure_this$content

	var behavior_this_content_on_y = new _globals.core.Animation(this$content)
	var behavior_this_content_on_y__closure = { behavior_this_content_on_y: behavior_this_content_on_y }

//creating component Animation
	behavior_this_content_on_y.__create(behavior_this_content_on_y__closure.__closure_behavior_this_content_on_y = { })


//setting up component Animation
	var behavior_this_content_on_y = behavior_this_content_on_y__closure.behavior_this_content_on_y
	behavior_this_content_on_y.__setup(behavior_this_content_on_y__closure.__closure_behavior_this_content_on_y)
	delete behavior_this_content_on_y__closure.__closure_behavior_this_content_on_y

//assigning duration to (this._get('parent')._get('parent')._get('animationDuration'))
	var update$behavior_this_content_on_y$duration = (function() { behavior_this_content_on_y.duration = ((this._get('parent')._get('parent')._get('animationDuration'))); }).bind(behavior_this_content_on_y)
	var dep$behavior_this_content_on_y$duration$0 = behavior_this_content_on_y._get('parent')._get('parent')
	behavior_this_content_on_y.connectOnChanged(dep$behavior_this_content_on_y$duration$0, 'animationDuration', update$behavior_this_content_on_y$duration)
	behavior_this_content_on_y._removeUpdater('duration', [[dep$behavior_this_content_on_y$duration$0, 'animationDuration', update$behavior_this_content_on_y$duration]])
	update$behavior_this_content_on_y$duration();

	this$content.setAnimation('y', behavior_this_content_on_y);

	var behavior_this_content_on_x = new _globals.core.Animation(this$content)
	var behavior_this_content_on_x__closure = { behavior_this_content_on_x: behavior_this_content_on_x }

//creating component Animation
	behavior_this_content_on_x.__create(behavior_this_content_on_x__closure.__closure_behavior_this_content_on_x = { })


//setting up component Animation
	var behavior_this_content_on_x = behavior_this_content_on_x__closure.behavior_this_content_on_x
	behavior_this_content_on_x.__setup(behavior_this_content_on_x__closure.__closure_behavior_this_content_on_x)
	delete behavior_this_content_on_x__closure.__closure_behavior_this_content_on_x

//assigning duration to (this._get('parent')._get('parent')._get('animationDuration'))
	var update$behavior_this_content_on_x$duration = (function() { behavior_this_content_on_x.duration = ((this._get('parent')._get('parent')._get('animationDuration'))); }).bind(behavior_this_content_on_x)
	var dep$behavior_this_content_on_x$duration$0 = behavior_this_content_on_x._get('parent')._get('parent')
	behavior_this_content_on_x.connectOnChanged(dep$behavior_this_content_on_x$duration$0, 'animationDuration', update$behavior_this_content_on_x$duration)
	behavior_this_content_on_x._removeUpdater('duration', [[dep$behavior_this_content_on_x$duration$0, 'animationDuration', update$behavior_this_content_on_x$duration]])
	update$behavior_this_content_on_x$duration();

	this$content.setAnimation('x', behavior_this_content_on_x);

	var behavior_this_content_on_transform = new _globals.core.Animation(this$content)
	var behavior_this_content_on_transform__closure = { behavior_this_content_on_transform: behavior_this_content_on_transform }

//creating component Animation
	behavior_this_content_on_transform.__create(behavior_this_content_on_transform__closure.__closure_behavior_this_content_on_transform = { })


//setting up component Animation
	var behavior_this_content_on_transform = behavior_this_content_on_transform__closure.behavior_this_content_on_transform
	behavior_this_content_on_transform.__setup(behavior_this_content_on_transform__closure.__closure_behavior_this_content_on_transform)
	delete behavior_this_content_on_transform__closure.__closure_behavior_this_content_on_transform

//assigning duration to (this._get('parent')._get('parent')._get('animationDuration'))
	var update$behavior_this_content_on_transform$duration = (function() { behavior_this_content_on_transform.duration = ((this._get('parent')._get('parent')._get('animationDuration'))); }).bind(behavior_this_content_on_transform)
	var dep$behavior_this_content_on_transform$duration$0 = behavior_this_content_on_transform._get('parent')._get('parent')
	behavior_this_content_on_transform.connectOnChanged(dep$behavior_this_content_on_transform$duration$0, 'animationDuration', update$behavior_this_content_on_transform$duration)
	behavior_this_content_on_transform._removeUpdater('duration', [[dep$behavior_this_content_on_transform$duration$0, 'animationDuration', update$behavior_this_content_on_transform$duration]])
	update$behavior_this_content_on_transform$duration();

	this$content.setAnimation('transform', behavior_this_content_on_transform);

			this._context._onCompleted((function() {
		this._attach();
		var delayedLayout = this._delayedLayout

		var self = this
		this.element.on('scroll', function(event) {
			self.contentX = self.element.dom.scrollLeft
			self.contentY = self.element.dom.scrollTop
		}.bind(this))

		delayedLayout.schedule()
	} ).bind(this))
}


//=====[component core.ListView]=====================

	var ListViewBaseComponent = _globals.core.BaseView
	var ListViewBasePrototype = ListViewBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.core.BaseView}
 */
	var ListViewComponent = _globals.core.ListView = function(parent, _delegate) {
		ListViewBaseComponent.apply(this, arguments)

	}
	var ListViewPrototype = ListViewComponent.prototype = Object.create(ListViewBasePrototype)

	ListViewPrototype.constructor = ListViewComponent

	ListViewPrototype.componentName = 'core.ListView'
	ListViewPrototype.indexAt = function(x,y) {
		var items = this._items
		x += this.contentX
		y += this.contentY
		if (this.orientation == _globals.core.ListView.prototype.Horizontal) {
			for (var i = 0; i < items.length; ++i) {
				var item = items[i]
				if (!item)
					continue
				var vx = item.viewX
				if (x >= vx && x < vx + item.width)
					return i
			}
		} else {
			for (var i = 0; i < items.length; ++i) {
				var item = items[i]
				if (!item)
					continue
				var vy = item.viewY
				if (y >= vy && y < vy + item.height)
					return i
			}
		}
		return -1
	}
	ListViewPrototype._createDelegate = function(idx) {
		var item = _globals.core.BaseView.prototype._createDelegate.apply(this, arguments)
		var delayedLayout = this._delayedLayout
		if (this.orientation === this.Horizontal)
			item.onChanged('width', delayedLayout.schedule.bind(delayedLayout))
		else
			item.onChanged('height', delayedLayout.schedule.bind(delayedLayout))
		return item
	}
	ListViewPrototype.move = function(dx,dy) {
		var horizontal = this.orientation == this.Horizontal
		var x, y
		if (horizontal && this.contentWidth > this.width) {
			x = this.contentX + dx
			if (x < 0)
				x = 0
			else if (x > this.contentWidth - this.width)
				x = this.contentWidth - this.width
			this.contentX = x
		} else if (!horizontal && this.contentHeight > this.height) {
			y = this.contentY + dy
			if (y < 0)
				y = 0
			else if (y > this.contentHeight - this.height)
				y = this.contentHeight - this.height
			this.contentY = y
		}
	}
	ListViewPrototype.positionViewAtIndex = function(idx) {
		var cx = this.contentX, cy = this.contentY
		var itemBox = this.getItemPosition(idx)
		var x = itemBox[0], y = itemBox[1]
		var iw = itemBox[2], ih = itemBox[3]
		var w = this.width, h = this.height
		var horizontal = this.orientation == this.Horizontal
		var center = this.positionMode === this.Center

		if (horizontal) {
			var atCenter = x - w / 2 + iw / 2
			if (center && this.contentWidth > w)
				this.contentX = atCenter < 0 ? 0 : x > this.contentWidth - w / 2 - iw / 2 ? this.contentWidth - w : atCenter
			else if (iw > w)
				this.contentX = atCenter
			else if (x - cx < 0)
				this.contentX = x
			else if (x - cx + iw > w)
				this.contentX = x + iw - w
		} else {
			var atCenter = y - h / 2 + ih / 2
			if (center && this.contentHeight > h)
				this.contentY = atCenter < 0 ? 0 : y > this.contentHeight - h / 2 - ih / 2 ? this.contentHeight - h : atCenter
			else if (ih > h)
				this.contentY = atCenter
			else if (y - cy < 0)
				this.contentY = y
			else if (y - cy + ih > h)
				this.contentY = y + ih - h
		}
	}
	ListViewPrototype._layout = function() {
		var model = this.model;
		if (!model) {
			this.layoutFinished()
			return
		}

		this.count = model.count

		if (!this.recursiveVisible) {
			this.layoutFinished()
			return
		}

		var horizontal = this.orientation === this.Horizontal

		var items = this._items
		var n = items.length
		var w = this.width, h = this.height
		if (this.trace)
			log("layout " + n + " into " + w + "x" + h)
		var created = false
		var p = 0
		var c = horizontal? this.content.x: this.content.y
		var size = horizontal? w: h
		var maxW = 0, maxH = 0

		var itemsCount = 0
		for(var i = 0; i < n && (itemsCount == 0 || p + c < size); ++i) {
			var item = items[i]

			if (!item) {
				if (p + c >= size && itemsCount > 0)
					break
				item = this._createDelegate(i)
				created = true
			}

			++itemsCount

			var s = (horizontal? item.width: item.height)
			var visible = (p + c + s >= 0 && p + c < size)

			if (item.x + item.width > maxW)
				maxW = item.width + item.x
			if (item.y + item.height > maxH)
				maxH = item.height + item.y

			if (horizontal)
				item.viewX = p
			else
				item.viewY = p

			if (this.currentIndex == i) {
				this.focusChild(item)
				if (this.contentFollowsCurrentItem)
					this.positionViewAtIndex(i)
			}

			item.visibleInView = visible
			p += s + this.spacing
		}
		for( ;i < n; ++i) {
			var item = items[i]
			if (item)
				item.visibleInView = false
		}
		if (p > 0)
			p -= this.spacing;

		if (itemsCount)
			p *= items.length / itemsCount

		if (horizontal) {
			this.content.width = p
			this.content.height = maxH
			this.contentWidth = p
			this.contentHeight = maxH
		} else {
			this.content.width = maxW
			this.content.height = p
			this.contentWidth = maxW
			this.contentHeight = p
		}
		this.layoutFinished()
		if (created)
			this._context._complete()
	}
	ListViewPrototype.getItemPosition = function(idx) {
		var items = this._items
		var item = items[idx]
		if (!item) {
			var x = 0, y = 0, w = 0, h = 0
			for(var i = idx; i >= 0; --i) {
				if (items[i]) {
					item = items[i]
					x = item.viewX + item.x
					y = item.viewY + item.y
					w = item.width
					h = item.height
					break
				}
			}
			var missing = idx - i
			if (missing > 0) {
				x += missing * (w + this.spacing)
				y += missing * (h + this.spacing)
			}
			return [x, y, w, h]
		}
		else
			return [item.viewX + item.x, item.viewY + item.y, item.width, item.height]
	}
/** @const @type {number} */
	ListViewPrototype.Vertical = 0
/** @const @type {number} */
	ListViewComponent.Vertical = 0
/** @const @type {number} */
	ListViewPrototype.Horizontal = 1
/** @const @type {number} */
	ListViewComponent.Horizontal = 1
	core.addProperty(ListViewPrototype, 'enum', 'orientation')
	_globals.core._protoOnChanged(ListViewPrototype, 'orientation', (function(value) { this._delayedLayout.schedule() } ))
	_globals.core._protoOnKey(ListViewPrototype, 'Key', (function(key, event) {
		if (!this.handleNavigationKeys) {
			event.accepted = false;
			return false;
		}

		var horizontal = this.orientation == this.Horizontal
		if (horizontal) {
			if (key == 'Left') {
				--this.currentIndex;
				event.accepted = true;
				return true;
			} else if (key == 'Right') {
				++this.currentIndex;
				event.accepted = true;
				return true;
			}
		} else {
			if (key == 'Up') {
				if (!this.currentIndex && !this.keyNavigationWraps) {
					event.accepted = false;
					return false;
				}
				--this.currentIndex;
				return true;
			} else if (key == 'Down') {
				if (this.currentIndex == this.count - 1 && !this.keyNavigationWraps) {
					event.accepted = false;
					return false;
				}
				++this.currentIndex;
				event.accepted = true;
				return true;
			}
		}
	} ))

//=====[component core.Rectangle]=====================

	var RectangleBaseComponent = _globals.core.Item
	var RectangleBasePrototype = RectangleBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.core.Item}
 */
	var RectangleComponent = _globals.core.Rectangle = function(parent, _delegate) {
		RectangleBaseComponent.apply(this, arguments)

	}
	var RectanglePrototype = RectangleComponent.prototype = Object.create(RectangleBasePrototype)

	RectanglePrototype.constructor = RectangleComponent

	RectanglePrototype.componentName = 'core.Rectangle'
	RectanglePrototype._update = function(name,value) {
		switch(name) {
			case 'color': this.style('background-color', _globals.core.normalizeColor(value)); break;
		}
		_globals.core.Item.prototype._update.apply(this, arguments);
	}
	RectanglePrototype._mapCSSAttribute = function(name) {
		var attr = {color: 'background-color'}[name]
		return (attr !== undefined)?
			attr:
			_globals.core.Item.prototype._mapCSSAttribute.apply(this, arguments)
	}
	core.addProperty(RectanglePrototype, 'color', 'color', ("#0000"))
	core.addProperty(RectanglePrototype, 'Border', 'border')
	core.addProperty(RectanglePrototype, 'Gradient', 'gradient')

	RectanglePrototype.__create = function(__closure) {
		RectangleBasePrototype.__create.call(this, __closure.__base = { })
//creating component core.<anonymous>
		var this$border = new _globals.core.Border(this)
		__closure.this$border = this$border

//creating component Border
		this$border.__create(__closure.__closure_this$border = { })

		this.border = this$border
	}
	RectanglePrototype.__setup = function(__closure) {
	RectangleBasePrototype.__setup.call(this, __closure.__base); delete __closure.__base
//setting up component Border
			var this$border = __closure.this$border
			this$border.__setup(__closure.__closure_this$border)
			delete __closure.__closure_this$border
}


//=====[component controls.web.WebItem]=====================

	var WebItemBaseComponent = _globals.core.Rectangle
	var WebItemBasePrototype = WebItemBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.core.Rectangle}
 */
	var WebItemComponent = _globals.controls.web.WebItem = function(parent, _delegate) {
		WebItemBaseComponent.apply(this, arguments)

	}
	var WebItemPrototype = WebItemComponent.prototype = Object.create(WebItemBasePrototype)

	WebItemPrototype.constructor = WebItemComponent

	WebItemPrototype.componentName = 'controls.web.WebItem'
	WebItemPrototype._update = function(name,value) {
		switch (name) {
			case 'title':
				this.element.dom.setAttribute('title', value);
				break;
			case 'position':
				this.style('position', value);
				break
		}
		_globals.core.Rectangle.prototype._update.apply(this, arguments);
	}
	core.addProperty(WebItemPrototype, 'Mixin', 'hoverMixin')
	core.addProperty(WebItemPrototype, 'string', 'position')
	core.addProperty(WebItemPrototype, 'string', 'title')

	WebItemPrototype.__create = function(__closure) {
		WebItemBasePrototype.__create.call(this, __closure.__base = { })
//creating component controls.web.<anonymous>
		var this$hoverMixin = new _globals.controls.web.HoverClickMixin(this)
		__closure.this$hoverMixin = this$hoverMixin

//creating component HoverClickMixin
		this$hoverMixin.__create(__closure.__closure_this$hoverMixin = { })

		this.hoverMixin = this$hoverMixin
		core.addAliasProperty(this, 'hover', (function() { return this._get('hoverMixin'); }).bind(this), 'value')
		core.addAliasProperty(this, 'activeHoverEnabled', (function() { return this._get('hoverMixin'); }).bind(this), 'activeHoverEnabled')
		core.addAliasProperty(this, 'activeHover', (function() { return this._get('hoverMixin'); }).bind(this), 'activeHover')
		core.addAliasProperty(this, 'cursor', (function() { return this._get('hoverMixin'); }).bind(this), 'cursor')
		core.addAliasProperty(this, 'clickable', (function() { return this._get('hoverMixin'); }).bind(this), 'clickable')
		core.addAliasProperty(this, 'hoverable', (function() { return this._get('hoverMixin'); }).bind(this), 'enabled')
	}
	WebItemPrototype.__setup = function(__closure) {
	WebItemBasePrototype.__setup.call(this, __closure.__base); delete __closure.__base
//assigning color to ("transparent")
			this._removeUpdater('color'); this.color = (("transparent"));

//setting up component HoverClickMixin
			var this$hoverMixin = __closure.this$hoverMixin
			this$hoverMixin.__setup(__closure.__closure_this$hoverMixin)
			delete __closure.__closure_this$hoverMixin


//assigning hoverMixin.cursor to ("pointer")
			this._removeUpdater('hoverMixin.cursor'); this._get('hoverMixin').cursor = (("pointer"));
}


//=====[component core.Border]=====================

	var BorderBaseComponent = _globals.core.Object
	var BorderBasePrototype = BorderBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	var BorderComponent = _globals.core.Border = function(parent, _delegate) {
		BorderBaseComponent.apply(this, arguments)

	}
	var BorderPrototype = BorderComponent.prototype = Object.create(BorderBasePrototype)

	BorderPrototype.constructor = BorderComponent

	BorderPrototype.componentName = 'core.Border'
	BorderPrototype._update = function(name,value) {
		switch(name) {
			case 'width': this.parent.style({'border-width': value, 'margin-left': -value, 'margin-top': -value}); break;
			case 'color': this.parent.style('border-color', _globals.core.normalizeColor(value)); break;
			case 'style': this.parent.style('border-style', value); break
		}
		_globals.core.Object.prototype._update.apply(this, arguments)
	}
	core.addProperty(BorderPrototype, 'int', 'width')
	core.addProperty(BorderPrototype, 'color', 'color')
	core.addProperty(BorderPrototype, 'string', 'style')
	core.addProperty(BorderPrototype, 'BorderSide', 'left')
	core.addProperty(BorderPrototype, 'BorderSide', 'right')
	core.addProperty(BorderPrototype, 'BorderSide', 'top')
	core.addProperty(BorderPrototype, 'BorderSide', 'bottom')

	BorderPrototype.__create = function(__closure) {
		BorderBasePrototype.__create.call(this, __closure.__base = { })
//creating component core.<anonymous>
		var this$top = new _globals.core.BorderSide(this)
		__closure.this$top = this$top

//creating component BorderSide
		this$top.__create(__closure.__closure_this$top = { })

		this.top = this$top
//creating component core.<anonymous>
		var this$right = new _globals.core.BorderSide(this)
		__closure.this$right = this$right

//creating component BorderSide
		this$right.__create(__closure.__closure_this$right = { })

		this.right = this$right
//creating component core.<anonymous>
		var this$bottom = new _globals.core.BorderSide(this)
		__closure.this$bottom = this$bottom

//creating component BorderSide
		this$bottom.__create(__closure.__closure_this$bottom = { })

		this.bottom = this$bottom
//creating component core.<anonymous>
		var this$left = new _globals.core.BorderSide(this)
		__closure.this$left = this$left

//creating component BorderSide
		this$left.__create(__closure.__closure_this$left = { })

		this.left = this$left
	}
	BorderPrototype.__setup = function(__closure) {
	BorderBasePrototype.__setup.call(this, __closure.__base); delete __closure.__base
//setting up component BorderSide
			var this$top = __closure.this$top
			this$top.__setup(__closure.__closure_this$top)
			delete __closure.__closure_this$top

//assigning name to ("top")
			this$top._removeUpdater('name'); this$top.name = (("top"));


//setting up component BorderSide
			var this$right = __closure.this$right
			this$right.__setup(__closure.__closure_this$right)
			delete __closure.__closure_this$right

//assigning name to ("right")
			this$right._removeUpdater('name'); this$right.name = (("right"));


//setting up component BorderSide
			var this$bottom = __closure.this$bottom
			this$bottom.__setup(__closure.__closure_this$bottom)
			delete __closure.__closure_this$bottom

//assigning name to ("bottom")
			this$bottom._removeUpdater('name'); this$bottom.name = (("bottom"));


//setting up component BorderSide
			var this$left = __closure.this$left
			this$left.__setup(__closure.__closure_this$left)
			delete __closure.__closure_this$left

//assigning name to ("left")
			this$left._removeUpdater('name'); this$left.name = (("left"));
}


//=====[component core.BorderSide]=====================

	var BorderSideBaseComponent = _globals.core.Object
	var BorderSideBasePrototype = BorderSideBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	var BorderSideComponent = _globals.core.BorderSide = function(parent, _delegate) {
		BorderSideBaseComponent.apply(this, arguments)

	}
	var BorderSidePrototype = BorderSideComponent.prototype = Object.create(BorderSideBasePrototype)

	BorderSidePrototype.constructor = BorderSideComponent

	BorderSidePrototype.componentName = 'core.BorderSide'
	BorderSidePrototype._update = function(name,value) {
		switch(name) {
			case 'width': this._updateStyle(); break
			case 'color': this._updateStyle(); break
		}
		_globals.core.Object.prototype._update.apply(this, arguments);
	}
	BorderSidePrototype._updateStyle = function() {
		if (this.parent && this.parent.parent) {
			var pp = this.parent.parent
			if (pp) {
				var cssname = 'border-' + this.name
				if (this.width) {
					pp.style(cssname, this.width + "px solid " + _globals.core.normalizeColor(this.color))
				} else
					pp.style(cssname, '')
			}
		}
	}
	core.addProperty(BorderSidePrototype, 'string', 'name')
	core.addProperty(BorderSidePrototype, 'int', 'width')
	core.addProperty(BorderSidePrototype, 'color', 'color')

//=====[component controls.JWPlayer]=====================

	var JWPlayerBaseComponent = _globals.core.Item
	var JWPlayerBasePrototype = JWPlayerBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.core.Item}
 */
	var JWPlayerComponent = _globals.controls.JWPlayer = function(parent, _delegate) {
		JWPlayerBaseComponent.apply(this, arguments)
	//custom constructor:
	{
		this.element.setAttribute('id', 'jwplayer')

		this._player = window.jwplayer('jwplayer')
//		this._player.setup({});
		this._player.on('all', function (e, x) {
		    console.log("on all", e, x)
		})
	}

	}
	var JWPlayerPrototype = JWPlayerComponent.prototype = Object.create(JWPlayerBasePrototype)

	JWPlayerPrototype.constructor = JWPlayerComponent

	JWPlayerPrototype.componentName = 'controls.JWPlayer'
	JWPlayerPrototype.finished = _globals.core.createSignal('finished')
	JWPlayerPrototype.error = _globals.core.createSignal('error')
	JWPlayerPrototype.play = function(state) {
		this._player.play(state)
	}
	JWPlayerPrototype.loadPlaylist = function(pl) {

		this._player.setup(pl[0])

		var self = this;

		this._player.on('all', function (e, x) {
			if (e !== "time" && self.logsEnabled)
			    console.log("JWplayer event", e, x)
		})



		this._player.load(pl)
	}
	core.addProperty(JWPlayerPrototype, 'string', 'source')
	core.addProperty(JWPlayerPrototype, 'Color', 'backgroundColor', ("#000"))
	core.addProperty(JWPlayerPrototype, 'float', 'volume', (1.0))
	core.addProperty(JWPlayerPrototype, 'bool', 'loop', (false))
	core.addProperty(JWPlayerPrototype, 'bool', 'ready', (false))
	core.addProperty(JWPlayerPrototype, 'bool', 'muted', (false))
	core.addProperty(JWPlayerPrototype, 'bool', 'paused', (false))
	core.addProperty(JWPlayerPrototype, 'bool', 'waiting', (false))
	core.addProperty(JWPlayerPrototype, 'bool', 'seeking', (false))
	core.addProperty(JWPlayerPrototype, 'bool', 'autoPlay', (false))
	core.addProperty(JWPlayerPrototype, 'int', 'duration')
	core.addProperty(JWPlayerPrototype, 'int', 'progress')
	core.addProperty(JWPlayerPrototype, 'int', 'buffered')
	core.addProperty(JWPlayerPrototype, 'bool', 'logsEnabled')
	_globals.core._protoOnChanged(JWPlayerPrototype, 'source', (function(value) {
		this._player.setup({
			file: value,
			volume: 10,
			title: "My Favorite Video!",
		    description: "This has lots of kittens in it!"
		});
	} ))
	_globals.core._protoOnChanged(JWPlayerPrototype, 'width', (function(value) { this.element.dom.width = value; } ))
	_globals.core._protoOnChanged(JWPlayerPrototype, 'height', (function(value) { this.element.dom.height = value; } ))

	JWPlayerPrototype.__create = function(__closure) {
		JWPlayerBasePrototype.__create.call(this, __closure.__base = { })

	}
	JWPlayerPrototype.__setup = function(__closure) {
	JWPlayerBasePrototype.__setup.call(this, __closure.__base); delete __closure.__base
//assigning width to (640)
			this._removeUpdater('width'); this.width = ((640));
//assigning logsEnabled to (this._get('recursiveVisible'))
			var update$this$logsEnabled = (function() { this.logsEnabled = ((this._get('recursiveVisible'))); }).bind(this)
			var dep$this$logsEnabled$0 = this
			this.connectOnChanged(dep$this$logsEnabled$0, 'recursiveVisible', update$this$logsEnabled)
			this._removeUpdater('logsEnabled', [[dep$this$logsEnabled$0, 'recursiveVisible', update$this$logsEnabled]])
			update$this$logsEnabled();
//assigning height to (480)
			this._removeUpdater('height'); this.height = ((480));
}


//=====[component core.Effects]=====================

	var EffectsBaseComponent = _globals.core.Object
	var EffectsBasePrototype = EffectsBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	var EffectsComponent = _globals.core.Effects = function(parent, _delegate) {
		EffectsBaseComponent.apply(this, arguments)

	}
	var EffectsPrototype = EffectsComponent.prototype = Object.create(EffectsBasePrototype)

	EffectsPrototype.constructor = EffectsComponent

	EffectsPrototype.componentName = 'core.Effects'
	EffectsPrototype._getFilterStyle = function() {
		var style = []
		this._addStyle(style, 'blur', 'blur', 'px')
		this._addStyle(style, 'grayscale')
		this._addStyle(style, 'sepia')
		this._addStyle(style, 'brightness')
		this._addStyle(style, 'contrast')
		this._addStyle(style, 'hueRotate', 'hue-rotate', 'deg')
		this._addStyle(style, 'invert')
		this._addStyle(style, 'saturate')
		return style
	}
	EffectsPrototype._update = function(name,value) {
		this._updateStyle()
		_globals.core.Object.prototype._update.apply(this, arguments)
	}
	EffectsPrototype._addStyle = function(array,property,style,units) {
		var value = this[property]
		if (value)
			array.push((style || property) + '(' + value + (units || '') + ') ')
	}
	EffectsPrototype._updateStyle = function(updateShadow) {
		var filterStyle = this._getFilterStyle().join('')
		var parent = this.parent

		var style = {}
		var updateStyle = false

		if (filterStyle.length > 0) {
			//chromium bug
			//https://github.com/Modernizr/Modernizr/issues/981
			style['-webkit-filter'] = filterStyle
			style['filter'] = filterStyle
			updateStyle = true
		}

		if (this.shadow && (!this.shadow._empty() || updateShadow)) {
			style['box-shadow'] = this.shadow._getFilterStyle()
			updateStyle = true
		}

		if (updateStyle) {
			//log(style)
			parent.style(style)
		}
	}
	core.addProperty(EffectsPrototype, 'real', 'blur')
	core.addProperty(EffectsPrototype, 'real', 'grayscale')
	core.addProperty(EffectsPrototype, 'real', 'sepia')
	core.addProperty(EffectsPrototype, 'real', 'brightness')
	core.addProperty(EffectsPrototype, 'real', 'contrast')
	core.addProperty(EffectsPrototype, 'real', 'hueRotate')
	core.addProperty(EffectsPrototype, 'real', 'invert')
	core.addProperty(EffectsPrototype, 'real', 'saturate')
	core.addProperty(EffectsPrototype, 'Shadow', 'shadow')

	EffectsPrototype.__create = function(__closure) {
		EffectsBasePrototype.__create.call(this, __closure.__base = { })
//creating component core.<anonymous>
		var this$shadow = new _globals.core.Shadow(this)
		__closure.this$shadow = this$shadow

//creating component Shadow
		this$shadow.__create(__closure.__closure_this$shadow = { })

		this.shadow = this$shadow
	}
	EffectsPrototype.__setup = function(__closure) {
	EffectsBasePrototype.__setup.call(this, __closure.__base); delete __closure.__base
//setting up component Shadow
			var this$shadow = __closure.this$shadow
			this$shadow.__setup(__closure.__closure_this$shadow)
			delete __closure.__closure_this$shadow
}


//=====[component core.Text]=====================

	var TextBaseComponent = _globals.core.Item
	var TextBasePrototype = TextBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.core.Item}
 */
	var TextComponent = _globals.core.Text = function(parent, _delegate) {
		TextBaseComponent.apply(this, arguments)
	//custom constructor:
	{
		this._context.backend.initText(this)
		this._setText(this.text)
		var self = this
		this._delayedUpdateSize = new _globals.core.DelayedAction(this._context, function() {
			self._updateSizeImpl()
		})
	}

	}
	var TextPrototype = TextComponent.prototype = Object.create(TextBasePrototype)

	TextPrototype.constructor = TextComponent

	TextPrototype.componentName = 'core.Text'
	TextPrototype.on = function(name,callback) {
		if (!this._updateSizeNeeded) {
			if (name == 'boxChanged')
				this._enableSizeUpdate()
		}
		_globals.core.Object.prototype.on.apply(this, arguments)
	}
	TextPrototype.onChanged = function(name,callback) {
		if (!this._updateSizeNeeded) {
			switch(name) {
				case "right":
				case "width":
				case "bottom":
				case "height":
				case "verticalCenter":
				case "horizontalCenter":
					this._enableSizeUpdate()
			}
		}
		_globals.core.Object.prototype.onChanged.apply(this, arguments);
	}
	TextPrototype._enableSizeUpdate = function() {
		this._updateSizeNeeded = true
		this._updateSize()
	}
	TextPrototype._setText = function(html) {
		this.element.setHtml(html)
	}
	TextPrototype._update = function(name,value) {
		switch(name) {
			case 'text': this._setText(value); this._updateSize(); break;
			case 'color': this.style('color', _globals.core.normalizeColor(value)); break;
			case 'width': this._updateSize(); break;
			case 'verticalAlignment': this.verticalAlignment = value; this._enableSizeUpdate(); break
			case 'horizontalAlignment':
				switch(value) {
				case this.AlignLeft:	this.style('text-align', 'left'); break
				case this.AlignRight:	this.style('text-align', 'right'); break
				case this.AlignHCenter:	this.style('text-align', 'center'); break
				case this.AlignJustify:	this.style('text-align', 'justify'); break
				}
				break
			case 'wrapMode':
				switch(value) {
				case this.NoWrap:
					this.style({'white-space': 'nowrap', 'word-break': '' })
					break
				case this.Wrap:
				case this.WordWrap:
					this.style({'white-space': 'normal', 'word-break': '' })
					break
				case this.WrapAnywhere:
					this.style({ 'white-space': 'normal', 'word-break': 'break-all' })
					break
				}
				this._updateSize();
				break
		}
		_globals.core.Item.prototype._update.apply(this, arguments);
	}
	TextPrototype._updateSizeImpl = function() {
		if (this.text.length === 0) {
			this.paintedWidth = 0
			this.paintedHeight = 0
			return
		}

		this._context.backend.layoutText(this)
	}
	TextPrototype._updateStyle = function() {
		if (this.shadow && !this.shadow._empty())
			this.style('text-shadow', this.shadow._getFilterStyle())
		else
			this.style('text-shadow', '')
		_globals.core.Item.prototype._updateStyle.apply(this, arguments)
	}
	TextPrototype._updateSize = function() {
		if (this._updateSizeNeeded)
			this._delayedUpdateSize.schedule()
	}
	core.addProperty(TextPrototype, 'string', 'text')
	core.addProperty(TextPrototype, 'color', 'color')
	core.addProperty(TextPrototype, 'Shadow', 'shadow')
	core.addProperty(TextPrototype, 'Font', 'font')
	core.addProperty(TextPrototype, 'int', 'paintedWidth')
	core.addProperty(TextPrototype, 'int', 'paintedHeight')
/** @const @type {number} */
	TextPrototype.AlignTop = 0
/** @const @type {number} */
	TextComponent.AlignTop = 0
/** @const @type {number} */
	TextPrototype.AlignBottom = 1
/** @const @type {number} */
	TextComponent.AlignBottom = 1
/** @const @type {number} */
	TextPrototype.AlignVCenter = 2
/** @const @type {number} */
	TextComponent.AlignVCenter = 2
	core.addProperty(TextPrototype, 'enum', 'verticalAlignment')
/** @const @type {number} */
	TextPrototype.AlignLeft = 0
/** @const @type {number} */
	TextComponent.AlignLeft = 0
/** @const @type {number} */
	TextPrototype.AlignRight = 1
/** @const @type {number} */
	TextComponent.AlignRight = 1
/** @const @type {number} */
	TextPrototype.AlignHCenter = 2
/** @const @type {number} */
	TextComponent.AlignHCenter = 2
/** @const @type {number} */
	TextPrototype.AlignJustify = 3
/** @const @type {number} */
	TextComponent.AlignJustify = 3
	core.addProperty(TextPrototype, 'enum', 'horizontalAlignment')
/** @const @type {number} */
	TextPrototype.NoWrap = 0
/** @const @type {number} */
	TextComponent.NoWrap = 0
/** @const @type {number} */
	TextPrototype.WordWrap = 1
/** @const @type {number} */
	TextComponent.WordWrap = 1
/** @const @type {number} */
	TextPrototype.WrapAnywhere = 2
/** @const @type {number} */
	TextComponent.WrapAnywhere = 2
/** @const @type {number} */
	TextPrototype.Wrap = 3
/** @const @type {number} */
	TextComponent.Wrap = 3
	core.addProperty(TextPrototype, 'enum', 'wrapMode')

	TextPrototype.__create = function(__closure) {
		TextBasePrototype.__create.call(this, __closure.__base = { })
//creating component core.<anonymous>
		var this$shadow = new _globals.core.Shadow(this)
		__closure.this$shadow = this$shadow

//creating component Shadow
		this$shadow.__create(__closure.__closure_this$shadow = { })

		this.shadow = this$shadow
//creating component core.<anonymous>
		var this$font = new _globals.core.Font(this)
		__closure.this$font = this$font

//creating component Font
		this$font.__create(__closure.__closure_this$font = { })

		this.font = this$font
	}
	TextPrototype.__setup = function(__closure) {
	TextBasePrototype.__setup.call(this, __closure.__base); delete __closure.__base
//assigning width to (this._get('paintedWidth'))
			var update$this$width = (function() { this.width = ((this._get('paintedWidth'))); }).bind(this)
			var dep$this$width$0 = this
			this.connectOnChanged(dep$this$width$0, 'paintedWidth', update$this$width)
			this._removeUpdater('width', [[dep$this$width$0, 'paintedWidth', update$this$width]])
			update$this$width();

//setting up component Shadow
			var this$shadow = __closure.this$shadow
			this$shadow.__setup(__closure.__closure_this$shadow)
			delete __closure.__closure_this$shadow



//setting up component Font
			var this$font = __closure.this$font
			this$font.__setup(__closure.__closure_this$font)
			delete __closure.__closure_this$font


//assigning height to (this._get('paintedHeight'))
			var update$this$height = (function() { this.height = ((this._get('paintedHeight'))); }).bind(this)
			var dep$this$height$0 = this
			this.connectOnChanged(dep$this$height$0, 'paintedHeight', update$this$height)
			this._removeUpdater('height', [[dep$this$height$0, 'paintedHeight', update$this$height]])
			update$this$height();
}


//=====[component src.TextButton]=====================

	var TextButtonBaseComponent = _globals.core.Text
	var TextButtonBasePrototype = TextButtonBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.core.Text}
 */
	var TextButtonComponent = _globals.src.TextButton = function(parent, _delegate) {
		TextButtonBaseComponent.apply(this, arguments)

	}
	var TextButtonPrototype = TextButtonComponent.prototype = Object.create(TextButtonBasePrototype)

	TextButtonPrototype.constructor = TextButtonComponent

	TextButtonPrototype.componentName = 'src.TextButton'

	TextButtonPrototype.__create = function(__closure) {
		TextButtonBasePrototype.__create.call(this, __closure.__base = { })

	}
	TextButtonPrototype.__setup = function(__closure) {
	TextButtonBasePrototype.__setup.call(this, __closure.__base); delete __closure.__base
//assigning color to ("#2196F3")
			this._removeUpdater('color'); this.color = (("#2196F3"));
//assigning font.pixelSize to (24)
			this._removeUpdater('font.pixelSize'); this._get('font').pixelSize = ((24));
	var behavior_this_on_color = new _globals.core.Animation(this)
	var behavior_this_on_color__closure = { behavior_this_on_color: behavior_this_on_color }

//creating component Animation
	behavior_this_on_color.__create(behavior_this_on_color__closure.__closure_behavior_this_on_color = { })


//setting up component Animation
	var behavior_this_on_color = behavior_this_on_color__closure.behavior_this_on_color
	behavior_this_on_color.__setup(behavior_this_on_color__closure.__closure_behavior_this_on_color)
	delete behavior_this_on_color__closure.__closure_behavior_this_on_color


	this.setAnimation('color', behavior_this_on_color);
}


//=====[component core.Context]=====================

	var ContextBaseComponent = _globals.core.Item
	var ContextBasePrototype = ContextBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.core.Item}
 */
	var ContextComponent = _globals.core.Context = function(parent, _delegate) {
		ContextBaseComponent.apply(this, arguments)
	//custom constructor:
	{
		this.options = arguments[2]
		this.l10n = this.options.l10n || {}

		this._local['context'] = this
		this._prefix = this.options.prefix
		this._context = this
		this._started = false
		this._completed = false
		this._completedHandlers = []
		this._delayedActions = []
		this._stylesRegistered = {}

		this.backend = _globals._backend()
	}

	}
	var ContextPrototype = ContextComponent.prototype = Object.create(ContextBasePrototype)

	ContextPrototype.constructor = ContextComponent

	ContextPrototype.componentName = 'core.Context'
	ContextPrototype.qsTr = function(text) {
		var args = arguments
		var lang = this.language
		var messages = this.l10n[lang] || {}
		var contexts = messages[text] || {}
		for(var name in contexts) {
			text = contexts[name] //fixme: add context handling here
			break
		}
		return text.replace(/%(\d+)/, function(text, index) { return args[index] })
	}
	ContextPrototype.createElement = function(tag) {
		var el = this.backend.createElement(this, tag)
		if (this._prefix) {
			el.addClass(this.getClass('core-item'))
		}
		return el
	}
	ContextPrototype.registerStyle = function(item,tag) {
		if (!(tag in this._stylesRegistered)) {
			item.registerStyle(this.stylesheet, tag)
			this._stylesRegistered[tag] = true
		}
	}
	ContextPrototype.run = function() {
		this.backend.run(this)
	}
	ContextPrototype.init = function() {
		log('Context: initializing...')
		new this.backend.init(this)
	}
	ContextPrototype._run = function() {
		log('Context: calling completed()')
		this._complete()
	}
	ContextPrototype.start = function(instance) {
		var closure = {}
		instance.__create(closure)
		instance.__setup(closure)
		closure = undefined
		log('Context: created instance')
		this._started = true
		// log('Context: calling on completed')
		log('Context: signalling layout')
		this.boxChanged()
		log('Context: done')
		return instance;
	}
	ContextPrototype._complete = function() {
		if (!this._started || this._runningComplete)
			return

		this._completed = true
		this._runningComplete = true

		var invoker = _globals.core.safeCall(this, [], function (ex) { log("onCompleted failed:", ex, ex.stack) })
		do {
			while(this._completedHandlers.length) {
				var ch = this._completedHandlers
				this._completedHandlers = []
				ch.forEach(invoker)
			}
			this._processActions()
		} while(this._completedHandlers.length)
		this._runningComplete = false
	}
	ContextPrototype.getClass = function(name) {
		return this._prefix + name
	}
	ContextPrototype._update = function(name,value) {
		switch(name) {
			case 'fullscreen': if (value) this.backend.enterFullscreenMode(this.element); else this.backend.exitFullscreenMode(); break
		}
		_globals.core.Item.prototype._update.apply(this, arguments)
	}
	ContextPrototype.scheduleAction = function(action) {
		this._delayedActions.push(action)
		if (this._completed && this._delayedTimeout === undefined) //do not schedule any processing before creation process ends
			this._delayedTimeout = setTimeout(this._processActions.bind(this), 0)
	}
	ContextPrototype._onCompleted = function(callback) {
		this._completedHandlers.push(callback);
	}
	ContextPrototype._processActions = function() {
		var invoker = _globals.core.safeCall(this, [], function (ex) { log('exception in delayed action', ex, ex.stack) })
		while (this._delayedActions.length) {
			var actions = this._delayedActions
			this._delayedActions = []
			actions.forEach(invoker)
		}
		this._delayedTimeout = undefined
	}
	core.addProperty(ContextPrototype, 'int', 'scrollY')
	core.addProperty(ContextPrototype, 'bool', 'fullscreen')
	core.addProperty(ContextPrototype, 'string', 'language')
	core.addProperty(ContextPrototype, 'System', 'system')
	core.addProperty(ContextPrototype, 'Location', 'location')
	core.addProperty(ContextPrototype, 'Stylesheet', 'stylesheet')
	core.addProperty(ContextPrototype, 'Orientation', 'orientation')

	ContextPrototype.__create = function(__closure) {
		ContextBasePrototype.__create.call(this, __closure.__base = { })
//creating component core.<anonymous>
		var this$orientation = new _globals.html5.Orientation(this)
		__closure.this$orientation = this$orientation

//creating component Orientation
		this$orientation.__create(__closure.__closure_this$orientation = { })

		this.orientation = this$orientation
//creating component core.<anonymous>
		var this$stylesheet = new _globals.html5.Stylesheet(this)
		__closure.this$stylesheet = this$stylesheet

//creating component Stylesheet
		this$stylesheet.__create(__closure.__closure_this$stylesheet = { })

		this.stylesheet = this$stylesheet
//creating component core.<anonymous>
		var this$system = new _globals.core.System(this)
		__closure.this$system = this$system

//creating component System
		this$system.__create(__closure.__closure_this$system = { })

		this.system = this$system
//creating component core.<anonymous>
		var this$location = new _globals.html5.Location(this)
		__closure.this$location = this$location

//creating component Location
		this$location.__create(__closure.__closure_this$location = { })

		this.location = this$location
	}
	ContextPrototype.__setup = function(__closure) {
	ContextBasePrototype.__setup.call(this, __closure.__base); delete __closure.__base
//setting up component Orientation
			var this$orientation = __closure.this$orientation
			this$orientation.__setup(__closure.__closure_this$orientation)
			delete __closure.__closure_this$orientation



//setting up component Stylesheet
			var this$stylesheet = __closure.this$stylesheet
			this$stylesheet.__setup(__closure.__closure_this$stylesheet)
			delete __closure.__closure_this$stylesheet



//setting up component System
			var this$system = __closure.this$system
			this$system.__setup(__closure.__closure_this$system)
			delete __closure.__closure_this$system



//setting up component Location
			var this$location = __closure.this$location
			this$location.__setup(__closure.__closure_this$location)
			delete __closure.__closure_this$location
}


//=====[component controls.core.Resource]=====================

	var ResourceBaseComponent = _globals.controls.core.Request
	var ResourceBasePrototype = ResourceBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.controls.core.Request}
 */
	var ResourceComponent = _globals.controls.core.Resource = function(parent, _delegate) {
		ResourceBaseComponent.apply(this, arguments)

	}
	var ResourcePrototype = ResourceComponent.prototype = Object.create(ResourceBasePrototype)

	ResourcePrototype.constructor = ResourceComponent

	ResourcePrototype.componentName = 'controls.core.Resource'
	core.addProperty(ResourcePrototype, 'string', 'url')
	core.addProperty(ResourcePrototype, 'string', 'data')
	_globals.core._protoOnChanged(ResourcePrototype, 'url', (function(value) {
		var self = this
		this.ajax({
			url: value,
			done: function(data) { self.data = data.target.responseText }
		})
	} ))

//=====[component core.Transform]=====================

	var TransformBaseComponent = _globals.core.Object
	var TransformBasePrototype = TransformBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	var TransformComponent = _globals.core.Transform = function(parent, _delegate) {
		TransformBaseComponent.apply(this, arguments)
	//custom constructor:
	{ this._transforms = {} }

	}
	var TransformPrototype = TransformComponent.prototype = Object.create(TransformBasePrototype)

	TransformPrototype.constructor = TransformComponent

	TransformPrototype.componentName = 'core.Transform'
	TransformPrototype._update = function(name,value) {
		switch(name) {
			case 'perspective':	this._transforms['perspective'] = value + 'px'; break;
			case 'translateX':	this._transforms['translateX'] = value + 'px'; break;
			case 'translateY':	this._transforms['translateY'] = value + 'px'; break;
			case 'translateZ':	this._transforms['translateZ'] = value + 'px'; break;
			case 'rotateX':	this._transforms['rotateX'] = value + 'deg'; break
			case 'rotateY':	this._transforms['rotateY'] = value + 'deg'; break
			case 'rotateZ':	this._transforms['rotateZ'] = value + 'deg'; break
			case 'rotate':	this._transforms['rotate'] = value + 'deg'; break
			case 'scaleX':	this._transforms['scaleX'] = value; break
			case 'scaleY':	this._transforms['scaleY'] = value; break
			case 'skewX':	this._transforms['skewX'] = value + 'deg'; break
			case 'skewY':	this._transforms['skewY'] = value + 'deg'; break
		}

		var str = ""
		for (var i in this._transforms) {
			str += i
			str += "(" + this._transforms[i] + ") "
		}
		this.parent.style('transform', str)
		_globals.core.Object.prototype._update.apply(this, arguments)
	}
	core.addProperty(TransformPrototype, 'int', 'perspective')
	core.addProperty(TransformPrototype, 'int', 'translateX')
	core.addProperty(TransformPrototype, 'int', 'translateY')
	core.addProperty(TransformPrototype, 'int', 'translateZ')
	core.addProperty(TransformPrototype, 'real', 'rotateX')
	core.addProperty(TransformPrototype, 'real', 'rotateY')
	core.addProperty(TransformPrototype, 'real', 'rotateZ')
	core.addProperty(TransformPrototype, 'real', 'rotate')
	core.addProperty(TransformPrototype, 'real', 'scaleX')
	core.addProperty(TransformPrototype, 'real', 'scaleY')
	core.addProperty(TransformPrototype, 'real', 'skewX')
	core.addProperty(TransformPrototype, 'real', 'skewY')

//=====[component controls.mixins.OverflowMixin]=====================

	var OverflowMixinBaseComponent = _globals.core.Object
	var OverflowMixinBasePrototype = OverflowMixinBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	var OverflowMixinComponent = _globals.controls.mixins.OverflowMixin = function(parent, _delegate) {
		OverflowMixinBaseComponent.apply(this, arguments)

	}
	var OverflowMixinPrototype = OverflowMixinComponent.prototype = Object.create(OverflowMixinBasePrototype)

	OverflowMixinPrototype.constructor = OverflowMixinComponent

	OverflowMixinPrototype.componentName = 'controls.mixins.OverflowMixin'
	OverflowMixinPrototype._update = function(name,value) {
		switch(value) {
			case this.Visible:	
				this.parent.style('overflow', 'visible');
				break;
			case this.Hidden:	
				this.parent.style('overflow', 'hidden');
				break;
			case this.Scroll:	
				this.parent.style('overflow', 'auto');
				break;
			case this.ScrollX:
				this.parent.style('overflow', 'auto');
				this.parent.style('overflow-y', 'hidden');
				break;
			case this.ScrollY:
				this.parent.style('overflow', 'auto');
				this.parent.style('overflow-x', 'hidden');
				break;
		}
		_globals.core.Object.prototype._update.apply(this, arguments);
	}
/** @const @type {number} */
	OverflowMixinPrototype.Visible = 0
/** @const @type {number} */
	OverflowMixinComponent.Visible = 0
/** @const @type {number} */
	OverflowMixinPrototype.Hidden = 1
/** @const @type {number} */
	OverflowMixinComponent.Hidden = 1
/** @const @type {number} */
	OverflowMixinPrototype.Scroll = 2
/** @const @type {number} */
	OverflowMixinComponent.Scroll = 2
/** @const @type {number} */
	OverflowMixinPrototype.ScrollX = 3
/** @const @type {number} */
	OverflowMixinComponent.ScrollX = 3
/** @const @type {number} */
	OverflowMixinPrototype.ScrollY = 4
/** @const @type {number} */
	OverflowMixinComponent.ScrollY = 4
	core.addProperty(OverflowMixinPrototype, 'enum', 'value')

//=====[component core.Anchors]=====================

	var AnchorsBaseComponent = _globals.core.Object
	var AnchorsBasePrototype = AnchorsBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	var AnchorsComponent = _globals.core.Anchors = function(parent, _delegate) {
		AnchorsBaseComponent.apply(this, arguments)

	}
	var AnchorsPrototype = AnchorsComponent.prototype = Object.create(AnchorsBasePrototype)

	AnchorsPrototype.constructor = AnchorsComponent

	AnchorsPrototype.componentName = 'core.Anchors'
	AnchorsPrototype.marginsUpdated = _globals.core.createSignal('marginsUpdated')
	AnchorsPrototype._updateBottom = function() {
		var anchors = this
		var self = anchors.parent
		var parent = self.parent

		var parent_box = parent.toScreen()
		var bottom = anchors.bottom.toScreen()

		var tm = anchors.topMargin || anchors.margins
		var bm = anchors.bottomMargin || anchors.margins
		if (anchors.top) {
			var top = anchors.top.toScreen()
			self.height = bottom - top - bm - tm
		}
		self.y = bottom - parent_box[1] - bm - self.height - self.viewY
	}
	AnchorsPrototype._updateTop = function() {
		var anchors = this
		var self = anchors.parent
		var parent = self.parent

		var parent_box = parent.toScreen()
		var top = anchors.top.toScreen()

		var tm = anchors.topMargin || anchors.margins
		var bm = anchors.bottomMargin || anchors.margins
		self.y = top + tm - parent_box[1] - self.viewY
		if (anchors.bottom) {
			var bottom = anchors.bottom.toScreen()
			self.height = bottom - top - bm - tm
		}
	}
	AnchorsPrototype._updateRight = function() {
		var anchors = this
		var self = anchors.parent
		var parent = self.parent

		var parent_box = parent.toScreen()
		var right = anchors.right.toScreen()

		var lm = anchors.leftMargin || anchors.margins
		var rm = anchors.rightMargin || anchors.margins
		if (anchors.left) {
			var left = anchors.left.toScreen()
			self.width = right - left - rm - lm
		}
		self.x = right - parent_box[0] - rm - self.width - self.viewX
	}
	AnchorsPrototype._updateVCenter = function() {
		var anchors = this
		var self = anchors.parent
		var parent = self.parent

		var parent_box = parent.toScreen();
		var vcenter = anchors.verticalCenter.toScreen();
		var tm = anchors.topMargin || anchors.margins;
		var bm = anchors.bottomMargin || anchors.margins;
		self.y = vcenter - self.height / 2 - parent_box[1] + tm - bm - self.viewY;
	}
	AnchorsPrototype._updateLeft = function() {
		var anchors = this
		var self = anchors.parent
		var parent = self.parent

		var parent_box = parent.toScreen()
		var left = anchors.left.toScreen()

		var lm = anchors.leftMargin || anchors.margins
		self.x = left + lm - parent_box[0] - self.viewX
		if (anchors.right) {
			var right = anchors.right.toScreen()
			var rm = anchors.rightMargin || anchors.margins
			self.width = right - left - rm - lm
		}
	}
	AnchorsPrototype._updateHCenter = function() {
		var anchors = this
		var self = anchors.parent
		var parent = self.parent

		var parent_box = parent.toScreen();
		var hcenter = anchors.horizontalCenter.toScreen();
		var lm = anchors.leftMargin || anchors.margins;
		var rm = anchors.rightMargin || anchors.margins;
		self.x = hcenter - self.width / 2 - parent_box[0] + lm - rm - self.viewX;
	}
	AnchorsPrototype._update = function(name) {
		var self = this.parent
		var anchors = this

		switch(name) {
			case 'left':
				self._removeUpdater('x')
				if (this.right)
					self._removeUpdater('width')
				var update_left = this._updateLeft.bind(this)
				update_left()
				self.connectOn(anchors.left.parent, 'boxChanged', update_left)
				anchors.onChanged('leftMargin', update_left)
				break

			case 'right':
				self._removeUpdater('x')
				if (this.left)
					self._removeUpdater('width')
				var update_right = this._updateRight.bind(this)
				update_right()
				self.onChanged('width', update_right)
				self.connectOn(anchors.right.parent, 'boxChanged', update_right)
				anchors.onChanged('rightMargin', update_right)
				break

			case 'top':
				self._removeUpdater('y')
				if (this.bottom)
					self._removeUpdater('height')
				var update_top = this._updateTop.bind(this)
				update_top()
				self.connectOn(anchors.top.parent, 'boxChanged', update_top)
				anchors.onChanged('topMargin', update_top)
				break

			case 'bottom':
				self._removeUpdater('y')
				if (this.top)
					self._removeUpdater('height')
				var update_bottom = this._updateBottom.bind(this)
				update_bottom()
				self.onChanged('height', update_bottom)
				self.connectOn(anchors.bottom.parent, 'boxChanged', update_bottom)
				anchors.onChanged('bottomMargin', update_bottom)
				break

			case 'horizontalCenter':
				self._removeUpdater('x')
				var update_h_center = this._updateHCenter.bind(this)
				update_h_center()
				self.onChanged('width', update_h_center)
				anchors.onChanged('leftMargin', update_h_center)
				anchors.onChanged('rightMargin', update_h_center)
				self.connectOn(anchors.horizontalCenter.parent, 'boxChanged', update_h_center)
				break

			case 'verticalCenter':
				self._removeUpdater('y')
				var update_v_center = this._updateVCenter.bind(this)
				update_v_center()
				self.onChanged('height', update_v_center)
				anchors.onChanged('topMargin', update_v_center)
				anchors.onChanged('bottomMargin', update_v_center)
				self.connectOn(anchors.verticalCenter.parent, 'boxChanged', update_v_center)
				break

			case 'fill':
				anchors.left = anchors.fill.left
				anchors.right = anchors.fill.right
				anchors.top = anchors.fill.top
				anchors.bottom = anchors.fill.bottom
				break

			case 'centerIn':
				anchors.horizontalCenter = anchors.centerIn.horizontalCenter
				anchors.verticalCenter = anchors.centerIn.verticalCenter
				break

			case 'leftMargin':
			case 'rightMargin':
			case 'topMargin':
			case 'bottomMargin':
			case 'margins':
				this.marginsUpdated();
		}
		_globals.core.Object.prototype._update.apply(this, arguments)
	}
	core.addProperty(AnchorsPrototype, 'AnchorLine', 'bottom')
	core.addProperty(AnchorsPrototype, 'AnchorLine', 'verticalCenter')
	core.addProperty(AnchorsPrototype, 'AnchorLine', 'top')
	core.addProperty(AnchorsPrototype, 'AnchorLine', 'left')
	core.addProperty(AnchorsPrototype, 'AnchorLine', 'horizontalCenter')
	core.addProperty(AnchorsPrototype, 'AnchorLine', 'right')
	core.addProperty(AnchorsPrototype, 'Item', 'fill')
	core.addProperty(AnchorsPrototype, 'Item', 'centerIn')
	core.addProperty(AnchorsPrototype, 'int', 'margins')
	core.addProperty(AnchorsPrototype, 'int', 'bottomMargin')
	core.addProperty(AnchorsPrototype, 'int', 'topMargin')
	core.addProperty(AnchorsPrototype, 'int', 'leftMargin')
	core.addProperty(AnchorsPrototype, 'int', 'rightMargin')

//=====[component core.Image]=====================

	var ImageBaseComponent = _globals.core.Item
	var ImageBasePrototype = ImageBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.core.Item}
 */
	var ImageComponent = _globals.core.Image = function(parent, _delegate) {
		ImageBaseComponent.apply(this, arguments)
	//custom constructor:
	{
		var self = this
		this._delayedLoad = new _globals.core.DelayedAction(this._context, function() {
			self._load()
		})

		this._context.backend.initImage(this)
		this.load()
	}

	}
	var ImagePrototype = ImageComponent.prototype = Object.create(ImageBasePrototype)

	ImagePrototype.constructor = ImageComponent

	ImagePrototype.componentName = 'core.Image'
	ImagePrototype._load = function() {
		this._context.backend.loadImage(this)
	}
	ImagePrototype._update = function(name,value) {
		switch(name) {
			case 'width':
			case 'height':
			case 'fillMode': this.load(); break;
			case 'source':
				this.status = value ? this.Loading : this.Null;
				if (value)
					this.load();
				break;
		}
		_globals.core.Item.prototype._update.apply(this, arguments);
	}
	ImagePrototype.load = function() {
		this.status = (this.source.length === 0) ? _globals.core.Image.prototype.Null: _globals.core.Image.prototype.Loading
		this._delayedLoad.schedule()
	}
	ImagePrototype._onError = function() {
		this.status = this.Error;
	}
	core.addProperty(ImagePrototype, 'int', 'paintedWidth')
	core.addProperty(ImagePrototype, 'int', 'paintedHeight')
	core.addProperty(ImagePrototype, 'int', 'sourceWidth')
	core.addProperty(ImagePrototype, 'int', 'sourceHeight')
	core.addProperty(ImagePrototype, 'string', 'source')
/** @const @type {number} */
	ImagePrototype.Null = 0
/** @const @type {number} */
	ImageComponent.Null = 0
/** @const @type {number} */
	ImagePrototype.Ready = 1
/** @const @type {number} */
	ImageComponent.Ready = 1
/** @const @type {number} */
	ImagePrototype.Loading = 2
/** @const @type {number} */
	ImageComponent.Loading = 2
/** @const @type {number} */
	ImagePrototype.Error = 3
/** @const @type {number} */
	ImageComponent.Error = 3
	core.addProperty(ImagePrototype, 'enum', 'status')
/** @const @type {number} */
	ImagePrototype.Stretch = 0
/** @const @type {number} */
	ImageComponent.Stretch = 0
/** @const @type {number} */
	ImagePrototype.PreserveAspectFit = 1
/** @const @type {number} */
	ImageComponent.PreserveAspectFit = 1
/** @const @type {number} */
	ImagePrototype.PreserveAspectCrop = 2
/** @const @type {number} */
	ImageComponent.PreserveAspectCrop = 2
/** @const @type {number} */
	ImagePrototype.Tile = 3
/** @const @type {number} */
	ImageComponent.Tile = 3
/** @const @type {number} */
	ImagePrototype.TileVertically = 4
/** @const @type {number} */
	ImageComponent.TileVertically = 4
/** @const @type {number} */
	ImagePrototype.TileHorizontally = 5
/** @const @type {number} */
	ImageComponent.TileHorizontally = 5
/** @const @type {number} */
	ImagePrototype.Pad = 6
/** @const @type {number} */
	ImageComponent.Pad = 6
	core.addProperty(ImagePrototype, 'enum', 'fillMode')

//=====[component core.ListModel]=====================

	var ListModelBaseComponent = _globals.core.Object
	var ListModelBasePrototype = ListModelBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	var ListModelComponent = _globals.core.ListModel = function(parent, _delegate) {
		ListModelBaseComponent.apply(this, arguments)
	//custom constructor:
	{
		this._rows = []
	}

	}
	var ListModelPrototype = ListModelComponent.prototype = Object.create(ListModelBasePrototype)

	ListModelPrototype.constructor = ListModelComponent

	ListModelPrototype.componentName = 'core.ListModel'
	ListModelPrototype.reset = _globals.core.createSignal('reset')
	ListModelPrototype.rowsChanged = _globals.core.createSignal('rowsChanged')
	ListModelPrototype.rowsRemoved = _globals.core.createSignal('rowsRemoved')
	ListModelPrototype.rowsInserted = _globals.core.createSignal('rowsInserted')
	ListModelPrototype.insert = function(idx,row) {
		if (idx < 0 || idx > this._rows.length)
			throw new Error('index ' + idx + ' out of bounds (' + this._rows.length + ')')
		this._rows.splice(idx, 0, row)
		this.count = this._rows.length
		this.rowsInserted(idx, idx + 1)
	}
	ListModelPrototype.addChild = function(child) {
		this.append(child)
	}
	ListModelPrototype.remove = function(idx,n) {
		if (idx < 0 || idx >= this._rows.length)
			throw new Error('index ' + idx + ' out of bounds')
		if (n === undefined)
			n = 1
		this._rows.splice(idx, n)
		this.count = this._rows.length
		this.rowsRemoved(idx, idx + n)
	}
	ListModelPrototype.setProperty = function(idx,name,value) {
		if (idx < 0 || idx >= this._rows.length)
			throw new Error('index ' + idx + ' out of bounds (' + this._rows.length + ')')
		var row = this._rows[idx]
		if (!(row instanceof Object))
			throw new Error('row is non-object, invalid index? (' + idx + ')')

		if (row[name] !== value) {
			row[name] = value
			this.rowsChanged(idx, idx + 1)
		}
	}
	ListModelPrototype.get = function(idx) {
		if (idx < 0 || idx >= this._rows.length)
			throw new Error('index ' + idx + ' out of bounds (' + this._rows.length + ')')
		var row = this._rows[idx]
		if (!(row instanceof Object))
			throw new Error('row is non-object')
		row.index = idx
		return row
	}
	ListModelPrototype.clear = function() { this.assign([]) }
	ListModelPrototype.append = function(row) {
		var l = this._rows.length
		if (Array.isArray(row)) {
			Array.prototype.push.apply(this._rows, row)
			this.count = this._rows.length
			this.rowsInserted(l, l + row.length)
		} else {
			this._rows.push(row)
			this.count = this._rows.length
			this.rowsInserted(l, l + 1)
		}
	}
	ListModelPrototype.set = function(idx,row) {
		if (idx < 0 || idx >= this._rows.length)
			throw new Error('index ' + idx + ' out of bounds (' + this._rows.length + ')')
		if (!(row instanceof Object))
			throw new Error('row is non-object')
		this._rows[idx] = row
		this.rowsChanged(idx, idx + 1)
	}
	ListModelPrototype.assign = function(rows) {
		this._rows = rows
		this.count = this._rows.length
		this.reset()
	}
	core.addProperty(ListModelPrototype, 'int', 'count')

//=====[component core.AnchorLine]=====================

	var AnchorLineBaseComponent = _globals.core.Object
	var AnchorLineBasePrototype = AnchorLineBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	var AnchorLineComponent = _globals.core.AnchorLine = function(parent, _delegate) {
		AnchorLineBaseComponent.apply(this, arguments)

	}
	var AnchorLinePrototype = AnchorLineComponent.prototype = Object.create(AnchorLineBasePrototype)

	AnchorLinePrototype.constructor = AnchorLineComponent

	AnchorLinePrototype.componentName = 'core.AnchorLine'
	AnchorLinePrototype.toScreen = function() {
		return this.parent.toScreen()[this.boxIndex]
	}
	core.addProperty(AnchorLinePrototype, 'int', 'boxIndex')

//=====[component controls.core.PlaceholderFont]=====================

	var PlaceholderFontBaseComponent = _globals.core.Object
	var PlaceholderFontBasePrototype = PlaceholderFontBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	var PlaceholderFontComponent = _globals.controls.core.PlaceholderFont = function(parent, _delegate) {
		PlaceholderFontBaseComponent.apply(this, arguments)

	}
	var PlaceholderFontPrototype = PlaceholderFontComponent.prototype = Object.create(PlaceholderFontBasePrototype)

	PlaceholderFontPrototype.constructor = PlaceholderFontComponent

	PlaceholderFontPrototype.componentName = 'controls.core.PlaceholderFont'
	PlaceholderFontPrototype._update = function(name,value) {
		switch (name) {
			case 'family':		this.updateProperty('font-family', value); this.parent.parent._updateSize(); break
			case 'pointSize':	this.updateProperty('font-size', value + "pt"); this.parent.parent._updateSize(); break
			case 'pixelSize':	this.updateProperty('font-size', value + "px"); this.parent.parent._updateSize(); break
			case 'italic': 		this.updateProperty('font-style', value? 'italic': 'normal'); this.parent.parent._updateSize(); break
			case 'bold': 		this.updateProperty('font-weight', value? 'bold': 'normal'); this.parent.parent._updateSize(); break
			case 'underline':	this.updateProperty('text-decoration', value? 'underline': ''); this.parent.parent._updateSize(); break
			case 'strike':		this.updateProperty('text-decoration', value? 'line-through': ''); this.parent._updateSize(); break
			case 'lineHeight':	this.updateProperty('line-height', value + "px"); this.parent.parent._updateSize(); break;
			case 'weight':		this.updateProperty('font-weight', value); this.parent.parent._updateSize(); break;
		}
		_globals.core.Object.prototype._update.apply(this, arguments);
	}
	PlaceholderFontPrototype.updateProperty = function(name,value) {
		var cls = this.getClass()

		//fixme: port to modernizr
		var selectors = ['::-webkit-input-placeholder', '::-moz-placeholder', ':-moz-placeholder', ':-ms-input-placeholder']
		selectors.forEach(function(selector) {
			try {
				this._context.stylesheet._addRule('.' + cls + selector, name + ':' + value)
				log('added rule for .' + cls + selector)
			} catch(ex) {
				//log(ex)
			}
		}.bind(this))
	}
	PlaceholderFontPrototype.getClass = function() {
		var cls
		if (!this._placeholderClass) {
			cls = this._placeholderClass = this._context.stylesheet.allocateClass('placeholderFont')
			this.parent.parent.element.addClass(cls)
		}
		else
			cls = this._placeholderClass
		return cls
	}
	core.addProperty(PlaceholderFontPrototype, 'string', 'family')
	core.addProperty(PlaceholderFontPrototype, 'bool', 'italic')
	core.addProperty(PlaceholderFontPrototype, 'bool', 'bold')
	core.addProperty(PlaceholderFontPrototype, 'bool', 'underline')
	core.addProperty(PlaceholderFontPrototype, 'bool', 'strike')
	core.addProperty(PlaceholderFontPrototype, 'int', 'pixelSize')
	core.addProperty(PlaceholderFontPrototype, 'int', 'pointSize')
	core.addProperty(PlaceholderFontPrototype, 'int', 'lineHeight')
	core.addProperty(PlaceholderFontPrototype, 'int', 'weight')

//=====[component core.RAIIEventEmitter]=====================

	var RAIIEventEmitterBaseComponent = _globals.core.EventEmitter
	var RAIIEventEmitterBasePrototype = RAIIEventEmitterBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.core.EventEmitter}
 */
	var RAIIEventEmitterComponent = _globals.core.RAIIEventEmitter = function(parent, _delegate) {
		RAIIEventEmitterBaseComponent.apply(this, arguments)
	//custom constructor:
	{
		this._onFirstListener = {}
		this._onLastListener = {}
	}

	}
	var RAIIEventEmitterPrototype = RAIIEventEmitterComponent.prototype = Object.create(RAIIEventEmitterBasePrototype)

	RAIIEventEmitterPrototype.constructor = RAIIEventEmitterComponent

	RAIIEventEmitterPrototype.componentName = 'core.RAIIEventEmitter'
	RAIIEventEmitterPrototype.discard = function() {
		_globals.core.EventEmitter.prototype.discard.apply(this)
	}
	RAIIEventEmitterPrototype.on = function(name,callback) {
		if (!(name in this._eventHandlers)) {
			if (name in this._onFirstListener) {
				//log('first listener to', name)
				this._onFirstListener[name](name)
			} else if ('' in this._onFirstListener) {
				//log('first listener to', name)
				this._onFirstListener[''](name)
			}
			if (this._eventHandlers[name])
				throw new Error('listener callback added event handler')
		}
		_globals.core.EventEmitter.prototype.on.call(this, name, callback)
	}
	RAIIEventEmitterPrototype.onListener = function(name,first,last) {
		this._onFirstListener[name] = first
		this._onLastListener[name] = last
	}
	RAIIEventEmitterPrototype.removeAllListeners = function(name) {
		_globals.core.EventEmitter.prototype.removeAllListeners.call(this, name)
		if (name in this._onLastListener)
			this._onLastListener[name](name)
		else if ('' in this._onLastListener) {
			//log('first listener to', name)
			this._onLastListener[''](name)
		}
	}

//=====[component core.Font]=====================

	var FontBaseComponent = _globals.core.Object
	var FontBasePrototype = FontBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	var FontComponent = _globals.core.Font = function(parent, _delegate) {
		FontBaseComponent.apply(this, arguments)

	}
	var FontPrototype = FontComponent.prototype = Object.create(FontBasePrototype)

	FontPrototype.constructor = FontComponent

	FontPrototype.componentName = 'core.Font'
	FontPrototype._update = function(name,value) {
		switch(name) {
			case 'family':		this.parent.style('font-family', value); this.parent._updateSize(); break
			case 'pointSize':	this.parent.style('font-size', value + "pt"); this.parent._updateSize(); break
			case 'pixelSize':	this.parent.style('font-size', value + "px"); this.parent._updateSize(); break
			case 'italic': 		this.parent.style('font-style', value? 'italic': 'normal'); this.parent._updateSize(); break
			case 'bold': 		this.parent.style('font-weight', value? 'bold': 'normal'); this.parent._updateSize(); break
			case 'underline':	this.parent.style('text-decoration', value? 'underline': ''); this.parent._updateSize(); break
			case 'strike':		this.parent.style('text-decoration', value? 'line-through': ''); this.parent._updateSize(); break
			case 'lineHeight':	this.parent.style('line-height', value + "px"); this.parent._updateSize(); break;
			case 'weight':		this.parent.style('font-weight', value); this.parent._updateSize(); break;
		}
		_globals.core.Object.prototype._update.apply(this, arguments);
	}
	core.addProperty(FontPrototype, 'string', 'family')
	core.addProperty(FontPrototype, 'bool', 'italic')
	core.addProperty(FontPrototype, 'bool', 'bold')
	core.addProperty(FontPrototype, 'bool', 'underline')
	core.addProperty(FontPrototype, 'bool', 'strike')
	core.addProperty(FontPrototype, 'int', 'pixelSize')
	core.addProperty(FontPrototype, 'int', 'pointSize')
	core.addProperty(FontPrototype, 'int', 'lineHeight')
	core.addProperty(FontPrototype, 'int', 'weight')

//=====[component html5.Stylesheet]=====================

	var StylesheetBaseComponent = _globals.core.Object
	var StylesheetBasePrototype = StylesheetBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	var StylesheetComponent = _globals.html5.Stylesheet = function(parent, _delegate) {
		StylesheetBaseComponent.apply(this, arguments)
	//custom constructor:
	{
		var context = this._context
		var options = context.options

		var style = this.style = context.createElement('style')
		style.dom.type = 'text/css'

		this.prefix = options.prefix
		var divId = options.id

		var div = document.getElementById(divId)
		var topLevel = div === null

		var userSelect = window.Modernizr.prefixedCSS('user-select') + ": none; "
		style.setHtml(
			"div#" + divId + " { position: absolute; visibility: inherit; left: 0px; top: 0px; }" +
			"div." + this._context.getClass('core-text') + " { width: auto; height: auto; visibility: inherit; }" +
			(topLevel? "body { padding: 0; margin: 0; overflow-x: hidden; }": "") + //fixme: do we need style here in non-top-level mode?
			this.mangleRule('video', "{ position: absolute; visibility: inherit; }") +
			this.mangleRule('img', "{ position: absolute; visibility: inherit; -webkit-touch-callout: none; " + userSelect + " }")
		)
		_globals.html5.html.getElement('head').append(style)

		this._addRule = _globals.html5.html.createAddRule(style.dom).bind(this)
		this._lastId = 0
	}

	}
	var StylesheetPrototype = StylesheetComponent.prototype = Object.create(StylesheetBasePrototype)

	StylesheetPrototype.constructor = StylesheetComponent

	StylesheetPrototype.componentName = 'html5.Stylesheet'
	StylesheetPrototype.allocateClass = function(prefix) {
		var globalPrefix = this.prefix
		return (globalPrefix? globalPrefix: '') + prefix + '-' + this._lastId++
	}
	StylesheetPrototype.addRule = function(selector,rule) {
		var mangledSelector = this.mangleSelector(selector)
		this._addRule(mangledSelector, rule)
	}
	StylesheetPrototype.mangleRule = function(selector,rule) {
		return this.mangleSelector(selector) + ' ' + rule + ' '
	}
	StylesheetPrototype.mangleSelector = function(selector) {
		var prefix = this.prefix
		if (prefix)
			return selector + '.' + prefix + 'core-item'
		else
			return selector
	}

//=====[component controls.web.HoverClickMixin]=====================

	var HoverClickMixinBaseComponent = _globals.core.Object
	var HoverClickMixinBasePrototype = HoverClickMixinBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	var HoverClickMixinComponent = _globals.controls.web.HoverClickMixin = function(parent, _delegate) {
		HoverClickMixinBaseComponent.apply(this, arguments)
	//custom constructor:
	{
		this.element = this.parent.element;
		this.parent.style('cursor', this.cursor)
		this._bindClick(this.clickable)
		this._bindHover(this.enabled)
		this._bindActiveHover(this.activeHoverEnabled)
	}

	}
	var HoverClickMixinPrototype = HoverClickMixinComponent.prototype = Object.create(HoverClickMixinBasePrototype)

	HoverClickMixinPrototype.constructor = HoverClickMixinComponent

	HoverClickMixinPrototype.componentName = 'controls.web.HoverClickMixin'
	HoverClickMixinPrototype._bindActiveHover = function(value) {
		if (value && !this._hmActiveHoverBinder) {
			this._hmActiveHoverBinder = new _globals.core.EventBinder(this.parent.element)
			this._hmActiveHoverBinder.on('mouseover', function() { this.activeHover = true }.bind(this))
			this._hmActiveHoverBinder.on('mouseout', function() { this.activeHover = false }.bind(this))
		}
		if (this._hmActiveHoverBinder)
		{
			this._hmActiveHoverBinder.enable(value)
		}
	}
	HoverClickMixinPrototype._bindClick = function(value) {
		if (value && !this._hmClickBinder) {
			this._hmClickBinder = new _globals.core.EventBinder(this.element)
			this._hmClickBinder.on('click', _globals.core.createSignalForwarder(this.parent, 'clicked').bind(this))
		}
		if (this._hmClickBinder)
			this._hmClickBinder.enable(value)
	}
	HoverClickMixinPrototype._bindHover = function(value) {
		if (value && !this._hmHoverBinder) {
			this._hmHoverBinder = new _globals.core.EventBinder(this.parent.element)
			this._hmHoverBinder.on('mouseenter', function() { this.value = true }.bind(this))
			this._hmHoverBinder.on('mouseleave', function() { this.value = false }.bind(this))
		}
		if (this._hmHoverBinder)
			this._hmHoverBinder.enable(value)
	}
	core.addProperty(HoverClickMixinPrototype, 'bool', 'enabled', (true))
	core.addProperty(HoverClickMixinPrototype, 'bool', 'clickable', (true))
	core.addProperty(HoverClickMixinPrototype, 'bool', 'activeHoverEnabled', (false))
	core.addProperty(HoverClickMixinPrototype, 'bool', 'value')
	core.addProperty(HoverClickMixinPrototype, 'bool', 'activeHover', (false))
	core.addProperty(HoverClickMixinPrototype, 'string', 'cursor')
	_globals.core._protoOnChanged(HoverClickMixinPrototype, 'clickable', (function(value) { this._bindClick(value) } ))
	_globals.core._protoOnChanged(HoverClickMixinPrototype, 'cursor', (function(value) {
		this.parent.style('cursor', value)
	} ))
	_globals.core._protoOnChanged(HoverClickMixinPrototype, 'activeHoverEnabled', (function(value) { this._bindActiveHover(value) } ))
	_globals.core._protoOnChanged(HoverClickMixinPrototype, 'enabled', (function(value) { this._bindHover(value) } ))

//=====[component controls.VideoJS]=====================

	var VideoJSBaseComponent = _globals.core.Item
	var VideoJSBasePrototype = VideoJSBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.core.Item}
 */
	var VideoJSComponent = _globals.controls.VideoJS = function(parent, _delegate) {
		VideoJSBaseComponent.apply(this, arguments)
	//custom constructor:
	{
		this.element.setAttribute('id', 'videojs')
		this.element.setAttribute('controls', '')
		this.element.setAttribute('preload', 'auto')
		this.element.setAttribute('data-setup', '{}')
		this.element.setAttribute('class', 'video-js')

		this._player = window.videojs('videojs')

	}

	}
	var VideoJSPrototype = VideoJSComponent.prototype = Object.create(VideoJSBasePrototype)

	VideoJSPrototype.constructor = VideoJSComponent

	VideoJSPrototype.componentName = 'controls.VideoJS'
	VideoJSPrototype.finished = _globals.core.createSignal('finished')
	VideoJSPrototype.error = _globals.core.createSignal('error')
	VideoJSPrototype.getTag = function() { return 'video' }
	VideoJSPrototype.play = function(state) {
		this._player.play(state)
	}
	core.addProperty(VideoJSPrototype, 'string', 'source')
	core.addProperty(VideoJSPrototype, 'Color', 'backgroundColor', ("#000"))
	core.addProperty(VideoJSPrototype, 'float', 'volume', (1.0))
	core.addProperty(VideoJSPrototype, 'bool', 'loop', (false))
	core.addProperty(VideoJSPrototype, 'bool', 'ready', (false))
	core.addProperty(VideoJSPrototype, 'bool', 'muted', (false))
	core.addProperty(VideoJSPrototype, 'bool', 'paused', (false))
	core.addProperty(VideoJSPrototype, 'bool', 'waiting', (false))
	core.addProperty(VideoJSPrototype, 'bool', 'seeking', (false))
	core.addProperty(VideoJSPrototype, 'bool', 'autoPlay', (false))
	core.addProperty(VideoJSPrototype, 'int', 'duration')
	core.addProperty(VideoJSPrototype, 'int', 'progress')
	core.addProperty(VideoJSPrototype, 'int', 'buffered')
	core.addProperty(VideoJSPrototype, 'bool', 'logsEnabled')
	_globals.core._protoOnChanged(VideoJSPrototype, 'source', (function(value) {
		this._player.src(value);
		this._player.ready(function() {
			log("VIDEOJS ready");
		});
	} ))
	_globals.core._protoOnChanged(VideoJSPrototype, 'width', (function(value) { 
		this.element.dom.width = value;
		if (this._player)
			this._player.width = value;
	} ))
	_globals.core._protoOnChanged(VideoJSPrototype, 'height', (function(value) { this.element.dom.height = value; } ))

	VideoJSPrototype.__create = function(__closure) {
		VideoJSBasePrototype.__create.call(this, __closure.__base = { })

	}
	VideoJSPrototype.__setup = function(__closure) {
	VideoJSBasePrototype.__setup.call(this, __closure.__base); delete __closure.__base
//assigning width to (640)
			this._removeUpdater('width'); this.width = ((640));
//assigning logsEnabled to (this._get('recursiveVisible'))
			var update$this$logsEnabled = (function() { this.logsEnabled = ((this._get('recursiveVisible'))); }).bind(this)
			var dep$this$logsEnabled$0 = this
			this.connectOnChanged(dep$this$logsEnabled$0, 'recursiveVisible', update$this$logsEnabled)
			this._removeUpdater('logsEnabled', [[dep$this$logsEnabled$0, 'recursiveVisible', update$this$logsEnabled]])
			update$this$logsEnabled();
//assigning height to (480)
			this._removeUpdater('height'); this.height = ((480));
}


//=====[component html5.Location]=====================

	var LocationBaseComponent = _globals.core.Object
	var LocationBasePrototype = LocationBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	var LocationComponent = _globals.html5.Location = function(parent, _delegate) {
		LocationBaseComponent.apply(this, arguments)
	//custom constructor:
	{
		var self = this
		var location = window.location
		window.onhashchange = function() { self.hash = location.hash }
		window.onpopstate = function() { self.updateActualValues() }
	}

	}
	var LocationPrototype = LocationComponent.prototype = Object.create(LocationBasePrototype)

	LocationPrototype.constructor = LocationComponent

	LocationPrototype.componentName = 'html5.Location'
	LocationPrototype.updateActualValues = function() {
		this.hash = window.location.hash
		this.href = window.location.href
		this.port = window.location.port
		this.host = window.location.host
		this.origin = window.location.origin
		this.hostname = window.location.hostname
		this.pathname = window.location.pathname
		this.protocol = window.location.protocol
		this.search = window.location.search
		this.state = window.history.state
	}
	LocationPrototype.changeHref = function(href) {
		window.location.href = href
		this.updateActualValues()
	}
	LocationPrototype.pushState = function(state,title,url) {
		if (window.location.hostname) {
			window.history.pushState(state, title, url)
			this.updateActualValues()
		} else {
			document.title = title
			this.state = state
		}
	}
	core.addProperty(LocationPrototype, 'string', 'hash')
	core.addProperty(LocationPrototype, 'string', 'host')
	core.addProperty(LocationPrototype, 'string', 'href')
	core.addProperty(LocationPrototype, 'string', 'port')
	core.addProperty(LocationPrototype, 'string', 'origin')
	core.addProperty(LocationPrototype, 'string', 'hostname')
	core.addProperty(LocationPrototype, 'string', 'pathname')
	core.addProperty(LocationPrototype, 'string', 'protocol')
	core.addProperty(LocationPrototype, 'string', 'search')
	core.addProperty(LocationPrototype, 'Object', 'state')

//=====[component html5.Orientation]=====================

	var OrientationBaseComponent = _globals.core.Object
	var OrientationBasePrototype = OrientationBaseComponent.prototype

/**
 * @constructor
 * @extends {_globals.core.Object}
 */
	var OrientationComponent = _globals.html5.Orientation = function(parent, _delegate) {
		OrientationBaseComponent.apply(this, arguments)

	}
	var OrientationPrototype = OrientationComponent.prototype = Object.create(OrientationBasePrototype)

	OrientationPrototype.constructor = OrientationComponent

	OrientationPrototype.componentName = 'html5.Orientation'
	OrientationPrototype.onChanged = function(name,callback) {
		if (!this._orientationEnabled) {
			var self = this
			window.ondeviceorientation = function(e) {
				self.absolute = e.absolute
				self.alpha = e.alpha
				self.beta = e.beta
				self.gamma = e.gamma
			}
			this._orientationEnabled = true;
		}

		_globals.core.Object.prototype.onChanged.apply(this, arguments);
	}
	core.addProperty(OrientationPrototype, 'real', 'alpha')
	core.addProperty(OrientationPrototype, 'real', 'beta')
	core.addProperty(OrientationPrototype, 'real', 'gamma')
	core.addProperty(OrientationPrototype, 'bool', 'absolute')
_globals.core.model = (function() {/** @const */
var exports = {};
exports._get = function(name) { return exports[name] }
//=====[import core.model]=====================

var ModelUpdateNothing = 0
var ModelUpdateInsert = 1
var ModelUpdateUpdate = 2

var ModelUpdateRange = function(type, length) {
	this.type = type
	this.length = length
}

exports.ModelUpdate = function() {
	this.count = 0
	this._reset()
}
exports.ModelUpdate.prototype.constructor = exports.ModelUpdate

exports.ModelUpdate.prototype._reset = function() {
	this._ranges = [new ModelUpdateRange(ModelUpdateNothing, this.count)]
	this._updateIndex = this.count
}

exports.ModelUpdate.prototype._setUpdateIndex = function(begin) {
	if (begin < this._updateIndex)
		this._updateIndex = begin
}

exports.ModelUpdate.prototype._find = function(index) {
	var ranges = this._ranges
	var i
	for(i = 0; i < ranges.length; ++i) {
		var range = ranges[i]
		if (index < range.length)
			return { index: i, offset: index }
		if (range.length > 0)
			index -= range.length
	}
	if (index != 0)
		throw new Error('invalid index ' + index)

	return { index: i - 1, offset: range.length }
}

exports.ModelUpdate.prototype.reset = function(model) {
	this.update(model, 0, Math.min(model.count, this.count))
	if (this.count < model.count) {
		this.insert(model, this.count, model.count)
	} else {
		this.remove(model, model.count, this.count)
	}
}

exports.ModelUpdate.prototype._merge = function() {
	var ranges = this._ranges
	for(var index = 1; index < ranges.length; ) {
		var range = ranges[index - 1]
		var nextRange = ranges[index]
		if (range.type === nextRange.type) {
			if (range.type === ModelUpdateInsert && range.length < 0 && nextRange.length > 0) {
				//removed + inserted rows reappers as updated
				var updated = Math.min(-range.length, nextRange.length)
				range.type = ModelUpdateUpdate
				nextRange.length += range.length
				range.length = updated
				if (index > 1)
					--index
			} else {
				range.length += nextRange.length
				ranges.splice(index, 1)
			}
		} else if (range.type == ModelUpdateInsert && range.length === 0) {
			ranges.splice(index, 1)
		} else
			++index
	}
}

exports.ModelUpdate.prototype._split = function(index, offset, type, length) {
	var ranges = this._ranges
	if (offset == 0) {
		ranges.splice(index, 0, new ModelUpdateRange(type, length))
		return index + 1
	} else {
		var range = ranges[index]
		var right = range.length - offset
		range.length = offset
		if (right != 0) {
			ranges.splice(index + 1, 0,
				new ModelUpdateRange(type, length),
				new ModelUpdateRange(range.type, right))
			return index + 2
		} else {
			ranges.splice(index + 1, 0,
				new ModelUpdateRange(type, length))
			return index + 2
		}
	}
}

exports.ModelUpdate.prototype.insert = function(model, begin, end) {
	if (begin >= end)
		return

	this._setUpdateIndex(begin)
	var ranges = this._ranges
	var d = end - begin
	this.count += d
	if (this.count != model.count)
		throw new Error('unbalanced insert ' + this.count + ' + [' + begin + '-' + end + '], model reported ' + model.count)

	var res = this._find(begin)
	var range = ranges[res.index]
	if (range.length == 0) { //first insert
		range.type = ModelUpdateInsert
		range.length += d
	} else {
		if (res.offset >= 0)
			this._split(res.index, res.offset, ModelUpdateInsert, d)
		else
			this._split(res.index + 1, 0, ModelUpdateInsert, d)
	}
	this._merge()
}

exports.ModelUpdate.prototype.remove = function(model, begin, end) {
	if (begin >= end)
		return

	this._setUpdateIndex(begin)
	var ranges = this._ranges
	var d = end - begin
	this.count -= d
	if (this.count != model.count)
		throw new Error('unbalanced remove ' + this.count + ' + [' + begin + '-' + end + '], model reported ' + model.count)

	var res = this._find(begin)
	var range = ranges[res.index]

	if (range.type == ModelUpdateInsert) {
		range.length -= d
	} else {
		var index = this._split(res.index, res.offset, ModelUpdateInsert, -d)
		while(d > 0) {
			var range = ranges[index]
			if (range.length <= d) {
				ranges.splice(index, 1)
				d -= range.length
			} else {
				range.length -= d
				d = 0
			}
		}
	}
	this._merge()
}

exports.ModelUpdate.prototype.update = function(model, begin, end) {
	if (begin >= end)
		return

	var ranges = this._ranges
	var n = end - begin
	var res = this._find(begin)
	var index = res.index

	var range = ranges[index]
	if (res.offset > 0) {
		ranges.splice(index + 1, 0, new ModelUpdateRange(range.type, range.length - res.offset))
		range.length = res.offset
		++index
		if (range.length == 0)
			throw new Error('invalid offset')
	}

	while(n > 0) {
		var range = ranges[index]
		var length = range.length
		switch(range.type) {
			case ModelUpdateNothing:
				if (length > n) {
					//range larger than needed
					range.length -= n
					ranges.splice(index, 0, new ModelUpdateRange(ModelUpdateUpdate, n))
					n -= length
				} else { //length <= n
					range.type = ModelUpdateUpdate
					n -= length
				}
				break
			case ModelUpdateInsert:
				if (length > 0)
					n -= length
				++index
				break
			case ModelUpdateUpdate:
				n -= length
				++index
				break
		}
	}
	this._merge()
}

exports.ModelUpdate.prototype.apply = function(view, skipCheck) {
	var index = 0
	this._ranges.forEach(
		function(range) {
			var n = range.length
			switch(range.type) {
				case ModelUpdateInsert:
					if (n > 0) {
						view._insertItems(index, index + n)
						index += n
					} else if (n < 0) {
						view._removeItems(index, index - n)
					}
					break
				case ModelUpdateUpdate:
					view._updateItems(index, index + n)
					index += n
					break
				default:
					index += range.length
			}
		}
	)
	if (!skipCheck && view._items.length != this.count)
		throw new Error('unbalanced items update, view: ' + view._items.length + ', update:' + this.count)

	for(var i = this._updateIndex; i < this.count; ++i)
		view._updateDelegateIndex(i)
	this._reset()
}

return exports;
} )()
_globals.controls.pure.format = (function() {/** @const */
var exports = {};
exports._get = function(name) { return exports[name] }
//=====[import controls.pure.format]=====================

exports.currency = function(v, n, x) {
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
  return v.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
}
return exports;
} )()
_globals.html5.dist.modernizr_custom = (function() {/** @const */
var exports = {};
exports._get = function(name) { return exports[name] }
//=====[import html5.dist.modernizr-custom]=====================

/*! modernizr 3.3.1 (Custom Build) | MIT *
 * http://modernizr.com/download/?-cssfilters-cssgradients-csstransforms-csstransforms3d-csstransitions-fullscreen-webworkers-domprefixes-prefixed-prefixedcss-prefixedcssvalue-setclasses-testallprops-testprop !*/
!function(e,n,t){function r(e,n){return typeof e===n}function s(){var e,n,t,s,i,o,a;for(var f in x)if(x.hasOwnProperty(f)){if(e=[],n=x[f],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(s=r(n.fn,"function")?n.fn():n.fn,i=0;i<e.length;i++)o=e[i],a=o.split("."),1===a.length?Modernizr[a[0]]=s:(!Modernizr[a[0]]||Modernizr[a[0]]instanceof Boolean||(Modernizr[a[0]]=new Boolean(Modernizr[a[0]])),Modernizr[a[0]][a[1]]=s),y.push((s?"":"no-")+a.join("-"))}}function i(e){var n=w.className,t=Modernizr._config.classPrefix||"";if(S&&(n=n.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(r,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),S?w.className.baseVal=n:w.className=n)}function o(e){return e.replace(/([a-z])-([a-z])/g,function(e,n,t){return n+t.toUpperCase()}).replace(/^-/,"")}function a(e){return e.replace(/([A-Z])/g,function(e,n){return"-"+n.toLowerCase()}).replace(/^ms-/,"-ms-")}function f(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):S?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function l(e,n){return!!~(""+e).indexOf(n)}function u(e,n){return function(){return e.apply(n,arguments)}}function d(e,n,t){var s;for(var i in e)if(e[i]in n)return t===!1?e[i]:(s=n[e[i]],r(s,"function")?u(s,t||n):s);return!1}function p(){var e=n.body;return e||(e=f(S?"svg":"body"),e.fake=!0),e}function c(e,t,r,s){var i,o,a,l,u="modernizr",d=f("div"),c=p();if(parseInt(r,10))for(;r--;)a=f("div"),a.id=s?s[r]:u+(r+1),d.appendChild(a);return i=f("style"),i.type="text/css",i.id="s"+u,(c.fake?c:d).appendChild(i),c.appendChild(d),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(n.createTextNode(e)),d.id=u,c.fake&&(c.style.background="",c.style.overflow="hidden",l=w.style.overflow,w.style.overflow="hidden",w.appendChild(c)),o=t(d,e),c.fake?(c.parentNode.removeChild(c),w.style.overflow=l,w.offsetHeight):d.parentNode.removeChild(d),!!o}function m(n,r){var s=n.length;if("CSS"in e&&"supports"in e.CSS){for(;s--;)if(e.CSS.supports(a(n[s]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var i=[];s--;)i.push("("+a(n[s])+":"+r+")");return i=i.join(" or "),c("@supports ("+i+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return t}function v(e,n,s,i){function a(){d&&(delete A.style,delete A.modElem)}if(i=r(i,"undefined")?!1:i,!r(s,"undefined")){var u=m(e,s);if(!r(u,"undefined"))return u}for(var d,p,c,v,g,h=["modernizr","tspan"];!A.style;)d=!0,A.modElem=f(h.shift()),A.style=A.modElem.style;for(c=e.length,p=0;c>p;p++)if(v=e[p],g=A.style[v],l(v,"-")&&(v=o(v)),A.style[v]!==t){if(i||r(s,"undefined"))return a(),"pfx"==n?v:!0;try{A.style[v]=s}catch(y){}if(A.style[v]!=g)return a(),"pfx"==n?v:!0}return a(),!1}function g(e,n,t,s,i){var o=e.charAt(0).toUpperCase()+e.slice(1),a=(e+" "+E.join(o+" ")+o).split(" ");return r(n,"string")||r(n,"undefined")?v(a,n,s,i):(a=(e+" "+b.join(o+" ")+o).split(" "),d(a,n,t))}function h(e,n,r){return g(e,t,t,n,r)}var y=[],x=[],C={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){x.push({name:e,fn:n,options:t})},addAsyncTest:function(e){x.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=C,Modernizr=new Modernizr,Modernizr.addTest("webworkers","Worker"in e);var w=n.documentElement,S="svg"===w.nodeName.toLowerCase(),_="Moz O ms Webkit",b=C._config.usePrefixes?_.toLowerCase().split(" "):[];C._domPrefixes=b;var T=function(e,n){var t=!1,r=f("div"),s=r.style;if(e in s){var i=b.length;for(s[e]=n,t=s[e];i--&&!t;)s[e]="-"+b[i]+"-"+n,t=s[e]}return""===t&&(t=!1),t};C.prefixedCSSValue=T;var P=C._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];C._prefixes=P,Modernizr.addTest("cssgradients",function(){for(var e,n="background-image:",t="gradient(linear,left top,right bottom,from(#9f9),to(white));",r="",s=0,i=P.length-1;i>s;s++)e=0===s?"to ":"",r+=n+P[s]+"linear-gradient("+e+"left top, #9f9, white);";Modernizr._config.usePrefixes&&(r+=n+"-webkit-"+t);var o=f("a"),a=o.style;return a.cssText=r,(""+a.backgroundImage).indexOf("gradient")>-1});var k="CSS"in e&&"supports"in e.CSS,z="supportsCSS"in e;Modernizr.addTest("supports",k||z);var E=C._config.usePrefixes?_.split(" "):[];C._cssomPrefixes=E;var N=function(n){var r,s=P.length,i=e.CSSRule;if("undefined"==typeof i)return t;if(!n)return!1;if(n=n.replace(/^@/,""),r=n.replace(/-/g,"_").toUpperCase()+"_RULE",r in i)return"@"+n;for(var o=0;s>o;o++){var a=P[o],f=a.toUpperCase()+"_"+r;if(f in i)return"@-"+a.toLowerCase()+"-"+n}return!1};C.atRule=N;var j={elem:f("modernizr")};Modernizr._q.push(function(){delete j.elem});var A={style:j.elem.style};Modernizr._q.unshift(function(){delete A.style});var O=C.testStyles=c;C.testProp=function(e,n,r){return v([e],t,n,r)};C.testAllProps=g;var L=C.prefixed=function(e,n,t){return 0===e.indexOf("@")?N(e):(-1!=e.indexOf("-")&&(e=o(e)),n?g(e,n,t):g(e,"pfx"))};C.prefixedCSS=function(e){var n=L(e);return n&&a(n)};Modernizr.addTest("fullscreen",!(!L("exitFullscreen",n,!1)&&!L("cancelFullScreen",n,!1))),C.testAllProps=h,Modernizr.addTest("csstransforms",function(){return-1===navigator.userAgent.indexOf("Android 2.")&&h("transform","scale(1)",!0)}),Modernizr.addTest("csstransforms3d",function(){var e=!!h("perspective","1px",!0),n=Modernizr._config.usePrefixes;if(e&&(!n||"webkitPerspective"in w.style)){var t,r="#modernizr{width:0;height:0}";Modernizr.supports?t="@supports (perspective: 1px)":(t="@media (transform-3d)",n&&(t+=",(-webkit-transform-3d)")),t+="{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}",O(r+t,function(n){e=7===n.offsetWidth&&18===n.offsetHeight})}return e}),Modernizr.addTest("csstransitions",h("transition","all",!0)),Modernizr.addTest("cssfilters",function(){if(Modernizr.supports)return h("filter","blur(2px)");var e=f("a");return e.style.cssText=P.join("filter:blur(2px); "),!!e.style.length&&(n.documentMode===t||n.documentMode>9)}),s(),i(y),delete C.addTest,delete C.addAsyncTest;for(var R=0;R<Modernizr._q.length;R++)Modernizr._q[R]();e.Modernizr=Modernizr}(window,document);
return exports;
} )()
_globals.html5.html = (function() {/** @const */
var exports = {};
exports._get = function(name) { return exports[name] }
//=====[import html5.html]=====================

/*** @using { core.RAIIEventEmitter } **/

exports.createAddRule = function(style) {
	if(! (style.sheet || {}).insertRule) {
		var sheet = (style.styleSheet || style.sheet)
		return function(name, rules) { sheet.addRule(name, rules) }
	}
	else {
		var sheet = style.sheet
		return function(name, rules) { sheet.insertRule(name + '{' + rules + '}', sheet.cssRules.length) }
	}
}

var StyleCache = function (prefix) {
	var style = document.createElement('style')
	style.type = 'text/css'
	document.head.appendChild(style)

	this.prefix = prefix + 'C-'
	this.style = style
	this.total = 0
	this.stats = {}
	this.classes = {}
	this.classes_total = 0
	this._addRule = exports.createAddRule(style)
}
var StyleCachePrototype = StyleCache.prototype

StyleCachePrototype.constructor = StyleCache

StyleCachePrototype.add = function(rule) {
	this.stats[rule] = (this.stats[rule] || 0) + 1
	++this.total
}

StyleCachePrototype.register = function(rules) {
	var rule = rules.join(';')
	var classes = this.classes
	var cls = classes[rule]
	if (cls !== undefined)
		return cls

	var cls = classes[rule] = this.prefix + this.classes_total++
	this._addRule('.' + cls, rule)
	return cls
}

StyleCachePrototype.classify = function(rules) {
	var total = this.total
	if (total < 10) //fixme: initial population threshold
		return ''

	rules.sort() //mind vendor prefixes!
	var classified = []
	var hot = []
	var stats = this.stats
	rules.forEach(function(rule, idx) {
		var hits = stats[rule]
		var usage = hits / total
		if (usage > 0.05) { //fixme: usage threshold
			classified.push(rule)
			hot.push(idx)
		}
	})
	if (hot.length < 2)
		return ''
	hot.forEach(function(offset, idx) {
		rules.splice(offset - idx, 1)
	})
	return this.register(classified)
}

var _modernizrCache = {}
if (navigator.userAgent.toLowerCase().indexOf('webkit') >= 0)
	_modernizrCache['appearance'] = '-webkit-appearance'

var getPrefixedName = function(name) {
	var prefixedName = _modernizrCache[name]
	if (prefixedName === undefined)
		_modernizrCache[name] = prefixedName = window.Modernizr.prefixedCSS(name)
	return prefixedName
}

exports.getPrefixedName = getPrefixedName

var registerGenericListener = function(target) {
	var prefix = '_domEventHandler_'
	target.onListener('',
		function(name) {
			//log('registering generic event', name)
			var pname = prefix + name
			var callback = target[pname] = function() {
				
	/* COPY_ARGS(args, 0) */
	var $n = arguments.length
	var args = new Array($n)
	for(var $i = 0; $i < $n; ++$i) {
		args[$i] = arguments[$i]
	}

				target.emitWithArgs(name, args)
			}
			target.dom.addEventListener(name, callback)
		},
		function(name) {
			//log('removing generic event', name)
			var pname = prefix + name
			target.dom.removeEventListener(name, target[pname])
		}
	)
}

var _loadedStylesheets = {}

exports.loadExternalStylesheet = function(url) {
	if (!_loadedStylesheets[url]) {
		var link = document.createElement('link')
		link.setAttribute('rel', "stylesheet")
		link.setAttribute('href', url)
		document.head.appendChild(link)
		_loadedStylesheets[url] = true
	}
}

exports.autoClassify = false

/**
 * @constructor
 */

exports.Element = function(context, tag) {
	if (typeof tag === 'string')
		this.dom = document.createElement(tag)
	else
		this.dom = tag

	if (exports.autoClassify) {
		if (!context._styleCache)
			context._styleCache = new StyleCache(context._prefix)
	} else
		context._styleCache = null

	_globals.core.RAIIEventEmitter.apply(this)
	this._context = context
	this._fragment = []
	this._styles = {}
	this._class = ''

	registerGenericListener(this)
}

var ElementPrototype = exports.Element.prototype = Object.create(_globals.core.RAIIEventEmitter.prototype)
ElementPrototype.constructor = exports.Element

ElementPrototype.addClass = function(cls) {
	this.dom.classList.add(cls)
}

ElementPrototype.setHtml = function(html) {
	var dom = this.dom
	this._fragment.forEach(function(node) { dom.removeChild(node) })
	this._fragment = []

	if (html === '')
		return

	var fragment = document.createDocumentFragment()
	var temp = document.createElement('div')

	temp.innerHTML = html
	while (temp.firstChild) {
		this._fragment.push(temp.firstChild)
		fragment.appendChild(temp.firstChild)
	}
	dom.appendChild(fragment)
	return dom.children
}

ElementPrototype.width = function() {
	return this.dom.clientWidth
}

ElementPrototype.height = function() {
	return this.dom.clientHeight
}

ElementPrototype.fullWidth = function() {
	return this.dom.scrollWidth
}

ElementPrototype.fullHeight = function() {
	return this.dom.scrollHeight
}

ElementPrototype.style = function(name, style) {
	if (style !== undefined) {
		if (style !== '') //fixme: replace it with explicit 'undefined' syntax
			this._styles[name] = style
		else
			delete this._styles[name]
		this.updateStyle()
	} else if (name instanceof Object) { //style({ }) assignment
		for(var k in name) {
			var value = name[k]
			if (value !== '') //fixme: replace it with explicit 'undefined' syntax
				this._styles[k] = value
			else
				delete this._styles[k]
		}
		this.updateStyle()
	}
	else
		return this._styles[name]
}

ElementPrototype.setAttribute = function(name, value) {
	this.dom.setAttribute(name, value)
}

ElementPrototype.updateStyle = function() {
	var element = this.dom
	if (!element)
		return

	/** @const */
	var cssUnits = {
		'left': 'px',
		'top': 'px',
		'width': 'px',
		'height': 'px',

		'border-radius': 'px',
		'border-width': 'px',

		'margin-left': 'px',
		'margin-top': 'px',
		'margin-right': 'px',
		'margin-bottom': 'px',

		'padding-left': 'px',
		'padding-top': 'px',
		'padding-right': 'px',
		'padding-bottom': 'px',
		'padding': 'px'
	}

	var cache = this._context._styleCache
	var rules = []
	for(var name in this._styles) {
		var value = this._styles[name]

		var prefixedName = getPrefixedName(name)
		var ruleName = prefixedName !== false? prefixedName: name
		if (Array.isArray(value))
			value = value.join(',')

		var unit = (typeof value === 'number')? cssUnits[name] || '': ''
		value += unit

		//var prefixedValue = window.Modernizr.prefixedCSSValue(name, value)
		//var prefixedValue = value
		var rule = ruleName + ':' + value //+ (prefixedValue !== false? prefixedValue: value)

		if (cache)
			cache.add(rule)

		rules.push(rule)
	}
	var cls = cache? cache.classify(rules): ''
	if (cls !== this._class) {
		var classList = element.classList
		if (this._class !== '')
			classList.remove(this._class)
		this._class = cls
		if (cls !== '')
			classList.add(cls)
	}
	this.dom.setAttribute('style', rules.join(';'))
}

ElementPrototype.append = function(el) {
	this.dom.appendChild((el instanceof exports.Element)? el.dom: el)
}

ElementPrototype.discard = function() {
	_globals.core.RAIIEventEmitter.prototype.discard.apply(this)
	this.remove()
}

ElementPrototype.remove = function() {
	var dom = this.dom
	dom.parentNode.removeChild(dom)
}

exports.Window = function(context, dom) {
	_globals.core.RAIIEventEmitter.apply(this)
	this._context = context
	this.dom = dom

	registerGenericListener(this)
}

var WindowPrototype = exports.Window.prototype = Object.create(_globals.core.RAIIEventEmitter.prototype)
WindowPrototype.constructor = exports.Window

WindowPrototype.width = function() {
	return this.dom.innerWidth
}

WindowPrototype.height = function() {
	return this.dom.innerHeight
}

WindowPrototype.scrollY = function() {
	return this.dom.scrollY
}

exports.getElement = function(tag) {
	var tags = document.getElementsByTagName(tag)
	if (tags.length != 1)
		throw new Error('no tag ' + tag + '/multiple tags')
	return new exports.Element(this, tags[0])
}

exports.init = function(ctx) {
	var options = ctx.options
	var prefix = ctx._prefix
	var divId = options.id
	var tag = options.tag || 'div'

	if (prefix) {
		prefix += '-'
		log('Context: using prefix', prefix)
	}

	var win = new _globals.html5.html.Window(this, window)
	ctx.window = win
	var w, h

	var html = exports
	var div = document.getElementById(divId)
	var topLevel = div === null
	if (!topLevel) {
		div = new html.Element(this, div)
		w = div.width()
		h = div.height()
		log('Context: found element by id, size: ' + w + 'x' + h)
		win.on('resize', function() { ctx.width = div.width(); ctx.height = div.height(); });
	} else {
		w = win.width();
		h = win.height();
		log("Context: window size: " + w + "x" + h);
		div = html.createElement(ctx, tag)
		div.dom.id = divId
		win.on('resize', function() { ctx.width = win.width(); ctx.height = win.height(); });
		var body = html.getElement('body')
		body.append(div);
	}

	ctx.element = div
	ctx.width = w
	ctx.height = h
	ctx.style('visibility', 'hidden')

	win.on('scroll', function(event) { ctx.scrollY = win.scrollY(); });

	win.on('load', function() { ctx._run() })

	var onFullscreenChanged = function(e) {
		var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
		ctx.fullscreen = state
	}
	'webkitfullscreenchange mozfullscreenchange fullscreenchange'.split(' ').forEach(function(name) {
		div.on(name, onFullscreenChanged)
	})

	win.on('keydown', function(event) {
		var handlers = core.forEach(ctx, _globals.core.Item.prototype._enqueueNextChildInFocusChain, [])
		var n = handlers.length
		for(var i = 0; i < n; ++i) {
			var handler = handlers[i]
			if (handler._processKey(event)) {
				event.preventDefault();
				break
			}
		}
	}) //fixme: add html.Document instead

	var system = ctx.system
	//fixme: port to event listener?
	window.onfocus = function() { system.pageActive = true }
	window.onblur = function() { system.pageActive = false }

	ctx.screenWidth = window.screen.width
	ctx.screenHeight = window.screen.height
}

exports.createElement = function(ctx, tag) {
	return new exports.Element(ctx, tag)
}

exports.initImage = function(image) {
	var tmp = new Image()
	image._image = tmp
	image._image.onerror = image._onError.bind(image)

	image._image.onload = function() {
		image.sourceWidth = tmp.naturalWidth
		image.sourceHeight = tmp.naturalHeight
		var natW = tmp.naturalWidth, natH = tmp.naturalHeight

		if (!image.width)
			image.width = natW
		if (!image.height)
			image.height = natH

		if (image.fillMode !== image.PreserveAspectFit) {
			image.paintedWidth = image.width
			image.paintedHeight = image.height
		}

		var style = {'background-image': 'url("' + image.source + '")'}
		switch(image.fillMode) {
			case image.Stretch:
				style['background-repeat'] = 'no-repeat'
				style['background-size'] = '100% 100%'
				break;
			case image.TileVertically:
				style['background-repeat'] = 'repeat-y'
				style['background-size'] = '100% ' + natH + 'px'
				break;
			case image.TileHorizontally:
				style['background-repeat'] = 'repeat-x'
				style['background-size'] = natW + 'px 100%'
				break;
			case image.Tile:
				style['background-repeat'] = 'repeat-y repeat-x'
				style['background-size'] = 'auto'
				break;
			case image.PreserveAspectCrop:
				style['background-repeat'] = 'no-repeat'
				style['background-position'] = 'center'
				style['background-size'] = 'cover'
				break;
			case image.Pad:
				style['background-repeat'] = 'no-repeat'
				style['background-position'] = '0% 0%'
				style['background-size'] = 'auto'
				break;
			case image.PreserveAspectFit:
				style['background-repeat'] = 'no-repeat'
				style['background-position'] = 'center'
				style['background-size'] = 'contain'
				var w = image.width, h = image.height
				var targetRatio = 0, srcRatio = natW / natH

				if (w && h)
					targetRatio = w / h

				if (srcRatio > targetRatio && w) { // img width aligned with target width
					image.paintedWidth = w;
					image.paintedHeight = w / srcRatio;
				} else {
					image.paintedHeight = h;
					image.paintedWidth = h * srcRatio;
				}
				break;
		}
		image.style(style)

		image.status = image.Ready
	}
}

exports.loadImage = function(image) {
	image._image.src = image.source
}

exports.initText = function(text) {
	text.element.addClass(text._context.getClass('text'))
}

exports.layoutText = function(text) {
	var wrap = text.wrapMode != Text.NoWrap
	if (!wrap)
		text.style({ width: 'auto', height: 'auto', 'padding-top': 0 }) //no need to reset it to width, it's already there
	else
		text.style({ 'height': 'auto', 'padding-top': 0})

	text.paintedWidth = text.element.fullWidth()
	text.paintedHeight = text.element.fullHeight()

	var style
	if (!wrap)
		style = { width: text.width, height: text.height }
	else
		style = {'height': text.height }

	switch(text.verticalAlignment) {
		case text.AlignTop:		text._topPadding = 0; break
		case text.AlignBottom:	text._topPadding = text.height - text.paintedHeight; break
		case text.AlignVCenter:	text._topPadding = (text.height - text.paintedHeight) / 2; break
	}
	style['padding-top'] = text._topPadding
	style['height'] = text.height - text._topPadding
	text.style(style)
}

exports.run = function(ctx) {
	ctx.element.style('visibility', 'visible')
}

var Modernizr = window.Modernizr

exports.capabilities = {
	csstransforms3d: Modernizr.csstransforms3d,
	csstransforms: Modernizr.csstransforms,
	csstransitions: Modernizr.csstransitions
}

exports.requestAnimationFrame = Modernizr.prefixed('requestAnimationFrame', window)	|| function(callback) { return setTimeout(callback, 0) }
exports.cancelAnimationFrame = Modernizr.prefixed('cancelAnimationFrame', window)	|| function(id) { return clearTimeout(id) }

exports.enterFullscreenMode = function(el) { return Modernizr.prefixed('requestFullscreen', el.dom)() }
exports.exitFullscreenMode = function() { return window.Modernizr.prefixed('exitFullscreen', document)() }
exports.inFullscreenMode = function () { return !!window.Modernizr.prefixed('fullscreenElement', document) }

return exports;
} )()


return exports;
} )();
try {
	var l10n = {}

	var context = qml._context = new qml.core.Context(null, false, {id: 'qml-context-app', prefix: 'qml', l10n: l10n})
	var closure = {}

	context.__create(closure)
	context.__setup(closure)
	closure = undefined
	context.init()
	context.start(new qml.src.UiApp(context))
	context.run()
} catch(ex) { log("qml initialization failed: ", ex, ex.stack) }
