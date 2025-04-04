let qRoute = {
	onIndex: '',
	onError: '',
	getParams: {},
	urlParams: {},
	paths: [],
	path: function(path, call){
		this.paths.push({
			path: path,
			dirs: path.replace(/^\//gm, '').split('/'),
			call: call,
		});
	},
	load: function(index = '/index', error = '/error'){
		this.onIndex = index;
		this.onError = error;
		
		let urlString = window.location.href;
		let urlObject = new URL(urlString);
		let getObject = new URLSearchParams(urlObject.search);
			getObject.forEach((value, key)=>{ this.getParams[key] = value; });
			
		this.redirect(this.getParams['!'] || this.onIndex);
		this.highjack();
	},
	redirect: function(path, data){
		let dirArray = path.replace(/^\//gm, '').split('/');
		
		let match = this.paths.find((path)=>{
			return path.dirs.every((dir, dirIndex)=>{
				if(!dirArray[dirIndex]){ return false }
				if(dir == dirArray[dirIndex]){ return true }
				if(dir[0] == ":"){
					this.urlParams[dir.slice(1)] = dirArray[dirIndex];
					return true
				}
				return false;
			});
		});
		if(!match){
			match = this.paths.find((path)=>{
				return path.path == this.onError
			});
		}
		if(!match){
			console.log('Router: Page Not Found - '+this.onError);
		}else{
			window.history.pushState({}, '', window.location.origin+'?!='+path);
			match.call({
				path: path,
				url: this.urlParams, 
				get: this.getParams,
				data: data,
			});
		}
	},
	highjack: function(){
		document.querySelectorAll('a').forEach((link)=>{
			let path = link.getAttribute('href');
			if(path.startsWith('/')){
				link.onclick = (event)=>{
					event.preventDefault();
					let a = event.target.closest('a');
					this.redirect(a.getAttribute('href'))
				};
			}
		});
		// scrolls to element
		if(window.location.hash){
			let target = document.querySelector(window.location.hash);
			if(target){
				target.scrollIntoView()
			}
		}
	},
};
