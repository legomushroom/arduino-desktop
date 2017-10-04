"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const sockets = require("socket.io");
var StringDecoder = require('string_decoder').StringDecoder;
const AppSettings = {
    port: 3000,
    clientPath: './client'
};
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.get('/', (req, res) => {
    res.sendFile(path.resolve(AppSettings.clientPath, './index.html'));
});
app.use(express.static(path.resolve(AppSettings.clientPath, './')));
const server = app
    .listen(AppSettings.port, () => {
    console.log(`
      -=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-
      | Server is up at http://localhost:${AppSettings.port} |
      -=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-
      `);
});
const io = sockets(server);
io.on('connection', function (socket) {
    console.log('connected');
    const SerialPort = require('serialport');
    const serialPort = new SerialPort('/dev/tty.usbmodem1411', {
        baudrate: 9600,
        dataBits: 8,
        parity: 'none',
        stopBits: 1,
        flowControl: false
    });
    let isOn = false;
    let isNeutral = true;
    // N - neutral
    // U - up
    // D - down
    serialPort.on('open', () => {
        console.log('serial port connected');
        serialPort.on('data', (bufferIn) => {
            const buffer = new Buffer(bufferIn);
            const bufferString = buffer.toString();
            console.log(bufferString);
            const distance = parseFloat(bufferString);
            socket.emit('distance', distance);
        });
        setTimeout(() => {
            socket.on('press up', () => {
                serialPort.write('U');
            });
            socket.on('press down', () => {
                serialPort.write('D');
            });
            socket.on('press release', () => {
                serialPort.write('N');
            });
            // setInterval(()=> {
            //   serialPort.read((val) => {
            //     console.log(val);
            //   })
            // }, 16);
        }, 2000);
    });
});
