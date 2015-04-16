// page init
jQuery(function(){
	jcf.customForms.replaceAll();
	initCarousel();
	initAccordion();
	initPopups();
	initInputs();
	initSameHeight();
	initChildClasses();
	initEditForm();
	initTabs();
	initLightbox();
	initRating();
	initDatepicker();
	initCheckboxes();
	initCheckAll();
	initHelpOnline();
	initLoginBox();
	initProgramma();
	driveMe.init();
});

// init checkboxes
function initCheckboxes(){
	var activeClass = 'active';
	jQuery('.checkboxes > li').each(function(){
		var hold = jQuery(this);
		var checkbox = hold.find('input.hidden');
		hold.bind('click', function(e){
			if (hold.hasClass(activeClass)) {
				hold.removeClass(activeClass);
				checkbox.removeAttr('checked');
			} else {
				hold.addClass(activeClass);
				checkbox.attr('checked', 'checked');
			}
			e.preventDefault();
		})
	})
}

// init check all
function initCheckAll(){
	jQuery('.message-list').each(function(){
		var hold = jQuery(this);
		var checkAll = hold.find('.check-all');
		var checkboxes = hold.find('input:checkbox').not(checkAll);
		checkAll.bind('change', function(){
			if (checkAll.is(':checked')) {
				checkboxes.attr('checked', 'checked');
			} else {
				checkboxes.removeAttr('checked');
			}
			checkboxes.each(function(){
				jcf.customForms.refreshElement(this)
			})
		})
	})
}

// initDatepicker
function initDatepicker(){
	var hoverClass = 'hover';
	jQuery.datepicker.setDefaults(jQuery.datepicker.regional["it"]);
	jQuery('.datepicker').each(function(){
		var holder = jQuery(this);
		var input = holder.find('input:text');
		var inputVal = input.val();
		input.datepicker({
			showOn: "button",
			buttonImage: inputVal,
			buttonText: 'datepicker',
			buttonImageOnly: true,
			beforeShow: function(){
				holder.addClass(hoverClass)
			},
			onClose: function(){
				holder.removeClass(hoverClass)
			}
		});
	});
}

// star rating init
function initRating() {
	var rates = document.getElementsByTagName('ul');
	for (var i = 0; i < rates.length; i ++) {
		if (rates[i].className.indexOf('star-rating') != -1) {
			new StarRating({
				element:rates[i],
				onselect:function(num) {
					// rating setted event
				}
			})
		}
	}
}

// simple star raring module
function StarRating() {
	this.options = {
		activeClass:'active',
		settedClass:'setted',
		element:null,
		items:null,
		onselect:null
	}
	this.init.apply(this,arguments);
}
StarRating.prototype = {
	init: function(opt){
		this.setOptions(opt);
		if(this.element) {
			this.getElements();
			this.addEvents();
		}
	},
	setOptions: function(opt) {
		for(var p in opt) {
			if(opt.hasOwnProperty(p)) {
				this.options[p] = opt[p];
			}
		}
		if(this.options.element) {
			this.element = this.options.element;
		}
	},
	getElements: function() {
		// get switch objects
		if(this.options.items == null) {
			this.items = this.element.children;
		} else {
			if(typeof this.options.items === 'string') {
				this.items = this.element.getElementsByTagName(this.options.items);
			} else if(typeof this.options.items === 'object') {
				this.items = this.options.items;
			}
		}

		// find default active index
		for(var i = 0; i < this.items.length; i++) {
			if(this.hasClass(this.items[i],this.options.activeClass)) {
				this.activeIndex = i;
			}
			if(this.hasClass(this.items[i],this.options.settedClass)) {
				this.settedIndex = i;
			}
		}
	},
	addEvents: function() {
		for(var i = 0; i < this.items.length; i++) {
			this.items[i].onmouseover = this.bind(this.overHandler,this, i);
			this.items[i].onmouseout = this.bind(this.outHandler,this, i);
			this.items[i].onclick = this.bind(this.clickHandler,this, i);
		}
	},
	overHandler: function(ind) {
		this.hovering = true;
		this.hoverIndex = ind;
		this.refreshClasses();
	},
	outHandler: function(ind) {
		this.hovering = false;
		this.refreshClasses();
	},
	clickHandler: function(ind) {
		this.hovering = false;
		this.settedIndex = ind;
		if(typeof this.options.onselect === 'function') {
			this.options.onselect(ind);
		}
		this.refreshClasses();
		return false;
	},
	refreshClasses: function() {
		for(var i = 0; i < this.items.length; i++) {
			this.removeClass(this.items[i],this.options.activeClass);
			this.removeClass(this.items[i],this.options.settedClass);
		}
		if(this.hovering) {
			this.addClass(this.items[this.hoverIndex],this.options.activeClass);
		} else {
			if(typeof this.settedIndex === 'number') {
				this.addClass(this.items[this.settedIndex],this.options.settedClass);
			} else {
				if(typeof this.activeIndex === 'number') {
					this.addClass(this.items[this.activeIndex],this.options.activeClass);
				}
			}
		}
	},
	hasClass: function(el,cls) {
		return el && el.className ? el.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)')) : false;
	},
	addClass: function(el,cls) {
		if (el && !this.hasClass(el,cls)) el.className += " "+cls;
	},
	removeClass: function(el,cls) {
		if (el && this.hasClass(el,cls)) {el.className=el.className.replace(new RegExp('(\\s|^)'+cls+'(\\s|$)'),' ');}
	},
	bind: function(f, scope, args){
		return function() {return f.apply(scope, [args] || arguments)}
	}
}

// fancybox modal popup init
function initLightbox() {
	jQuery('a.lightbox, a[rel*="lightbox"]').each(function(){
		var link = jQuery(this);
		link.fancybox({
			padding: 6,
			cyclic: false,
			overlayShow: true,
			overlayOpacity: 0.65,
			overlayColor: '#000000',
			titlePosition: 'inside',
			onComplete: function(box) {
				if(link.attr('href').indexOf('#') === 0) {
					jQuery('#fancybox-content').find('a.close').unbind('click.fb').bind('click.fb', function(e){
						jQuery.fancybox.close();
						e.preventDefault();
					});
				}
			}
		});
	});


	jQuery('.lightbox-modal').fancybox({
		type : 'inline'
	});

}

/* Fancybox overlay fix */
jQuery(function(){
	// detect device type
	var isTouchDevice = (function() {
		try {
			return ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
		} catch (e) {
			return false;
		}
	}());

	// fix options
	var supportPositionFixed = !( (jQuery.browser.msie && jQuery.browser.version < 8) || isTouchDevice );
	var overlaySelector = '#fancybox-overlay';
	
	if(supportPositionFixed) {
		// create <style> rules
		var head = document.getElementsByTagName('head')[0],
			style = document.createElement('style'),
			rules = document.createTextNode(overlaySelector+'{'+
				'position:fixed;'+
				'top:0;'+
				'left:0;'+
			'}');

		// append style element
		style.type = 'text/css';
		if(style.styleSheet) {
			style.styleSheet.cssText = rules.nodeValue;
		} else {
			style.appendChild(rules);
		}
		head.appendChild(style);
	}
});

// content tabs init
function initTabs() {
	jQuery('ul.tabset').contentTabs({
		addToParent: true,
		tabLinks: 'a'
	});
	jQuery('ul.tab-list').contentTabs({
		addToParent: true,
		tabLinks: 'a'
	});
}

// init form edit
function initEditForm(){
	var editClass = 'change';
	var checkedClass = 'checked';
	var selectedClass = 'selected';
	var activeClass = 'popup-active popup-right-active';
	jQuery('.edit-form').each(function(){
		var hold = jQuery(this);
		var form = hold.parents('.js-appliance-programming');
		// XXX Cedac: START
		var btnSave = hold.find('.btn-save');
		// XXX Cedac: END
		var btnEdit = hold.find('.btn-edit');
		var btnReset = hold.find('.btn-reset');
		var items = hold.find('.cell');
		var allCheckboxes = hold.find('.check-options input:checkbox');
		var allSelects = hold.find('select.default');
		
		items.each(function () {
			var item = jQuery(this);
			var popups = item.find('.popup');
			var selected = item.hasClass(selectedClass);
			
			popups.each(function () {
				var popup = jQuery(this);
				var select = popup.find('select.default');
				//var links = popup.find('li > a');
				var checkboxes = popup.find('.check-options input:checkbox');
				var checkOptions = item.find('.option-list > li');
				var text = item.find('.'+popup.attr('title'));
				var linkReset = popup.find('.link-reset');
				var defSelectText = text.text();

				popup.removeAttr('title');
				
				popup.find('.scrollable-area').each(function () {
					var area = jQuery(this);
					area.bind('click', 'li > a', function (e) {
						var link = jQuery(e.target);
						text.html(link.text());
						var idx = area.find('li > a').index(link) + 1;
						select.val(idx);
						select.find('option').removeAttr('selected');
						select.find('option[value=' + idx + ']').attr('selected', 'selected');
						item.removeClass(activeClass);
						item.addClass(selectedClass);
						popups.hide();
						e.preventDefault();
					})
				});
				text.text(select.find('option[selected]').text());
				select.bind('change', function () {
					text.html(defSelectText);
					if (!selected) {
						item.removeClass(selectedClass);
					}
				});
				checkboxes.each(function (i) {
					var checkbox = jQuery(this);
					var holder = checkbox.parents('.col');
					checkbox.bind('change', function(){
						if (checkbox.is(':checked')) {
							holder.addClass(checkedClass);
							checkOptions.eq(i).show();
						} else {
							holder.removeClass(checkedClass);
							checkOptions.eq(i).hide();
						}
						if (checkboxes.filter(':checked').length) {
							item.addClass(selectedClass);
						} else {
							item.removeClass(selectedClass);
						}
					})
					if (checkbox.is(':checked')) {
						// XXX Cedac Start
						holder.addClass(checkedClass);
						// XXX Cedac End
						checkOptions.eq(i).show();
					} else {
						// XXX Cedac Start
						holder.removeClass(checkedClass);
						// XXX Cedac End
						checkOptions.eq(i).hide();
					}
					// XXX Cedac Start
					if (checkboxes.filter(':checked').length) {
						item.addClass(selectedClass);
					} else {
						item.removeClass(selectedClass);
					}
					// XXX Cedac End
				})
				
				linkReset.bind('click', function (e) {
					checkboxes.each(function(){
						var checkbox = jQuery(this);
						if (checkbox.is(':checked')) {
							checkbox.removeAttr('checked').trigger('change');
							jcf.customForms.refreshElement(this)
						}
					})
					e.preventDefault();
				});
			})
		});
		
		hold.on('click', '.btn-save', function (e) {
			var event = new jQuery.Event('editForm.beforeSave');
			hold.trigger(event);
			if (!event.isDefaultPrevented()) {
				if (hold.hasClass(editClass)) {
					hold.removeClass(editClass);
				}
				hold.trigger(new jQuery.Event('editForm.afterSave'));
			}
			e.preventDefault();
		}).on('click', '.btn-edit', function (e) {
			var event = new jQuery.Event('editForm.beforeEdit');
			hold.trigger(event);
			if (!event.isDefaultPrevented()) {
				if (!hold.hasClass(editClass)) {
					hold.addClass(editClass);
				}
				hold.trigger(new jQuery.Event('editForm.afterEdit'));
			}
			e.preventDefault();
		}).on('click', '.btn-reset', function (e) {
			var event = new jQuery.Event('editForm.beforeReset');
			hold.trigger(event);
			if (!event.isDefaultPrevented()) {
				form.get(0).reset();
				allCheckboxes.each(function(){
					jQuery(this).trigger('change');
					jcf.customForms.refreshElement(this);
				});
				allSelects.trigger('change');
				if (hold.hasClass(editClass)) {
					hold.removeClass(editClass);
				}
				hold.trigger(new jQuery.Event('editForm.afterReset'));
			}
			e.preventDefault();
			return false;
		});
	});
}

// scroll gallery init
function initCarousel() {
	jQuery('div.carousel').scrollGallery({
		mask: 'div.mask',
		slider: 'div.slideset',
		slides: 'div.slide',
		btnPrev: 'a.btn-prev',
		btnNext: 'a.btn-next',
		pagerLinks: '.pagination li',
		autoRotation: true,
		switchTime: 3000,
		animSpeed: 500
	});
	jQuery('div.gallery').scrollGallery({
		mask: 'div.mask',
		slider: 'div.slideset',
		slides: 'div.slide',
		btnPrev: 'a.btn-prev',
		btnNext: 'a.btn-next',
		pagerLinks: '.pagination li',
		autoRotation: false,
		switchTime: 3000,
		animSpeed: 500
	});
}

// accordion menu init
function initAccordion() {
	jQuery('ul.accordion').slideAccordion({
		opener: 'a.open',
		slider: 'div.slide',
		animSpeed: 300
	});
}

// popups init
function initPopups() {
	jQuery('.options-area .cell').contentPopup({
		mode: 'click',
		btnOpen: '.opener'
	});
	jQuery('.options-area .cell').contentPopup({
		mode: 'click',
		popup: '.popup.small',
		btnOpen: '.opener-right',
		openClass: 'popup-right-active'
	});
}

// clear inputs on focus
function initInputs() {
	PlaceholderInput.replaceByOptions({
		// filter options
		clearInputs: true,
		clearTextareas: true,
		clearPasswords: true,
		skipClass: 'default',
		
		// input options
		wrapWithElement: false,
		showUntilTyping: false,
		getParentByClass: false,
		placeholderAttr: 'value'
	});
}

// align blocks height
function initSameHeight() {
	jQuery('.columns-holder').sameHeight({
		elements: '.column.height .block-in > .holder'
	});
	jQuery('div.section-holder.height').sameHeight({
		elements: 'div.height',
		useMinHeight: true
	});
}

// add classes to support css3 selectors in old browsers
function initChildClasses() {
	jQuery('.breadcrumbs li').children(':last-child').addClass('last-child');
	jQuery('.columns-holder .column').children(':last-child').addClass('last-child');
	jQuery('.section').children(':last-child').addClass('last-child');
}


function initHelpOnline(){
	$('#select-product').hide();
	$('#select-help').on('change', function(){

		if($(this).val() == 'product')
		{
			$('#select-product').show();
			if($('#select-product select option').length == 1){
				$('#no-product').show();
				$('#send-help').hide();
			}
		}

		else
		{
			$('#select-product').hide();
			$('#no-product').hide();
			$('#send-help').show();
		}
	})
}

function initLoginBox(){
	$('#open-login').on('click', function(){
		$('.login-area').fadeToggle();
		$('.user-area .arrow').toggleClass('open');
		return false
	})
}


function initProgramma(){
	var drop_img;
	var drop_text;
	var drop_new = false;
	$('#programma-options li').draggable({
		helper: function( event ) {

			drop_img = $(this).find('img').attr('src');
			drop_text = $(this).find("h4").text();
			drop_new = true;

			return $( '<div class="block-info-scrolling"><img src="' + drop_img + '" alt="" /><span class="lbl">'+ drop_text + '</span></div>' );
		},
		cancel: '.disabled',
		cursor: "move",
		// XXX CEDAC START
		stop: function(event, ui) {
			$(this).addClass('disabled');
		}
		// XXX CEDAC END
	});
	$('#programma-options li.disabled');

	$('#progs-list ul.blocks li').droppable({
      drop: function(event, ui) {
    	
      	if($(this).hasClass('locked'))
      		return false;

      	if (drop_new) {
      		$pos = $('#progs-list ul.blocks li').index(this);
      		$(this).removeClass('empty');

      		//($pos > 9) ? $delete = '<a href="#" class="delete">Delete</a>' : $delete = '';
      		$delete = '<a href="#" class="delete">Delete</a>'
      		$(this).html('<div class="block-info-scrolling"><img src="' + drop_img +'" alt="" /><span class="lbl">' + drop_text + '</span>' + $delete + '</div>');

	      	drop_new = false;

	      	$('.progs-actions a').removeClass('disabled');
	      	
	      	$(this).data('cuid', ui.draggable.data('cuid'));
      	}

      	updateProgsCount();
      }

	});

	$('#progs-list ul.blocks').sortable({
		items: "li:not(.locked)",
		change: function(){
			$('.progs-actions a').removeClass('disabled');
		}
	});

	$('#progs-list ul.blocks li .delete').live('click', function(){

		$li = $(this).parents('li');

      	$li.addClass('empty').html('<div class="block-info-scrolling"><img src="' + $('#progs-list').data('icoDisabled') +'" alt="" /><span class="lbl">TRASCINA PROGRAMMA</span></div>');
      	
      	$('#programma-options li[data-cuid=' + $li.data('cuid') + ']').removeClass('disabled');
      	$li.data('cuid', null);
      	
      	$('.progs-actions a').removeClass('disabled');
      	
      	updateProgsCount();
      	return false;
	})


	function updateProgsCount(){
		$empty = $('#progs-list ul.blocks li').not('.empty').length;
		$perc = $empty*100/20;

		$('#progs-tot').text($empty);
		$('.progs-space .empty').text(20-$empty);
		$('.progs-space .perc').text($perc);
		$('.progs-space .progress_bar span').animate({'width' : $perc + '%'});


	}

	$( "ul, li" ).disableSelection();

	$('.progs-notifica .close').live('click', function(){
		$('.progs-notifica .wrap').hide();
		$(this).hide();
		$('.progs-notifica .question').show();
		return false;
	});

	$('.progs-notifica .question').live('click', function(){
		$('.progs-notifica .wrap').show();
		$(this).hide();
		$('.progs-notifica .close').show();
		return false;
	});
}

/* driv me configurator */
var driveMe = {
	config: {
		driveMeWrap: ".drive-me",
		questionsSteps: "#drive-me-first-4-steps",
		finalStep: "#drive-me-final-step",
		menuClass: ".drive-me .menu.progress",
		washingMachine: "#washing-machine",
		optionListWrap: ".vertical-list",
		singleOptionList: ".options-list",
		backButtonClass: ".driveMeBackButton",
		helperTextWrap: ".questions"
	},
	init: function() {

		driveMe.currentStep = 1;
		driveMe.optionContainer = $(driveMe.config.optionListWrap);
		driveMe.backButton = $(driveMe.config.backButtonClass);
		driveMe.helperText = $(driveMe.config.helperTextWrap);
		driveMe.menu = $(driveMe.config.menuClass);
		
		// XXX Cedac Start
		driveMe.wrap = $(driveMe.config.driveMeWrap);
		
		driveMe.color = null;
		driveMe.fabric = null;
		driveMe.dirty = null;
		driveMe.detergent = null;
		// XXX Cedac End

		$(document).ready(function() {
			$('.drive-me-configuration .dragger').draggable({
				containment: ".drive-me-configuration",
				scroll: false,
				revert: "invalid",
				helper: "clone",
				appendTo: '.options-container',
				zIndex: 999,
				start: function(){
					$(this).hide();
				},
				stop: function(){
					$(this).show();
				}
			});
			$("#washing-machine .level-position").droppable({
				drop: function(event, ui) {
					ui.draggable.addClass('dropped');
					driveMe.updateMachineStatus(ui.draggable);
					driveMe.goToStep(driveMe.currentStep + 1);
				}
			});
			$(document).on('click', driveMe.config.backButtonClass, function(event) {
				if (driveMe.currentStep > 1) {
					driveMe.goToStep(driveMe.currentStep - 1);
				}
			});
		});
	},
	updateMachineStatus: function(handler) {
		var imageUrl = handler.attr('data-image');
		var optionValue = handler.attr('data-value');
		handler.fadeOut(100);
		switch(driveMe.currentStep) {
			case 1:
				// XXX Cedac Start
				driveMe.color = optionValue;
				// XXX Cedac End
				$(driveMe.config.washingMachine).find('.porthole').css('background-image','url("' + imageUrl + '")');
				$(driveMe.config.washingMachine).find('#level2').show();
				break;
			case 2:
				// XXX Cedac Start
				driveMe.fabric = optionValue;
				// XXX Cedac End
				$(driveMe.config.washingMachine).find('#level3').css('background-image','url("' + imageUrl + '")');
				$(driveMe.config.washingMachine).find('#level3').show();
				break;
			case 3:
				// XXX Cedac Start
				driveMe.dirty = optionValue;
				// XXX Cedac End
				$(driveMe.config.washingMachine).find('#level4').css('background-image','url("' + imageUrl + '")');
				$(driveMe.config.washingMachine).find('#level4').show();
				break;
			case 4:
				// XXX Cedac Start
				driveMe.detergent = optionValue;
				// XXX Cedac End
				$(driveMe.config.washingMachine).find('#level5').css('background-image','url("' + imageUrl + '")');
				$(driveMe.config.washingMachine).find('#level5').show();
				break;
		}
	},
	resetMachineStatus: function(step) {
		for (var i=step+1;i<6;i++) {
			$(driveMe.config.washingMachine).find('#level' + i).hide()
		}
	},
	goToStep: function(step) {
		// going back
		if (driveMe.currentStep > step) {
			driveMe.currentStep = step;
			if (driveMe.currentStep == 4) {
				$(driveMe.config.finalStep).hide();
				$(driveMe.config.questionsSteps).fadeIn(200);
			}
			driveMe.resetMachineStatus(step);
			driveMe.updateOptionList(false);
		}
		// going forward
		else {
			driveMe.currentStep = step;
			if (driveMe.currentStep == 5) {
				// XXX Cedac Start
				var event = new jQuery.Event('driveMe.finish', {
					color: driveMe.color,
					fabric: driveMe.fabric,
					dirty: driveMe.dirty,
					detergent: driveMe.detergent,
					finalStep: $(driveMe.config.finalStep)
				});
				driveMe.wrap.trigger(event);
				$.when(event.result).done(function() {
					$(driveMe.config.questionsSteps).hide();
					$(driveMe.config.finalStep).fadeIn(200);
				});
				// XXX Cedac End
			} else {
				driveMe.updateOptionList(true);
			}
		}
		driveMe.updateBackButtonStatus();
		driveMe.updateMenuStatus();
		driveMe.updateHelperText();
	},
	updateHelperText: function() {
		driveMe.helperText.find('div:visible').hide();
		driveMe.helperText.find('[data-step="' + driveMe.currentStep + '"]').show();
		if (driveMe.currentStep == 5) {
			driveMe.helperText.find('span').css('visibility','hidden');
		}
		else {
			driveMe.helperText.find('span').css('visibility','visible');
		}
	},
	updateOptionList: function(animated) {
		// if the current step is > 4 we don't need an option list anymore
		if (driveMe.currentStep > 4) return;
		var nextStep = driveMe.currentStep;
		var prevStep = driveMe.currentStep - 1;

		if (driveMe.currentStep == 4 && animated == false) {
			var optionList = $(driveMe.config.singleOptionList + '[data-step="' + driveMe.currentStep + '"]');
			optionList.css('left','0');
			optionList.find('.dropped').css({'left': '0', 'top': '0'}).removeClass('dropped').show();
			optionList.show();
			return;
		}
		var currentOptionList = $(driveMe.config.singleOptionList + ':visible');
		var nextOptionList = currentOptionList.siblings('[data-step="' + nextStep + '"]');
		
		// the animated version is for the step advancement
		// the non animated is for the back button behaviour
		if (animated) {
			driveMe.optionContainer.addClass('no-overflow');
			nextOptionList.css({
				'left': '278px',
				'display': 'block'
			});
			currentOptionList.animate({
				left: '-278px'
			}, 400, function(){
				$(this).hide();
			});
			nextOptionList.animate({
				left: '0',
			}, 400, function() {
				driveMe.optionContainer.removeClass('no-overflow');
			});
		}
		else {
			nextOptionList.css('left','0');
			nextOptionList.find('.dropped').css({'left': '0', 'top': '0'}).removeClass('dropped').show();
			nextOptionList.show();
			currentOptionList.hide();
		}
		
		if (nextOptionList.find('.scrollable-area-wrapper').length === 0) {
			var scrollerContainer = nextOptionList.find('.list-wrap');
			var scroller = new jcf.modules.customscroll({
				alwaysPreventWheel: true,
				scrollbarOptions: {},
				replaces: scrollerContainer[0]
			});
		}
	},
	updateBackButtonStatus: function() {
		// the back button is visible from 2nd step
		if (driveMe.currentStep == 2) {
			driveMe.backButton.delay(400).fadeIn(100);
		}
		else if (driveMe.currentStep == 1) {
			driveMe.backButton.stop().hide();
		}
	},
	updateMenuStatus: function() {
		var currentMenuStep = driveMe.menu.find('[data-step="' + driveMe.currentStep + '"]');
		currentMenuStep.siblings('.active, .prev').removeClass('active prev');
		currentMenuStep.addClass('active').removeClass('prev');
		currentMenuStep.prevAll().removeClass('future');
		currentMenuStep.nextAll().addClass('future');
		currentMenuStep.prev().addClass('prev');
	}
};


