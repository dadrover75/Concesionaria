const autos = require('./autos');

const persona = {
    nombre: "Juan",
    capacidadDePagoEnCuotas: 20000,
    capacidadDePagoTotal: 100000
    }

const concesionaria = {
    autos: autos,

    buscarAuto: function (patente) {
        let filtro = this.autos.filter(auto => auto.patente == patente);

        if (filtro.length == 0) {
            return null;
        }
        else {
            return filtro[0];
        };
    },

    venderAuto: function (patente) {
        let auto = this.buscarAuto(patente);
        let index = this.autos.indexOf(auto);

        if (index != -1) {
            this.autos[index].vendido = true;
        };
        if (auto != null) {
            auto.vendido = true;
        };
        if (auto == null) {
            return 'el auto no esta en el listado';
        };

        return auto;
    },

    autosParaLaVenta: function () {
        let listaVenta = this.autos.filter(auto => auto.vendido == false);

        return listaVenta;
    },

    autosVendidos: function () {
        let listaVendidos = this.autos.filter(auto => auto.vendido == true);

        return listaVendidos;
    },

    autosNuevos: function () {
        let lista = this.autosParaLaVenta();

        return lista.filter(auto => auto.km <= 100);
    },

    listaDeVentas: function () {
        let listaVendidos = this.autosVendidos();
        let precioVendidos = [];

        listaVendidos.forEach(auto => precioVendidos.push(auto.precio));

        return precioVendidos;
    },

    totalDeVentas: function () {
        let precioVendidos = this.listaDeVentas();
        if (precioVendidos.length == 0){
            return 0;
        }
        else{
        let suma = precioVendidos.reduce((total, numero) => total + numero);
            return suma;
        };
    },
    // const persona = {
    //     nombre: "Juan",
    //     capacidadDePagoEnCuotas: 20000,
    //     capacidadDePagoTotal: 100000
    //     }
    puedeComprar: function (auto, persona) {
        return(persona.capacidadDePagoTotal >= auto.precio && persona.capacidadDePagoEnCuotas >= auto.precio/auto.cuotas);
    },
    autosQuePuedeComprar: function (persona) {
        return this.autosParaLaVenta().filter(auto => auto.precio <= persona.capacidadDePagoTotal && auto.precio/auto.cuotas <= persona.capacidadDePagoEnCuotas);
    }
};
console.log(concesionaria.autosQuePuedeComprar(persona))








//console.log(concesionaria.autosParaLaVenta());
// console.log("***********************************************************************");
// console.log(concesionaria.autosVendidos());
// console.log("***********************************************************************");
// console.log(concesionaria.venderAuto('APL123'));
// console.log("***********************************************************************");
// console.log(concesionaria.autosParaLaVenta());
// console.log("***********************************************************************");
// console.log(concesionaria.autosVendidos());
// console.log("***********************************************************************");
// console.log(concesionaria.listaDeVentas());
// console.log("***********************************************************************");
//console.log(concesionaria.totalDeVentas());
//console.log(concesionaria.puedeComprar(autos[1], persona));

        