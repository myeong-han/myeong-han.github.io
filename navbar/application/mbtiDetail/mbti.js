//반응형 div height 조절
window.onload = function () {
	this.responsiveAction();
}
window.onresize = function () {
	this.responsiveAction();
}
function responsiveAction() {
	console.log(window.innerHeight);
	$("#result").css("height",(window.innerHeight - 100 - 52 /*(window.innerHeight * 0.15*/)+"px");
}

//modal action
$( "#stm" ).on( "click", function( event ) {
	$( "#modal.modal-overlay" ).css("display","flex");
});
$( ".close-area" ).on( "click", function( event ) {
	$( "#modal.modal-overlay" ).css("display","none");
});
$( "#modal .content a" ).on( "click", function( event ) {
	$( "#modal.modal-overlay" ).css("display","none");
});

//get action - button
$( "#gdt" ).on( "click", function( event ) {
	location.href = '#'+$("#mbti").val().toLowerCase();
});
//get action - keydown
window.onkeydown = (e) => {
	if (e.defaultPrevented) return;
	if (e.key === "Enter") location.href = '#'+$("#mbti").val().toLowerCase();
	else return;
	e.preventDefault();
};

//execute - url기준으로 실행
window.onhashchange = function ( e ) {
	var mbti = e.newURL.substr(-4).toUpperCase();
	if(mbti.length<4){
		alert("4자리를 입력하세요");
		return;
	}
	getDetail(mbti);
}

//main function
function getDetail(_mbti) {
	/*
	1. 구성 성향은 {N, S, T, F} x {e, i}로 총 8가지 존재한다.
	2. 모든 16가지 성향은 1에서 정의한 8가지중 서로 다른 2i, 2e를 획득기능으로 갖는다.(주기능, 부기능, 3차기능, 4차기능)
	3. 기능 조건{J, P}에 의하여 획득기능을 가진다.
	4. 4가지 획득기능 중 자신의 우등조건{{N,S},{T,F}}가 포함하는 두가지는 우등기능, 나머지는 열등기능이다.
	5. 순서조건{E, I}에 의하여 순서조건이 포함하는 우등기능과 열등기능이 각각 1,3번째에 위치하고 나머지가 각각 2,4번에 위치한다.
	*/

	let descriptions = [
		{v: 'Ni', s:"내향 직관", d: '미래에 일어날 가능성을 통찰\n하나로 개념화되는 직관\n"어떻게 될 것인지"'},
		{v: 'Ne', s:"외향 직관", d: '다양한 가능성들을 발상\n여러 개로 연결되는 직관\n"어떻게 할 수 있는지"'},
		{v: 'Si', s:"내향 감각", d: '구체적인 사실을 기억\n과거 경험을 회상\n"어떻게 했었는지"'},
		{v: 'Se', s:"외향 감각", d: '동적인 이미지를 기억\n현재를 즐기고 체험\n"어떻게 되고 있는지"'},
		{v: 'Ti', s:"내향 사고", d: '논리적으로 옳고 그름을 분석\n사실이 무엇인지 가려내는\n"어떤 게 옳은 것인지"'},
		{v: 'Te', s:"외향 사고", d: '목적 달성을 위한 효율적 통제\n어떻게 해야 할지를 항목화하는\n"어떻게 해야 옳을지"'},
		{v: 'Fi', s:"내향 감정", d: '자신의 입장에서 공감\n정서적 가치를 보존하는\n"나라면 어떻게 느낄지"'},
		{v: 'Fe', s:"외향 감정", d: '타인을 이해하는 공감\n정서적 화합을 추구하는\n"타인이 어떻게 느끼는지"'},
	];
	// let values = ['Ni','Ne','Si','Se']; //무의식,가치,이상
	// let reason = ['Ti','Te','Fi','Fe']; //이성,도덕,실천
	// let ability = ['J','P'];
	// let vert = ['E','I'];
	let failCode = false;
	let major = [];
	let minor = [];
	let results = [];
	let mbti = _mbti;

	// if(mbti.endsWith(ability[0])){//J
	if(mbti.endsWith('J')){
		if(mbti.substr(1,1)=='N'){
			major.push('Ni'); minor.push('Se');//values.filter(str=>str=='Ni'&&str=='Se');
		}else if(mbti.substr(1,1)=='S'){
			major.push('Si'); minor.push('Ne');//values.filter(str=>str=='Ne'&&str=='Si');
		}else{
			failCode = true;
		}
		if(mbti.substr(2,1)=='T'){
			major.push('Te'); minor.push('Fi');//reason.filter(str=>str=='Te'&&str=='Fi');
		}else if(mbti.substr(2,1)=='F'){
			major.push('Fe'); minor.push('Ti');//reason.filter(str=>str=='Ti'&&str=='Fe');
		}else{
			failCode = true;
		}
	}else if(mbti.endsWith('P')){
		if(mbti.substr(1,1)=='N'){
			major.push('Ne'); minor.push('Si');//values.filter(str=>str=='Ne'&&str=='Si');
		}else if(mbti.substr(1,1)=='S'){
			major.push('Se'); minor.push('Ni');//values.filter(str=>str=='Ni'&&str=='Se');
		}else{
			failCode = true;
		}
		if(mbti.substr(2,1)=='T'){
			major.push('Ti'); minor.push('Fe');//reason.filter(str=>str=='Ti'&&str=='Fe');
		}else if(mbti.substr(2,1)=='F'){
			major.push('Fi'); minor.push('Te');//reason.filter(str=>str=='Te'&&str=='Fi');
		}else{
			failCode = true;
		}
	}else{
		failCode = true;
	}
	if(mbti.startsWith('E')){
		results.push(major.find(str=>str.endsWith('e')));
		results.push(major[1-major.findIndex(str=>str.endsWith('e'))]);
		results.push(minor.find(str=>str.endsWith('e')));
		results.push(minor[1-minor.findIndex(str=>str.endsWith('e'))]);
	}else if(mbti.startsWith('I')){
		results.push(major.find(str=>str.endsWith('i')));
		results.push(major[1-major.findIndex(str=>str.endsWith('i'))]);
		results.push(minor.find(str=>str.endsWith('i')));
		results.push(minor[1-minor.findIndex(str=>str.endsWith('i'))]);
	}else{
		failCode = true;
	}
	if(failCode) {alert("MBTI가 아닙니다."); return;}
	
	$( "#mbti" ).val(mbti);
	$("#result").prepend((
		'<div style="background-color: whitesmoke;">' +
			'<h2 style="margin-top: 0px;">'+mbti+'</h2>' +
			'<div>'+results.map((str, idx)=>{
				let desc = descriptions.find(obj=>obj.v===str);
				return '<div>['+ idx +'] ' + desc.v + " | " + desc.s + '</div>'+
				'<pre>'+desc.d+'</pre>';
			})+"</div>" +
		'</div>').replaceAll(",","")
	);
}