/*
 * jQuery Carousel plugin
 */
;(function($){
	function ScrollGallery(options) {
		this.options = $.extend({
			mask: 'div.mask',
			slider: '>*',
			slides: '>*',
			activeClass:'active',
			disabledClass:'disabled',
			btnPrev: 'a.btn-prev',
			btnNext: 'a.btn-next',
			generatePagination: false,
			pagerList: '<ul>',
			pagerListItem: '<li><a href="#"></a></li>',
			pagerListItemText: 'a',
			pagerLinks: '.pagination li',
			currentNumber: 'span.current-num',
			totalNumber: 'span.total-num',
			btnPlay: '.btn-play',
			btnPause: '.btn-pause',
			btnPlayPause: '.btn-play-pause',
			galleryReadyClass: 'gallery-js-ready',
			autorotationActiveClass: 'autorotation-active',
			autorotationDisabledClass: 'autorotation-disabled',
			stretchSlideToMask: false,
			circularRotation: true,
			disableWhileAnimating: false,
			autoRotation: false,
			pauseOnHover: isTouchDevice ? false : true,
			maskAutoSize: false,
			switchTime: 4000,
			animSpeed: 600,
			event:'click',
			swipeGap: false,
			swipeThreshold: 50,
			handleTouch: true,
			vertical: false,
			useTranslate3D: false,
			step: false
		}, options);
		this.init();
	}
	ScrollGallery.prototype = {
		init: function() {
			if(this.options.holder) {
				this.findElements();
				this.attachEvents();
				this.refreshPosition();
				this.refreshState(true);
				this.resumeRotation();
				this.makeCallback('onInit', this);
			}
		},
		findElements: function() {
			// define dimensions proporties
			this.fullSizeFunction = this.options.vertical ? 'outerHeight' : 'outerWidth';
			this.innerSizeFunction = this.options.vertical ? 'height' : 'width';
			this.slideSizeFunction = 'outerHeight';
			this.maskSizeProperty = 'height';
			this.animProperty = this.options.vertical ? 'marginTop' : 'marginLeft';
			this.swipeProperties = this.options.vertical ? ['up', 'down'] : ['left', 'right'];
			
			// control elements
			this.gallery = $(this.options.holder).addClass(this.options.galleryReadyClass);
			this.mask = this.gallery.find(this.options.mask);
			this.slider = this.mask.find(this.options.slider);
			this.slides = this.slider.find(this.options.slides);
			this.btnPrev = this.gallery.find(this.options.btnPrev);
			this.btnNext = this.gallery.find(this.options.btnNext);
			this.currentStep = 0; this.stepsCount = 0;
			
			// get start index
			if(this.options.step === false) {
				var activeSlide = this.slides.filter('.'+this.options.activeClass);
				if(activeSlide.length) {
					this.currentStep = this.slides.index(activeSlide);
				}
			}
			
			// calculate offsets
			this.calculateOffsets();
			$(window).bind('load resize orientationchange', $.proxy(this.onWindowResize, this));
			
			// create gallery pagination
			if(typeof this.options.generatePagination === 'string') {
				this.pagerLinks = $();
				this.buildPagination();
			} else {
				this.pagerLinks = this.gallery.find(this.options.pagerLinks);
				this.attachPaginationEvents();
			}
			
			// autorotation control buttons
			this.btnPlay = this.gallery.find(this.options.btnPlay);
			this.btnPause = this.gallery.find(this.options.btnPause);
			this.btnPlayPause = this.gallery.find(this.options.btnPlayPause);
			
			// misc elements
			this.curNum = this.gallery.find(this.options.currentNumber);
			this.allNum = this.gallery.find(this.options.totalNumber);
		},
		attachEvents: function() {
			this.btnPrev.bind(this.options.event, this.bindScope(function(e){
				this.prevSlide();
				e.preventDefault();
			}));
			this.btnNext.bind(this.options.event, this.bindScope(function(e){
				this.nextSlide();
				e.preventDefault();
			}));
			
			// pause on hover handling
			if(this.options.pauseOnHover) {
				this.gallery.hover(this.bindScope(function(){
					if(this.options.autoRotation) {
						this.galleryHover = true;
						this.pauseRotation();
					}
				}), this.bindScope(function(){
					if(this.options.autoRotation) {
						this.galleryHover = false;
						this.resumeRotation();
					}
				}));
			}
			
			// autorotation buttons handler
			this.btnPlay.bind(this.options.event, this.bindScope(this.startRotation));
			this.btnPause.bind(this.options.event, this.bindScope(this.stopRotation));
			this.btnPlayPause.bind(this.options.event, this.bindScope(function(){
				if(!this.gallery.hasClass(this.options.autorotationActiveClass)) {
					this.startRotation();
				} else {
					this.stopRotation();
				}
			}));
			
			// swipe event handling
			if(isTouchDevice) {
				// enable hardware acceleration
				if(this.options.useTranslate3D) {
					this.slider.css({'-webkit-transform': 'translate3d(0px, 0px, 0px)'});
				}
				
				// swipe gestures
				if(this.options.handleTouch && $.fn.swipe) {
					this.mask.swipe({
						excludedElements: '',
						fallbackToMouseEvents: false,
						threshold: this.options.swipeThreshold,
						allowPageScroll: 'vertical',
						swipeStatus: $.proxy(function(e, phase, direction, distance) {
							if(phase === 'start') {
								this.originalOffset = parseInt(this.slider.stop(true, false).css(this.animProperty));
							} else if(phase === 'move') {
								if(direction === this.swipeProperties[0] || direction === this.swipeProperties[1]) {
									var tmpOffset = this.originalOffset + distance * (direction === this.swipeProperties[0] ? -1 : 1);
									if(!this.options.swipeGap) {
										tmpOffset = Math.max(Math.min(0, tmpOffset), this.maxOffset);
									}
									this.tmpProps = {};
									this.tmpProps[this.animProperty] = tmpOffset;
									this.slider.css(this.tmpProps);
									e.preventDefault();
								}
							} else if(phase === 'cancel') {
								// return to previous position
								this.switchSlide();
							}
						},this),
						swipe: $.proxy(function(event, direction) {
							if(direction === this.swipeProperties[0]) {
								if(this.currentStep === this.stepsCount - 1) this.switchSlide();
								else this.nextSlide();
							} else if(direction === this.swipeProperties[1]) {
								if(this.currentStep === 0) this.switchSlide();
								else this.prevSlide();
							}
						},this)
					});
				}
			}
		},
		onWindowResize: function() {
			if(!this.galleryAnimating) {
				this.calculateOffsets();
				this.refreshPosition();
				this.buildPagination();
				this.refreshState();
				this.resizeQueue = false;
			} else {
				this.resizeQueue = true;
			}
		},
		refreshPosition: function() {
			this.currentStep = Math.min(this.currentStep, this.stepsCount - 1);
			this.tmpProps = {};
			this.tmpProps[this.animProperty] = this.getStepOffset();
			this.slider.stop().css(this.tmpProps);
		},
		calculateOffsets: function() {
			if(this.options.stretchSlideToMask) {
				var tmpObj = {};
				tmpObj[this.innerSizeFunction] = this.mask[this.innerSizeFunction]();
				this.slides.css(tmpObj);
			}
			
			this.maskSize = this.mask[this.innerSizeFunction]();
			this.sumSize = this.getSumSize();
			this.maxOffset = this.maskSize - this.sumSize;
			
			// vertical gallery with single size step custom behavior
			if(this.options.vertical && this.options.maskAutoSize) {
				this.options.step = 1;
				this.stepsCount = this.slides.length;
				this.stepOffsets = [0];
				var tmpOffset = 0;
				for(var i = 0; i < this.slides.length; i++) {
					tmpOffset -= $(this.slides[i])[this.fullSizeFunction](true);
					this.stepOffsets.push(tmpOffset);
				}
				this.maxOffset = tmpOffset;
				return;
			}
			
			// scroll by slide size
			if(typeof this.options.step === 'number' && this.options.step > 0) {
				this.slideDimensions = [];
				this.slides.each($.proxy(function(ind, obj){
					this.slideDimensions.push( $(obj)[this.fullSizeFunction](true) );
				},this));
				
				// calculate steps count
				this.stepOffsets = [0];
				this.stepsCount = 1;
				var tmpOffset = 0, tmpStep = 0;
				while(tmpOffset > this.maxOffset) {
					tmpOffset -= this.getSlideSize(tmpStep, tmpStep + this.options.step);
					tmpStep += this.options.step;
					this.stepOffsets.push(Math.max(tmpOffset, this.maxOffset));
					this.stepsCount++;
				}
			}
			// scroll by mask size
			else {
				// define step size
				this.stepSize = this.maskSize;
				
				// calculate steps count
				this.stepsCount = 1;
				var tmpOffset = 0;
				while(tmpOffset > this.maxOffset) {
					tmpOffset -= this.stepSize;
					this.stepsCount++;
				}
			}
		},
		getSumSize: function() {
			var sum = 0;
			this.slides.each($.proxy(function(ind, obj){
				sum += $(obj)[this.fullSizeFunction](true);
			},this));
			this.slider.css(this.innerSizeFunction, sum);
			return sum;
		},
		getStepOffset: function(step) {
			step = step || this.currentStep;
			if(typeof this.options.step === 'number') {
				return this.stepOffsets[this.currentStep];
			} else {
				return Math.max(-this.currentStep * this.stepSize, this.maxOffset);
			}
		},
		getSlideSize: function(i1, i2) {
			var sum = 0;
			for(var i = i1; i < Math.min(i2, this.slideDimensions.length); i++) {
				sum += this.slideDimensions[i];
			}
			return sum;
		},
		buildPagination: function() {
			if(typeof this.options.generatePagination === 'string') {
				if(!this.pagerHolder) {
					this.pagerHolder = this.gallery.find(this.options.generatePagination);
				}
				if(this.pagerHolder.length && this.oldStepsCount != this.stepsCount) {
					this.oldStepsCount = this.stepsCount;
					this.pagerHolder.empty();
					this.pagerList = $(this.options.pagerList).appendTo(this.pagerHolder);
					for(var i = 0; i < this.stepsCount; i++) {
						$(this.options.pagerListItem).appendTo(this.pagerList).find(this.options.pagerListItemText).text(i+1);
					}
					this.pagerLinks = this.pagerList.children();
					this.attachPaginationEvents();
				}
			}
		},
		attachPaginationEvents: function() {
			this.pagerLinks.each(this.bindScope(function(ind, obj){
				$(obj).bind(this.options.event, this.bindScope(function(){
					this.numSlide(ind);
					return false;
				}));
			}));
		},
		prevSlide: function() {
			if(!(this.options.disableWhileAnimating && this.galleryAnimating)) {
				if(this.currentStep > 0) {
					this.currentStep--;
					this.switchSlide();
				} else if(this.options.circularRotation) {
					this.currentStep = this.stepsCount - 1;
					this.switchSlide();
				}
			}
		},
		nextSlide: function(fromAutoRotation) {
			if(!(this.options.disableWhileAnimating && this.galleryAnimating)) {
				if(this.currentStep < this.stepsCount - 1) {
					this.currentStep++;
					this.switchSlide();
				} else if(this.options.circularRotation || fromAutoRotation === true) {
					this.currentStep = 0;
					this.switchSlide();
				}
			}
		},
		numSlide: function(c) {
			if(this.currentStep != c) {
				this.currentStep = c;
				this.switchSlide();
			}
		},
		switchSlide: function() {
			this.galleryAnimating = true;
			this.tmpProps = {}
			this.tmpProps[this.animProperty] = this.getStepOffset();
			this.slider.stop().animate(this.tmpProps,{duration: this.options.animSpeed, complete: this.bindScope(function(){
				// animation complete
				this.galleryAnimating = false;
				if(this.resizeQueue) {
					this.onWindowResize();
				}
				
				// onchange callback
				this.makeCallback('onChange', this);
				this.autoRotate();
			})});
			this.refreshState();
			
			// onchange callback
			this.makeCallback('onBeforeChange', this);
		},
		refreshState: function(initial) {
			if(this.options.step === 1 || this.stepsCount === this.slides.length) {
				this.slides.removeClass(this.options.activeClass).eq(this.currentStep).addClass(this.options.activeClass);
			}
			this.pagerLinks.removeClass(this.options.activeClass).eq(this.currentStep).addClass(this.options.activeClass);
			this.curNum.html(this.currentStep+1);
			this.allNum.html(this.stepsCount);
			
			// initial refresh
			if(this.options.maskAutoSize && typeof this.options.step === 'number') {
				this.tmpProps = {};
				this.tmpProps[this.maskSizeProperty] = this.slides.eq(Math.min(this.currentStep,this.slides.length-1))[this.slideSizeFunction](true);
				this.mask.stop()[initial ? 'css' : 'animate'](this.tmpProps);
			}
			
			// disabled state
			if(!this.options.circularRotation) {
				this.btnPrev.add(this.btnNext).removeClass(this.options.disabledClass);
				if(this.currentStep === 0) this.btnPrev.addClass(this.options.disabledClass);
				if(this.currentStep === this.stepsCount - 1) this.btnNext.addClass(this.options.disabledClass);
			}
		},
		startRotation: function() {
			this.options.autoRotation = true;
			this.galleryHover = false;
			this.autoRotationStopped = false;
			this.resumeRotation();
		},
		stopRotation: function() {
			this.galleryHover = true;
			this.autoRotationStopped = true;
			this.pauseRotation();
		},
		pauseRotation: function() {
			this.gallery.addClass(this.options.autorotationDisabledClass);
			this.gallery.removeClass(this.options.autorotationActiveClass);
			clearTimeout(this.timer);
		},
		resumeRotation: function() {
			if(!this.autoRotationStopped) {
				this.gallery.addClass(this.options.autorotationActiveClass);
				this.gallery.removeClass(this.options.autorotationDisabledClass);
				this.autoRotate();
			}
		},
		autoRotate: function() {
			clearTimeout(this.timer);
			if(this.options.autoRotation && !this.galleryHover && !this.autoRotationStopped) {
				this.timer = setTimeout(this.bindScope(function(){
					this.nextSlide(true);
				}), this.options.switchTime);
			} else {
				this.pauseRotation();
			}
		},
		bindScope: function(func, scope) {
			return $.proxy(func, scope || this);
		},
		makeCallback: function(name) {
			if(typeof this.options[name] === 'function') {
				var args = Array.prototype.slice.call(arguments);
				args.shift();
				this.options[name].apply(this, args);
			}
		}
	};
	
	// detect device type
	var isTouchDevice = (function() {
		try {
			return ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
		} catch (e) {
			return false;
		}
	}());
	
	// jquery plugin
	$.fn.scrollGallery = function(opt){
		return this.each(function(){
			$(this).data('ScrollGallery', new ScrollGallery($.extend(opt,{holder:this})));
		});
	};
}(jQuery));

/*
 * jQuery Tabs plugin
 */
