# jQuery MultiSpinner

This is an enhancement on the original jQuery UI Spinner widget
allows you to make a multistaged spin-counterm e.g. for miles/feet/inches or hour/minute/second (and even millisecond if you want to)

### Note that this project is not actively maintained.

---

## Documentation

Sample usage as a time spinner, separated for hours/minutes/seconds:

```javascript
$(function() {
	$('input.timespinner').val(0).xspinner({
		min: 0,
		max: 24 * 60 * 60, // max: 24 hours
		separator: ':',
		parts: [
			{ amount: 1, width: 2, step: 30 }, // seconds
			{ amount: 60, width: 2, step: 5 }, // minutes
			{ amount: 3600, width: 2, step: 1 } // hours
		]
	});
});
```

## License

Copyright Anton Garnik

Released under the MIT license:
* http://www.opensource.org/licenses/mit-license.php
