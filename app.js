const SerialPort = require('serialport');

const serialPort = new SerialPort('/dev/tty.usbmodem1411', {
	baudrate: 	 	9600,
	dataBits: 	 	8,
	parity: 		'none',
	stopBits: 	 	1,
	flowControl: 	false
});

let isOn = false;
let isNeutral = true;

// N - neutral
// U - up
// D - down

serialPort.on('open', () => {
	setTimeout(()=> {
		serialPort.write('N');
		setInterval(()=> {
			console.log('-=-=-=-=-=-=-=-=-=-');
			if (isNeutral) {
				isNeutral = !isNeutral;
				serialPort.write('N');
				console.log('N');
			} else {
				const char = (isOn = !isOn) ? 'U' : 'D';
				serialPort.write(char);
				console.log(char);
				isNeutral = !isNeutral;
			}
		}, 3000);

	}, 2000);
});