;(function($){
	$.fn.contentTabs = function(o){
		// default options
		var options = $.extend({
			activeClass:'active',
			addToParent:false,
			autoHeight:false,
			autoRotate:false,
			checkHash:false,
			animSpeed:400,
			switchTime:3000,
			effect: 'none', // "fade", "slide"
			tabLinks:'a',
			attrib:'href',
			event:'click'
		},o);

		return this.each(function(){
			var tabset = $(this), tabs = $();
			var tabLinks = tabset.find(options.tabLinks);
			var tabLinksParents = tabLinks.parent();
			var prevActiveLink = tabLinks.eq(0), currentTab, animating;
			var tabHolder;

			// handle location hash
			if(options.checkHash && tabLinks.filter('[' + options.attrib + '="' + location.hash + '"]').length) {
				(options.addToParent ? tabLinksParents : tabLinks).removeClass(options.activeClass);
				setTimeout(function() {
					window.scrollTo(0,0);
				},1);
			}
			
			// init tabLinks
			tabLinks.each(function(){
				var link = $(this);
				var href = link.attr(options.attrib);
				var parent = link.parent();
				href = href.substr(href.lastIndexOf('#'));
				
				// get elements
				var tab = $(href);
				tabs = tabs.add(tab);
				link.data('cparent', parent);
				link.data('ctab', tab);
				
				// find tab holder
				if(!tabHolder && tab.length) {
					tabHolder = tab.parent();
				}
				
				// show only active tab
				var classOwner = options.addToParent ? parent : link;
				if(classOwner.hasClass(options.activeClass) || (options.checkHash && location.hash === href)) {
					classOwner.addClass(options.activeClass);
					prevActiveLink = link; currentTab = tab;
					tab.removeClass(tabHiddenClass).width('');
					contentTabsEffect[options.effect].show({tab:tab, fast:true});
				} else {
					var tabWidth = tab.width();
					if(tabWidth) {
						tab.width(tabWidth);
					}
					contentTabsEffect[options.effect].hide({tab:tab.addClass(tabHiddenClass), fast:true});
				}
				
				// event handler
				link.bind(options.event, function(e){
					if(link != prevActiveLink && !animating) {
						switchTab(prevActiveLink, link);
						prevActiveLink = link;
					}
				});
				if(options.attrib === 'href') {
					link.bind('click', function(e){
						e.preventDefault();
					});
				}
			});
			
			// tab switch function
			function switchTab(oldLink, newLink) {
				animating = true;
				var oldTab = oldLink.data('ctab');
				var newTab = newLink.data('ctab');
				prevActiveLink = newLink;
				currentTab = newTab;
				
				// refresh pagination links
				(options.addToParent ? tabLinksParents : tabLinks).removeClass(options.activeClass);
				(options.addToParent ? newLink.data('cparent') : newLink).addClass(options.activeClass);
				
				// hide old tab
				resizeHolder(oldTab, true);
				contentTabsEffect[options.effect].hide({
					speed: options.animSpeed,
					tab:oldTab,
					complete: function() {
						// show current tab
						resizeHolder(newTab.removeClass(tabHiddenClass).width(''));
						contentTabsEffect[options.effect].show({
							speed: options.animSpeed,
							tab:newTab,
							complete: function() {
								if(!oldTab.is(newTab)) {
									oldTab.width(oldTab.width()).addClass(tabHiddenClass);
								}
								animating = false;
								resizeHolder(newTab, false);
								autoRotate();
							}
						});
					}
				});
			}
			
			// holder auto height
			function resizeHolder(block, state) {
				var curBlock = block && block.length ? block : currentTab;
				if(options.autoHeight && curBlock) {
					tabHolder.stop();
					if(state === false) {
						tabHolder.css({height:''});
					} else {
						var origStyles = curBlock.attr('style');
						curBlock.show().css({width:curBlock.width()});
						var tabHeight = curBlock.outerHeight(true);
						if(!origStyles) curBlock.removeAttr('style'); else curBlock.attr('style', origStyles);
						if(state === true) {
							tabHolder.css({height: tabHeight});
						} else {
							tabHolder.animate({height: tabHeight}, {duration: options.animSpeed});
						}
					}
				}
			}
			if(options.autoHeight) {
				$(window).bind('resize orientationchange', function(){
					tabs.not(currentTab).removeClass(tabHiddenClass).show().each(function(){
						var tab = jQuery(this), tabWidth = tab.css({width:''}).width();
						if(tabWidth) {
							tab.width(tabWidth);
						}
					}).hide().addClass(tabHiddenClass);

					resizeHolder(currentTab, false);
				});
			}
			
			// autorotation handling
			var rotationTimer;
			function nextTab() {
				var activeItem = (options.addToParent ? tabLinksParents : tabLinks).filter('.' + options.activeClass);
				var activeIndex = (options.addToParent ? tabLinksParents : tabLinks).index(activeItem);
				var newLink = tabLinks.eq(activeIndex < tabLinks.length - 1 ? activeIndex + 1 : 0);
				prevActiveLink = tabLinks.eq(activeIndex);
				switchTab(prevActiveLink, newLink);
			}
			function autoRotate() {
				if(options.autoRotate && tabLinks.length > 1) {
					clearTimeout(rotationTimer);
					rotationTimer = setTimeout(function() {
						if(!animating) {
							nextTab();
						} else {
							autoRotate();
						}
					}, options.switchTime);
				}
			}
			autoRotate();
		});
	};
	
	// add stylesheet for tabs on DOMReady
	var tabHiddenClass = 'js-tab-hidden';
	$(function() {
		var tabStyleSheet = $('<style type="text/css">')[0];
		var tabStyleRule = '.'+tabHiddenClass;
		tabStyleRule += '{position:absolute !important;left:-9999px !important;top:-9999px !important;display:block !important}';
		if (tabStyleSheet.styleSheet) {
			tabStyleSheet.styleSheet.cssText = tabStyleRule;
		} else {
			tabStyleSheet.appendChild(document.createTextNode(tabStyleRule));
		}
		$('head').append(tabStyleSheet);
	});
	
	// tab switch effects
	var contentTabsEffect = {
		none: {
			show: function(o) {
				o.tab.css({display:'block'});
				if(o.complete) o.complete();
			},
			hide: function(o) {
				o.tab.css({display:'none'});
				if(o.complete) o.complete();
			}
		},
		fade: {
			show: function(o) {
				if(o.fast) o.speed = 1;
				o.tab.fadeIn(o.speed);
				if(o.complete) setTimeout(o.complete, o.speed);
			},
			hide: function(o) {
				if(o.fast) o.speed = 1;
				o.tab.fadeOut(o.speed);
				if(o.complete) setTimeout(o.complete, o.speed);
			}
		},
		slide: {
			show: function(o) {
				var tabHeight = o.tab.show().css({width:o.tab.width()}).outerHeight(true);
				var tmpWrap = $('<div class="effect-div">').insertBefore(o.tab).append(o.tab);
				tmpWrap.css({width:'100%', overflow:'hidden', position:'relative'}); o.tab.css({marginTop:-tabHeight,display:'block'});
				if(o.fast) o.speed = 1;
				o.tab.animate({marginTop: 0}, {duration: o.speed, complete: function(){
					o.tab.css({marginTop: '', width: ''}).insertBefore(tmpWrap);
					tmpWrap.remove();
					if(o.complete) o.complete();
				}});
			},
			hide: function(o) {
				var tabHeight = o.tab.show().css({width:o.tab.width()}).outerHeight(true);
				var tmpWrap = $('<div class="effect-div">').insertBefore(o.tab).append(o.tab);
				tmpWrap.css({width:'100%', overflow:'hidden', position:'relative'});
				
				if(o.fast) o.speed = 1;
				o.tab.animate({marginTop: -tabHeight}, {duration: o.speed, complete: function(){
					o.tab.css({display:'none', marginTop:'', width:''}).insertBefore(tmpWrap);
					tmpWrap.remove();
					if(o.complete) o.complete();
				}});
			}
		}
	};
}(jQuery));

/*
 * jQuery Accordion plugin
 */
;(function($){
	$.fn.slideAccordion = function(opt){
		// default options
		var options = $.extend({
			addClassBeforeAnimation: false,
			activeClass:'active',
			opener:'.opener',
			slider:'.slide',
			animSpeed: 300,
			collapsible:true,
			event:'click'
		},opt);

		return this.each(function(){
			// options
			var accordion = $(this);
			var items = accordion.find(':has('+options.slider+')');

			items.each(function(){
				var item = $(this);
				var opener = item.find(options.opener);
				var slider = item.find(options.slider);
				opener.bind(options.event, function(e){
					if(!slider.is(':animated')) {
						if(item.hasClass(options.activeClass)) {
							if(options.collapsible) {
								slider.slideUp(options.animSpeed, function(){
									hideSlide(slider);
									item.removeClass(options.activeClass);
								});
							}
						} else {
							// show active
							var levelItems = item.siblings('.'+options.activeClass);
							var sliderElements = levelItems.find(options.slider);
							item.addClass(options.activeClass);
							showSlide(slider).hide().slideDown(options.animSpeed);
						
							// collapse others
							sliderElements.slideUp(options.animSpeed, function(){
								levelItems.removeClass(options.activeClass);
								hideSlide(sliderElements);
							});
						}
					}
					e.preventDefault();
				});
				if(item.hasClass(options.activeClass)) showSlide(slider); else hideSlide(slider);
			});
		});
	};

	// accordion slide visibility
	var showSlide = function(slide) {
		return slide.css({position:'', top: '', left: '', width: '' });
	};
	var hideSlide = function(slide) {
		return slide.show().css({position:'absolute', top: -9999, left: -9999, width: slide.width() });
	};
}(jQuery));

/*
 * Popups plugin
 */
;(function($) {
	function ContentPopup(opt) {
		this.options = $.extend({
			holder: null,
			popup: '.popup',
			btnOpen: '.open',
			btnClose: '.close',
			openClass: 'popup-active',
			clickEvent: 'click',
			mode: 'click',
			hideOnClickLink: true,
			hideOnClickOutside: true,
			delay: 50
		}, opt);
		if(this.options.holder) {
			this.holder = $(this.options.holder);
			this.init();
		}
	}
	ContentPopup.prototype = {
		init: function() {
			this.findElements();
			this.attachEvents();
		},
		findElements: function() {
			this.popup = this.holder.find(this.options.popup);
			this.btnOpen = this.holder.find(this.options.btnOpen);
			this.btnClose = this.holder.find(this.options.btnClose);
		},
		attachEvents: function() {
			// handle popup openers
			var self = this;
			this.clickMode = isTouchDevice || (self.options.mode === self.options.clickEvent);

			if(this.clickMode) {
				// handle click mode
				this.btnOpen.bind(self.options.clickEvent, function(e) {
					if(self.holder.hasClass(self.options.openClass)) {
						if(self.options.hideOnClickLink) {
							self.hidePopup();
						}
					} else {
						self.showPopup();
					}
					e.preventDefault();
				});

				// prepare outside click handler
				this.outsideClickHandler = this.bind(this.outsideClickHandler, this);
			} else {
				// handle hover mode
				var timer, delayedFunc = function(func) {
					clearTimeout(timer);
					timer = setTimeout(function() {
						func.call(self);
					}, self.options.delay);
				};
				this.btnOpen.bind('mouseover', function() {
					delayedFunc(self.showPopup);
				}).bind('mouseout', function() {
					delayedFunc(self.hidePopup);
				});
				this.popup.bind('mouseover', function() {
					delayedFunc(self.showPopup);
				}).bind('mouseout', function() {
					delayedFunc(self.hidePopup);
				});
			}

			// handle close buttons
			this.btnClose.bind(self.options.clickEvent, function(e) {
				self.hidePopup();
				e.preventDefault();
			});
		},
		outsideClickHandler: function(e) {
			// hide popup if clicked outside
			var currentNode = (e.changedTouches ? e.changedTouches[0] : e).target;
			if(!$(currentNode).parents().filter(this.holder).length) {
				this.hidePopup();
			}
		},
		showPopup: function() {
			// reveal popup
			this.holder.addClass(this.options.openClass);
			this.popup.css({display:'block'});

			// outside click handler
			if(this.clickMode && this.options.hideOnClickOutside && !this.outsideHandlerActive) {
				this.outsideHandlerActive = true;
				$(document).bind('click touchstart', this.outsideClickHandler);
			}
		},
		hidePopup: function() {
			// hide popup
			this.holder.removeClass(this.options.openClass);
			this.popup.css({display:'none'});

			// outside click handler
			if(this.clickMode && this.options.hideOnClickOutside && this.outsideHandlerActive) {
				this.outsideHandlerActive = false;
				$(document).unbind('click touchstart', this.outsideClickHandler);
			}
		},
		bind: function(f, scope, forceArgs){
			return function() {return f.apply(scope, forceArgs ? [forceArgs] : arguments);};
		}
	};

	// detect touch devices
	var isTouchDevice = /MSIE 10.*Touch/.test(navigator.userAgent) || ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

	// jQuery plugin interface
	$.fn.contentPopup = function(opt) {
		return this.each(function() {
			new ContentPopup($.extend(opt, {holder: this}));
		});
	};
}(jQuery));

/*
 * jQuery SameHeight plugin
 */
;(function($){
	$.fn.sameHeight = function(opt) {
		var options = $.extend({
			skipClass: 'same-height-ignore',
			leftEdgeClass: 'same-height-left',
			rightEdgeClass: 'same-height-right',
			elements: '>*',
			flexible: false,
			multiLine: false,
			useMinHeight: false,
			biggestHeight: false
		},opt);
		return this.each(function(){
			var holder = $(this), postResizeTimer, ignoreResize;
			var elements = holder.find(options.elements).not('.' + options.skipClass);
			if(!elements.length) return;
			
			// resize handler
			function doResize() {
				elements.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', '');
				if(options.multiLine) {
					// resize elements row by row
					resizeElementsByRows(elements, options);
				} else {
					// resize elements by holder
					resizeElements(elements, holder, options);
				}
			}
			doResize();
			
			// handle flexible layout / font resize
			var delayedResizeHandler = function() {
				if(!ignoreResize) {
					ignoreResize = true;
					doResize();
					clearTimeout(postResizeTimer);
					postResizeTimer = setTimeout(function() {
						doResize();
						setTimeout(function(){
							ignoreResize = false;
						}, 10);
					}, 100);
				}
			};

			// handle flexible/responsive layout
			if(options.flexible) {
				$(window).bind('resize orientationchange fontresize', delayedResizeHandler);
			}

			// handle complete page load including images and fonts
			$(window).bind('load', delayedResizeHandler);
		});
	};
	
	// detect css min-height support
	var supportMinHeight = typeof document.documentElement.style.maxHeight !== 'undefined';
	
	// get elements by rows
	function resizeElementsByRows(boxes, options) {
		var currentRow = $(), maxHeight, maxCalcHeight = 0, firstOffset = boxes.eq(0).offset().top;
		boxes.each(function(ind){
			var curItem = $(this);
			if(curItem.offset().top === firstOffset) {
				currentRow = currentRow.add(this);
			} else {
				maxHeight = getMaxHeight(currentRow);
				maxCalcHeight = Math.max(maxCalcHeight, resizeElements(currentRow, maxHeight, options));
				currentRow = curItem;
				firstOffset = curItem.offset().top;
			}
		});
		if(currentRow.length) {
			maxHeight = getMaxHeight(currentRow);
			maxCalcHeight = Math.max(maxCalcHeight, resizeElements(currentRow, maxHeight, options));
		}
		if(options.biggestHeight) {
			boxes.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', maxCalcHeight);
		}
	}
	
	// calculate max element height
	function getMaxHeight(boxes) {
		var maxHeight = 0;
		boxes.each(function(){
			maxHeight = Math.max(maxHeight, $(this).outerHeight());
		});
		return maxHeight;
	}
	
	// resize helper function
	function resizeElements(boxes, parent, options) {
		var calcHeight;
		var parentHeight = typeof parent === 'number' ? parent : parent.height();
		boxes.removeClass(options.leftEdgeClass).removeClass(options.rightEdgeClass).each(function(i){
			var element = $(this);
			var depthDiffHeight = 0;
			
			if(typeof parent !== 'number') {
				element.parents().each(function(){
					var tmpParent = $(this);
					if(this === parent[0]) {
						return false;
					} else {
						depthDiffHeight += tmpParent.outerHeight() - tmpParent.height();
					}
				});
			}
			calcHeight = parentHeight - depthDiffHeight - (element.outerHeight() - element.height());
			if(calcHeight > 0) {
				element.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', calcHeight);
			}
		});
		boxes.filter(':first').addClass(options.leftEdgeClass);
		boxes.filter(':last').addClass(options.rightEdgeClass);
		return calcHeight;
	}
}(jQuery));

/*
 * jQuery FontResize Event
 */
jQuery.onFontResize = (function($) {
	$(function() {
		var randomID = 'font-resize-frame-' + Math.floor(Math.random() * 1000);
		var resizeFrame = $('<iframe>').attr('id', randomID).addClass('font-resize-helper');
		
		// required styles
		resizeFrame.css({
			width: '100em',
			height: '10px',
			position: 'absolute',
			borderWidth: 0,
			top: '-9999px',
			left: '-9999px'
		}).appendTo('body');
		
		// use native IE resize event if possible
		if (window.attachEvent && !window.addEventListener) {
			resizeFrame.bind('resize', function () {
				$.onFontResize.trigger(resizeFrame[0].offsetWidth / 100);
			});
		}
		// use script inside the iframe to detect resize for other browsers
		else {
			var doc = resizeFrame[0].contentWindow.document;
			doc.open();
			doc.write('<scri' + 'pt>window.onload = function(){var em = parent.jQuery("#' + randomID + '")[0];window.onresize = function(){if(parent.jQuery.onFontResize){parent.jQuery.onFontResize.trigger(em.offsetWidth / 100);}}};</scri' + 'pt>');
			doc.close();
		}
		jQuery.onFontResize.initialSize = resizeFrame[0].offsetWidth / 100;
	});
	return {
		// public method, so it can be called from within the iframe
		trigger: function (em) {
			$(window).trigger("fontresize", [em]);
		}
	};
}(jQuery));

/*
 * JavaScript Custom Forms Module
 */
jcf = {
	// global options
	modules: {},
	plugins: {},
	baseOptions: {
		unselectableClass:'jcf-unselectable',
		labelActiveClass:'jcf-label-active',
		labelDisabledClass:'jcf-label-disabled',
		classPrefix: 'jcf-class-',
		hiddenClass:'jcf-hidden',
		focusClass:'jcf-focus',
		wrapperTag: 'div'
	},
	// replacer function
	customForms: {
		setOptions: function(obj) {
			for(var p in obj) {
				if(obj.hasOwnProperty(p) && typeof obj[p] === 'object') {
					jcf.lib.extend(jcf.modules[p].prototype.defaultOptions, obj[p]);
				}
			}
		},
		replaceAll: function() {
			for(var k in jcf.modules) {
				var els = jcf.lib.queryBySelector(jcf.modules[k].prototype.selector);
				for(var i = 0; i<els.length; i++) {
					if(els[i].jcf) {
						// refresh form element state
						els[i].jcf.refreshState();
					} else {
						// replace form element
						if(!jcf.lib.hasClass(els[i], 'default') && jcf.modules[k].prototype.checkElement(els[i])) {
							new jcf.modules[k]({
								replaces:els[i]
							});
						}
					}
				}
			}
		},
		refreshAll: function() {
			for(var k in jcf.modules) {
				var els = jcf.lib.queryBySelector(jcf.modules[k].prototype.selector);
				for(var i = 0; i<els.length; i++) {
					if(els[i].jcf) {
						// refresh form element state
						els[i].jcf.refreshState();
					}
				}
			}
		},
		refreshElement: function(obj) {
			if(obj && obj.jcf) {
				obj.jcf.refreshState();
			}
		},
		destroyAll: function() {
			for(var k in jcf.modules) {
				var els = jcf.lib.queryBySelector(jcf.modules[k].prototype.selector);
				for(var i = 0; i<els.length; i++) {
					if(els[i].jcf) {
						els[i].jcf.destroy();
					}
				}
			}
		}
	},
	// detect device type
	isTouchDevice: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
	isWinPhoneDevice: navigator.msPointerEnabled && /MSIE 10.*Touch/.test(navigator.userAgent),
	// define base module
	setBaseModule: function(obj) {
		jcf.customControl = function(opt){
			this.options = jcf.lib.extend({}, jcf.baseOptions, this.defaultOptions, opt);
			this.init();
		};
		for(var p in obj) {
			jcf.customControl.prototype[p] = obj[p];
		}
	},
	// add module to jcf.modules
	addModule: function(obj) {
		if(obj.name){
			// create new module proto class
			jcf.modules[obj.name] = function(){
				jcf.modules[obj.name].superclass.constructor.apply(this, arguments);
			};
			jcf.lib.inherit(jcf.modules[obj.name], jcf.customControl);
			for(var p in obj) {
				jcf.modules[obj.name].prototype[p] = obj[p];
			}
			// on create module
			jcf.modules[obj.name].prototype.onCreateModule();
			// make callback for exciting modules
			for(var mod in jcf.modules) {
				if(jcf.modules[mod] != jcf.modules[obj.name]) {
					jcf.modules[mod].prototype.onModuleAdded(jcf.modules[obj.name]);
				}
			}
		}
	},
	// add plugin to jcf.plugins
	addPlugin: function(obj) {
		if(obj && obj.name) {
			jcf.plugins[obj.name] = function() {
				this.init.apply(this, arguments);
			};
			for(var p in obj) {
				jcf.plugins[obj.name].prototype[p] = obj[p];
			}
		}
	},
	// miscellaneous init
	init: function(){
		if(navigator.msPointerEnabled) {
			this.eventPress = 'MSPointerDown';
			this.eventMove = 'MSPointerMove';
			this.eventRelease = 'MSPointerUp';
		} else {
			this.eventPress = this.isTouchDevice ? 'touchstart' : 'mousedown';
			this.eventMove = this.isTouchDevice ? 'touchmove' : 'mousemove';
			this.eventRelease = this.isTouchDevice ? 'touchend' : 'mouseup';
		}

		// init jcf styles
		setTimeout(function(){
			jcf.lib.domReady(function(){
				jcf.initStyles();
			});
		},1);
		return this;
	},
	initStyles: function() {
		// create <style> element and rules
		var head = document.getElementsByTagName('head')[0],
			style = document.createElement('style'),
			rules = document.createTextNode('.'+jcf.baseOptions.unselectableClass+'{'+
				'-moz-user-select:none;'+
				'-webkit-tap-highlight-color:rgba(255,255,255,0);'+
				'-webkit-user-select:none;'+
				'user-select:none;'+
			'}');
		
		// append style element
		style.type = 'text/css';
		if(style.styleSheet) {
			style.styleSheet.cssText = rules.nodeValue;
		} else {
			style.appendChild(rules);
		}
		head.appendChild(style);
	}
}.init();

/*
 * Custom Form Control prototype
 */
jcf.setBaseModule({
	init: function(){
		if(this.options.replaces) {
			this.realElement = this.options.replaces;
			this.realElement.jcf = this;
			this.replaceObject();
		}
	},
	defaultOptions: {
		// default module options (will be merged with base options)
	},
	checkElement: function(el){
		return true; // additional check for correct form element
	},
	replaceObject: function(){
		this.createWrapper();
		this.attachEvents();
		this.fixStyles();
		this.setupWrapper();
	},
	createWrapper: function(){
		this.fakeElement = jcf.lib.createElement(this.options.wrapperTag);
		this.labelFor = jcf.lib.getLabelFor(this.realElement);
		jcf.lib.disableTextSelection(this.fakeElement);
		jcf.lib.addClass(this.fakeElement, jcf.lib.getAllClasses(this.realElement.className, this.options.classPrefix));
		jcf.lib.addClass(this.realElement, jcf.baseOptions.hiddenClass);
	},
	attachEvents: function(){
		jcf.lib.event.add(this.realElement, 'focus', this.onFocusHandler, this);
		jcf.lib.event.add(this.realElement, 'blur', this.onBlurHandler, this);
		jcf.lib.event.add(this.fakeElement, 'click', this.onFakeClick, this);
		jcf.lib.event.add(this.fakeElement, jcf.eventPress, this.onFakePressed, this);
		jcf.lib.event.add(this.fakeElement, jcf.eventRelease, this.onFakeReleased, this);

		if(this.labelFor) {
			this.labelFor.jcf = this;
			jcf.lib.event.add(this.labelFor, 'click', this.onFakeClick, this);
			jcf.lib.event.add(this.labelFor, jcf.eventPress, this.onFakePressed, this);
			jcf.lib.event.add(this.labelFor, jcf.eventRelease, this.onFakeReleased, this);
		}
	},
	fixStyles: function() {
		// hide mobile webkit tap effect
		if(jcf.isTouchDevice) {
			var tapStyle = 'rgba(255,255,255,0)';
			this.realElement.style.webkitTapHighlightColor = tapStyle;
			this.fakeElement.style.webkitTapHighlightColor = tapStyle;
			if(this.labelFor) {
				this.labelFor.style.webkitTapHighlightColor = tapStyle;
			}
		}
	},
	setupWrapper: function(){
		// implement in subclass
	},
	refreshState: function(){
		// implement in subclass
	},
	destroy: function() {
		if(this.fakeElement && this.fakeElement.parentNode) {
			this.fakeElement.parentNode.removeChild(this.fakeElement);
		}
		jcf.lib.removeClass(this.realElement, jcf.baseOptions.hiddenClass);
		this.realElement.jcf = null;
	},
	onFocus: function(){
		// emulated focus event
		jcf.lib.addClass(this.fakeElement,this.options.focusClass);
	},
	onBlur: function(cb){
		// emulated blur event
		jcf.lib.removeClass(this.fakeElement,this.options.focusClass);
	},
	onFocusHandler: function() {
		// handle focus loses
		if(this.focused) return;
		this.focused = true;
		
		// handle touch devices also
		if(jcf.isTouchDevice) {
			if(jcf.focusedInstance && jcf.focusedInstance.realElement != this.realElement) {
				jcf.focusedInstance.onBlur();
				jcf.focusedInstance.realElement.blur();
			}
			jcf.focusedInstance = this;
		}
		this.onFocus.apply(this, arguments);
	},
	onBlurHandler: function() {
		// handle focus loses
		if(!this.pressedFlag) {
			this.focused = false;
			this.onBlur.apply(this, arguments);
		}
	},
	onFakeClick: function(){
		if(jcf.isTouchDevice) {
			this.onFocus();
		} else if(!this.realElement.disabled) {
			this.realElement.focus();
		}
	},
	onFakePressed: function(e){
		this.pressedFlag = true;
	},
	onFakeReleased: function(){
		this.pressedFlag = false;
	},
	onCreateModule: function(){
		// implement in subclass
	},
	onModuleAdded: function(module) {
		// implement in subclass
	},
	onControlReady: function() {
		// implement in subclass
	}
});

