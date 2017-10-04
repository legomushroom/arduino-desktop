// import io from 'socket.io-client';

// export class Socket {
//   private socket;
//   private store;
  
//   constructor(store) {
//     this.store = store;
//     const { location } = window;
//     const { hostname, port, protocol } = location;

//     this.socket = io(`${protocol}//${hostname}:${port}`);

//     this.connect();
//   }

//   private connect() {
//     this.socket.on('connect', () => {
//       this.socket.on('send users', (users, statusString: string) => {
//       });

//       this.socket.on('reset user status', (user) => {
//       });
//     });
    
//     this.socket.on('disconnect', () => {
//     });
//   }

//   public requestUsers(status) {
//     // this.socket.emit('get users', statusString);
//   }
// }

// export default new Socket(store);
