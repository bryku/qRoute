# qRoute

JavaScript Router for SPA (single page application).

    eRoute.path('/', ()=>{
        eRoute.redirct('/home');
    });
    eRoute.path('/home',()=>{
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

You can add `true` to your error page, so it triggers when the path isn't found.

### Data

Here is the **data** variable assuming the url is `website.com/?!=/books/harry_potter&mode=dark`.

eRoute.path(`/books/?book`, (data)=>{
    console.log(data.get); // {!: '/book/harry_potter', mode: 'dark'}
    console.log(data.url); // {book: harry_potter}
    console.log(data.path); // '/books/harry_potter'
    console.log(data.data); undefined
});

You can define the `data.data` value using redirect.

eRoute.path('/error',(data)=>{
    console.log(data.data); // 'ERROR 404'
});
eRoute.redirect('/error', 'ERROR 404');