/*
 * JCF Utility Library
 */
jcf.lib = {
	bind: function(func, scope){
		return function() {
			return func.apply(scope, arguments);
		}
	},
	browser: (function() {
		var ua = navigator.userAgent.toLowerCase(), res = {},
		match = /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(ua) ||
				/(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(ua) || [];
		res[match[1]] = true;
		res.version = match[2] || "0";
		res.safariMac = ua.indexOf('mac') != -1 && ua.indexOf('safari') != -1;
		return res;
	})(),
	getOffset: function (obj) {
		if (obj.getBoundingClientRect && !navigator.msPointerEnabled) {
			var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
			var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
			var clientLeft = document.documentElement.clientLeft || document.body.clientLeft || 0;
			var clientTop = document.documentElement.clientTop || document.body.clientTop || 0;
			return {
				top:Math.round(obj.getBoundingClientRect().top + scrollTop - clientTop),
				left:Math.round(obj.getBoundingClientRect().left + scrollLeft - clientLeft)
			}
		} else {
			var posLeft = 0, posTop = 0;
			while (obj.offsetParent) {posLeft += obj.offsetLeft; posTop += obj.offsetTop; obj = obj.offsetParent;}
			return {top:posTop,left:posLeft};
		}
	},
	getScrollTop: function() {
		return window.pageYOffset || document.documentElement.scrollTop;
	},
	getScrollLeft: function() {
		return window.pageXOffset || document.documentElement.scrollLeft;
	},
	getWindowWidth: function(){
		return document.compatMode=='CSS1Compat' ? document.documentElement.clientWidth : document.body.clientWidth;
	},
	getWindowHeight: function(){
		return document.compatMode=='CSS1Compat' ? document.documentElement.clientHeight : document.body.clientHeight;
	},
	getStyle: function(el, prop) {
		if (document.defaultView && document.defaultView.getComputedStyle) {
			return document.defaultView.getComputedStyle(el, null)[prop];
		} else if (el.currentStyle) {
			return el.currentStyle[prop];
		} else {
			return el.style[prop];
		}
	},
	getParent: function(obj, selector) {
		while(obj.parentNode && obj.parentNode != document.body) {
			if(obj.parentNode.tagName.toLowerCase() == selector.toLowerCase()) {
				return obj.parentNode;
			}
			obj = obj.parentNode;
		}
		return false;
	},
	isParent: function(child, parent) {
		while(child.parentNode) {
			if(child.parentNode === parent) {
				return true;
			}
			child = child.parentNode;
		}
		return false;
	},
	getLabelFor: function(object) {
		var parentLabel = jcf.lib.getParent(object,'label');
		if(parentLabel) {
			return parentLabel;
		} else if(object.id) {
			return jcf.lib.queryBySelector('label[for="' + object.id + '"]')[0];
		}
	},
	disableTextSelection: function(el){
		if (typeof el.onselectstart !== 'undefined') {
			el.onselectstart = function() {return false};
		} else if(window.opera) {
			el.setAttribute('unselectable', 'on');
		} else {
			jcf.lib.addClass(el, jcf.baseOptions.unselectableClass);
		}
	},
	enableTextSelection: function(el) {
		if (typeof el.onselectstart !== 'undefined') {
			el.onselectstart = null;
		} else if(window.opera) {
			el.removeAttribute('unselectable');
		} else {
			jcf.lib.removeClass(el, jcf.baseOptions.unselectableClass);
		}
	},
	queryBySelector: function(selector, scope){
		return this.getElementsBySelector(selector, scope);
	},
	prevSibling: function(node) {
		while(node = node.previousSibling) if(node.nodeType == 1) break;
		return node;
	},
	nextSibling: function(node) {
		while(node = node.nextSibling) if(node.nodeType == 1) break;
		return node;
	},
	fireEvent: function(element,event) {
		if(element.dispatchEvent){
			var evt = document.createEvent('HTMLEvents');
			evt.initEvent(event, true, true );
			return !element.dispatchEvent(evt);
		}else if(document.createEventObject){
			var evt = document.createEventObject();
			return element.fireEvent('on'+event,evt);
		}
	},
	isParent: function(p, c) {
		while(c.parentNode) {
			if(p == c) {
				return true;
			}
			c = c.parentNode;
		}
		return false;
	},
	inherit: function(Child, Parent) {
		var F = function() { }
		F.prototype = Parent.prototype
		Child.prototype = new F()
		Child.prototype.constructor = Child
		Child.superclass = Parent.prototype
	},
	extend: function(obj) {
		for(var i = 1; i < arguments.length; i++) {
			for(var p in arguments[i]) {
				if(arguments[i].hasOwnProperty(p)) {
					obj[p] = arguments[i][p];
				}
			}
		}
		return obj;
	},
	hasClass: function (obj,cname) {
		return (obj.className ? obj.className.match(new RegExp('(\\s|^)'+cname+'(\\s|$)')) : false);
	},
	addClass: function (obj,cname) {
		if (!this.hasClass(obj,cname)) obj.className += (!obj.className.length || obj.className.charAt(obj.className.length - 1) === ' ' ? '' : ' ') + cname;
	},
	removeClass: function (obj,cname) {
		if (this.hasClass(obj,cname)) obj.className=obj.className.replace(new RegExp('(\\s|^)'+cname+'(\\s|$)'),' ').replace(/\s+$/, '');
	},
	toggleClass: function(obj, cname, condition) {
		if(condition) this.addClass(obj, cname); else this.removeClass(obj, cname);
	},
	createElement: function(tagName, options) {
		var el = document.createElement(tagName);
		for(var p in options) {
			if(options.hasOwnProperty(p)) {
				switch (p) {
					case 'class': el.className = options[p]; break;
					case 'html': el.innerHTML = options[p]; break;
					case 'style': this.setStyles(el, options[p]); break;
					default: el.setAttribute(p, options[p]);
				}
			}
		}
		return el;
	},
	setStyles: function(el, styles) {
		for(var p in styles) {
			if(styles.hasOwnProperty(p)) {
				switch (p) {
					case 'float': el.style.cssFloat = styles[p]; break;
					case 'opacity': el.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity='+styles[p]*100+')'; el.style.opacity = styles[p]; break;
					default: el.style[p] = (typeof styles[p] === 'undefined' ? 0 : styles[p]) + (typeof styles[p] === 'number' ? 'px' : '');
				}
			}
		}
		return el;
	},
	getInnerWidth: function(el) {
		return el.offsetWidth - (parseInt(this.getStyle(el,'paddingLeft')) || 0) - (parseInt(this.getStyle(el,'paddingRight')) || 0);
	},
	getInnerHeight: function(el) {
		return el.offsetHeight - (parseInt(this.getStyle(el,'paddingTop')) || 0) - (parseInt(this.getStyle(el,'paddingBottom')) || 0);
	},
	getAllClasses: function(cname, prefix, skip) {
		if(!skip) skip = '';
		if(!prefix) prefix = '';
		return cname ? cname.replace(new RegExp('(\\s|^)'+skip+'(\\s|$)'),' ').replace(/[\s]*([\S]+)+[\s]*/gi,prefix+"$1 ") : '';
	},
	getElementsBySelector: function(selector, scope) {
		if(typeof document.querySelectorAll === 'function') {
			return (scope || document).querySelectorAll(selector);
		}
		var selectors = selector.split(',');
		var resultList = [];
		for(var s = 0; s < selectors.length; s++) {
			var currentContext = [scope || document];
			var tokens = selectors[s].replace(/^\s+/,'').replace(/\s+$/,'').split(' ');
			for (var i = 0; i < tokens.length; i++) {
				token = tokens[i].replace(/^\s+/,'').replace(/\s+$/,'');
				if (token.indexOf('#') > -1) {
					var bits = token.split('#'), tagName = bits[0], id = bits[1];
					var element = document.getElementById(id);
					if (tagName && element.nodeName.toLowerCase() != tagName) {
						return [];
					}
					currentContext = [element];
					continue;
				}
				if (token.indexOf('.') > -1) {
					var bits = token.split('.'), tagName = bits[0] || '*', className = bits[1], found = [], foundCount = 0;
					for (var h = 0; h < currentContext.length; h++) {
						var elements;
						if (tagName == '*') {
							elements = currentContext[h].getElementsByTagName('*');
						} else {
							elements = currentContext[h].getElementsByTagName(tagName);
						}
						for (var j = 0; j < elements.length; j++) {
							found[foundCount++] = elements[j];
						}
					}
					currentContext = [];
					var currentContextIndex = 0;
					for (var k = 0; k < found.length; k++) {
						if (found[k].className && found[k].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))) {
							currentContext[currentContextIndex++] = found[k];
						}
					}
					continue;
				}
				if (token.match(/^(\w*)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/)) {
					var tagName = RegExp.$1 || '*', attrName = RegExp.$2, attrOperator = RegExp.$3, attrValue = RegExp.$4;
					if(attrName.toLowerCase() == 'for' && this.browser.msie && this.browser.version < 8) {
						attrName = 'htmlFor';
					}
					var found = [], foundCount = 0;
					for (var h = 0; h < currentContext.length; h++) {
						var elements;
						if (tagName == '*') {
							elements = currentContext[h].getElementsByTagName('*');
						} else {
							elements = currentContext[h].getElementsByTagName(tagName);
						}
						for (var j = 0; elements[j]; j++) {
							found[foundCount++] = elements[j];
						}
					}
					currentContext = [];
					var currentContextIndex = 0, checkFunction;
					switch (attrOperator) {
						case '=': checkFunction = function(e) { return (e.getAttribute(attrName) == attrValue) }; break;
						case '~': checkFunction = function(e) { return (e.getAttribute(attrName).match(new RegExp('(\\s|^)'+attrValue+'(\\s|$)'))) }; break;
						case '|': checkFunction = function(e) { return (e.getAttribute(attrName).match(new RegExp('^'+attrValue+'-?'))) }; break;
						case '^': checkFunction = function(e) { return (e.getAttribute(attrName).indexOf(attrValue) == 0) }; break;
						case '$': checkFunction = function(e) { return (e.getAttribute(attrName).lastIndexOf(attrValue) == e.getAttribute(attrName).length - attrValue.length) }; break;
						case '*': checkFunction = function(e) { return (e.getAttribute(attrName).indexOf(attrValue) > -1) }; break;
						default : checkFunction = function(e) { return e.getAttribute(attrName) };
					}
					currentContext = [];
					var currentContextIndex = 0;
					for (var k = 0; k < found.length; k++) {
						if (checkFunction(found[k])) {
							currentContext[currentContextIndex++] = found[k];
						}
					}
					continue;
				}
				tagName = token;
				var found = [], foundCount = 0;
				for (var h = 0; h < currentContext.length; h++) {
					var elements = currentContext[h].getElementsByTagName(tagName);
					for (var j = 0; j < elements.length; j++) {
						found[foundCount++] = elements[j];
					}
				}
				currentContext = found;
			}
			resultList = [].concat(resultList,currentContext);
		}
		return resultList;
	},
	scrollSize: (function(){
		var content, hold, sizeBefore, sizeAfter;
		function buildSizer(){
			if(hold) removeSizer();
			content = document.createElement('div');
			hold = document.createElement('div');
			hold.style.cssText = 'position:absolute;overflow:hidden;width:100px;height:100px';
			hold.appendChild(content);
			document.body.appendChild(hold);
		}
		function removeSizer(){
			document.body.removeChild(hold);
			hold = null;
		}
		function calcSize(vertical) {
			buildSizer();
			content.style.cssText = 'height:'+(vertical ? '100%' : '200px');
			sizeBefore = (vertical ? content.offsetHeight : content.offsetWidth);
			hold.style.overflow = 'scroll'; content.innerHTML = 1;
			sizeAfter = (vertical ? content.offsetHeight : content.offsetWidth);
			if(vertical && hold.clientHeight) sizeAfter = hold.clientHeight;
			removeSizer();
			return sizeBefore - sizeAfter;
		}
		return {
			getWidth:function(){
				return calcSize(false);
			},
			getHeight:function(){
				return calcSize(true)
			}
		}
	}()),
	domReady: function (handler){
		var called = false
		function ready() {
			if (called) return;
			called = true;
			handler();
		}
		if (document.addEventListener) {
			document.addEventListener("DOMContentLoaded", ready, false);
		} else if (document.attachEvent) {
			if (document.documentElement.doScroll && window == window.top) {
				function tryScroll(){
					if (called) return
					if (!document.body) return
					try {
						document.documentElement.doScroll("left")
						ready()
					} catch(e) {
						setTimeout(tryScroll, 0)
					}
				}
				tryScroll()
			}
			document.attachEvent("onreadystatechange", function(){
				if (document.readyState === "complete") {
					ready()
				}
			})
		}
		if (window.addEventListener) window.addEventListener('load', ready, false)
		else if (window.attachEvent) window.attachEvent('onload', ready)
	},
	event: (function(){
		var guid = 0;
		function fixEvent(e) {
			e = e || window.event;
			if (e.isFixed) {
				return e;
			}
			e.isFixed = true; 
			e.preventDefault = e.preventDefault || function(){this.returnValue = false}
			e.stopPropagation = e.stopPropagaton || function(){this.cancelBubble = true}
			if (!e.target) {
				e.target = e.srcElement
			}
			if (!e.relatedTarget && e.fromElement) {
				e.relatedTarget = e.fromElement == e.target ? e.toElement : e.fromElement;
			}
			if (e.pageX == null && e.clientX != null) {
				var html = document.documentElement, body = document.body;
				e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
				e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0);
			}
			if (!e.which && e.button) {
				e.which = e.button & 1 ? 1 : (e.button & 2 ? 3 : (e.button & 4 ? 2 : 0));
			}
			if(e.type === "DOMMouseScroll" || e.type === 'mousewheel') {
				e.mWheelDelta = 0;
				if (e.wheelDelta) {
					e.mWheelDelta = e.wheelDelta/120;
				} else if (e.detail) {
					e.mWheelDelta = -e.detail/3;
				}
			}
			return e;
		}
		function commonHandle(event, customScope) {
			event = fixEvent(event);
			var handlers = this.events[event.type];
			for (var g in handlers) {
				var handler = handlers[g];
				var ret = handler.call(customScope || this, event);
				if (ret === false) {
					event.preventDefault()
					event.stopPropagation()
				}
			}
		}
		var publicAPI = {
			add: function(elem, type, handler, forcedScope) {
				if (elem.setInterval && (elem != window && !elem.frameElement)) {
					elem = window;
				}
				if (!handler.guid) {
					handler.guid = ++guid;
				}
				if (!elem.events) {
					elem.events = {};
					elem.handle = function(event) {
						return commonHandle.call(elem, event);
					}
				}
				if (!elem.events[type]) {
					elem.events[type] = {};
					if (elem.addEventListener) elem.addEventListener(type, elem.handle, false);
					else if (elem.attachEvent) elem.attachEvent("on" + type, elem.handle);
					if(type === 'mousewheel') {
						publicAPI.add(elem, 'DOMMouseScroll', handler, forcedScope);
					}
				}
				var fakeHandler = jcf.lib.bind(handler, forcedScope);
				fakeHandler.guid = handler.guid;
				elem.events[type][handler.guid] = forcedScope ? fakeHandler : handler;
			},
			remove: function(elem, type, handler) {
				var handlers = elem.events && elem.events[type];
				if (!handlers) return;
				delete handlers[handler.guid];
				for(var any in handlers) return;
				if (elem.removeEventListener) elem.removeEventListener(type, elem.handle, false);
				else if (elem.detachEvent) elem.detachEvent("on" + type, elem.handle);
				delete elem.events[type];
				for (var any in elem.events) return;
				try {
					delete elem.handle;
					delete elem.events;
				} catch(e) {
					if(elem.removeAttribute) {
						elem.removeAttribute("handle");
						elem.removeAttribute("events");
					}
				}
				if(type === 'mousewheel') {
					publicAPI.remove(elem, 'DOMMouseScroll', handler);
				}
			}
		}
		return publicAPI;
	}())
}

