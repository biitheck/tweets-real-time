import { Container } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../types/types';
// import {
//     IAesService,
// } from '../interfaces';
// import {
//     AesService,
// } from '../services';

const DIContainer = new Container();

// DIContainer
//     .bind<IAesService>(TYPES.IAesService)
//     .to(AesService);

export { DIContainer };
