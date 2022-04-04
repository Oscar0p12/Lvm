clc;
clear;
% 
c = 'datos.txt';
x=importdata(c);
x
OP=serial('COM1');
sim('SIRVE.mdl');
simout.data