// custom select module
jcf.addModule({
	name:'select',
	selector:'select',
	defaultOptions: {
		useNativeDropOnMobileDevices: true,
		hideDropOnScroll: true,
		showNativeDrop: false,
		handleDropPosition: false,
		selectDropPosition: 'bottom', // or 'top'
		wrapperClass:'select-area',
		focusClass:'select-focus',
		dropActiveClass:'select-active',
		selectedClass:'item-selected',
		currentSelectedClass:'current-selected',
		disabledClass:'select-disabled',
		valueSelector:'span.center', 
		optGroupClass:'optgroup',
		openerSelector:'a.select-opener',		
		selectStructure:'<span class="left"></span><span class="center"></span><a class="select-opener"></a>',
		wrapperTag: 'span',
		classPrefix:'select-',
		dropMaxHeight: 200,
		dropFlippedClass: 'select-options-flipped',
		dropHiddenClass:'options-hidden',
		dropScrollableClass:'options-overflow',
		dropClass:'select-options',
		dropClassPrefix:'drop-',
		dropStructure:'<div class="drop-holder"><div class="drop-list"></div></div>',
		dropSelector:'div.drop-list'
	},
	checkElement: function(el){
		return (!el.size && !el.multiple);
	},
	setupWrapper: function(){
		jcf.lib.addClass(this.fakeElement, this.options.wrapperClass);
		this.realElement.parentNode.insertBefore(this.fakeElement, this.realElement);
		this.fakeElement.innerHTML = this.options.selectStructure;
		this.fakeElement.style.width = (this.realElement.offsetWidth > 0 ? this.realElement.offsetWidth + 'px' : 'auto');

		// show native drop if specified in options
		if(jcf.baseOptions.useNativeDropOnMobileDevices && (jcf.isTouchDevice || jcf.isWinPhoneDevice)) {
			this.options.showNativeDrop = true;
		}
		if(this.options.showNativeDrop) {
			this.fakeElement.appendChild(this.realElement);
			jcf.lib.removeClass(this.realElement, this.options.hiddenClass);
			jcf.lib.setStyles(this.realElement, {
				top:0,
				left:0,
				margin:0,
				padding:0,
				opacity:0,
				border:'none',
				position:'absolute',
				width: jcf.lib.getInnerWidth(this.fakeElement) - 1,
				height: jcf.lib.getInnerHeight(this.fakeElement) - 1
			});
			jcf.lib.event.add(this.realElement, 'touchstart', function(){
				this.realElement.title = '';
			}, this)
		}
		
		// create select body
		this.opener = jcf.lib.queryBySelector(this.options.openerSelector, this.fakeElement)[0];
		this.valueText = jcf.lib.queryBySelector(this.options.valueSelector, this.fakeElement)[0];
		jcf.lib.disableTextSelection(this.valueText);
		this.opener.jcf = this;

		if(!this.options.showNativeDrop) {
			this.createDropdown();
			this.refreshState();
			this.onControlReady(this);
			this.hideDropdown(true);
		} else {
			this.refreshState();
		}
		this.addEvents();
	},
	addEvents: function(){
		if(this.options.showNativeDrop) {
			jcf.lib.event.add(this.realElement, 'click', this.onChange, this);
		} else {
			jcf.lib.event.add(this.fakeElement, 'click', this.toggleDropdown, this);
		}
		jcf.lib.event.add(this.realElement, 'change', this.onChange, this);
	},
	onFakeClick: function() {
		// do nothing (drop toggles by toggleDropdown method)
	},
	onFocus: function(){
		jcf.modules[this.name].superclass.onFocus.apply(this, arguments);
		if(!this.options.showNativeDrop) {
			// Mac Safari Fix
			if(jcf.lib.browser.safariMac) {
				this.realElement.setAttribute('size','2');
			}
			jcf.lib.event.add(this.realElement, 'keydown', this.onKeyDown, this);
			if(jcf.activeControl && jcf.activeControl != this) {
				jcf.activeControl.hideDropdown();
				jcf.activeControl = this;
			}
		}
	},
	onBlur: function(){
		if(!this.options.showNativeDrop) {
			// Mac Safari Fix
			if(jcf.lib.browser.safariMac) {
				this.realElement.removeAttribute('size');
			}
			if(!this.isActiveDrop() || !this.isOverDrop()) {
				jcf.modules[this.name].superclass.onBlur.apply(this);
				if(jcf.activeControl === this) jcf.activeControl = null;
				if(!jcf.isTouchDevice) {
					this.hideDropdown();
				}
			}
			jcf.lib.event.remove(this.realElement, 'keydown', this.onKeyDown);
		} else {
			jcf.modules[this.name].superclass.onBlur.apply(this);
		}
	},
	onChange: function() {
		this.refreshState();
	},
	onKeyDown: function(e){
		this.dropOpened = true;
		jcf.tmpFlag = true;
		setTimeout(function(){jcf.tmpFlag = false},100);
		var context = this;
		context.keyboardFix = true;
		setTimeout(function(){
			context.refreshState();
		},10);
		if(e.keyCode == 13) {
			context.toggleDropdown.apply(context);
			return false;
		}
	},
	onResizeWindow: function(e){
		if(this.isActiveDrop()) {
			this.hideDropdown();
		}
	},
	onScrollWindow: function(e){
		if(this.options.hideDropOnScroll) {
			this.hideDropdown();
		} else if(this.isActiveDrop()) {
			this.positionDropdown();
		}
	},
	onOptionClick: function(e){
		var opener = e.target && e.target.tagName && e.target.tagName.toLowerCase() == 'li' ? e.target : jcf.lib.getParent(e.target, 'li');
		if(opener) {
			this.dropOpened = true;
			this.realElement.selectedIndex = parseInt(opener.getAttribute('rel'));
			if(jcf.isTouchDevice) {
				this.onFocus();
			} else {
				this.realElement.focus();
			}
			this.refreshState();
			this.hideDropdown();
			jcf.lib.fireEvent(this.realElement, 'change');
		}
		return false;
	},
	onClickOutside: function(e){
		if(jcf.tmpFlag) {
			jcf.tmpFlag = false;
			return;
		}
		if(!jcf.lib.isParent(this.fakeElement, e.target) && !jcf.lib.isParent(this.selectDrop, e.target)) {
			this.hideDropdown();
		}
	},
	onDropHover: function(e){
		if(!this.keyboardFix) {
			this.hoverFlag = true;
			var opener = e.target && e.target.tagName && e.target.tagName.toLowerCase() == 'li' ? e.target : jcf.lib.getParent(e.target, 'li');
			if(opener) {
				this.realElement.selectedIndex = parseInt(opener.getAttribute('rel'));
				this.refreshSelectedClass(parseInt(opener.getAttribute('rel')));
			}
		} else {
			this.keyboardFix = false;
		}
	},
	onDropLeave: function(){
		this.hoverFlag = false;
	},
	isActiveDrop: function(){
		return !jcf.lib.hasClass(this.selectDrop, this.options.dropHiddenClass);
	},
	isOverDrop: function(){
		return this.hoverFlag;
	},
	createDropdown: function(){
		// remove old dropdown if exists
		if(this.selectDrop) {
			this.selectDrop.parentNode.removeChild(this.selectDrop);
		}

		// create dropdown holder
		this.selectDrop = document.createElement('div');
		this.selectDrop.className = this.options.dropClass;
		this.selectDrop.innerHTML = this.options.dropStructure;
		jcf.lib.setStyles(this.selectDrop, {position:'absolute'});
		this.selectList = jcf.lib.queryBySelector(this.options.dropSelector,this.selectDrop)[0];
		jcf.lib.addClass(this.selectDrop, this.options.dropHiddenClass);
		document.body.appendChild(this.selectDrop);
		this.selectDrop.jcf = this;
		jcf.lib.event.add(this.selectDrop, 'click', this.onOptionClick, this);
		jcf.lib.event.add(this.selectDrop, 'mouseover', this.onDropHover, this);
		jcf.lib.event.add(this.selectDrop, 'mouseout', this.onDropLeave, this);
		this.buildDropdown();
	},
	buildDropdown: function() {
		// build select options / optgroups
		this.buildDropdownOptions();

		// position and resize dropdown
		this.positionDropdown();

		// cut dropdown if height exceedes
		this.buildDropdownScroll();
	},
	buildDropdownOptions: function() {
		this.resStructure = '';
		this.optNum = 0;
		for(var i = 0; i < this.realElement.children.length; i++) {
			this.resStructure += this.buildElement(this.realElement.children[i], i) +'\n';
		}
		this.selectList.innerHTML = this.resStructure;
	},
	buildDropdownScroll: function() {
		if(this.options.dropMaxHeight) {
			if(this.selectDrop.offsetHeight > this.options.dropMaxHeight) {
				this.selectList.style.height = this.options.dropMaxHeight+'px';
				this.selectList.style.overflow = 'auto';
				this.selectList.style.overflowX = 'hidden';
				jcf.lib.addClass(this.selectDrop, this.options.dropScrollableClass);
			}
		}
		jcf.lib.addClass(this.selectDrop, jcf.lib.getAllClasses(this.realElement.className, this.options.dropClassPrefix, jcf.baseOptions.hiddenClass));
	},
	parseOptionTitle: function(optTitle) {
		return (typeof optTitle === 'string' && /\.(jpg|gif|png|bmp|jpeg)(.*)?$/i.test(optTitle)) ? optTitle : '';
	},
	buildElement: function(obj, index){
		// build option
		var res = '', optImage;
		if(obj.tagName.toLowerCase() == 'option') {
			if(!jcf.lib.prevSibling(obj) || jcf.lib.prevSibling(obj).tagName.toLowerCase() != 'option') {
				res += '<ul>';
			}
			
			optImage = this.parseOptionTitle(obj.title);
			res += '<li rel="'+(this.optNum++)+'" class="'+(obj.className? obj.className + ' ' : '')+(index % 2 ? 'option-even ' : '')+'jcfcalc"><a href="#">'+(optImage ? '<img src="'+optImage+'" alt="" />' : '')+'<span>' + obj.innerHTML + '</span></a></li>';
			if(!jcf.lib.nextSibling(obj) || jcf.lib.nextSibling(obj).tagName.toLowerCase() != 'option') {
				res += '</ul>';
			}
			return res;
		}
		// build option group with options
		else if(obj.tagName.toLowerCase() == 'optgroup' && obj.label) {
			res += '<div class="'+this.options.optGroupClass+'">';
			res += '<strong class="jcfcalc"><em>'+(obj.label)+'</em></strong>';
			for(var i = 0; i < obj.children.length; i++) {
				res += this.buildElement(obj.children[i], i);
			}
			res += '</div>';
			return res;
		}
	},
	positionDropdown: function(){
		var ofs = jcf.lib.getOffset(this.fakeElement), selectAreaHeight = this.fakeElement.offsetHeight, selectDropHeight = this.selectDrop.offsetHeight;
		var fitInTop = ofs.top - selectDropHeight >= jcf.lib.getScrollTop() && jcf.lib.getScrollTop() + jcf.lib.getWindowHeight() < ofs.top + selectAreaHeight + selectDropHeight;
		
		
		if((this.options.handleDropPosition && fitInTop) || this.options.selectDropPosition === 'top') {
			this.selectDrop.style.top = (ofs.top - selectDropHeight)+'px';
			jcf.lib.addClass(this.selectDrop, this.options.dropFlippedClass);
		} else {
			this.selectDrop.style.top = (ofs.top + selectAreaHeight)+'px';
			jcf.lib.removeClass(this.selectDrop, this.options.dropFlippedClass);
		}
		this.selectDrop.style.left = ofs.left+'px';
		this.selectDrop.style.width = this.fakeElement.offsetWidth+'px';
	},
	showDropdown: function(){
		document.body.appendChild(this.selectDrop);
		jcf.lib.removeClass(this.selectDrop, this.options.dropHiddenClass);
		jcf.lib.addClass(this.fakeElement,this.options.dropActiveClass);
		this.positionDropdown();

		// highlight current active item
		var activeItem = this.getFakeActiveOption();
		this.removeClassFromItems(this.options.currentSelectedClass);
		jcf.lib.addClass(activeItem, this.options.currentSelectedClass);
		
		// show current dropdown
		jcf.lib.event.add(window, 'resize', this.onResizeWindow, this);
		jcf.lib.event.add(window, 'scroll', this.onScrollWindow, this);
		jcf.lib.event.add(document, jcf.eventPress, this.onClickOutside, this);
		this.positionDropdown();
	},
	hideDropdown: function(partial){
		if(this.selectDrop.parentNode) {
			if(this.selectDrop.offsetWidth) {
				this.selectDrop.parentNode.removeChild(this.selectDrop);
			}
			if(partial) {
				return;
			}
		}
		if(typeof this.origSelectedIndex === 'number') {
			this.realElement.selectedIndex = this.origSelectedIndex;
		}
		jcf.lib.removeClass(this.fakeElement,this.options.dropActiveClass);
		jcf.lib.addClass(this.selectDrop, this.options.dropHiddenClass);
		jcf.lib.event.remove(window, 'resize', this.onResizeWindow);
		jcf.lib.event.remove(window, 'scroll', this.onScrollWindow);
		jcf.lib.event.remove(document.documentElement, jcf.eventPress, this.onClickOutside);
		if(jcf.isTouchDevice) {
			this.onBlur();
		}
	},
	toggleDropdown: function(){
		if(!this.realElement.disabled) {
			if(jcf.isTouchDevice) {
				this.onFocus();
			} else {
				this.realElement.focus();
			}
			if(this.isActiveDrop()) {
				this.hideDropdown();
			} else {
				this.showDropdown();
			}
			this.refreshState();
		}
	},
	scrollToItem: function(){
		if(this.isActiveDrop()) {
			var dropHeight = this.selectList.offsetHeight;
			var offsetTop = this.calcOptionOffset(this.getFakeActiveOption());
			var sTop = this.selectList.scrollTop;
			var oHeight = this.getFakeActiveOption().offsetHeight;
			//offsetTop+=sTop;

			if(offsetTop >= sTop + dropHeight) {
				this.selectList.scrollTop = offsetTop - dropHeight + oHeight;
			} else if(offsetTop < sTop) {
				this.selectList.scrollTop = offsetTop;
			}
		}
	},
	getFakeActiveOption: function(c) {
		return jcf.lib.queryBySelector('li[rel="'+(typeof c === 'number' ? c : this.realElement.selectedIndex) +'"]',this.selectList)[0];
	},
	calcOptionOffset: function(fake) {
		var h = 0;
		var els = jcf.lib.queryBySelector('.jcfcalc',this.selectList);
		for(var i = 0; i < els.length; i++) {
			if(els[i] == fake) break;
			h+=els[i].offsetHeight;
		}
		return h;
	},
	childrenHasItem: function(hold,item) {
		var items = hold.getElementsByTagName('*');
		for(i = 0; i < items.length; i++) {
			if(items[i] == item) return true;
		}
		return false;
	},
	removeClassFromItems: function(className){
		var children = jcf.lib.queryBySelector('li',this.selectList);
		for(var i = children.length - 1; i >= 0; i--) {
			jcf.lib.removeClass(children[i], className);
		}
	},
	setSelectedClass: function(c){
		jcf.lib.addClass(this.getFakeActiveOption(c), this.options.selectedClass);
	},
	refreshSelectedClass: function(c){
		if(!this.options.showNativeDrop) {
			this.removeClassFromItems(this.options.selectedClass);
			this.setSelectedClass(c);
		}
		if(this.realElement.disabled) {
			jcf.lib.addClass(this.fakeElement, this.options.disabledClass);
			if(this.labelFor) {
				jcf.lib.addClass(this.labelFor, this.options.labelDisabledClass);
			}
		} else {
			jcf.lib.removeClass(this.fakeElement, this.options.disabledClass);
			if(this.labelFor) {
				jcf.lib.removeClass(this.labelFor, this.options.labelDisabledClass);
			}
		}
	},
	refreshSelectedText: function() {
		if(!this.dropOpened && this.realElement.title) {
			this.valueText.innerHTML = this.realElement.title;
		} else {
			if(this.realElement.options[this.realElement.selectedIndex].title) {
				var optImage = this.parseOptionTitle(this.realElement.options[this.realElement.selectedIndex].title);
				this.valueText.innerHTML = (optImage ? '<img src="'+optImage+'" alt="" />' : '') + this.realElement.options[this.realElement.selectedIndex].innerHTML;
			} else {
				this.valueText.innerHTML = this.realElement.options[this.realElement.selectedIndex].innerHTML;
			}
		}
	},
	refreshState: function(){
		this.origSelectedIndex = this.realElement.selectedIndex;
		this.refreshSelectedClass();
		this.refreshSelectedText();
		if(!this.options.showNativeDrop) {
			this.positionDropdown();
			if(this.selectDrop.offsetWidth) {
				this.scrollToItem();
			}
		}
	}
});

// custom checkbox module
jcf.addModule({
	name:'checkbox',
	selector:'input[type="checkbox"]',
	defaultOptions: {
		wrapperClass:'chk-area',
		focusClass:'chk-focus',
		checkedClass:'chk-checked',
		labelActiveClass:'chk-label-active',
		uncheckedClass:'chk-unchecked',
		disabledClass:'chk-disabled',
		chkStructure:'<span></span>'
	},
	setupWrapper: function(){
		jcf.lib.addClass(this.fakeElement, this.options.wrapperClass);
		this.fakeElement.innerHTML = this.options.chkStructure;
		this.realElement.parentNode.insertBefore(this.fakeElement, this.realElement);
		jcf.lib.event.add(this.realElement, 'click', this.onRealClick, this);
		this.refreshState();
	},
	isLinkTarget: function(target, limitParent) {
		while(target.parentNode || target === limitParent) {
			if(target.tagName.toLowerCase() === 'a') {
				return true;
			}
			target = target.parentNode;
		}
	},
	onFakePressed: function() {
		jcf.modules[this.name].superclass.onFakePressed.apply(this, arguments);
		if(!this.realElement.disabled) {
			this.realElement.focus();
		}
	},
	onFakeClick: function(e) {
		jcf.modules[this.name].superclass.onFakeClick.apply(this, arguments);
		this.tmpTimer = setTimeout(jcf.lib.bind(function(){
			this.toggle();
		},this),10);
		if(!this.isLinkTarget(e.target, this.labelFor)) {
			return false;
		}
	},
	onRealClick: function(e) {
		setTimeout(jcf.lib.bind(function(){
			this.refreshState();
		},this),10);
		e.stopPropagation();
	},
	toggle: function(e){
		if(!this.realElement.disabled) {
			if(this.realElement.checked) {
				this.realElement.checked = false;
			} else {
				this.realElement.checked = true;
			}
			jQuery(this.realElement).trigger('change');
		}
		this.refreshState();
		return false;
	},
	refreshState: function(){
		if(this.realElement.checked) {
			jcf.lib.addClass(this.fakeElement, this.options.checkedClass);
			jcf.lib.removeClass(this.fakeElement, this.options.uncheckedClass);
			if(this.labelFor) {
				jcf.lib.addClass(this.labelFor, this.options.labelActiveClass);
			}
		} else {
			jcf.lib.removeClass(this.fakeElement, this.options.checkedClass);
			jcf.lib.addClass(this.fakeElement, this.options.uncheckedClass);
			if(this.labelFor) {
				jcf.lib.removeClass(this.labelFor, this.options.labelActiveClass);
			}
		}
		if(this.realElement.disabled) {
			jcf.lib.addClass(this.fakeElement, this.options.disabledClass);
			if(this.labelFor) {
				jcf.lib.addClass(this.labelFor, this.options.labelDisabledClass);
			}
		} else {
			jcf.lib.removeClass(this.fakeElement, this.options.disabledClass);
			if(this.labelFor) {
				jcf.lib.removeClass(this.labelFor, this.options.labelDisabledClass);
			}
		}
	}
});

// custom scrollbars module
jcf.addModule({
	name:'customscroll',
	selector:'div.scrollable-area',
	defaultOptions: {
		alwaysPreventWheel: false,
		enableMouseWheel: true,
		captureFocus: false,
		handleNested: true,
		alwaysKeepScrollbars: false,
		autoDetectWidth: false,
		scrollbarOptions: {},
		focusClass:'scrollable-focus',
		wrapperTag: 'div',
		autoDetectWidthClass: 'autodetect-width',
		noHorizontalBarClass:'noscroll-horizontal',
		noVerticalBarClass:'noscroll-vertical',
		innerWrapperClass:'scrollable-inner-wrapper',
		outerWrapperClass:'scrollable-area-wrapper',
		horizontalClass: 'hscrollable',
		verticalClass: 'vscrollable',
		bothClass: 'anyscrollable'
	},
	replaceObject: function(){
		this.initStructure();
		this.refreshState();
		this.addEvents();
	},
	initStructure: function(){
		// set scroll type
		this.realElement.jcf = this;
		if(jcf.lib.hasClass(this.realElement, this.options.bothClass) || 
		jcf.lib.hasClass(this.realElement, this.options.horizontalClass) && jcf.lib.hasClass(this.realElement, this.options.verticalClass)) {
			this.scrollType = 'both';
		} else if(jcf.lib.hasClass(this.realElement, this.options.horizontalClass)) {
			this.scrollType = 'horizontal';
		} else {
			this.scrollType = 'vertical';
		}
		
		// autodetect horizontal width
		if(jcf.lib.hasClass(this.realElement,this.options.autoDetectWidthClass)) {
			this.options.autoDetectWidth = true;
		}
		
		// init dimensions and build structure
		this.realElement.style.position = 'relative';
		this.realElement.style.overflow = 'hidden';
		
		// build content wrapper and scrollbar(s)
		this.buildWrapper();
		this.buildScrollbars();
	},
	buildWrapper: function() {
		this.outerWrapper = document.createElement(this.options.wrapperTag);
		this.outerWrapper.className = this.options.outerWrapperClass;
		this.realElement.parentNode.insertBefore(this.outerWrapper, this.realElement);
		this.outerWrapper.appendChild(this.realElement);
		
		// autosize content if single child
		if(this.options.autoDetectWidth && (this.scrollType === 'both' || this.scrollType === 'horizontal') && this.realElement.children.length === 1) {
			var tmpWidth = 0;
			this.realElement.style.width = '99999px';
			tmpWidth = this.realElement.children[0].offsetWidth;
			this.realElement.style.width = '';
			if(tmpWidth) {
				this.realElement.children[0].style.width = tmpWidth+'px';
			}
		}
	},
	buildScrollbars: function() {
		if(this.scrollType === 'horizontal' || this.scrollType === 'both') {
			this.hScrollBar = new jcf.plugins.scrollbar(jcf.lib.extend(this.options.scrollbarOptions,{
				vertical: false,
				spawnClass: this,
				holder: this.outerWrapper,
				range: this.realElement.scrollWidth - this.realElement.offsetWidth,
				size: this.realElement.offsetWidth,
				onScroll: jcf.lib.bind(function(v) {
					this.realElement.scrollLeft = v;
				},this)
			}));
		}
		if(this.scrollType === 'vertical' || this.scrollType === 'both') {
			this.vScrollBar = new jcf.plugins.scrollbar(jcf.lib.extend(this.options.scrollbarOptions,{
				vertical: true,
				spawnClass: this,
				holder: this.outerWrapper,
				range: this.realElement.scrollHeight - this.realElement.offsetHeight,
				size: this.realElement.offsetHeight,
				onScroll: jcf.lib.bind(function(v) {
					this.realElement.scrollTop = v;
				},this)
			}));
		}
		this.outerWrapper.style.width = this.realElement.offsetWidth + 'px';
		this.outerWrapper.style.height = this.realElement.offsetHeight + 'px';
		this.resizeScrollContent();
	},
	resizeScrollContent: function() {
		var diffWidth = this.realElement.offsetWidth - jcf.lib.getInnerWidth(this.realElement);
		var diffHeight = this.realElement.offsetHeight - jcf.lib.getInnerHeight(this.realElement);
		this.realElement.style.width = Math.max(0, this.outerWrapper.offsetWidth - diffWidth - (this.vScrollBar ? this.vScrollBar.getScrollBarSize() : 0)) + 'px';
		this.realElement.style.height = Math.max(0, this.outerWrapper.offsetHeight - diffHeight - (this.hScrollBar ? this.hScrollBar.getScrollBarSize() : 0)) + 'px';
	},
	addEvents: function() {
		// enable mouse wheel handling
		if(!jcf.isTouchDevice && this.options.enableMouseWheel) {
			jcf.lib.event.add(this.outerWrapper, 'mousewheel', this.onMouseWheel, this);
		}
		// add touch scroll on block body
		if(jcf.isTouchDevice || navigator.msPointerEnabled) {
			this.outerWrapper.style.msTouchAction = 'none';
			jcf.lib.event.add(this.realElement, jcf.eventPress, this.onScrollablePress, this);
		}
		
		// handle nested scrollbars
		if(this.options.handleNested) {
			var el = this.realElement, name = this.name;
			while(el.parentNode) {
				if(el.parentNode.jcf && el.parentNode.jcf.name == name) {
					el.parentNode.jcf.refreshState();
				}
				el = el.parentNode;
			}
		}
	},
	onMouseWheel: function(e) {
		if(this.scrollType === 'vertical' || this.scrollType === 'both') {
			return this.vScrollBar.doScrollWheelStep(e.mWheelDelta) === false ? false : !this.options.alwaysPreventWheel;
		} else {
			return this.hScrollBar.doScrollWheelStep(e.mWheelDelta) === false ? false : !this.options.alwaysPreventWheel;
		}
	},
	onScrollablePress: function(e) {
		if(e.pointerType !== e.MSPOINTER_TYPE_TOUCH) return;

		this.preventFlag = true;
		this.origWindowScrollTop = jcf.lib.getScrollTop();
		this.origWindowScrollLeft = jcf.lib.getScrollLeft();
	
		this.scrollableOffset = jcf.lib.getOffset(this.realElement);
		if(this.hScrollBar) {
			this.scrollableTouchX = (jcf.isTouchDevice ? e.changedTouches[0] : e).pageX;
			this.origValueX = this.hScrollBar.getScrollValue();
		}
		if(this.vScrollBar) {
			this.scrollableTouchY = (jcf.isTouchDevice ? e.changedTouches[0] : e).pageY;
			this.origValueY = this.vScrollBar.getScrollValue();
		}
		jcf.lib.event.add(this.realElement, jcf.eventMove, this.onScrollableMove, this);
		jcf.lib.event.add(this.realElement, jcf.eventRelease, this.onScrollableRelease, this);
	},
	onScrollableMove: function(e) {
		if(this.vScrollBar) {
			var difY = (jcf.isTouchDevice ? e.changedTouches[0] : e).pageY - this.scrollableTouchY;
			var valY = this.origValueY-difY;
			this.vScrollBar.scrollTo(valY);
			if(valY < 0 || valY > this.vScrollBar.options.range) {
				this.preventFlag = false;
			}
		}
		if(this.hScrollBar) {
			var difX = (jcf.isTouchDevice ? e.changedTouches[0] : e).pageX - this.scrollableTouchX;
			var valX = this.origValueX-difX;
			this.hScrollBar.scrollTo(valX);
			if(valX < 0 || valX > this.hScrollBar.options.range) {
				this.preventFlag = false;
			}
		}
		if(this.preventFlag) {
			e.preventDefault();
		}
	},
	onScrollableRelease: function() {
		jcf.lib.event.remove(this.realElement, jcf.eventMove, this.onScrollableMove);
		jcf.lib.event.remove(this.realElement, jcf.eventRelease, this.onScrollableRelease);
	},
	refreshState: function() {
		if(this.options.alwaysKeepScrollbars) {
			if(this.hScrollBar) this.hScrollBar.scrollBar.style.display = 'block';
			if(this.vScrollBar) this.vScrollBar.scrollBar.style.display = 'block';
		} else {
			if(this.hScrollBar) {
				if(this.getScrollRange(false)) {
					this.hScrollBar.scrollBar.style.display = 'block';
					this.resizeScrollContent();
					this.hScrollBar.setRange(this.getScrollRange(false));
				} else {
					this.hScrollBar.scrollBar.style.display = 'none';
					this.realElement.style.width = this.outerWrapper.style.width;
				}
				jcf.lib.toggleClass(this.outerWrapper, this.options.noHorizontalBarClass, this.hScrollBar.options.range === 0);
			}
			if(this.vScrollBar) {
				if(this.getScrollRange(true) > 0) {
					this.vScrollBar.scrollBar.style.display = 'block';
					this.resizeScrollContent();
					this.vScrollBar.setRange(this.getScrollRange(true));
				} else {
					this.vScrollBar.scrollBar.style.display = 'none';
					this.realElement.style.width = this.outerWrapper.style.width;
				}
				jcf.lib.toggleClass(this.outerWrapper, this.options.noVerticalBarClass, this.vScrollBar.options.range === 0);
			}
		}
		if(this.vScrollBar) {
			this.vScrollBar.setRange(this.realElement.scrollHeight - this.realElement.offsetHeight);
			this.vScrollBar.setSize(this.realElement.offsetHeight);
			this.vScrollBar.scrollTo(this.realElement.scrollTop);
		}
		if(this.hScrollBar) {
			this.hScrollBar.setRange(this.realElement.scrollWidth - this.realElement.offsetWidth);
			this.hScrollBar.setSize(this.realElement.offsetWidth);
			this.hScrollBar.scrollTo(this.realElement.scrollLeft);
		}
	},
	getScrollRange: function(isVertical) {
		if(isVertical) {
			return this.realElement.scrollHeight - this.realElement.offsetHeight;
		} else {
			return this.realElement.scrollWidth - this.realElement.offsetWidth;
		}
	},
	getCurrentRange: function(scrollInstance) {
		return this.getScrollRange(scrollInstance.isVertical);
	},
	onCreateModule: function(){
		if(jcf.modules.select) {
			this.extendSelect();
		}
		if(jcf.modules.selectmultiple) {
			this.extendSelectMultiple();
		}
		if(jcf.modules.textarea) {
			this.extendTextarea();
		}
	},
	onModuleAdded: function(module){
		if(module.prototype.name == 'select') {
			this.extendSelect();
		}
		if(module.prototype.name == 'selectmultiple') {
			this.extendSelectMultiple();
		}
		if(module.prototype.name == 'textarea') {
			this.extendTextarea();
		}
	},
	extendSelect: function() {
		// add scrollable if needed on control ready
		jcf.modules.select.prototype.onControlReady = function(obj){
			if(obj.selectList.scrollHeight > obj.selectList.offsetHeight) {
				obj.jcfScrollable = new jcf.modules.customscroll({
					alwaysPreventWheel: true,
					replaces:obj.selectList
				});
			}
		}
		// update scroll function
		var orig = jcf.modules.select.prototype.scrollToItem;
		jcf.modules.select.prototype.scrollToItem = function(){
			orig.apply(this);
			if(this.jcfScrollable) {
				this.jcfScrollable.refreshState();
			}
		}
	},
	extendTextarea: function() {
		// add scrollable if needed on control ready
		jcf.modules.textarea.prototype.onControlReady = function(obj){
			obj.jcfScrollable = new jcf.modules.customscroll({
				alwaysKeepScrollbars: true,
				alwaysPreventWheel: true,
				replaces: obj.realElement
			});
		}
		// update scroll function
		var orig = jcf.modules.textarea.prototype.refreshState;
		jcf.modules.textarea.prototype.refreshState = function(){
			orig.apply(this);
			if(this.jcfScrollable) {
				this.jcfScrollable.refreshState();
			}
		}
	},
	extendSelectMultiple: function(){
		// add scrollable if needed on control ready
		jcf.modules.selectmultiple.prototype.onControlReady = function(obj){
			//if(obj.optionsHolder.scrollHeight > obj.optionsHolder.offsetHeight) {
				obj.jcfScrollable = new jcf.modules.customscroll({
					alwaysPreventWheel: true,
					replaces:obj.optionsHolder
				});
			//}
		}
		// update scroll function
		var orig = jcf.modules.selectmultiple.prototype.scrollToItem;
		jcf.modules.selectmultiple.prototype.scrollToItem = function(){
			orig.apply(this);
			if(this.jcfScrollable) {
				this.jcfScrollable.refreshState();
			}
		}
		
		// update scroll size?
		var orig2 = jcf.modules.selectmultiple.prototype.rebuildOptions;
		jcf.modules.selectmultiple.prototype.rebuildOptions = function(){
			orig2.apply(this);
			if(this.jcfScrollable) {
				this.jcfScrollable.refreshState();
			}
		}
		
	}
});

