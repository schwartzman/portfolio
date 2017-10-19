var a = {
	time: 512
};
a.qtime = a.time / 4;
a.fast = a.time / 16;

var m = {
	basebox: 184,
	gutter: 10
};
m.bigbox = m.basebox * 3 + m.gutter * 2;
m.fullimg = m.bigbox - m.gutter * 4;

$('#boxes').masonry({
	itemSelector: '.overbox',
	columnWidth: m.basebox,
	gutter: m.gutter,
	fitWidth: true,
	transitionDuration: a.time/1000+'s',
	stagger: a.fast
});

function refresh() {
	$('#boxes').masonry('layout');
}

function open(target) {
	// where target is some .box
	closy = target.next();
	obox = target.parent();
	obox.width(m.bigbox).height(m.bigbox).css('z-index', 100);
	target.animate({width: m.bigbox+'px', height: m.bigbox+'px'}, a.time, function() {
		closy.css('display','inline').animate({opacity: 1},a.qtime);
	}).addClass('open');
	target.children('img.full').animate({opacity: 1, width: m.fullimg},  a.time);
	target.children('img.thumb').animate({top: m.gutter+'px', left: m.gutter+'px', width: 0, opacity: 0}, a.qtime);
	target.children('div.desc').animate({top: '435px', opacity: 1}, a.time);
	refresh();
}

function close() {
	// where target is some .box
	target = $('.open');
	if (target.length) {
		closy = target.next();
		obox = target.parent();
		obox.width(m.basebox).height(m.basebox).css('z-index', 'auto');
		closy.css({'display': 'none', 'opacity': 0});
		target.animate({width: m.basebox+'px', height: m.basebox+'px'},  a.time).removeClass('open');
		target.children('img.full').animate({opacity: 0, width: '160px'},  a.time);
		target.children('img.thumb').animate({top: 0, left: 0, width: '160px', opacity: 1}, a.time);
		target.children('div.desc').animate({top: '160px', opacity: 0}, a.time);
		refresh();
	}
}

$('.closy').click(function(){
	close();
});

$('.box').click(function(){
	$this = $(this);
	if ( !$this.hasClass('open') ){
		close();
		open($this);
	}
});

/////////////////////
// Keyboard Circus //
/////////////////////

$(document).on('keydown', null, 'esc', function(){
	close();
});

$(document).on('keydown', null, 'right down', function(){
	victim = $('.open').parent().next();
	close();
	if (victim.length) {
		open(victim.children('.box'));
	}
});

$(document).on('keydown', null, 'left up', function(){
	victim = $('.open').parent().prev();
	close();
	if (victim.length) {
		open(victim.children('.box'));
	}
});