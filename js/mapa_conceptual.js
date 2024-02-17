/* globals jQuery, dataMateriales, textos */

(function ($, dataMateriales, textos) {
	'use strict';

	$(document).ready(function () {
		dataMateriales.shuffle();
		var currentMaterial = {};
		var currentStep = 0;
		var comprobados = 0;

		$('#analisis').on('click', 'img', showImagePopup)

		function showImagePopup() {
			$('.popup-wrapper #ampliacion img').attr('src', $('#analisis img:visible').attr('src'));
			$('.popup-wrapper').css('padding', '50px 15%');
			$('.popup-wrapper').show();
		}
		$('.draggable').draggable({
			revert: true,
			revertDuration: 0
		}).on('click touchstart', function (event) {
			event.preventDefault;
			var dropped = $(this);
			var toolNum = $(dropped).data('value');
			$('.contenedor_interactivo')
				.removeClass('state-inicio')
				.removeClass('state-final')
				.addClass('state-jugando');
			if (toolNum == currentStep) {
				$(dropped).addClass('disabled');
				$(dropped).draggable('disable');
				// showOptions
				$('.droppable').addClass('ui-state-active');
				$('.nivel-' + currentStep).addClass('checked');
				showImagePopup();
			}
		});
		$('.droppable').droppable({
			drop: function (event, ui) {
				var dropped = ui.draggable[0];
				var toolNum = $(dropped).data('value');
				// $(this).removeClass('ui-state-active')
				$('.contenedor_interactivo')
					.removeClass('state-inicio')
					.removeClass('state-final')
					.addClass('state-jugando');

				if (toolNum == currentStep) {
					$(this).addClass('ui-state-active');
					$(dropped).addClass('disabled');
					$(dropped).draggable('disable');
					$('.nivel-' + currentStep).addClass('checked');
					showImagePopup();
				}
			}
		})

		/* Localización de textos */
		String.locale = 'es';
		String.toLocaleString(textos);
		var l = function (string) {
			return string.toLocaleString();
		};
		$('[data-l10n]').each(function () {
			var textId = $(this).data('l10n');
			$(this).html(l(textId))
		});

		/* Definición de eventos */
		$('#btn-repetir').on('click touchstart', reset);
		$('#btn-continuar').on('click', next);
		$('#arbol').on('click touchstart', '.option:not(.disabled)', comprobar);

		reset();

		function reset(e) {
			if (e) e.preventDefault();
			console.info('Inicio del juego.');
			comprobados = 0;
			setMaterial(dataMateriales[currentStep]);
			$('.contenedor_interactivo')
				.removeClass('state-jugando')
				.removeClass('state-final')
				.addClass('state-inicio');
		}

		function comprobar(e) {
			e.preventDefault();
			var seleccionado = $(this).data('value');

			if (currentMaterial.path[currentStep] == seleccionado) {
				console.info('Correcto');
				$('#arbol .nivel-' + currentStep + '> li > a').addClass('disabled');
				$('#arbol .nivel-' + currentStep + '> li[data-value="' + !seleccionado + '"]').addClass('invalid');
				$('#herramientas .herramienta-' + currentStep).addClass('disabled').draggable('disable');
				$('#material').removeClass('ui-state-active')
				if (currentMaterial.path.length - 1 > currentStep) {
					$('#success-sound').trigger('play');
					$('.contenedor_interactivo').removeClass('step-' + currentStep);
					currentStep++;
					$('.contenedor_interactivo').addClass('step-' + currentStep);
					$('#arbol .nivel-' + currentStep).addClass('visible');
					$('#herramientas #instrucciones-paso').html(l('%paso-' + currentStep));
				} else {
					$('#exact-sound').trigger('play');
					finalizar();
				}
			} else {
				console.info('Incorrecto');
				$('#error-sound').trigger('play');
			}

		}

		function setMaterial(material) {
			currentMaterial = material;

			$('#material .title').html(l(material.nombre));
			$('#material .foto').attr('src', './data/imgs/' + material.imagen);
			$('#material #analisis').html('');
			$('#material #resultado').html('');
			$('#herramientas #instrucciones-paso').html(l('%paso-0'));
			$('#herramientas .draggable').removeClass('disabled').draggable('enable');

			$('#arbol li,#arbol ul, #arbol a')
				.removeClass('disabled')
				.removeClass('invalid')
				.removeClass('visible')
				.removeClass('checked');

			$('#material #analisis').append('<img class="ojo" src="./data/imgs/' + material.imagen + '">');
			if (material.microscopio) {
				$('#material #analisis').append('<img class="microscopio" src="./data/imgs/' + material.microscopio + '">');
			}
			if (material.temperatura) {
				$('#material #analisis').append('<img class="temperatura" src="./data/imgs/' + material.temperatura + '">');
			}
			if (material.electrolisis) {
				$('#material #analisis').append('<img class="electrolisis" src="./data/imgs/' + material.electrolisis + '">');
			}

			$('.contenedor_interactivo')
				.removeClass('state-final')
				.removeClass('state-inicio')
				.removeClass('state-esperando')
				.addClass('state-jugando')
				.removeClass('step-' + currentStep)
				.addClass('step-0');
			currentStep = 0;

		}

		function finalizar() {
			$('#arbol ul').addClass('checked').addClass('visible');
			$('#herramientas .draggable').addClass('disabled').draggable('disable');
			$('#herramientas #instrucciones-paso').html('');
			var resultado = l(currentMaterial.resultado).replace(/(\d)/g, '<span class="sub">$1</span>');
			$('#material #resultado').html(resultado);

			if (comprobados == dataMateriales.length - 1) {
				stopPlaying();
			} else {
				$('.contenedor_interactivo')
					.removeClass('state-final')
					.removeClass('state-inicio')
					.removeClass('state-jugando')
					.addClass('state-esperando');
			}
		}

		function next() {
			comprobados++;
			currentMaterial = dataMateriales[comprobados];
			setMaterial(currentMaterial);
		}


		function stopPlaying() {
			console.info('Fin del juego.');

			$('.contenedor_interactivo')
				.removeClass('state-inicio')
				.removeClass('state-jugando')
				.removeClass('state-esperando')
				.removeClass('step-' + currentStep)
				.addClass('state-final');
		}

	});
})(jQuery, dataMateriales, textos);


Array.prototype.shuffle = function shuffle() {
	var array = this;

	var i = 0,
		j = 0,
		temp = null;

	for (i = array.length - 1; i > 0; i -= 1) {
		j = Math.floor(Math.random() * (i + 1));
		temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
};