// scrollbar plugin
jcf.addPlugin({
	name: 'scrollbar',
	defaultOptions: {
		size: 0,
		range: 0,
		moveStep: 6,
		moveDistance: 50,
		moveInterval: 10,
		trackHoldDelay: 900,
		holder: null,
		vertical: true,
		scrollTag: 'div',
		onScroll: function(){},
		onScrollEnd: function(){},
		onScrollStart: function(){},
		disabledClass: 'btn-disabled',
		VscrollBarClass:'vscrollbar',
		VscrollStructure: '<div class="vscroll-up"></div><div class="vscroll-line"><div class="vscroll-slider"><div class="scroll-bar-top"></div><div class="scroll-bar-bottom"></div></div></div></div><div class="vscroll-down"></div>',
		VscrollTrack: 'div.vscroll-line',
		VscrollBtnDecClass:'div.vscroll-up',
		VscrollBtnIncClass:'div.vscroll-down',
		VscrollSliderClass:'div.vscroll-slider',
		HscrollBarClass:'hscrollbar',
		HscrollStructure: '<div class="hscroll-left"></div><div class="hscroll-line"><div class="hscroll-slider"><div class="scroll-bar-left"></div><div class="scroll-bar-right"></div></div></div></div><div class="hscroll-right"></div>',
		HscrollTrack: 'div.hscroll-line',
		HscrollBtnDecClass:'div.hscroll-left',
		HscrollBtnIncClass:'div.hscroll-right',
		HscrollSliderClass:'div.hscroll-slider'
	},
	init: function(userOptions) {
		this.setOptions(userOptions);
		this.createScrollBar();
		this.attachEvents();
		this.setSize();
	},
	setOptions: function(extOptions) {
		// merge options
		this.options = jcf.lib.extend({}, this.defaultOptions, extOptions);
		this.isVertical = this.options.vertical;
		this.prefix = this.isVertical ? 'V' : 'H';
		this.eventPageOffsetProperty = this.isVertical ? 'pageY' : 'pageX';
		this.positionProperty = this.isVertical ? 'top' : 'left';
		this.sizeProperty = this.isVertical ? 'height' : 'width';
		this.dimenionsProperty = this.isVertical ? 'offsetHeight' : 'offsetWidth';
		this.invertedDimenionsProperty = !this.isVertical ? 'offsetHeight' : 'offsetWidth';
		
		// set corresponding classes
		for(var p in this.options) {
			if(p.indexOf(this.prefix) == 0) {
				this.options[p.substr(1)] = this.options[p];
			}
		}
	},
	createScrollBar: function() {
		// create dimensions
		this.scrollBar = document.createElement(this.options.scrollTag);
		this.scrollBar.className = this.options.scrollBarClass;
		this.scrollBar.innerHTML = this.options.scrollStructure;
		
		// get elements
		this.track = jcf.lib.queryBySelector(this.options.scrollTrack,this.scrollBar)[0];
		this.btnDec = jcf.lib.queryBySelector(this.options.scrollBtnDecClass,this.scrollBar)[0];
		this.btnInc = jcf.lib.queryBySelector(this.options.scrollBtnIncClass,this.scrollBar)[0];
		this.slider = jcf.lib.queryBySelector(this.options.scrollSliderClass,this.scrollBar)[0];
		this.slider.style.position = 'absolute';
		this.track.style.position = 'relative';
	},
	attachEvents: function() {
		// append scrollbar to holder if provided
		if(this.options.holder) {
			this.options.holder.appendChild(this.scrollBar);
		}
		
		// attach listeners for slider and buttons
		jcf.lib.event.add(this.slider, jcf.eventPress, this.onSliderPressed, this);
		jcf.lib.event.add(this.btnDec, jcf.eventPress, this.onBtnDecPressed, this);
		jcf.lib.event.add(this.btnInc, jcf.eventPress, this.onBtnIncPressed, this);
		jcf.lib.event.add(this.track, jcf.eventPress, this.onTrackPressed, this);
	},
	setSize: function(value) {
		if(typeof value === 'number') {
			this.options.size = value;
		}
		this.scrollOffset = this.scrollValue = this.sliderOffset = 0;
		this.scrollBar.style[this.sizeProperty] = this.options.size + 'px';
		this.resizeControls();
		this.refreshSlider();
	},
	setRange: function(r) {
		this.options.range = Math.max(r,0);
		this.resizeControls();
	},
	doScrollWheelStep: function(direction) {
		// 1 - scroll up, -1 scroll down
		this.startScroll();
		if((direction < 0 && !this.isEndPosition()) || (direction > 0 && !this.isStartPosition())) {
			this.scrollTo(this.getScrollValue()-this.options.moveDistance * direction);
			this.moveScroll();
			this.endScroll();
			return false;
		}
	},
	resizeControls: function() {
		// calculate dimensions
		this.barSize = this.scrollBar[this.dimenionsProperty];
		this.btnDecSize = this.btnDec[this.dimenionsProperty];
		this.btnIncSize = this.btnInc[this.dimenionsProperty];
		this.trackSize = this.barSize - this.btnDecSize - this.btnIncSize;
		
		// resize and reposition elements
		this.track.style[this.sizeProperty] = this.trackSize + 'px';
		this.trackSize = this.track[this.dimenionsProperty];
		this.sliderSize = this.getSliderSize();
		this.slider.style[this.sizeProperty] = this.sliderSize + 'px';
		this.sliderSize = this.slider[this.dimenionsProperty];
	},
	refreshSlider: function(complete) {
		// refresh dimensions
		if(complete) {
			this.resizeControls();
		}
		// redraw slider and classes
		this.sliderOffset = isNaN(this.sliderOffset) ? 0 : this.sliderOffset;
		this.slider.style[this.positionProperty] = this.sliderOffset + 'px';
	},
	startScroll: function() {
		// refresh range if possible
		if(this.options.spawnClass && typeof this.options.spawnClass.getCurrentRange === 'function') {
			this.setRange(this.options.spawnClass.getCurrentRange(this));
		}
		this.resizeControls();
		this.scrollBarOffset = jcf.lib.getOffset(this.track)[this.positionProperty];
		this.options.onScrollStart();
	},
	moveScroll: function() {
		this.options.onScroll(this.scrollValue);
		
		// add disabled classes
		jcf.lib.removeClass(this.btnDec, this.options.disabledClass);
		jcf.lib.removeClass(this.btnInc, this.options.disabledClass);
		if(this.scrollValue === 0) {
			jcf.lib.addClass(this.btnDec, this.options.disabledClass);
		}
		if(this.scrollValue === this.options.range) {
			jcf.lib.addClass(this.btnInc, this.options.disabledClass);
		}
	},
	endScroll: function() {
		this.options.onScrollEnd();
	},
	startButtonMoveScroll: function(direction) {
		this.startScroll();
		clearInterval(this.buttonScrollTimer);
		this.buttonScrollTimer = setInterval(jcf.lib.bind(function(){
			this.scrollValue += this.options.moveStep * direction
			if(this.scrollValue > this.options.range) {
				this.scrollValue = this.options.range;
				this.endButtonMoveScroll();
			} else if(this.scrollValue < 0) {
				this.scrollValue = 0;
				this.endButtonMoveScroll();
			}
			this.scrollTo(this.scrollValue);
			
		},this),this.options.moveInterval);
	},
	endButtonMoveScroll: function() {
		clearInterval(this.buttonScrollTimer);
		this.endScroll();
	},
	isStartPosition: function() {
		return this.scrollValue === 0;
	},
	isEndPosition: function() {
		return this.scrollValue === this.options.range;
	},
	getSliderSize: function() {
		return Math.round(this.getSliderSizePercent() * this.trackSize / 100);
	},
	getSliderSizePercent: function() {
		return this.options.range === 0 ? 0 : this.barSize * 100 / (this.barSize + this.options.range);
	},
	getSliderOffsetByScrollValue: function() {
		return (this.scrollValue * 100 / this.options.range) * (this.trackSize - this.sliderSize) / 100;
	},
	getSliderOffsetPercent: function() {
		return this.sliderOffset * 100 / (this.trackSize - this.sliderSize);
	},
	getScrollValueBySliderOffset: function() {
		return this.getSliderOffsetPercent() * this.options.range / 100;
	},
	getScrollBarSize: function() {
		return this.scrollBar[this.invertedDimenionsProperty];
	},
	getScrollValue: function() {
		return this.scrollValue || 0;
	},
	scrollOnePage: function(direction) {
		this.scrollTo(this.scrollValue + direction*this.barSize);
	},
	scrollTo: function(x) {
		this.scrollValue = x < 0 ? 0 : x > this.options.range ? this.options.range : x;
		this.sliderOffset = this.getSliderOffsetByScrollValue();
		this.refreshSlider();
		this.moveScroll();
	},
	onSliderPressed: function(e){
		jcf.lib.event.add(document.body, jcf.eventRelease, this.onSliderRelease, this);
		jcf.lib.event.add(document.body, jcf.eventMove, this.onSliderMove, this);
		jcf.lib.disableTextSelection(this.slider);
		
		// calculate offsets once
		this.sliderInnerOffset = (jcf.isTouchDevice ? e.changedTouches[0] : e)[this.eventPageOffsetProperty] - jcf.lib.getOffset(this.slider)[this.positionProperty];
		this.startScroll();
		return false;
	},
	onSliderRelease: function(){
		jcf.lib.event.remove(document.body, jcf.eventRelease, this.onSliderRelease);
		jcf.lib.event.remove(document.body, jcf.eventMove, this.onSliderMove);
	},
	onSliderMove: function(e) {
		this.sliderOffset = (jcf.isTouchDevice ? e.changedTouches[0] : e)[this.eventPageOffsetProperty] - this.scrollBarOffset - this.sliderInnerOffset;
		if(this.sliderOffset < 0) {
			this.sliderOffset = 0;
		} else if(this.sliderOffset + this.sliderSize > this.trackSize) {
			this.sliderOffset = this.trackSize - this.sliderSize;
		}
		if(this.previousOffset != this.sliderOffset) {
			this.previousOffset = this.sliderOffset;
			this.scrollTo(this.getScrollValueBySliderOffset());
		}
	},
	onBtnIncPressed: function() {
		jcf.lib.event.add(document.body, jcf.eventRelease, this.onBtnIncRelease, this);
		jcf.lib.disableTextSelection(this.btnInc);
		this.startButtonMoveScroll(1);
		return false;
	},
	onBtnIncRelease: function() {
		jcf.lib.event.remove(document.body, jcf.eventRelease, this.onBtnIncRelease);
		this.endButtonMoveScroll();
	},
	onBtnDecPressed: function() {
		jcf.lib.event.add(document.body, jcf.eventRelease, this.onBtnDecRelease, this);
		jcf.lib.disableTextSelection(this.btnDec);
		this.startButtonMoveScroll(-1);
		return false;
	},
	onBtnDecRelease: function() {
		jcf.lib.event.remove(document.body, jcf.eventRelease, this.onBtnDecRelease);
		this.endButtonMoveScroll();
	},
	onTrackPressed: function(e) {
		var position = e[this.eventPageOffsetProperty] - jcf.lib.getOffset(this.track)[this.positionProperty];
		var direction = position < this.sliderOffset ? -1 : position > this.sliderOffset + this.sliderSize ? 1 : 0;
		if(direction) {
			this.scrollOnePage(direction);
		}
	}
});


