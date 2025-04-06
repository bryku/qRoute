# qRoute

JavaScript Router for SPA (single page application).

    eRoute.path('/', ()=>{
        console.log('home page');
    });
    eRoute.path('/books/?book', (data)=>{
        console.log('books page');
        console.log(data.url.book);
    });
    eRoute.path('/error', ()=>{
        console.log('error page');
    }, true);
    eRoute.load();

The `true` at the end defines this path as a "fallback", so this will trigger when the path isn't found.


