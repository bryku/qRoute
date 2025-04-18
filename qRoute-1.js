// https://github.com/bryku/qRoute
// https://github.com/bryku/qRoute
// highjack clicks
window.onclick = function(event){
	let link = event.target.closest('a');
	if(link){
		let href = link.getAttribute('href');
		if(href.startsWith('/')){
			event.preventDefault();
			window.history.pushState({}, '', window.location.origin + "/?!=" + href);
			qRoute.load(window.location.origin + "/?!=" + href);
		}
	}
}
// highjack back button
window.addEventListener('popstate', (event)=>{
	qRoute.load(window.location.href);
});
let qRoute = {
	debug: false,
	log: function(...arr){
		if(this.debug){
			console.warn('qRoute: Debug Mode\n'+arr.map(v => '    - '+v).join('\n'));
		}
	},
	data: {
		get: {},
		url: {},
	},
	paths: [],
	path: function(path, call, fall = false){
		this.paths.push({
			path: path,
			dirs: path.slice(1).split('/'),
			call: call,
			fall: fall
		});
	},
	load: function(url = window.location.href, data){
		let urlString = url;
		let urlObject = new URL(urlString);
		let getObject = new URLSearchParams(urlObject.search);
			getObject.forEach((value, key)=>{
				this.data.get[key] = value;
			});
		this.redirect(this.data.get['!'] || '/', data);
	},
	redirect: function(path, data){
		let dirs = path.slice(1).split('/');
		let page = this.paths.find((p)=>{
			if(p.path == path){return true}
			return p.dirs.every((dir, di)=>{
				if(!dirs[di]){ return false }
				if(dirs[di] == dir){ return true }
				if(dir[0] == '?'){
					this.data.url[dir.slice(1)] = dirs[di];
					return true
				}
				return false
			});
		});
		if(!page){
			this.log('note: Path Not Found','path: '+path);
			page = this.paths.find(path => path.fall);
		}
		if(!page){
			this.log('note: Fallback Not Found');
		}else{
			this.log('note: Page Found', 'path: '+page.path);
			page.call({
				data: data,
				path: path,
				dirs: dirs,
				url: this.data.url,
				get: this.data.get,
			});
			return page
		}
	},
};
