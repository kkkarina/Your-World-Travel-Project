/*$(document).ready(function() {
	var contentH = document.getElementById('main_content').offsetHeight;
	var footerH = document.getElementsByTagName('footer')[0].offsetHeight;
	var windowH = $(window).height();
	var headerH = document.getElementsByTagName('header')[0].offsetHeight + document.getElementsByTagName('nav')[0].offsetHeight;
	var result = windowH - headerH - footerH;
	if (result >= contentH) {
		document.getElementById('main_content').style.height = result+"px";
	} 
})*/

class HTMLMaker {
    
    constructor () {
        if (HTMLMaker.instance != undefined) {
            return HTMLMaker.instance;
        } else {
            HTMLMaker.instance = this;
            return HTMLMaker.instance;
        }
        
    }
    
    get HTMLMakerInstance () {
        return `${this.instance}`;
    }
    
    getDataFromAutorizationForm () {
        var data = [];
        data.push(document.getElementById('inputName').value);
        data.push(document.getElementById('inputEmail').value);
        data.push(document.getElementById('inputPassword').value);
        return data;
    }
    
    showResultOfAvtorization (resultText) {
        var new_div = this.createWindowOver();
        new_div.classList.add('text-center');
        new_div.classList.add('info-frame-order');
        var new_p = document.createElement('p');
        new_p.innerHTML = resultText;
        new_div.appendChild(new_p);        
        $('#AutorizationForm').animate({
            opacity: 0,
        }, 500, function () {
            document.getElementById('AutorizationFormBlock').appendChild(new_div);
        });
    }
    
    createWindowOver () {
        var div = document.createElement('div');
        div.classList.add('block_over');
        return div;
    }
}

class AjaxController {
    
    sendAutorizationForm (name, email, password) {
        $.ajax({
            type: 'POST',
            url: '/php/checkAutorization.php',
            data: {
                user_name: name,
                user_email: email,
                user_passw: password,
            },
            success: this.successAutorization,
        });
    }
    
    successAutorization (result) {
        //console.log('ajax request is ok');
        //console.log(result);
        let htmlMaker = new HTMLMaker();
        htmlMaker.showResultOfAvtorization(result);
    }
}


class HTMLController {
    
    windowsizes () {
        if (window.innerWidth < 496) {
            var inp = document.getElementsByName('main_btn');
            for (var i = 0; i < inp.length; i++) {
                inp[i].classList.remove('btn-lg');
                inp[i].classList.remove('btn-md');
                inp[i].classList.add('btn-sm');
            }
        } else {
            if (window.innerWidth < 980) {
                var inp = document.getElementsByName('main_btn');
                for (var i = 0; i < inp.length; i++) {
                    inp[i].classList.remove('btn-lg');
                    inp[i].classList.remove('btn-sm');
                    inp[i].classList.add('btn-md');
                }
            } else {
                if (window.innerWidth >= 980) {
                    var inp = document.getElementsByName('main_btn');
                    for (var i = 0; i < inp.length; i++) {
                        inp[i].classList.remove('btn-md');
                        inp[i].classList.remove('btn-sm');
                        inp[i].classList.add('btn-lg');
                    }
                }
            }	
        }	
    }
    
    constructor () {
        this.windowsizes();
        var self = this;
        $(window).resize(function() {
            self.windowsizes();
        });
        document.getElementById('sendformbtn').addEventListener('click',function(event) {
            event.preventDefault();
            let newAjaxRequest = new AjaxController();
            newAjaxRequest.sendAutorizationForm();
            newAjaxRequest = undefined;
        })
        var htmlMaker = new HTMLMaker();
    }        
}

$(document).ready(function() {
    let htmlcontroller = new HTMLController();
})