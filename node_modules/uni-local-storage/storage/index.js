import Event from "./event.js";
function type(obj) {
	return {}.toString
		.call(obj)
		.slice(8, -1)
		.toLowerCase();
}
function isEqual(a, b) {
	if (a === b) {
		return a !== 0 || 1 / a === 1 / b;
	}
	if (a === null || b === null) {
		return a === b;
	}
	const className = type(a);
	if (className !== type(b)) {
		return false;
	}
	if (className === "object") {
		const propsA = Object.getOwnPropertyNames(a);
		const propsB = Object.getOwnPropertyNames(b);
		if (propsA.length !== propsB.length) {
			return false;
		}
		for (let i = 0; i < propsA.length; i++) {
			const propsName = propsA[i];
			if (!isEqual(a[propsName], b[propsName])) {
				return false;
			}
		}
		return true;
	}
	if (className === "array") {
		if (a.length !== b.length) return false;
		for (let i = 0; i < a.length; i++) {
			if (!isEqual(a[i], b[i])) {
				return false
			}
		}
		return true;
	}
}

function getVersionNumber(version) {
	return Number(version.replace(/\./, ""));
}
function compareVersion(version, ver) {
	return getVersionNumber(version) - getVersionNumber(ver);
}
function getData(namespace) {
	const {keys} = uni.getStorageInfoSync();
	return keys.reduce((obj, key) => {
		if(new RegExp("^" + namespace).test(key)) {
			obj[key.replace(namespace, "")] = uni.getStorageSync(key);
		}
		return obj;
	}, {})
}
export default class Storage extends Event {
	constructor(options = {}) {
    super();
		this.options = {
			version: "0.0.1",
			namespace: "__ls__",
			...options
		};
		this.data = {};
		// this.monitor = {};
		const data = this._data = getData(options.namespace);
		Object.keys(data).forEach(key => this._proxy(this, "_data", key));
		Object.defineProperty(this, "length", {
			get() {
				return Object.keys(this._data).length;
			}
		})
	}
	_proxy(target, sourceKey, name) {
		const { namespace } = this.options;
		Object.defineProperty(target.data, name, {
			enumerable: true,
			configurable: true,
			get:() => {
				return this[sourceKey][name];
			},
			set:(data) => {
				const oldValue = this.data[name]?.value;
				if (data === undefined) {
					delete this.data[name];
					delete this[sourceKey][name];
					uni.removeStorageSync(namespace + name)
				} else {
					this[sourceKey][name] = data;
					uni.setStorageSync(namespace + name, data);
				}
				const callbacks = this._events[name];
				// 如果判断数据是否相同
				if(callbacks && !isEqual(data?.value, oldValue)) {
          this.emit(name, Object.freeze(data?.value) || null, oldValue);
				}
			}
		})
	}
	get(key, ver = "0.0.1") {
		const {value, version, time } = this.data[key] || {};
		if (value && version && compareVersion(version, ver) > -1) {
			if (time && time < Date.now()) {
				this.remove(key);
				return undefined;
			}
			return value;
		}
		return undefined;
	}
	getAll(ver = "0.0.1") {
		// const { namespace } = this.options;
		return Object.keys(this.data).reduce((obj, key) => {
			obj[key] = this.get(key, ver);
			return obj;
		}, {})
	}
	set(key, value, expire = null) {
		// const { namespace } = this.options;
		// key = namespace + key;
		let time = null;
		if (expire) {
			time = Date.now() + expire * 1000;
		}
		if (!this.data[key]) {
			this._proxy(this, "_data", key);
		}
		this.data[key] = {
			value,
			version: this.options.version,
			time
		}
	}
	remove(key) {
		const found = key in this.data;
		if (found) {
			this.data[key] = undefined;
			return true;
		}
		return false;
	}
}