// placeholder class
;(function(){
	var placeholderCollection = [];
	PlaceholderInput = function() {
		this.options = {
			element:null,
			showUntilTyping:false,
			wrapWithElement:false,
			getParentByClass:false,
			showPasswordBullets:false,
			placeholderAttr:'value',
			inputFocusClass:'focus',
			inputActiveClass:'text-active',
			parentFocusClass:'parent-focus',
			parentActiveClass:'parent-active',
			labelFocusClass:'label-focus',
			labelActiveClass:'label-active',
			fakeElementClass:'input-placeholder-text'
		};
		placeholderCollection.push(this);
		this.init.apply(this,arguments);
	};
	PlaceholderInput.refreshAllInputs = function(except) {
		for(var i = 0; i < placeholderCollection.length; i++) {
			if(except !== placeholderCollection[i]) {
				placeholderCollection[i].refreshState();
			}
		}
	};
	PlaceholderInput.replaceByOptions = function(opt) {
		var inputs = [].concat(
			convertToArray(document.getElementsByTagName('input')),
			convertToArray(document.getElementsByTagName('textarea'))
		);
		for(var i = 0; i < inputs.length; i++) {
			if(inputs[i].className.indexOf(opt.skipClass) < 0) {
				var inputType = getInputType(inputs[i]);
				var placeholderValue = inputs[i].getAttribute('placeholder');
				if(opt.focusOnly || (opt.clearInputs && (inputType === 'text' || inputType === 'email' || placeholderValue)) ||
					(opt.clearTextareas && inputType === 'textarea') ||
					(opt.clearPasswords && inputType === 'password')
				) {
					new PlaceholderInput({
						element:inputs[i],
						focusOnly: opt.focusOnly,
						wrapWithElement:opt.wrapWithElement,
						showUntilTyping:opt.showUntilTyping,
						getParentByClass:opt.getParentByClass,
						showPasswordBullets:opt.showPasswordBullets,
						placeholderAttr: placeholderValue ? 'placeholder' : opt.placeholderAttr
					});
				}
			}
		}
	};
	PlaceholderInput.prototype = {
		init: function(opt) {
			this.setOptions(opt);
			if(this.element && this.element.PlaceholderInst) {
				this.element.PlaceholderInst.refreshClasses();
			} else {
				this.element.PlaceholderInst = this;
				if(this.elementType !== 'radio' || this.elementType !== 'checkbox' || this.elementType !== 'file') {
					this.initElements();
					this.attachEvents();
					this.refreshClasses();
				}
			}
		},
		setOptions: function(opt) {
			for(var p in opt) {
				if(opt.hasOwnProperty(p)) {
					this.options[p] = opt[p];
				}
			}
			if(this.options.element) {
				this.element = this.options.element;
				this.elementType = getInputType(this.element);
				if(this.options.focusOnly) {
					this.wrapWithElement = false;
				} else {
					if(this.elementType === 'password' && this.options.showPasswordBullets) {
						this.wrapWithElement = false;
					} else {
						this.wrapWithElement = this.elementType === 'password' || this.options.showUntilTyping ? true : this.options.wrapWithElement;
					}
				}
				this.setPlaceholderValue(this.options.placeholderAttr);
			}
		},
		setPlaceholderValue: function(attr) {
			this.origValue = (attr === 'value' ? this.element.defaultValue : (this.element.getAttribute(attr) || ''));
			if(this.options.placeholderAttr !== 'value') {
				this.element.removeAttribute(this.options.placeholderAttr);
			}
		},
		initElements: function() {
			// create fake element if needed
			if(this.wrapWithElement) {
				this.fakeElement = document.createElement('span');
				this.fakeElement.className = this.options.fakeElementClass;
				this.fakeElement.innerHTML += this.origValue;
				this.fakeElement.style.color = getStyle(this.element, 'color');
				this.fakeElement.style.position = 'absolute';
				this.element.parentNode.insertBefore(this.fakeElement, this.element);
				
				if(this.element.value === this.origValue || !this.element.value) {
					this.element.value = '';
					this.togglePlaceholderText(true);
				} else {
					this.togglePlaceholderText(false);
				}
			} else if(!this.element.value && this.origValue.length) {
				this.element.value = this.origValue;
			}
			// get input label
			if(this.element.id) {
				this.labels = document.getElementsByTagName('label');
				for(var i = 0; i < this.labels.length; i++) {
					if(this.labels[i].htmlFor === this.element.id) {
						this.labelFor = this.labels[i];
						break;
					}
				}
			}
			// get parent node (or parentNode by className)
			this.elementParent = this.element.parentNode;
			if(typeof this.options.getParentByClass === 'string') {
				var el = this.element;
				while(el.parentNode) {
					if(hasClass(el.parentNode, this.options.getParentByClass)) {
						this.elementParent = el.parentNode;
						break;
					} else {
						el = el.parentNode;
					}
				}
			}
		},
		attachEvents: function() {
			this.element.onfocus = bindScope(this.focusHandler, this);
			this.element.onblur = bindScope(this.blurHandler, this);
			if(this.options.showUntilTyping) {
				this.element.onkeydown = bindScope(this.typingHandler, this);
				this.element.onpaste = bindScope(this.typingHandler, this);
			}
			if(this.wrapWithElement) this.fakeElement.onclick = bindScope(this.focusSetter, this);
		},
		togglePlaceholderText: function(state) {
			if(!this.element.readOnly && !this.options.focusOnly) {
				if(this.wrapWithElement) {
					this.fakeElement.style.display = state ? '' : 'none';
				} else {
					this.element.value = state ? this.origValue : '';
				}
			}
		},
		focusSetter: function() {
			this.element.focus();
		},
		focusHandler: function() {
			clearInterval(this.checkerInterval);
			this.checkerInterval = setInterval(bindScope(this.intervalHandler,this), 1);
			this.focused = true;
			if(!this.element.value.length || this.element.value === this.origValue) {
				if(!this.options.showUntilTyping) {
					this.togglePlaceholderText(false);
				}
			}
			this.refreshClasses();
		},
		blurHandler: function() {
			clearInterval(this.checkerInterval);
			this.focused = false;
			if(!this.element.value.length || this.element.value === this.origValue) {
				this.togglePlaceholderText(true);
			}
			this.refreshClasses();
			PlaceholderInput.refreshAllInputs(this);
		},
		typingHandler: function() {
			setTimeout(bindScope(function(){
				if(this.element.value.length) {
					this.togglePlaceholderText(false);
					this.refreshClasses();
				}
			},this), 10);
		},
		intervalHandler: function() {
			if(typeof this.tmpValue === 'undefined') {
				this.tmpValue = this.element.value;
			}
			if(this.tmpValue != this.element.value) {
				PlaceholderInput.refreshAllInputs(this);
			}
		},
		refreshState: function() {
			if(this.wrapWithElement) {
				if(this.element.value.length && this.element.value !== this.origValue) {
					this.togglePlaceholderText(false);
				} else if(!this.element.value.length) {
					this.togglePlaceholderText(true);
				}
			}
			this.refreshClasses();
		},
		refreshClasses: function() {
			this.textActive = this.focused || (this.element.value.length && this.element.value !== this.origValue);
			this.setStateClass(this.element, this.options.inputFocusClass,this.focused);
			this.setStateClass(this.elementParent, this.options.parentFocusClass,this.focused);
			this.setStateClass(this.labelFor, this.options.labelFocusClass,this.focused);
			this.setStateClass(this.element, this.options.inputActiveClass, this.textActive);
			this.setStateClass(this.elementParent, this.options.parentActiveClass, this.textActive);
			this.setStateClass(this.labelFor, this.options.labelActiveClass, this.textActive);
		},
		setStateClass: function(el,cls,state) {
			if(!el) return; else if(state) addClass(el,cls); else removeClass(el,cls);
		}
	};
	
	// utility functions
	function convertToArray(collection) {
		var arr = [];
		for (var i = 0, ref = arr.length = collection.length; i < ref; i++) {
			arr[i] = collection[i];
		}
		return arr;
	}
	function getInputType(input) {
		return (input.type ? input.type : input.tagName).toLowerCase();
	}
	function hasClass(el,cls) {
		return el.className ? el.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)')) : false;
	}
	function addClass(el,cls) {
		if (!hasClass(el,cls)) el.className += " "+cls;
	}
	function removeClass(el,cls) {
		if (hasClass(el,cls)) {el.className=el.className.replace(new RegExp('(\\s|^)'+cls+'(\\s|$)'),' ');}
	}
	function bindScope(f, scope) {
		return function() {return f.apply(scope, arguments);};
	}
	function getStyle(el, prop) {
		if (document.defaultView && document.defaultView.getComputedStyle) {
			return document.defaultView.getComputedStyle(el, null)[prop];
		} else if (el.currentStyle) {
			return el.currentStyle[prop];
		} else {
			return el.style[prop];
		}
	}
}());

/*
* touchSwipe - jQuery Plugin
* https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
* http://labs.skinkers.com/touchSwipe/
* http://plugins.jquery.com/project/touchSwipe
*
* Copyright (c) 2010 Matt Bryson (www.skinkers.com)
* Dual licensed under the MIT or GPL Version 2 licenses.
*
* $version: 1.6.0
*/;(function(d){+"use strict";var n="left",m="right",c="up",u="down",b="in",v="out",k="none",q="auto",j="swipe",r="pinch",e="click",x="horizontal",s="vertical",h="all",f="start",i="move",g="end",o="cancel",a="ontouchstart" in window,w="TouchSwipe";var l={fingers:1,threshold:75,pinchThreshold:20,maxTimeThreshold:null,fingerReleaseThreshold:250,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,pinchIn:null,pinchOut:null,pinchStatus:null,click:null,triggerOnTouchEnd:true,triggerOnTouchLeave:false,allowPageScroll:"auto",fallbackToMouseEvents:true,excludedElements:"button, input, select, textarea, a, .noSwipe"};d.fn.swipe=function(A){var z=d(this),y=z.data(w);if(y&&typeof A==="string"){if(y[A]){return y[A].apply(this,Array.prototype.slice.call(arguments,1))}else{d.error("Method "+A+" does not exist on jQuery.swipe")}}else{if(!y&&(typeof A==="object"||!A)){return t.apply(this,arguments)}}return z};d.fn.swipe.defaults=l;d.fn.swipe.phases={PHASE_START:f,PHASE_MOVE:i,PHASE_END:g,PHASE_CANCEL:o};d.fn.swipe.directions={LEFT:n,RIGHT:m,UP:c,DOWN:u,IN:b,OUT:v};d.fn.swipe.pageScroll={NONE:k,HORIZONTAL:x,VERTICAL:s,AUTO:q};d.fn.swipe.fingers={ONE:1,TWO:2,THREE:3,ALL:h};function t(y){if(y&&(y.allowPageScroll===undefined&&(y.swipe!==undefined||y.swipeStatus!==undefined))){y.allowPageScroll=k}if(!y){y={}}y=d.extend({},d.fn.swipe.defaults,y);return this.each(function(){var A=d(this);var z=A.data(w);if(!z){z=new p(this,y);A.data(w,z)}})}function p(S,af){var aF=(a||!af.fallbackToMouseEvents),ax=aF?"touchstart":"mousedown",U=aF?"touchmove":"mousemove",au=aF?"touchend":"mouseup",D=aF?null:"mouseleave",R="touchcancel";var ac=0;var N=null;var ag=0;var aB=0;var A=0;var ai=1;var aH=0;var H=d(S);var O="start";var aE=0;var ah=null;var I=0;var Y=0;var aA=0;var aJ=0;try{H.bind(ax,ar);H.bind(R,M)}catch(aC){d.error("events not supported "+ax+","+R+" on jQuery.swipe")}this.enable=function(){H.bind(ax,ar);H.bind(R,M);return H};this.disable=function(){Q();return H};this.destroy=function(){Q();H.data(w,null);return H};function ar(aM){if(X()){return}if(d(aM.target).closest(af.excludedElements,H).length>0){return}var aN=aM.originalEvent;var aL,aK=a?aN.touches[0]:aN;O=f;if(a){aE=aN.touches.length}else{aM.preventDefault()}ac=0;N=null;aH=null;ag=0;aB=0;A=0;ai=1;pinchDistance=0;ah=T();z();if(!a||(aE===af.fingers||af.fingers===h)||ao()){aI(0,aK);I=B();if(aE==2){aI(1,aN.touches[1]);aB=A=Z(ah[0].start,ah[1].start)}if(af.swipeStatus||af.pinchStatus){aL=aD(aN,O)}}else{aL=false}if(aL===false){O=o;aD(aN,O);return aL}else{aj(true)}}function P(aN){var aQ=aN.originalEvent;if(O===g||O===o||ae()){return}var aM,aL=a?aQ.touches[0]:aQ;var aO=V(aL);Y=B();if(a){aE=aQ.touches.length}O=i;if(aE==2){if(aB==0){aI(1,aQ.touches[1]);aB=A=Z(ah[0].start,ah[1].start)}else{V(aQ.touches[1]);A=Z(ah[0].end,ah[1].end);aH=an(ah[0].end,ah[1].end)}ai=y(aB,A);pinchDistance=Math.abs(aB-A)}if((aE===af.fingers||af.fingers===h)||!a||ao()){N=aq(aO.start,aO.end);C(aN,N);ac=G(aO.start,aO.end);ag=L();if(af.swipeStatus||af.pinchStatus){aM=aD(aQ,O)}if(!af.triggerOnTouchEnd||af.triggerOnTouchLeave){var aK=true;if(af.triggerOnTouchLeave){var aP=at(this);aK=az(aO.end,aP)}if(!af.triggerOnTouchEnd&&aK){O=aG(i)}else{if(af.triggerOnTouchLeave&&!aK){O=aG(g)}}if(O==o||O==g){aD(aQ,O)}}}else{O=o;aD(aQ,O)}if(aM===false){O=o;aD(aQ,O)}}function aa(aM){var aO=aM.originalEvent;if(a){if(aO.touches.length>0){av();return true}}if(ae()){aE=aJ}aM.preventDefault();Y=B();if(af.triggerOnTouchEnd||(af.triggerOnTouchEnd==false&&O===i)){O=g;var aL=((aE===af.fingers||af.fingers===h)||!a);var aK=ah[0].end.x!==0;var aN=aL&&aK&&(am()||ay());if(aN){aD(aO,O)}else{O=o;aD(aO,O)}}else{if(O===i){O=o;aD(aO,O)}}aj(false)}function M(){aE=0;Y=0;I=0;aB=0;A=0;ai=1;z();aj(false)}function W(aK){var aL=aK.originalEvent;if(af.triggerOnTouchLeave){O=aG(g);aD(aL,O)}}function Q(){H.unbind(ax,ar);H.unbind(R,M);H.unbind(U,P);H.unbind(au,aa);if(D){H.unbind(D,W)}aj(false)}function aG(aN){var aM=aN;var aL=ap();var aK=ad();if(!aL){aM=o}else{if(aK&&aN==i&&(!af.triggerOnTouchEnd||af.triggerOnTouchLeave)){aM=g}else{if(!aK&&aN==g&&af.triggerOnTouchLeave){aM=o}}}return aM}function aD(aM,aK){var aL=undefined;if(ab()){aL=al(aM,aK,j)}if(ao()&&aL!==false){aL=al(aM,aK,r)}if(K()&&aL!==false){aL=al(aM,aK,e)}if(aK===o){M(aM)}if(aK===g){if(a){if(aM.touches.length==0){M(aM)}}else{M(aM)}}return aL}function al(aN,aK,aM){var aL=undefined;if(aM==j){if(af.swipeStatus){aL=af.swipeStatus.call(H,aN,aK,N||null,ac||0,ag||0,aE);if(aL===false){return false}}if(aK==g&&ay()){if(af.swipe){aL=af.swipe.call(H,aN,N,ac,ag,aE);if(aL===false){return false}}switch(N){case n:if(af.swipeLeft){aL=af.swipeLeft.call(H,aN,N,ac,ag,aE)}break;case m:if(af.swipeRight){aL=af.swipeRight.call(H,aN,N,ac,ag,aE)}break;case c:if(af.swipeUp){aL=af.swipeUp.call(H,aN,N,ac,ag,aE)}break;case u:if(af.swipeDown){aL=af.swipeDown.call(H,aN,N,ac,ag,aE)}break}}}if(aM==r){if(af.pinchStatus){aL=af.pinchStatus.call(H,aN,aK,aH||null,pinchDistance||0,ag||0,aE,ai);if(aL===false){return false}}if(aK==g&&am()){switch(aH){case b:if(af.pinchIn){aL=af.pinchIn.call(H,aN,aH||null,pinchDistance||0,ag||0,aE,ai)}break;case v:if(af.pinchOut){aL=af.pinchOut.call(H,aN,aH||null,pinchDistance||0,ag||0,aE,ai)}break}}}if(aM==e){if(aK===o){if(af.click&&(aE===1||!a)&&(isNaN(ac)||ac===0)){aL=af.click.call(H,aN,aN.target)}}}return aL}function ad(){if(af.threshold!==null){return ac>=af.threshold}return true}function ak(){if(af.pinchThreshold!==null){return pinchDistance>=af.pinchThreshold}return true}function ap(){var aK;if(af.maxTimeThreshold){if(ag>=af.maxTimeThreshold){aK=false}else{aK=true}}else{aK=true}return aK}function C(aK,aL){if(af.allowPageScroll===k||ao()){aK.preventDefault()}else{var aM=af.allowPageScroll===q;switch(aL){case n:if((af.swipeLeft&&aM)||(!aM&&af.allowPageScroll!=x)){aK.preventDefault()}break;case m:if((af.swipeRight&&aM)||(!aM&&af.allowPageScroll!=x)){aK.preventDefault()}break;case c:if((af.swipeUp&&aM)||(!aM&&af.allowPageScroll!=s)){aK.preventDefault()}break;case u:if((af.swipeDown&&aM)||(!aM&&af.allowPageScroll!=s)){aK.preventDefault()}break}}}function am(){return ak()}function ao(){return !!(af.pinchStatus||af.pinchIn||af.pinchOut)}function aw(){return !!(am()&&ao())}function ay(){var aK=ap();var aM=ad();var aL=aM&&aK;return aL}function ab(){return !!(af.swipe||af.swipeStatus||af.swipeLeft||af.swipeRight||af.swipeUp||af.swipeDown)}function E(){return !!(ay()&&ab())}function K(){return !!(af.click)}function av(){aA=B();aJ=event.touches.length+1}function z(){aA=0;aJ=0}function ae(){var aK=false;if(aA){var aL=B()-aA;if(aL<=af.fingerReleaseThreshold){aK=true}}return aK}function X(){return !!(H.data(w+"_intouch")===true)}function aj(aK){if(aK===true){H.bind(U,P);H.bind(au,aa);if(D){H.bind(D,W)}}else{H.unbind(U,P,false);H.unbind(au,aa,false);if(D){H.unbind(D,W,false)}}H.data(w+"_intouch",aK===true)}function aI(aL,aK){var aM=aK.identifier!==undefined?aK.identifier:0;ah[aL].identifier=aM;ah[aL].start.x=ah[aL].end.x=aK.pageX;ah[aL].start.y=ah[aL].end.y=aK.pageY;return ah[aL]}function V(aK){var aM=aK.identifier!==undefined?aK.identifier:0;var aL=J(aM);aL.end.x=aK.pageX;aL.end.y=aK.pageY;return aL}function J(aL){for(var aK=0;aK<ah.length;aK++){if(ah[aK].identifier==aL){return ah[aK]}}}function T(){var aK=[];for(var aL=0;aL<=5;aL++){aK.push({start:{x:0,y:0},end:{x:0,y:0},identifier:0})}return aK}function L(){return Y-I}function Z(aN,aM){var aL=Math.abs(aN.x-aM.x);var aK=Math.abs(aN.y-aM.y);return Math.round(Math.sqrt(aL*aL+aK*aK))}function y(aK,aL){var aM=(aL/aK)*1;return aM.toFixed(2)}function an(){if(ai<1){return v}else{return b}}function G(aL,aK){return Math.round(Math.sqrt(Math.pow(aK.x-aL.x,2)+Math.pow(aK.y-aL.y,2)))}function F(aN,aL){var aK=aN.x-aL.x;var aP=aL.y-aN.y;var aM=Math.atan2(aP,aK);var aO=Math.round(aM*180/Math.PI);if(aO<0){aO=360-Math.abs(aO)}return aO}function aq(aL,aK){var aM=F(aL,aK);if((aM<=45)&&(aM>=0)){return n}else{if((aM<=360)&&(aM>=315)){return n}else{if((aM>=135)&&(aM<=225)){return m}else{if((aM>45)&&(aM<135)){return u}else{return c}}}}}function B(){var aK=new Date();return aK.getTime()}function at(aK){aK=d(aK);var aM=aK.offset();var aL={left:aM.left,right:aM.left+aK.outerWidth(),top:aM.top,bottom:aM.top+aK.outerHeight()};return aL}function az(aK,aL){return(aK.x>aL.left&&aK.x<aL.right&&aK.y>aL.top&&aK.y<aL.bottom)}}})(jQuery);


