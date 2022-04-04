%Limpiar workspace
clc;
clear;

%Leer datos 
c = 'datos.txt';
x=importdata(c);

%Abrir puerto serial
OP=serial('COM1');

%Ejecutar sistema en simulink
sim('pruebaPID.slx');

%Mostrar datos 
simout.data


