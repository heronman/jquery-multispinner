(function($) {

$.widget('val.multispinner', $.ui.spinner, {
	options: {
		step: 1,
		parts: [
			{ amount: 1 }, // default part - behaves as an ordinal spinner
		],
		separator: ':' // default separator
	},

	_part: -1,
	_parts: [],

	_create: function() {
		this._super();
		var that = this;
		this.element.click(function() {
			that._setPage();
		});
	},

	_increment: function(value) {
		var amount = this.options.parts[this._part].amount;
		var step = this.options.parts[this._part].step;
		return this._super(value) * (amount ? amount : 1) * (step ? step : 1);
	},

	_value: function( value ) {
		var r = this._super.apply(this, arguments);

		if(!this.hasOwnProperty('_part'))
			this._part = 0;
		this._parts = this._paginate( this.element.val() );
		if(!this._parts.length) return r;

		if(this._part >= this._parts.length)
			this._part = this._parts.length - 1;

//		this.element[0].selectionStart = this._parts[this._part].start;
//		this.element[0].selectionEnd = this._parts[this._part].end;
		this.element[0].selectionStart = this.element[0].selectionEnd
			= this._parts[this._part].end;

		return r;
	},

	_parse: function( value ) {
		var r = this._super.apply(this, arguments);
		if ( typeof value === "string" ) {
			if ( Number( value ) == value ) {
				return Number( value );
			}
			var s = 0;
			var parts = this._paginate(value);
			for(var i = 0; i < parts.length && i < this.options.parts.length; i++) {
				s += parseInt(value.substring(parts[i].start, parts[i].end), 10)
					* this.options.parts[i].amount;
			}
			return s;
		}

		return value;
	},

	_format: function( value ) {
		value = this._super.apply(this, arguments);

		var s = '';
		for(var i = this.options.parts.length - 1; i >= 0; i--) {
			var v = parseInt(value / this.options.parts[i].amount);
			value -= v * this.options.parts[i].amount;
			v = '' + v;
			while(v.length < this.options.parts[i].width)
				v = '0' + v;
			s += (s ? ':' : '') + v;
		}
		return s;
	},

	_paginate: function(s) {
		var parts = [];
		if(!s) return parts;
		var start = 0, n = 0;
		while((n = s.indexOf(this.options.separator, start)) >= 0) {
			parts.unshift({ start: start, length: n - start, end: n, value: s.substring(start, n) });
			start = n + 1;
		}
		parts.unshift({ start: start, length: s.length - start, end: s.length, value: s.substring(start, s.length) });
		return parts;
	},

	_setPage: function() {
		var s = this.element.val();
		for(var i = 0; i < this._parts.length; i++) {
			if(this.element[0].selectionEnd >= this._parts[i].start
					&& this.element[0].selectionEnd <= this._parts[i].end) {
				this._part = i;
				break;
			}
		}
	}

});

})(jQuery);