/*
 * FancyBox - jQuery Plugin
 * Simple and fancy lightbox alternative
 *
 * Examples and documentation at: http://fancybox.net
 * 
 * Copyright (c) 2008 - 2010 Janis Skarnelis
 * That said, it is hardly a one-person project. Many people have submitted bugs, code, and offered their advice freely. Their support is greatly appreciated.
 *
 * Version: 1.3.4 (11/11/2010)
 * Requires: jQuery v1.3+
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
;(function(B){var L,T,Q,M,d,m,J,A,O,z,C=0,H={},j=[],e=0,G={},y=[],f=null,o=new Image(),i=/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i,k=/[^\.]\.(swf)\s*$/i,p,N=1,h=0,t="",b,c,P=false,s=B.extend(B("<div/>")[0],{prop:0}),S=B.browser.msie&&B.browser.version<7&&!window.XMLHttpRequest,r=function(){T.hide();o.onerror=o.onload=null;if(f){f.abort()}L.empty()},x=function(){if(false===H.onError(j,C,H)){T.hide();P=false;return}H.titleShow=false;H.width="auto";H.height="auto";L.html('<p id="fancybox-error">The requested content cannot be loaded.<br />Please try again later.</p>');n()},w=function(){var Z=j[C],W,Y,ab,aa,V,X;r();H=B.extend({},B.fn.fancybox.defaults,(typeof B(Z).data("fancybox")=="undefined"?H:B(Z).data("fancybox")));X=H.onStart(j,C,H);if(X===false){P=false;return}else{if(typeof X=="object"){H=B.extend(H,X)}}ab=H.title||(Z.nodeName?B(Z).attr("title"):Z.title)||"";if(Z.nodeName&&!H.orig){H.orig=B(Z).children("img:first").length?B(Z).children("img:first"):B(Z)}if(ab===""&&H.orig&&H.titleFromAlt){ab=H.orig.attr("alt")}W=H.href||(Z.nodeName?B(Z).attr("href"):Z.href)||null;if((/^(?:javascript)/i).test(W)||W=="#"){W=null}if(H.type){Y=H.type;if(!W){W=H.content}}else{if(H.content){Y="html"}else{if(W){if(W.match(i)){Y="image"}else{if(W.match(k)){Y="swf"}else{if(B(Z).hasClass("iframe")){Y="iframe"}else{if(W.indexOf("#")===0){Y="inline"}else{Y="ajax"}}}}}}}if(!Y){x();return}if(Y=="inline"){Z=W.substr(W.indexOf("#"));Y=B(Z).length>0?"inline":"ajax"}H.type=Y;H.href=W;H.title=ab;if(H.autoDimensions){if(H.type=="html"||H.type=="inline"||H.type=="ajax"){H.width="auto";H.height="auto"}else{H.autoDimensions=false}}if(H.modal){H.overlayShow=true;H.hideOnOverlayClick=false;H.hideOnContentClick=false;H.enableEscapeButton=false;H.showCloseButton=false}H.padding=parseInt(H.padding,10);H.margin=parseInt(H.margin,10);L.css("padding",(H.padding+H.margin));B(".fancybox-inline-tmp").unbind("fancybox-cancel").bind("fancybox-change",function(){B(this).replaceWith(m.children())});switch(Y){case"html":L.html(H.content);n();break;case"inline":if(B(Z).parent().is("#fancybox-content")===true){P=false;return}B('<div class="fancybox-inline-tmp" />').hide().insertBefore(B(Z)).bind("fancybox-cleanup",function(){B(this).replaceWith(m.children())}).bind("fancybox-cancel",function(){B(this).replaceWith(L.children())});B(Z).appendTo(L);n();break;case"image":P=false;B.fancybox.showActivity();o=new Image();o.onerror=function(){x()};o.onload=function(){P=true;o.onerror=o.onload=null;F()};o.src=W;break;case"swf":H.scrolling="no";aa='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+H.width+'" height="'+H.height+'"><param name="movie" value="'+W+'"></param>';V="";B.each(H.swf,function(ac,ad){aa+='<param name="'+ac+'" value="'+ad+'"></param>';V+=" "+ac+'="'+ad+'"'});aa+='<embed src="'+W+'" type="application/x-shockwave-flash" width="'+H.width+'" height="'+H.height+'"'+V+"></embed></object>";L.html(aa);n();break;case"ajax":P=false;B.fancybox.showActivity();H.ajax.win=H.ajax.success;f=B.ajax(B.extend({},H.ajax,{url:W,data:H.ajax.data||{},dataType:"text",error:function(ac,ae,ad){if(ac.status>0){x()}},success:function(ad,af,ac){var ae=typeof ac=="object"?ac:f;if(ae.status==200||ae.status===0){if(typeof H.ajax.win=="function"){X=H.ajax.win(W,ad,af,ac);if(X===false){T.hide();return}else{if(typeof X=="string"||typeof X=="object"){ad=X}}}L.html(ad);n()}}}));break;case"iframe":E();break}},n=function(){var V=H.width,W=H.height;if(V.toString().indexOf("%")>-1){V=parseInt((B(window).width()-(H.margin*2))*parseFloat(V)/100,10)+"px"}else{V=V=="auto"?"auto":V+"px"}if(W.toString().indexOf("%")>-1){W=parseInt((B(window).height()-(H.margin*2))*parseFloat(W)/100,10)+"px"}else{W=W=="auto"?"auto":W+"px"}L.wrapInner('<div style="width:'+V+";height:"+W+";overflow: "+(H.scrolling=="auto"?"auto":(H.scrolling=="yes"?"scroll":"hidden"))+';position:relative;"></div>');H.width=L.width();H.height=L.height();E()},F=function(){H.width=o.width;H.height=o.height;B("<img />").attr({id:"fancybox-img",src:o.src,alt:H.title}).appendTo(L);E()},E=function(){var W,V;T.hide();if(M.is(":visible")&&false===G.onCleanup(y,e,G)){B.event.trigger("fancybox-cancel");P=false;return}P=true;B(m.add(Q)).unbind();B(window).unbind("resize.fb scroll.fb");B(document).unbind("keydown.fb");if(M.is(":visible")&&G.titlePosition!=="outside"){M.css("height",M.height())}y=j;e=C;G=H;if(G.overlayShow){Q.css({"background-color":G.overlayColor,opacity:G.overlayOpacity,cursor:G.hideOnOverlayClick?"pointer":"auto",height:B(document).height()});if(!Q.is(":visible")){if(S){B("select:not(#fancybox-tmp select)").filter(function(){return this.style.visibility!=="hidden"}).css({visibility:"hidden"}).one("fancybox-cleanup",function(){this.style.visibility="inherit"})}Q.show()}}else{Q.hide()}c=R();l();if(M.is(":visible")){B(J.add(O).add(z)).hide();W=M.position(),b={top:W.top,left:W.left,width:M.width(),height:M.height()};V=(b.width==c.width&&b.height==c.height);m.fadeTo(G.changeFade,0.3,function(){var X=function(){m.html(L.contents()).fadeTo(G.changeFade,1,v)};B.event.trigger("fancybox-change");m.empty().removeAttr("filter").css({"border-width":G.padding,width:c.width-G.padding*2,height:H.autoDimensions?"auto":c.height-h-G.padding*2});if(V){X()}else{s.prop=0;B(s).animate({prop:1},{duration:G.changeSpeed,easing:G.easingChange,step:U,complete:X})}});return}M.removeAttr("style");m.css("border-width",G.padding);if(G.transitionIn=="elastic"){b=I();m.html(L.contents());M.show();if(G.opacity){c.opacity=0}s.prop=0;B(s).animate({prop:1},{duration:G.speedIn,easing:G.easingIn,step:U,complete:v});return}if(G.titlePosition=="inside"&&h>0){A.show()}m.css({width:c.width-G.padding*2,height:H.autoDimensions?"auto":c.height-h-G.padding*2}).html(L.contents());M.css(c).fadeIn(G.transitionIn=="none"?0:G.speedIn,v)},D=function(V){if(V&&V.length){if(G.titlePosition=="float"){return'<table id="fancybox-title-float-wrap" cellpadding="0" cellspacing="0"><tr><td id="fancybox-title-float-left"></td><td id="fancybox-title-float-main">'+V+'</td><td id="fancybox-title-float-right"></td></tr></table>'}return'<div id="fancybox-title-'+G.titlePosition+'">'+V+"</div>"}return false},l=function(){t=G.title||"";h=0;A.empty().removeAttr("style").removeClass();if(G.titleShow===false){A.hide();return}t=B.isFunction(G.titleFormat)?G.titleFormat(t,y,e,G):D(t);if(!t||t===""){A.hide();return}A.addClass("fancybox-title-"+G.titlePosition).html(t).appendTo("body").show();switch(G.titlePosition){case"inside":A.css({width:c.width-(G.padding*2),marginLeft:G.padding,marginRight:G.padding});h=A.outerHeight(true);A.appendTo(d);c.height+=h;break;case"over":A.css({marginLeft:G.padding,width:c.width-(G.padding*2),bottom:G.padding}).appendTo(d);break;case"float":A.css("left",parseInt((A.width()-c.width-40)/2,10)*-1).appendTo(M);break;default:A.css({width:c.width-(G.padding*2),paddingLeft:G.padding,paddingRight:G.padding}).appendTo(M);break}A.hide()},g=function(){if(G.enableEscapeButton||G.enableKeyboardNav){B(document).bind("keydown.fb",function(V){if(V.keyCode==27&&G.enableEscapeButton){V.preventDefault();B.fancybox.close()}else{if((V.keyCode==37||V.keyCode==39)&&G.enableKeyboardNav&&V.target.tagName!=="INPUT"&&V.target.tagName!=="TEXTAREA"&&V.target.tagName!=="SELECT"){V.preventDefault();B.fancybox[V.keyCode==37?"prev":"next"]()}}})}if(!G.showNavArrows){O.hide();z.hide();return}if((G.cyclic&&y.length>1)||e!==0){O.show()}if((G.cyclic&&y.length>1)||e!=(y.length-1)){z.show()}},v=function(){if(!B.support.opacity){m.get(0).style.removeAttribute("filter");M.get(0).style.removeAttribute("filter")}if(H.autoDimensions){m.css("height","auto")}M.css("height","auto");if(t&&t.length){A.show()}if(G.showCloseButton){J.show()}g();if(G.hideOnContentClick){m.bind("click",B.fancybox.close)}if(G.hideOnOverlayClick){Q.bind("click",B.fancybox.close)}B(window).bind("resize.fb",B.fancybox.resize);if(G.centerOnScroll){B(window).bind("scroll.fb",B.fancybox.center)}if(G.type=="iframe"){B('<iframe id="fancybox-frame" name="fancybox-frame'+new Date().getTime()+'" frameborder="0" hspace="0" '+(B.browser.msie?'allowtransparency="true""':"")+' scrolling="'+H.scrolling+'" src="'+G.href+'"></iframe>').appendTo(m)}M.show();P=false;B.fancybox.center();G.onComplete(y,e,G);K()},K=function(){var V,W;if((y.length-1)>e){V=y[e+1].href;if(typeof V!=="undefined"&&V.match(i)){W=new Image();W.src=V}}if(e>0){V=y[e-1].href;if(typeof V!=="undefined"&&V.match(i)){W=new Image();W.src=V}}},U=function(W){var V={width:parseInt(b.width+(c.width-b.width)*W,10),height:parseInt(b.height+(c.height-b.height)*W,10),top:parseInt(b.top+(c.top-b.top)*W,10),left:parseInt(b.left+(c.left-b.left)*W,10)};if(typeof c.opacity!=="undefined"){V.opacity=W<0.5?0.5:W}M.css(V);m.css({width:V.width-G.padding*2,height:V.height-(h*W)-G.padding*2})},u=function(){return[B(window).width()-(G.margin*2),B(window).height()-(G.margin*2),B(document).scrollLeft()+G.margin,B(document).scrollTop()+G.margin]},R=function(){var V=u(),Z={},W=G.autoScale,X=G.padding*2,Y;if(G.width.toString().indexOf("%")>-1){Z.width=parseInt((V[0]*parseFloat(G.width))/100,10)}else{Z.width=G.width+X}if(G.height.toString().indexOf("%")>-1){Z.height=parseInt((V[1]*parseFloat(G.height))/100,10)}else{Z.height=G.height+X}if(W&&(Z.width>V[0]||Z.height>V[1])){if(H.type=="image"||H.type=="swf"){Y=(G.width)/(G.height);if((Z.width)>V[0]){Z.width=V[0];Z.height=parseInt(((Z.width-X)/Y)+X,10)}if((Z.height)>V[1]){Z.height=V[1];Z.width=parseInt(((Z.height-X)*Y)+X,10)}}else{Z.width=Math.min(Z.width,V[0]);Z.height=Math.min(Z.height,V[1])}}Z.top=parseInt(Math.max(V[3]-20,V[3]+((V[1]-Z.height-40)*0.5)),10);Z.left=parseInt(Math.max(V[2]-20,V[2]+((V[0]-Z.width-40)*0.5)),10);return Z},q=function(V){var W=V.offset();W.top+=parseInt(V.css("paddingTop"),10)||0;W.left+=parseInt(V.css("paddingLeft"),10)||0;W.top+=parseInt(V.css("border-top-width"),10)||0;W.left+=parseInt(V.css("border-left-width"),10)||0;W.width=V.width();W.height=V.height();return W},I=function(){var Y=H.orig?B(H.orig):false,X={},W,V;if(Y&&Y.length){W=q(Y);X={width:W.width+(G.padding*2),height:W.height+(G.padding*2),top:W.top-G.padding-20,left:W.left-G.padding-20}}else{V=u();X={width:G.padding*2,height:G.padding*2,top:parseInt(V[3]+V[1]*0.5,10),left:parseInt(V[2]+V[0]*0.5,10)}}return X},a=function(){if(!T.is(":visible")){clearInterval(p);return}B("div",T).css("top",(N*-40)+"px");N=(N+1)%12};B.fn.fancybox=function(V){if(!B(this).length){return this}B(this).data("fancybox",B.extend({},V,(B.metadata?B(this).metadata():{}))).unbind("click.fb").bind("click.fb",function(X){X.preventDefault();if(P){return}P=true;B(this).blur();j=[];C=0;var W=B(this).attr("rel")||"";if(!W||W==""||W==="nofollow"){j.push(this)}else{j=B('a[rel="'+W+'"], area[rel="'+W+'"]');C=j.index(this)}w();return});return this};B.fancybox=function(Y){var X;if(P){return}P=true;X=typeof arguments[1]!=="undefined"?arguments[1]:{};j=[];C=parseInt(X.index,10)||0;if(B.isArray(Y)){for(var W=0,V=Y.length;W<V;W++){if(typeof Y[W]=="object"){B(Y[W]).data("fancybox",B.extend({},X,Y[W]))}else{Y[W]=B({}).data("fancybox",B.extend({content:Y[W]},X))}}j=jQuery.merge(j,Y)}else{if(typeof Y=="object"){B(Y).data("fancybox",B.extend({},X,Y))}else{Y=B({}).data("fancybox",B.extend({content:Y},X))}j.push(Y)}if(C>j.length||C<0){C=0}w()};B.fancybox.showActivity=function(){clearInterval(p);T.show();p=setInterval(a,66)};B.fancybox.hideActivity=function(){T.hide()};B.fancybox.next=function(){return B.fancybox.pos(e+1)};B.fancybox.prev=function(){return B.fancybox.pos(e-1)};B.fancybox.pos=function(V){if(P){return}V=parseInt(V);j=y;if(V>-1&&V<y.length){C=V;w()}else{if(G.cyclic&&y.length>1){C=V>=y.length?0:y.length-1;w()}}return};B.fancybox.cancel=function(){if(P){return}P=true;B.event.trigger("fancybox-cancel");r();H.onCancel(j,C,H);P=false};B.fancybox.close=function(){if(P||M.is(":hidden")){return}P=true;if(G&&false===G.onCleanup(y,e,G)){P=false;return}r();B(J.add(O).add(z)).hide();B(m.add(Q)).unbind();B(window).unbind("resize.fb scroll.fb");B(document).unbind("keydown.fb");if(G.type==="iframe"){m.find("iframe").attr("src",S&&/^https/i.test(window.location.href||"")?"javascript:void(false)":"about:blank")}if(G.titlePosition!=="inside"){A.empty()}M.stop();function V(){Q.fadeOut("fast");A.empty().hide();M.hide();B.event.trigger("fancybox-cleanup");m.empty();G.onClosed(y,e,G);y=H=[];e=C=0;G=H={};P=false}if(G.transitionOut=="elastic"){b=I();var W=M.position();c={top:W.top,left:W.left,width:M.width(),height:M.height()};if(G.opacity){c.opacity=1}A.empty().hide();s.prop=1;B(s).animate({prop:0},{duration:G.speedOut,easing:G.easingOut,step:U,complete:V})}else{M.fadeOut(G.transitionOut=="none"?0:G.speedOut,V)}};B.fancybox.resize=function(){if(Q.is(":visible")){Q.css("height",B(document).height())}B.fancybox.center(true)};B.fancybox.center=function(){var V,W;if(P){return}W=arguments[0]===true?1:0;V=u();if(!W&&(M.width()>V[0]||M.height()>V[1])){return}M.stop().animate({top:parseInt(Math.max(V[3]-20,V[3]+((V[1]-m.height()-40)*0.5)-G.padding)),left:parseInt(Math.max(V[2]-20,V[2]+((V[0]-m.width()-40)*0.5)-G.padding))},typeof arguments[0]=="number"?arguments[0]:200)};B.fancybox.init=function(){if(B("#fancybox-wrap").length){return}B("body").append(L=B('<div id="fancybox-tmp"></div>'),T=B('<div id="fancybox-loading"><div></div></div>'),Q=B('<div id="fancybox-overlay"></div>'),M=B('<div id="fancybox-wrap"></div>'));d=B('<div id="fancybox-outer"></div>').append('<div class="fancybox-bg" id="fancybox-bg-n"></div><div class="fancybox-bg" id="fancybox-bg-ne"></div><div class="fancybox-bg" id="fancybox-bg-e"></div><div class="fancybox-bg" id="fancybox-bg-se"></div><div class="fancybox-bg" id="fancybox-bg-s"></div><div class="fancybox-bg" id="fancybox-bg-sw"></div><div class="fancybox-bg" id="fancybox-bg-w"></div><div class="fancybox-bg" id="fancybox-bg-nw"></div>').appendTo(M);d.append(m=B('<div id="fancybox-content"></div>'),J=B('<a id="fancybox-close"></a>'),A=B('<div id="fancybox-title"></div>'),O=B('<a href="javascript:;" id="fancybox-left"><span class="fancy-ico" id="fancybox-left-ico"></span></a>'),z=B('<a href="javascript:;" id="fancybox-right"><span class="fancy-ico" id="fancybox-right-ico"></span></a>'));J.click(B.fancybox.close);T.click(B.fancybox.cancel);O.click(function(V){V.preventDefault();B.fancybox.prev()});z.click(function(V){V.preventDefault();B.fancybox.next()});if(B.fn.mousewheel){M.bind("mousewheel.fb",function(V,W){if(P){V.preventDefault()}else{if(B(V.target).get(0).clientHeight==0||B(V.target).get(0).scrollHeight===B(V.target).get(0).clientHeight){V.preventDefault();B.fancybox[W>0?"prev":"next"]()}}})}if(!B.support.opacity){M.addClass("fancybox-ie")}if(S){T.addClass("fancybox-ie6");M.addClass("fancybox-ie6");B('<iframe id="fancybox-hide-sel-frame" src="'+(/^https/i.test(window.location.href||"")?"javascript:void(false)":"about:blank")+'" scrolling="no" border="0" frameborder="0" tabindex="-1"></iframe>').prependTo(d)}};B.fn.fancybox.defaults={padding:10,margin:40,opacity:false,modal:false,cyclic:false,scrolling:"auto",width:560,height:340,autoScale:true,autoDimensions:true,centerOnScroll:false,ajax:{},swf:{wmode:"transparent"},hideOnOverlayClick:true,hideOnContentClick:false,overlayShow:true,overlayOpacity:0.7,overlayColor:"#777",titleShow:true,titlePosition:"float",titleFormat:null,titleFromAlt:false,transitionIn:"fade",transitionOut:"fade",speedIn:300,speedOut:300,changeSpeed:300,changeFade:"fast",easingIn:"swing",easingOut:"swing",showCloseButton:true,showNavArrows:true,enableEscapeButton:true,enableKeyboardNav:true,onStart:function(){},onCancel:function(){},onComplete:function(){},onCleanup:function(){},onClosed:function(){},onError:function(){}};B(document).ready(function(){B.fancybox.init()})})(jQuery);

/*! TinySort 1.5.6
* Copyright (c) 2008-2013 Ron Valstar http://tinysort.sjeiti.com/
* License:
*     MIT: http://www.opensource.org/licenses/mit-license.php
*     GPL: http://www.gnu.org/licenses/gpl.html
*/
!function(a,b){"use strict";function c(a){return a&&a.toLowerCase?a.toLowerCase():a}function d(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]==b)return!e;return e}var e=!1,f=null,g=parseFloat,h=Math.min,i=/(-?\d+\.?\d*)$/g,j=/(\d+\.?\d*)$/g,k=[],l=[],m=function(a){return"string"==typeof a},n=function(a,b){for(var c,d=a.length,e=d;e--;)c=d-e-1,b(a[c],c)},o=Array.prototype.indexOf||function(a){var b=this.length,c=Number(arguments[1])||0;for(c=0>c?Math.ceil(c):Math.floor(c),0>c&&(c+=b);b>c;c++)if(c in this&&this[c]===a)return c;return-1};a.tinysort={id:"TinySort",version:"1.5.6",copyright:"Copyright (c) 2008-2013 Ron Valstar",uri:"http://tinysort.sjeiti.com/",licensed:{MIT:"http://www.opensource.org/licenses/mit-license.php",GPL:"http://www.gnu.org/licenses/gpl.html"},plugin:function(){var a=function(a,b){k.push(a),l.push(b)};return a.indexOf=o,a}(),defaults:{order:"asc",attr:f,data:f,useVal:e,place:"start",returns:e,cases:e,forceStrings:e,ignoreDashes:e,sortFunction:f}},a.fn.extend({tinysort:function(){var p,q,r,s,t=this,u=[],v=[],w=[],x=[],y=0,z=[],A=[],B=function(a){n(k,function(b){b.call(b,a)})},C=function(a,b){return"string"==typeof b&&(a.cases||(b=c(b)),b=b.replace(/^\s*(.*?)\s*$/i,"$1")),b},D=function(a,b){var c=0;for(0!==y&&(y=0);0===c&&s>y;){var d=x[y],f=d.oSettings,h=f.ignoreDashes?j:i;if(B(f),f.sortFunction)c=f.sortFunction(a,b);else if("rand"==f.order)c=Math.random()<.5?1:-1;else{var k=e,o=C(f,a.s[y]),p=C(f,b.s[y]);if(!f.forceStrings){var q=m(o)?o&&o.match(h):e,r=m(p)?p&&p.match(h):e;if(q&&r){var t=o.substr(0,o.length-q[0].length),u=p.substr(0,p.length-r[0].length);t==u&&(k=!e,o=g(q[0]),p=g(r[0]))}}c=d.iAsc*(p>o?-1:o>p?1:0)}n(l,function(a){c=a.call(a,k,o,p,c)}),0===c&&y++}return c};for(p=0,r=arguments.length;r>p;p++){var E=arguments[p];m(E)?z.push(E)-1>A.length&&(A.length=z.length-1):A.push(E)>z.length&&(z.length=A.length)}for(z.length>A.length&&(A.length=z.length),s=z.length,0===s&&(s=z.length=1,A.push({})),p=0,r=s;r>p;p++){var F=z[p],G=a.extend({},a.tinysort.defaults,A[p]),H=!(!F||""===F),I=H&&":"===F[0];x.push({sFind:F,oSettings:G,bFind:H,bAttr:!(G.attr===f||""===G.attr),bData:G.data!==f,bFilter:I,$Filter:I?t.filter(F):t,fnSort:G.sortFunction,iAsc:"asc"==G.order?1:-1})}return t.each(function(c,d){var e,f=a(d),g=f.parent().get(0),h=[];for(q=0;s>q;q++){var i=x[q],j=i.bFind?i.bFilter?i.$Filter.filter(d):f.find(i.sFind):f;h.push(i.bData?j.data(i.oSettings.data):i.bAttr?j.attr(i.oSettings.attr):i.oSettings.useVal?j.val():j.text()),e===b&&(e=j)}var k=o.call(w,g);0>k&&(k=w.push(g)-1,v[k]={s:[],n:[]}),e.length>0?v[k].s.push({s:h,e:f,n:c}):v[k].n.push({e:f,n:c})}),n(v,function(a){a.s.sort(D)}),n(v,function(a){var b=a.s,c=a.n,f=b.length,g=c.length,i=f+g,j=[],k=i,l=[0,0];switch(G.place){case"first":n(b,function(a){k=h(k,a.n)});break;case"org":n(b,function(a){j.push(a.n)});break;case"end":k=g;break;default:k=0}for(p=0;i>p;p++){var m=d(j,p)?!e:p>=k&&k+f>p,o=m?0:1,q=(m?b:c)[l[o]].e;q.parent().append(q),(m||!G.returns)&&u.push(q.get(0)),l[o]++}}),t.length=0,Array.prototype.push.apply(t,u),t}}),a.fn.TinySort=a.fn.Tinysort=a.fn.tsort=a.fn.tinysort}(jQuery);

/* Italian initialisation for the jQuery UI date picker plugin. */
/* Written by Antonello Pasella (antonello.pasella@gmail.com). */
jQuery(function($){
	$.datepicker.regional['it'] = {
		closeText: 'Chiudi',
		prevText: '&#x3C;Prec',
		nextText: 'Succ&#x3E;',
		currentText: 'Oggi',
		monthNames: ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno',
			'Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'],
		monthNamesShort: ['Gen','Feb','Mar','Apr','Mag','Giu',
			'Lug','Ago','Set','Ott','Nov','Dic'],
		dayNames: ['Domenica','LunedГ¬','MartedГ¬','MercoledГ¬','GiovedГ¬','VenerdГ¬','Sabato'],
		dayNamesShort: ['Dom','Lun','Mar','Mer','Gio','Ven','Sab'],
		dayNamesMin: ['Do','Lu','Ma','Me','Gi','Ve','Sa'],
		weekHeader: 'Sm',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['it']);
});