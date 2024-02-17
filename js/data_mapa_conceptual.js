/*
Mezcla heterogénea: [true]
Coloide: [false,true]
Disolución: [false,false,false]
Compuesto: [false,false,true,true]
Sustancia simple: [false, false, true, false]

*/

var dataMateriales = [
	{
		nombre:'Llentilles',
		imagen:'lentejas.jpg',
		path:[true],
		resultado: '%resultado_lentejas'
	},	{
		nombre:'Sang',
		imagen:'sangre.jpg',
		microscopio:'sangre_microscopio.jpg',
		path:[false,true],
		resultado:'%resultado_sangre'
	},	{
		nombre:'Aigua',
		imagen:'agua.jpg',
		microscopio:'agua_microscopio.jpg',
		temperatura:'temperatura_agua.gif',
		electrolisis:'electrolisis_agua.gif',
		path:[false,false,true,true],
		resultado:'%resultado_agua'
	},	{
		nombre:'Sal',
		imagen:'sal.jpg',
		microscopio:'sal_microscopio.jpg',
		temperatura:'temperatura_sal.gif',
		electrolisis:'electrolisis_sal.gif',
		path:[false,false,true,true],
		resultado:'%resultado_sal'
	},	{
		nombre:'Vi',
		imagen:'vino.jpg',
		microscopio:'vino_microscopio.jpg',
		temperatura:'temperatura_vino.gif',
		path:[false,false,false],
		resultado:'%resultado_vino'
	},	{
		nombre:'Alumini',
		imagen:'aluminio.jpg',
		microscopio:'aluminio_microscopio.jpg',
		temperatura:'temperatura_aluminio.gif',
		electrolisis:'electrolisis_aluminio.gif',
		path:[false, false, true, false],
		resultado:'%resultado_aluminio'
	},	{
		nombre:'Sofre',
		imagen:'azufre.jpg',
		microscopio:'azufre_microscopio.jpg',
		temperatura:'temperatura_azufre.gif',
		electrolisis:'electrolisis_azufre.gif',
		path:[false, false, true, false],
		resultado:'%resultado_azufre'
	},	{
		nombre:'Estany',
		imagen:'estano.jpg',
		microscopio:'estano_microscopio.jpg',
		temperatura:'temperatura_estano.gif',
		electrolisis:'electrolisis_estano.gif',
		path:[false, false, true, false],
		resultado:'%resultado_estano'
	},	{
		nombre:'Llet',
		imagen:'leche.jpg',
		microscopio:'leche_microscopio.jpg',
		path:[false,true],
		resultado:'%resultado_leche'
	},{
		nombre:'Pedres',
		imagen:'piedras.jpg',
		path:[true],
		resultado:'%resultado_piedras'
	},{
		nombre:'Aigua i oli',
		imagen:'agua_aceite.jpg',
		path:[true],
		resultado:'%resultado_agua_aceite'
	}

];
