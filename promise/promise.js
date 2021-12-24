'use strict';

// Promise is a JavaScript object for asynchronous operation.
// State: pending -> fulfilled or rejected
// Producer vs Consumer

// 1. Producer
// when new Promise is created, the excutor runs automatically.
const promise = new Promise( ( resolve, reject ) => {
    // doning some heavy work( network, read files )
    console.log( 'doing something...' );
    setTimeout( () => {
        resolve('resolve');
//        reject(new Error('no network'));
    }, 2000 );
} );


// 2. Consumers: then, catch, finally
promise
    .then( value => {
        console.log(value);
    } )
    .catch( error => {
        console.log(error);
    } )
    .finally( () => {
       console.log( "finally") 
    } );

// 3. Promise chaining
const fetchNumber = new Promise( ( resolve, reject ) => {
    setTimeout( () => resolve( 1 ), 1000 );
} );
console.log( "end 2" );

fetchNumber
    .then( num => {
        return num * 2;
    } )
    .then( num => num * 3)
    .then( num => {
        return new Promise( ( resolve, reject ) => {
            setTimeout(() => resolve(num-1), 1000);
        } );
    } )
    .then( num => console.log( num ) );

    console.log( "end 3" );

    // 4. Error Handling
    const getHen = () =>
        new Promise( ( resolve, reject ) => {
            setTimeout( () => resolve('🐓'), 1000 );
        } );
    const getEgg = hen =>
        new Promise( ( resolve, reject ) => {
//            setTimeout( () => resolve( `${hen} => 🥚` ), 1000 );
            setTimeout( () => reject( new Error( `error ${hen} => 🥚` ) ), 1000 );
        } );
    const cook = egg =>
        new Promise( (resolve, reject) => {
            setTimeout( () => resolve( `${egg} => 🍝` ), 1000 );
        } );

getHen()
    .then( hen => getEgg( hen ) )           // getEgg
    .catch( error => {
        return '🍚';
    } )
    .then( egg => cook( egg ) )             // cook
    .then( meal => console.log( meal) )     // console.log
    .catch( error => console.log( error ) );