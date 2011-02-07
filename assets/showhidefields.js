jQuery(document).ready(function(){

  $ = jQuery;

/*-------------------------------------------------------------------------
    Localization
-------------------------------------------------------------------------*/
  Symphony.Language.add({
    'Collapse all':   false,
    'Expand all':     false,
    'Collapse':       false,
    'Expand':         false,
  });

/*-------------------------------------------------------------------------
    Dynamically-added elements
-------------------------------------------------------------------------*/
  elements = {
    button:     $('<a class=\'button\' />').text(Symphony.Language.get('Collapse all')),
    link:       $('<a class=\'visibility\' />').attr('title', Symphony.Language.get('Collapse')).text('-')
  };

/*-------------------------------------------------------------------------
    Elements insertion
-------------------------------------------------------------------------*/
  $('.instance h4').append(elements['link'].clone());
  $('.settings .label').append(elements['button'].clone());
  $('.settings .duplicator').after(elements['button']);

/*-------------------------------------------------------------------------
    Events handling
-------------------------------------------------------------------------*/
		
	$("li.instance").each(function(){
		label = $(this).find("input[name$='[label]']").val();
		$(this).children().append('<span class="label">('+label+')</span>');
	});
	
	buttons = $('.settings .button');

	$('.visibility').live('click', function() {
		instance = $(this).closest('li');
		
		if (instance.hasClass('collapsed')) {
			$(this).attr('title', Symphony.Language.get('Collapse')).text('-');
			$(instance).find("span.label").hide();
		} else {
			$(this).attr('title', Symphony.Language.get('Expand')).text('+');
			$(instance).find("span.label").show();
		}
		
		instance.toggleClass('collapsed');
		instance.find('.content').toggleClass('hidden');
	});

	buttons.click(function () {
		if ($(this).hasClass('collapsed')) {
			buttons.text(Symphony.Language.get('Collapse all'));
			$('.instance.collapsed .visibility').click();
			$("li.instance span.label").hide();
		
			$.cookie('a-collapse', 'show');
			$.cookie('a-expand', null);
		} else {
			buttons.text(Symphony.Language.get('Expand all'));
			$('.instance:not(.collapsed) .visibility').click();
			$("li.instance span.label").show();
			
			$.cookie('a-expand', 'show');
			$.cookie('a-collapse', null);
		}
		
		buttons.toggleClass('collapsed');
	});
	
	$('.constructor').bind('click', function() {
	$('.instance:last h4').append(elements['link'].clone());
	});
	
	
	if($.cookie('a-expand') == 'show') {
		buttons.text(Symphony.Language.get('Expand all'));
		$('.instance:not(.collapsed) .visibility').click();
		buttons.addClass('collapsed');
		$("li.instance span.label").show();
	} else {
		buttons.text(Symphony.Language.get('Collapse all'));
		$('.instance.collapsed .visibility').click();
		$("li.instance span.label").hide();	
	}
});
