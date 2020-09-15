//EL POLICIA DE JS
"use strict";
document.addEventListener("DOMContentLoaded", function () {
        //VARIABLES GLOBALES PARA EVITAR REPETIR CODIGO.
        let canvas = document.querySelector("#canvas");
        let input = document.querySelector("#inputId");
        let ctx = canvas.getContext("2d");
        let imagenSinFiltro;
        let imageData = ctx.createImageData(canvas.width, canvas.height);
        let anchoImagen = canvas.width;
        let alturaImagen = canvas.height;
        let rect = canvas.getBoundingClientRect();
        let x =0, y=0, dibujando=false, color='black', grosor=1, prenderLapiz=false, prenderGoma=false;

        document.querySelector("#btnNuevo").addEventListener('click',function(){
            let r = confirm("Se borrar todo lo que hizo, ¿Desea continuar?");
            if (r == true) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            } else {
              alert("Usted cancelo el borrado!, Continue")
            }
        })
        
        document.querySelector("#btnGoma").addEventListener('click',function(e){            
            if(prenderGoma==false){
                prenderGoma=true;
                prenderLapiz=false;
            }
            else
            if(prenderGoma==true)
                prenderGoma=false;                  
        });

        document.querySelector("#btnLapiz").addEventListener('click',function(e){            
            if(prenderLapiz==false){
                prenderLapiz=true;
                prenderGoma=false;     
            }               
            else
            if(prenderLapiz==true)
                prenderLapiz=false;                  
        });

        canvas.addEventListener('mousedown',function(e){
                if(prenderLapiz == true || prenderGoma==true){
                        x=e.clientX - rect.left;
                        y=e.clientY - rect.top;
                        dibujando=true;
                }
                
        });

        canvas.addEventListener('mousemove', function(e){
                if(dibujando == true){
                      dibujar(x,y,e.clientX - rect.left,e.clientY - rect.top);
                      x =  e.clientX - rect.left;
                      y = e.clientY - rect.top;
                }
        });

        canvas.addEventListener('mouseup',function(e){
                if(dibujando==true){
                        dibujar(x,y,e.clientX - rect.left,e.clientY - rect.top);
                        x=0;
                        y=0;
                        dibujando=false;
                }
        });

        function dibujar(x,y,x1,y1){
            if(prenderGoma==true){
                ctx.strokeStyle= "#FFFFFF";
                ctx.lineWidth=10*document.querySelector("#grosor").value;
            }
            else
            if(prenderLapiz==true){
                ctx.strokeStyle= document.querySelector("#color").value;
                ctx.lineWidth=document.querySelector("#grosor").value;
            }
            ctx.beginPath(); 
            ctx.moveTo(x,y);
            ctx.lineTo(x1,y1);
            ctx.stroke();
            ctx.closePath();
        }


        //FUNCION PARA CARGAR UNA IMAGEN
        function cargaImagen(){
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        input.onchange = e => {
                let file = e.target.files[0];
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = readerEvent => {
                let content = readerEvent.target.result;
                let image = new Image();
                image.src = content;
                image.onload = function(){
                        let imageScaledWidth = canvas.width;
                        let imageScaledHeight = canvas.height;    
                        let imageAspectRatio = (1.0 * this.height) / this.width;
                        if (this.width < this.height) {
                        imageAspectRatio = (1.0 * this.width) / this.height;
                        imageScaledWidth = canvas.height * imageAspectRatio;
                        imageScaledHeight = canvas.height;
                        }
                        ctx.drawImage(this, 0, 0, imageScaledWidth, imageScaledHeight);
                        imageData = ctx.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
                        imagenSinFiltro = ctx.getImageData(0,0,canvas.width,canvas.height);
                        ctx.putImageData(imageData, 0, 0);
                }
                }
        }
        }

        //BOTON PARA CARGAR LA IMAGEN
        document.querySelector("#btnCargar").addEventListener("click", function(e){document.querySelector("#inputId").click();cargaImagen();});


        //FUNCION GUARDAR
        function guardar() {                              
        let dataURL = canvas.toDataURL();
        let a = document.createElement('a');
        a.href = dataURL;
        a.download = 'foto!.jpeg';
        document.body.appendChild(a);
        a.click();
        }

        //BOTON PARA GUARDAR LA IMAGEN
        document.querySelector("#btnGuardar").addEventListener("click", guardar);

        function getRed(imageData, x, y) {
        let index = (x + y * imageData.width) * 4;
        return imageData.data[index + 0];
        }

        function getGreen(imageData, x, y) {
        let index = (x + y * imageData.width) * 4;
        return imageData.data[index + 1];
        }

        function getBlue(imageData, x, y) {
        let index = (x + y * imageData.width) * 4;
        return imageData.data[index + 2];
        }


        //APLICAR EL FILTRO SEPIA
        function sepia() {
                imageData = ctx.getImageData(0, 0, anchoImagen, alturaImagen);
                for (let i = 0; i < imageData.width; i++) {
                        for (let j = 0; j < imageData.height; j++) {
                                let index = (i + j * imageData.width) * 4;
                                let prom = Math.floor(getRed(imageData,i,j)+getGreen(imageData,i,j)+getBlue(imageData,i,j)/3);
                                let r = Math.min(prom+40, 255);
                                let g = Math.min(prom+15, 255);
                                let b = Math.min(prom, 255);
                                imageData.data[index + 0] = r;
                                imageData.data[index + 1] = g;
                                imageData.data[index + 2] = b;
                        }
                }
                ctx.putImageData(imageData, 0, 0);
        }
        

        //EL BOTON PARA APLICAR EL FILTRO SEPIA
        document.querySelector("#btnSepia").addEventListener("click", sepia);

        //FUNCION PARA APLICAR EL FILTRO BLANCO Y NEGRO
        function blancoNegro() {
        imageData = ctx.getImageData(0, 0, anchoImagen, alturaImagen);
        for (let i = 0; i < canvas.height; i++) {
                for (let j = 0; j < canvas.width; j++) {
                        let index = (j + i * imageData.width) * 4;
                        let r = getRed(imageData, j, i);
                        let g = getGreen(imageData, j, i);
                        let b = getBlue(imageData, j, i);
                        let promedio = (r + g + b) / 3;
                        imageData.data[index + 0] = promedio;
                        imageData.data[index + 1] = promedio;
                        imageData.data[index + 2] = promedio;
                }
        }
        ctx.putImageData(imageData, 0, 0);
        }

        //BOTON PARA APLICAR EL FILTRO BLANCO Y NEGRO
        document.querySelector("#btnByN").addEventListener("click", blancoNegro);


        function negativo() {
        imageData = ctx.getImageData(0, 0, anchoImagen, alturaImagen);
        for (let i = 0; i < imageData.width; i++) {
                for (let j = 0; j < imageData.height; j++) {
                        let index = (i + j * imageData.width) * 4;
                        let r = 255 - getRed(imageData, i, j);
                        let g = 255 - getGreen(imageData, i, j);
                        let b = 255 - getBlue(imageData, i, j);
                        imageData.data[index + 0] = r;
                        imageData.data[index + 1] = g;
                        imageData.data[index + 2] = b;
                }
        }
        ctx.putImageData(imageData, 0, 0);
        }

        //BOTON PARA APLICAR EL FILTRO NEGATIVO
        document.querySelector("#btnNegativo").addEventListener("click", negativo);


        //FUNCION PARA APLICAR EL FILTRO SATURACION
        function saturacion() {
        imageData = ctx.getImageData(0, 0, anchoImagen, alturaImagen);
        for (let i = 0; i < imageData.width; i++) {
                for (let j = 0; j < imageData.height; j++) {
                        let index = (i + j * imageData.width) * 4;
                        let  r = getRed(imageData, i, j);
                        let g = getGreen(imageData, i, j);
                        let b = getBlue(imageData, i, j);
                        let a = rgbToHsl(r, g, b);
                        a[1] = 2;
                        let p = hslToRgb(a[0],a[1],a[2]);
                        imageData.data[index + 0] = p[0]; 
                        imageData.data[index + 1] = p[1]; 
                        imageData.data[index + 2] = p[2]; 
                }
        }
        ctx.putImageData(imageData, 0, 0);
        }

        function rgbToHsl(r, g, b) {
        r /= 255, g /= 255, b /= 255;

        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max == min) {
                h = s = 0;
        } else {
                let d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

                switch (max) {
                        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                        case g: h = (b - r) / d + 2; break;
                        case b: h = (r - g) / d + 4; break;
                }

                h /= 6;
        }

        return [h, s, l];
        }

        function hslToRgb(h, s, l) {
        let r, g, b;

        if (s == 0) {
                r = g = b = l; 
        } else {
                function hue2rgb(p, q, t) {
                        if (t < 0) t += 1;
                        if (t > 1) t -= 1;
                        if (t < 1 / 6) return p + (q - p) * 6 * t;
                        if (t < 1 / 2) return q;
                        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                        return p;
                }

                let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                let p = 2 * l - q;

                r = hue2rgb(p, q, h + 1 / 3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1 / 3);
        }

        return [r * 255, g * 255, b * 255];
        }

        //BOTON PARA APLICAR EL FILTRO SATURACION
        document.querySelector("#btnSaturacion").addEventListener("click", saturacion);

        //FUNCION PARA APLICAR EL FILTRO DIFUMINAR
        function difuminar() {
        let index;
        imageData = ctx.getImageData(0, 0, anchoImagen, alturaImagen);
        let matriz = [
                [1 / 9, 1 / 9, 1 / 9],
                [1 / 9, 1 / 9, 1 / 9],
                [1 / 9, 1 / 9, 1 / 9]
        ];
        let r = 0;
        let g = 0;
        let b = 0;
        for (let x = 1; x < imageData.width - 1; x++) {
                for (let y = 1; y < imageData.height - 1; y++) {
                        promedioMatriz(imageData, x, y, matriz, r, g, b, index);
                        index = (x + y * imageData.width) * 4;
                }
        }
        ctx.putImageData(imageData, 0, 0);
        }

        function promedioMatriz(imageData, x, y, matriz, r, g, b, index) {
        r = getRed(imageData, x - 1, y - 1) * 1 / 9 + getRed(imageData, x, y - 1) * 1 / 9 + getRed(imageData, x + 1, y - 1) * 1 / 9
                + getRed(imageData, x - 1, y) * 1 / 9 + getRed(imageData, x, y) * 1 / 9 + getRed(imageData, x + 1, y) * 1 / 9
                + getRed(imageData, x - 1, y + 1) * 1 / 9 + getRed(imageData, x, y + 1) * 1 / 9 + getRed(imageData, x + 1, y + 1) * 1 / 9;
        g = getGreen(imageData, x - 1, y - 1) * 1 / 9 + getGreen(imageData, x, y - 1) * 1 / 9 + getGreen(imageData, x + 1, y - 1) * 1 / 9
                + getGreen(imageData, x - 1, y) * 1 / 9 + getGreen(imageData, x, y) * 1 / 9 + getGreen(imageData, x + 1, y) * 1 / 9
                + getGreen(imageData, x - 1, y + 1) * 1 / 9 + getGreen(imageData, x, y + 1) * 1 / 9 + getGreen(imageData, x + 1, y + 1) * 1 / 9;
        b = getBlue(imageData, x - 1, y - 1) * 1 / 9 + getBlue(imageData, x, y - 1) * 1 / 9 + getBlue(imageData, x + 1, y - 1) * 1 / 9
                + getBlue(imageData, x - 1, y) * 1 / 9 + getBlue(imageData, x, y) * 1 / 9 + getBlue(imageData, x + 1, y + 1) * 1 / 9
                + getBlue(imageData, x - 1, y + 1) * 1 / 9 + getBlue(imageData, x, y + 1) * 1 / 9 + getBlue(imageData, x + 1, y + 1) * 1 / 9;
        imageData.data[index + 0] = r;
        imageData.data[index + 1] = g;
        imageData.data[index + 2] = b;
        }

        //BOTON PARA APLICAR EL FILTRO DE DIFUMINAR
        document.querySelector("#btnDifuminar").addEventListener("click", difuminar);


        //FUNCION PARA APLICAR EL FILTRO BRILLO
        function brillo() {
        let valor = parseInt(document.querySelector("#selectValor").value);
        imageData = ctx.getImageData(0, 0, anchoImagen, alturaImagen);
        for (let i = 0; i < imageData.width; i++) {
                for (let j = 0; j < imageData.height; j++) {
                        let index = (i + j * imageData.width) * 4;
                        let r = imageData.data[index + 0] + valor;
                        let g = imageData.data[index + 1] + valor;
                        let b = imageData.data[index + 2] + valor;
                        imageData.data[index + 0] = r;
                        imageData.data[index + 1] = g;
                        imageData.data[index + 2] = b;
                }
        }
        ctx.putImageData(imageData, 0, 0);
        }

        //BOTON PARA APLICAR EL FILTRO BRILLO
        document.querySelector("#btnBrillo").addEventListener("click", brillo);

        //FUCION PARA QUITAR LOS FILTROS
        function quitarFiltro() {
        ctx.putImageData(imagenSinFiltro, 0, 0);
        }

        //BOTON PARA QUITAR LOS FILTROS
        document.querySelector("#btnQuitar").addEventListener("click", quitarFiltro);

});